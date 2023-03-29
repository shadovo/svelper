<script lang="ts">
	import { browser } from '$app/environment';
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';

	type BottomPillar = {
		top: number;
		x: number;
		scored?: boolean;
	};

	export let width = '300';
	export let height = '450';
	const GAME_WIDTH = Math.max(300, parseInt(width));
	const GAME_HEIGHT = Math.max(300, parseInt(height));
	const PIXEL_RATIO = browser ? window.devicePixelRatio : 1;
	const RELATIVE_WIDTH = relativeSize(GAME_WIDTH);
	const RELATIVE_HEIGHT = relativeSize(GAME_HEIGHT);
	const TOP_MARGIN = RELATIVE_HEIGHT * 0.4;
	const GROUND_HEIGHT = relativeSize(50);
	const OCTTY_SIZE = relativeSize(40);
	const CORAL_SIZE = relativeSize(40);
	const SCORE_SIZE = relativeSize(60);
	const SCORE_POS_Y = relativeSize(10);
	const SCORE_POS_X = RELATIVE_WIDTH * 0.5;
	const BOTTOM_PILLARS: BottomPillar[] = [];
	const PILLAR_MIN_TOP = TOP_MARGIN;
	const PILLAR_MAX_TOP = RELATIVE_HEIGHT - GROUND_HEIGHT - CORAL_SIZE;
	const PILLAR_GAP = relativeSize(140);
	const PILLAR_SPACEING = relativeSize(200);
	const OCTTY_POS_X = RELATIVE_WIDTH * 0.25 - OCTTY_SIZE * 0.5;
	const TICK = 1000 / 60;
	const BASE_OCTTY_DISTANCE_PER_TICK = 4;
	const BASE_SIDESCROLL_SPEED = 2;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let gameInitiated = false;
	let octtyDirection = tweened(-1, { duration: 1000 });
	let octtyPosY = (RELATIVE_HEIGHT - GROUND_HEIGHT) / 2;
	let octtyIsDead = false;
	let score = 0;
	let octtyDistancePerTick = BASE_OCTTY_DISTANCE_PER_TICK;
	let pillarDistancePerTick = BASE_SIDESCROLL_SPEED;
	let lastFrameTime = performance.now();
	let highScore = 0;

	function getRandomArbitrary(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}

	function jump() {
		if (octtyIsDead) {
			return;
		}
		octtyDirection.set(-1, {
			duration: 0,
		});
		octtyDirection.set(1, {
			duration: 1500,
		});
	}

	function createBottomPillar(previousPillarX = RELATIVE_WIDTH + CORAL_SIZE): BottomPillar {
		return {
			top: getRandomArbitrary(PILLAR_MIN_TOP, PILLAR_MAX_TOP),
			x: previousPillarX + PILLAR_SPACEING,
			scored: false,
		};
	}

	function relativeSize(size: number) {
		return size * PIXEL_RATIO;
	}

	function render() {
		ctx.clearRect(0, 0, RELATIVE_WIDTH, RELATIVE_HEIGHT);
		// water
		ctx.fillStyle = '#39b2bd';
		ctx.fillRect(0, 0, RELATIVE_WIDTH, RELATIVE_HEIGHT);
		// ground
		ctx.fillStyle = '#ffc67b';
		ctx.fillRect(0, RELATIVE_HEIGHT - GROUND_HEIGHT, RELATIVE_WIDTH, GROUND_HEIGHT);
		// score
		ctx.font = `${SCORE_SIZE}px sans-serif`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.fillStyle = '#9ddde2';
		ctx.fillText(`${score}`, SCORE_POS_X, SCORE_POS_Y);
		// octty
		ctx.font = `${OCTTY_SIZE}px sans-serif`;
		ctx.save();
		ctx.translate(OCTTY_POS_X, octtyPosY);
		ctx.scale(-1, 1); // flip due to android octopus emoji facing the wrong way
		ctx.fillText('🐙', 0, 0);
		if (octtyIsDead) {
			ctx.fillText('💀', 0, 0);
		}
		ctx.restore();

		// Coral
		ctx.font = `${CORAL_SIZE}px serif`;
		BOTTOM_PILLARS.forEach((bottomPillar) => {
			let y = bottomPillar.top;
			let flip = false;
			while (y < RELATIVE_HEIGHT - GROUND_HEIGHT) {
				ctx.save();
				ctx.translate(bottomPillar.x, y);
				ctx.scale(flip ? -1 : 1, 1);
				ctx.fillText('🪸', 0, 0);
				ctx.restore();
				y += CORAL_SIZE * 0.5;
				flip = !flip;
			}
			let y2 = bottomPillar.top - PILLAR_GAP;
			flip = false;
			while (y2 > 0 - CORAL_SIZE) {
				ctx.save();
				ctx.translate(bottomPillar.x, y2);
				ctx.scale(flip ? -1 : 1, -1);
				ctx.fillText('🌿', 0, 0);
				ctx.restore();
				y2 -= CORAL_SIZE * 0.5;
				flip = !flip;
			}
		});
	}

	function gameLoop() {
		render();
		if (octtyIsDead) {
			highScore = Math.max(score, highScore);
			return;
		}

		// calculate octtyDistancePerTick based on time since last frame
		const now = performance.now();
		const timeSinceLastFrame = now - lastFrameTime;
		lastFrameTime = now;
		octtyDistancePerTick = relativeSize(BASE_OCTTY_DISTANCE_PER_TICK * (timeSinceLastFrame / TICK));
		pillarDistancePerTick = relativeSize(BASE_SIDESCROLL_SPEED * (timeSinceLastFrame / TICK));

		// Update Octty pos
		octtyPosY += octtyDistancePerTick * $octtyDirection;
		// Update pillar pos
		BOTTOM_PILLARS.forEach((bottomPillar, i) => {
			bottomPillar.x -= pillarDistancePerTick;
			if (bottomPillar.x < -CORAL_SIZE) {
				const lastPillarX = BOTTOM_PILLARS.reduce((acc, pillar) => {
					return pillar.x > acc ? pillar.x : acc;
				}, 0);
				BOTTOM_PILLARS[i] = createBottomPillar(lastPillarX);
			}
		});

		// Check collision
		// check collision with ground
		if (octtyPosY > RELATIVE_HEIGHT - GROUND_HEIGHT - OCTTY_SIZE / 2) {
			octtyIsDead = true;
		}
		BOTTOM_PILLARS.forEach((bottomPillar) => {
			if (
				// top
				(octtyPosY + OCTTY_SIZE * 0.8 > bottomPillar.top ||
					octtyPosY + OCTTY_SIZE * 0.1 < bottomPillar.top - PILLAR_GAP) &&
				// left of pillar
				OCTTY_POS_X + OCTTY_SIZE * 0.3 > bottomPillar.x - CORAL_SIZE * 0.5 &&
				// right of pillar
				OCTTY_POS_X - OCTTY_SIZE * 0.3 < bottomPillar.x + CORAL_SIZE * 0.5
			) {
				octtyIsDead = true;
			}
			if (OCTTY_POS_X > bottomPillar.x) {
				if (!bottomPillar.scored) {
					score++;
					bottomPillar.scored = true;
				}
			}
		});
		lastFrameTime = performance.now();
		requestAnimationFrame(gameLoop);
	}

	function setupGame() {
		canvas.focus();
		gameInitiated = true;
		octtyPosY = (RELATIVE_HEIGHT - GROUND_HEIGHT) * 0.5;
		score = 0;
		octtyIsDead = false;
		const columns = RELATIVE_WIDTH / (2.5 * CORAL_SIZE);
		for (let i = 0; i < columns; i++) {
			BOTTOM_PILLARS[i] = createBottomPillar(BOTTOM_PILLARS[i - 1]?.x || RELATIVE_WIDTH);
		}
		jump();
		lastFrameTime = performance.now();
		requestAnimationFrame(gameLoop);
	}

	onMount(() => {
		const context = canvas.getContext('2d');
		if (context) {
			ctx = context;
			render();
		}
	});
</script>

<div
	class="game-container"
	class:playing={gameInitiated && !octtyIsDead}
	style="width: {GAME_WIDTH}px; height: {GAME_HEIGHT}px;"
>
	<canvas
		tabindex="0"
		on:click={jump}
		on:keydown={(e) => {
			if (e.key === ' ') {
				e.preventDefault();
				jump();
			}
		}}
		bind:this={canvas}
		width={RELATIVE_WIDTH}
		height={RELATIVE_HEIGHT}
		style="width: {GAME_WIDTH}px; height: {GAME_HEIGHT}px;"
	/>
	{#if browser}
		{#if octtyIsDead}
			<div class="box flex game-stats">
				<div>
					<h1>Game over</h1>
					<hr />
				</div>
				<div>
					<p class="game-score">Score: {score}</p>
					<p class="game-high-score">Highscore: {highScore}</p>
				</div>
				<div>
					<button class="center game-restart" on:click={setupGame}>Restart</button>
				</div>
			</div>
		{/if}
		{#if !gameInitiated}
			<div class="box flex game-stats">
				<div>
					<h1>Octty Jump</h1>
					<hr />
				</div>
				<div>
					<p>Use the spacebar or click to jump</p>
				</div>
				<div>
					<button class="center game-start" on:click={setupGame}>Start</button>
				</div>
			</div>
		{/if}
	{/if}
</div>

<style>
	.game-container {
		position: relative;
	}
	canvas {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-tap-highlight-color: transparent;
		user-select: none;
	}
	.playing canvas {
		cursor: pointer;
	}
	canvas:focus {
		outline: none;
	}

	.game-stats {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 180px;
		gap: var(--gap);
	}
</style>
