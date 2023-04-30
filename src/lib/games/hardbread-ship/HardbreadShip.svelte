<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import { assets } from '$app/paths';
	import { updateTimer, setUpOrientation, loadImage } from './utils';

	type GameStatus = 'notstarted' | 'playing' | 'won' | 'lost';

	type Game = {
		status: GameStatus;
		currentTimer: string;
		startTime: Date | null;
		endTime: Date | null;
		wavesTotal: number;
	};

	type Wave = {
		direction: 'left' | 'right';
		speed: number;
		opacity: Tweened<number>;
		x: number;
		id: number;
		done: boolean;
	};

	// Game settings
	const MAX_LEAN = 45; // degrees

	// Game constants
	const SHIP_SIZE = {
		width: 333 / 2,
		height: 590 / 2,
	};
	const WATER_SIZE = {
		width: 1024 / 2,
		height: 238 / 2,
	};
	const WAVE_SIZE = {
		width: 258 / 2,
		height: 229 / 2,
	};

	// Game elements
	let gameRef: HTMLDivElement;
	let gameScale = 1;

	// Canvas elements
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;

	// Images
	let backgroundImage: HTMLImageElement;
	let waterImage: HTMLImageElement;
	let shipImage: HTMLImageElement;
	let waveImage: HTMLImageElement;

	// Timer
	let timerInterval: NodeJS.Timeout;

	// Game state
	let game: Game = {
		status: 'notstarted',
		currentTimer: '00:00',
		startTime: null,
		endTime: null,
		wavesTotal: 0,
	};

	// Game loop
	let lastFrameTime = performance.now();

	// Gameplay state
	let deviceOrientation = 0;
	let waves: Wave[] = [];

	function handleOrientation(event: DeviceOrientationEvent) {
		const { gamma } = event;
		deviceOrientation = Math.min(Math.max(gamma || 0, -MAX_LEAN), MAX_LEAN);
	}

	function render() {
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// Draw background
		ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

		// Draw ship
		ctx.save();
		const shipRotationPoint = {
			x: canvas.width / 2,
			y: canvas.height * 0.66,
		};
		ctx.translate(shipRotationPoint.x, shipRotationPoint.y);
		ctx.rotate((Math.PI / 180) * deviceOrientation);
		ctx.drawImage(
			shipImage,
			-SHIP_SIZE.width / 2,
			-SHIP_SIZE.height * 0.85,
			SHIP_SIZE.width,
			SHIP_SIZE.height,
		);
		ctx.restore();

		// Draw water
		ctx.drawImage(waterImage, 0, canvas.height * 0.62, WATER_SIZE.width, WATER_SIZE.height);

		// Draw waves
		waves.forEach((wave) => {
			if (!ctx) return;
			ctx.save();
			ctx.translate(wave.x, canvas.height * 0.47);
			if (wave.direction === 'right') {
				ctx.scale(-1, 1);
			}
			ctx.globalAlpha = get(wave.opacity) || 1;
			ctx.drawImage(
				waveImage,
				WAVE_SIZE.width / 2,
				WAVE_SIZE.height / 2,
				WAVE_SIZE.width,
				WAVE_SIZE.height,
			);
			ctx.restore();
		});
	}

	function createWave(): Wave {
		const waveDirection = Math.random() > 0.5 ? 'left' : 'right';
		return {
			id: game.wavesTotal++,
			x: waveDirection === 'left' ? canvas.width : 0,
			direction: waveDirection,
			// TODO: make speed depend on time since game.startTime
			speed: 70,
			opacity: tweened(1, { duration: 1000 }),
			done: false,
		};
	}

	function gameLoop() {
		const now = performance.now();
		const timeSinceLastFrame = now - lastFrameTime;
		lastFrameTime = now;

		waves.forEach((wave) => {
			if (wave.direction === 'left') {
				wave.x -= wave.speed * (timeSinceLastFrame / 1000);
			} else {
				wave.x += wave.speed * (timeSinceLastFrame / 1000);
			}
			if (
				!wave.done &&
				((wave.direction === 'left' &&
					wave.x + WAVE_SIZE.width * 0.8 < canvas.width / 2 + SHIP_SIZE.width / 2) ||
					(wave.direction === 'right' &&
						wave.x - WAVE_SIZE.width * 0.8 > canvas.width / 2 - SHIP_SIZE.width / 2))
			) {
				wave.opacity?.set?.(0);
				wave.done = true;
				setTimeout(() => {
					waves = waves.filter((w) => w.id !== wave.id);
					waves.push(createWave());
				}, 1000);
			}
		});

		// TODO: Chack ship collision with waves
		// if ship does not lean towards the wave and the wave is close enough, game over

		// TODO: Game over animation

		render();
		lastFrameTime = performance.now();
		requestAnimationFrame(gameLoop);
	}

	// TODO: create reset game function

	async function startGame() {
		console.log('gameStarted');
		await setUpOrientation(handleOrientation);
		if (game.status === 'notstarted') {
			game.status = 'playing';
			game.startTime = new Date();

			timerInterval = setInterval(() => {
				game.currentTimer = updateTimer(game.startTime);
			}, 1000);
			waves.push(createWave());
			setTimeout(() => {
				waves.push(createWave());
			}, 1000);

			gameLoop();
		}
	}

	onMount(async () => {
		ctx = canvas.getContext('2d');
		gameScale = (gameRef.parentElement?.clientWidth || 512) / 512;

		[backgroundImage, waterImage, shipImage, waveImage] = await Promise.all([
			loadImage(`${assets}/images/games/hardbread/background.png`),
			loadImage(`${assets}/images/games/hardbread/water.png`),
			loadImage(`${assets}/images/games/hardbread/ship.png`),
			loadImage(`${assets}/images/games/hardbread/wave.png`),
		]);

		render();

		return () => {
			window.removeEventListener('deviceorientation', handleOrientation, true);
		};
	});
</script>

<div bind:this={gameRef} class="game" style="transform: scale({gameScale})">
	<canvas width="512" height="512" bind:this={canvas} />
	<div class="menu">
		<button on:click={startGame}>Start</button>
		<span class="timer">{game.currentTimer}</span>
	</div>
</div>

<style lang="scss">
	.game {
		position: relative;
		width: 512px;
		height: 512px;
		overflow: hidden;
		border: 1px solid #000;
		transform-origin: top left;
	}

	canvas {
		position: absolute;
		inset: 0;
		width: 512px;
		height: 512px;
	}

	.menu {
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--gap);
	}

	.timer {
		font-size: 2rem;
		width: 200px;
		text-align: center;
	}
</style>
