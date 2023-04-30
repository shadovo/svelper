<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { tweened, spring } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import Image from '$lib/components/Image.svelte';
	import waveImage from './assets/hardbread-wave.png?w=258&imagetools';
	import waterImage from './assets/hardbread-water.png?w=1024&imagetools';
	import shipImage from './assets/hardbread-ship.png?w=333&imagetools';
	import backgroundImage from './assets/hardbread-background.png?w=1024&imagetools';

	type Wave = {
		direction: 'left' | 'right';
		animationDuration: number;
		x: Tweened<number>;
		id: number;
	};

	type GameStatus = 'notstarted' | 'playing' | 'won' | 'lost';

	type Game = {
		status: GameStatus;
		currentTimer: string;
		startTime: Date | null;
		endTime: Date | null;
		wavesTotal: number;
	};

	let waves: Set<Wave>;

	let deviceRotation = 0;

	let shipRotationAcceleration = 0;
	let shipRotationSpeed = 0;
	let shipRotation = spring(0, {
		stiffness: 0.08,
		damping: 0.5,
	});

	const heroImageSize = `
		(min-width: 1024px)	688px,
		(min-width: 769px) calc(100vw - 336px),
		calc(100vw - 16px)
	`;

	const MAX_LEAN = 45;

	let gameRef: HTMLDivElement;
	let game: Game = {
		status: 'notstarted',
		currentTimer: '00:00',
		startTime: null,
		endTime: null,
		wavesTotal: 0,
	};
	waves = new Set();
	shipRotationAcceleration = 0;
	shipRotationSpeed = 0;
	shipRotation.set(0, {
		hard: true,
	});
	let gameScale = 1;
	let hasEventListener = false;

	let shipY = tweened(0, {
		duration: 2000,
	});
	let shipX = tweened(0, {
		duration: 2000,
	});
	let waterOpacity = tweened(1, {
		delay: 1000,
		duration: 2000,
	});

	// function that gets a rotation in deg and calculates the required x and y to move the object straight down
	function getXYFromRotation(rotation: number) {
		const radians = (rotation * Math.PI) / 180;
		const x = Math.sin(radians);
		const y = Math.cos(radians);
		return { x, y };
	}

	function handleOrientation(event: DeviceOrientationEvent) {
		if (game?.status === 'playing') {
			deviceRotation = -1 * (event.gamma || 0);
		}
	}

	function updateTimer() {
		if (game.status === 'playing') {
			const seconds = Math.floor((new Date().getTime() - (game.startTime?.getTime() || 0)) / 1000);
			const minutes = Math.floor(seconds / 60);
			const secondsLeft = seconds % 60;
			const secondsString = secondsLeft < 10 ? `0${secondsLeft}` : `${secondsLeft}`;
			const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
			game.currentTimer = `${minutesString}:${secondsString}`;
		}
		setTimeout(updateTimer, 1000);
	}

	function reset() {
		game.status = 'notstarted';
		shipRotation.set(0, {
			hard: true,
		});
		shipY.set(300, {
			duration: 0,
		});
		shipY.set(0);
		shipX.set(100, {
			duration: 0,
		});
		shipX.set(0);
		waterOpacity.set(0, {
			delay: 0,
			duration: 0,
		});
		waterOpacity.set(1, {
			delay: 2000,
			duration: 2000,
		});
	}

	async function createGame() {
		if (!hasEventListener) {
			await permission();
		}
		game = {
			status: 'playing',
			currentTimer: '00:00',
			startTime: new Date(),
			endTime: null,
			wavesTotal: 0,
		};
		waves = new Set();
		shipRotationAcceleration = 0;
		shipRotationSpeed = 0;
		shipRotation.set(0, {
			hard: true,
		});
		handleWave();
		setTimeout(() => handleWave(), 1000);
		updateTimer();
		gameLoop();
	}

	interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
		requestPermission?: () => Promise<'granted' | 'denied'>;
	}

	async function permission() {
		try {
			const response = await (
				DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
			)?.requestPermission?.();
			if (response === 'granted' || response === undefined) {
				window.addEventListener('deviceorientation', handleOrientation, true);
			}
		} catch {
			window.addEventListener('deviceorientation', handleOrientation, true);
		}
	}

	function handleWave() {
		const id = (game.wavesTotal += 1);
		const animationDuration = 2000 + Math.random() * 3000;
		const direction = Math.random() > 0.5 ? 'left' : 'right';
		const startX = direction === 'left' ? 641 : -129;
		const endX = direction === 'left' ? 258 : 129;
		const wave: Wave = {
			direction,
			animationDuration,
			x: tweened(startX, {
				duration: animationDuration,
			}),
			id,
		};
		waves.add(wave);
		wave.x.set(endX);
		setTimeout(() => {
			if (game.status !== 'playing') {
				return;
			}
			// shipRotationSpeed += direction === 'left' ? -30 : 30;
			shipRotation.update((value) => value + (direction === 'left' ? -400 : 400));
			waves.delete(wave);
			handleWave();
		}, wave.animationDuration);
	}

	onMount(() => {
		gameScale = (gameRef.parentElement?.clientWidth || 512) / 512;
		return () => {
			window.removeEventListener('deviceorientation', handleOrientation, true);
		};
	});

	let frame = 0;
	function gameLoop() {
		if (game?.status !== 'playing') {
			shipRotation.set($shipRotation, { hard: true });
			return;
		}
		frame = (frame % 4) + 1;
		shipRotation.set(deviceRotation);
		requestAnimationFrame(gameLoop);
	}

	$: {
		if (Math.abs($shipRotation) > MAX_LEAN) {
			game.status = 'lost';
			const { x, y } = getXYFromRotation($shipRotation);
			shipY.set(y * 500);
			shipX.set(x * 500);
			waterOpacity.set(0);
		}
	}
</script>

<div bind:this={gameRef} class="game" style="transform: scale({gameScale})">
	{#key frame}
		<div class="background">
			<Image
				alt=""
				role="presentation"
				src={backgroundImage}
				sizes={heroImageSize}
				aspectRatio="1024/1024"
				background="transparent"
			/>
		</div>

		<div
			class="ship"
			style="transform: rotate({$shipRotation}deg) translate({$shipX}px, {$shipY}px)"
		>
			<Image
				alt=""
				role="presentation"
				src={shipImage}
				sizes={heroImageSize}
				aspectRatio="333/590"
				background="transparent"
			/>
		</div>

		<div class="water" style="opacity: {$waterOpacity}">
			<Image
				alt=""
				role="presentation"
				src={waterImage}
				sizes={heroImageSize}
				aspectRatio="1024/238"
				background="transparent"
			/>
		</div>

		{#if game?.status === 'playing'}
			{#each [...waves] as wave}
				{#key get(wave.x)}
					<div
						id={`${wave.id}`}
						class="wave {wave.direction}"
						style="transform: translateX({get(wave.x)}px) scaleX({wave.direction === 'left'
							? 1
							: -1});"
					>
						<Image
							alt=""
							role="presentation"
							src={waveImage}
							sizes={heroImageSize}
							aspectRatio="258/229"
							background="transparent"
						/>
					</div>
				{/key}
			{/each}
		{/if}

		<div class="warning" style="opacity: {Math.abs($shipRotation) / MAX_LEAN}" />
		<div class="score-card">
			{#if game?.status === 'playing'}
				<p>{game.currentTimer}</p>
			{:else if game?.status === 'lost'}
				<p>You sank after {game.currentTimer}</p>
				<button on:click={reset}>Play again</button>
			{:else}
				<button on:click={createGame}>Start</button>
			{/if}
		</div>
	{/key}
</div>

<style lang="scss">
	.game {
		width: 512px;
		height: 512px;
		position: relative;
		transform-origin: top left;
		overflow: hidden;
	}

	.wave,
	.water,
	.ship,
	.background,
	.warning,
	.score-card {
		position: absolute;
	}

	.wave.right {
		width: 129px;
		top: 290px;
		left: 0;
	}
	.wave.left {
		width: 129px;
		top: 290px;
		left: 0;
	}

	.warning {
		inset: 0 0 80px 0;
		box-shadow: inset 0 0 60px 0px red;
	}

	.score-card {
		bottom: 0;
		height: 80px;
		background: #115c7c;
		color: white;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		gap: var(--gap);

		button {
			border-radius: 4px;
			border: 2px solid white;
			color: white;
			background: #3085a9;
			cursor: pointer;
		}
	}

	.water {
		width: 512px;
		left: 0;
		top: 315px;
	}

	.ship {
		width: 166px;
		left: 170px;
		top: 80px;
		transform-origin: 50% 85%;
	}

	.background {
		width: 512px;
	}
</style>
