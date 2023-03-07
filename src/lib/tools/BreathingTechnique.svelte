<script lang="ts">
	import { browser } from '$app/environment';
	import { tweened } from 'svelte/motion';
	import { fade, fly } from 'svelte/transition';

	type BreathConfig = {
		duration: number;
		value: number;
		vibrationPattern: number[];
	};

	const BREATH_DELAY = 500;

	const BREATH_IN_CONFIG: BreathConfig = {
		duration: 4000,
		value: 1,
		vibrationPattern: [200, 100, 200],
	};

	const BREATH_OUT_CONFIG: BreathConfig = {
		duration: 6000,
		value: 0,
		vibrationPattern: [200],
	};

	let directionIsIn: boolean = false;
	let running: boolean = false;
	let breathTimeout: NodeJS.Timeout;

	let breath = tweened(0, {
		duration: BREATH_OUT_CONFIG.duration,
		delay: 0,
	});

	function toggleDirection() {
		let currentConfig = directionIsIn ? BREATH_OUT_CONFIG : BREATH_IN_CONFIG;
		if (browser) {
			window.navigator?.vibrate?.(currentConfig.vibrationPattern);
		}
		breath.set(currentConfig.value, {
			duration: currentConfig.duration,
			delay: BREATH_DELAY,
		});
		directionIsIn = !directionIsIn;
		breathTimeout = setTimeout(toggleDirection, currentConfig.duration + BREATH_DELAY);
	}

	function stopTimout() {
		clearTimeout(breathTimeout);
		breath.set($breath, {
			delay: 0,
			duration: 0,
		});
	}

	$: {
		if (running) {
			toggleDirection();
		} else {
			stopTimout();
		}
	}
</script>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="outer" on:click={() => (running = !running)}>
		{#if !running}
			<p transition:fade class="direction">START</p>
		{:else if directionIsIn}
			<p transition:fly={{ y: -100, duration: 2000 }} class="direction">IN</p>
		{:else}
			<p transition:fly={{ y: 100, duration: 2000 }} class="direction">OUT</p>
		{/if}
		<div class="inner" style="transform: scale({$breath})" />
	</div>
</div>

<style lang="scss">
	.outer {
		position: relative;
		width: 300px;
		height: 300px;
		border-radius: 50%;
		border: 1px solid var(--c-text);
		margin: 0 auto;
		cursor: pointer;
		overflow: hidden;
	}
	.inner {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background-color: white;
		margin: 0 auto;
		pointer-events: none;
		mix-blend-mode: difference;
	}
	.direction {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 5rem;
		pointer-events: none;
		user-select: none;
	}
</style>
