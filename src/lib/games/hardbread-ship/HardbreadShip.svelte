<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import Image from '$lib/components/Image.svelte';
	import waterImage from './assets/hardbread-water.png?w=1024&imagetools';
	import shipImage from './assets/hardbread-ship.png?w=333&imagetools';
	import backgroundImage from './assets/hardbread-background.png?w=1024&imagetools';

	type GameStatus = 'notstarted' | 'playing' | 'won' | 'lost';

	type Game = {
		status: GameStatus;
		currentTimer: string;
		startTime: Date | null;
		endTime: Date | null;
	};

	interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
		requestPermission?: () => Promise<'granted' | 'denied'>;
	}

	const heroImageSize = `
		(min-width: 1024px)	688px,
		(min-width: 769px) calc(100vw - 336px),
		calc(100vw - 16px)
	`;

	const MAX_LEAN = 35;

	let gameRef: HTMLDivElement;
	let gameScale = 1;
	let game: Game;
	let lean = 0;

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
			lean = event.gamma || 0;
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

	async function createGame() {
		await permission();
		game = {
			status: 'playing',
			currentTimer: '00:00',
			startTime: new Date(),
			endTime: null,
		};

		updateTimer();
	}

	async function permission() {
		try {
			const response = await (DeviceOrientationEvent as any).requestPermission();
			if (response == 'granted') {
				window.addEventListener('devicemotion', (e) => {
					// do something for 'e' here.
					console.log(e);
				});
				window.addEventListener('deviceorientation', handleOrientation, true);
			}
		} catch {
			window.addEventListener('deviceorientation', handleOrientation, true);
		}
	}

	onMount(() => {
		gameScale = (gameRef.parentElement?.clientWidth || 512) / 512;
		window.addEventListener('deviceorientation', handleOrientation, true);
	});

	$: {
		if (Math.abs(lean) > MAX_LEAN) {
			game.status = 'lost';
			const { x, y } = getXYFromRotation(lean);
			shipY.set(y * 500);
			shipX.set(x * 500);
			waterOpacity.set(0);
		}
	}
</script>

<div bind:this={gameRef} class="game" style="transform: scale({gameScale})">
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

	<div class="ship" style="transform: rotate({lean}deg) translate({$shipX}px, {$shipY}px)">
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
	<div class="warning" style="opacity: {Math.abs(lean) / MAX_LEAN}" />
	<div class="score-card">
		{#if game?.status === 'playing'}
			<p>{game.currentTimer}</p>
		{:else if game?.status === 'lost'}
			<p>You sank after {game.currentTimer}</p>
		{:else}
			<button on:click={createGame}>Start</button>
		{/if}
	</div>
</div>

<style>
	.game {
		width: 512px;
		height: 512px;
		position: relative;
		transform-origin: top left;
		overflow: hidden;
	}
	.water,
	.ship,
	.background,
	.warning,
	.score-card {
		position: absolute;
	}

	.warning {
		inset: 0 0 80px 0;
		box-shadow: inset 0 0 60px 0px red;
	}

	.score-card {
		bottom: 0;
		height: 80px;
		background: #177399;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
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
