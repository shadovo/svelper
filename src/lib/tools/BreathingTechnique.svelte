<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { fade, fly } from 'svelte/transition';

	type BreathConfig = {
		duration: number;
		delay: number;
	};

	type BreathValues = BreathConfig & {
		value: number;
		vibrationPattern: number[];
	};

	const DEFAULT_BREATH_IN_CONFIG: BreathValues = {
		duration: 4000,
		delay: 700,
		value: 1,
		vibrationPattern: [200, 100, 200],
	};

	const DEFAULT_BREATH_OUT_CONFIG: BreathValues = {
		duration: 6000,
		delay: 700,
		value: 0,
		vibrationPattern: [200],
	};

	export let breathInConfig: BreathConfig = DEFAULT_BREATH_IN_CONFIG;
	export let breathOutConfig: BreathConfig = DEFAULT_BREATH_OUT_CONFIG;

	let breathInValues: BreathValues = {
		...DEFAULT_BREATH_IN_CONFIG,
		...breathInConfig,
	};

	let breathOutValues: BreathValues = {
		...DEFAULT_BREATH_OUT_CONFIG,
		...breathOutConfig,
	};

	let directionIsIn: boolean = false;
	let running: boolean = false;
	let hold: boolean = false;
	let breathTimeout: NodeJS.Timeout;
	let delayTimeout: NodeJS.Timeout;

	let breath = tweened(0, {
		duration: breathOutConfig.duration,
		delay: 0,
	});

	function toggleDirection() {
		let currentConfig = directionIsIn ? breathOutValues : breathInValues;
		if (currentConfig.delay >= 1500) {
			hold = true;
			window.navigator?.vibrate?.([600]);
			delayTimeout = setTimeout(() => {
				hold = false;
				if (browser) {
					window.navigator?.vibrate?.(currentConfig.vibrationPattern);
				}
			}, currentConfig.delay);
		} else {
			if (browser) {
				window.navigator?.vibrate?.(currentConfig.vibrationPattern);
			}
		}
		breath.set(currentConfig.value, {
			duration: currentConfig.duration,
			delay: currentConfig.delay,
		});
		directionIsIn = !directionIsIn;
		breathTimeout = setTimeout(toggleDirection, currentConfig.duration + currentConfig.delay);
	}

	function stopTimout() {
		clearTimeout(breathTimeout);
		clearTimeout(delayTimeout);
		breath.set($breath, {
			delay: 0,
			duration: 0,
		});
	}

	$: {
		breathInValues = {
			...DEFAULT_BREATH_IN_CONFIG,
			...breathInConfig,
		};
		breathOutValues = {
			...DEFAULT_BREATH_OUT_CONFIG,
			...breathOutConfig,
		};
	}

	$: {
		if (running) {
			toggleDirection();
		} else {
			stopTimout();
		}
	}

	onDestroy(() => {
		stopTimout();
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="outer" on:click={() => (running = !running)}>
	{#if !running}
		<p transition:fade class="direction">START</p>
	{:else if hold}
		<p
			in:fly={{ y: directionIsIn ? -100 : 100, duration: 2000 }}
			out:fly={{ y: directionIsIn ? 100 : -100, duration: 2000 }}
			class="direction"
		>
			HOLD
		</p>
	{:else if directionIsIn}
		<p transition:fly={{ y: -100, duration: 2000 }} class="direction">IN</p>
	{:else}
		<p transition:fly={{ y: 100, duration: 2000 }} class="direction">OUT</p>
	{/if}
	<div class="inner" style="transform: scale({$breath})" />
</div>

<style lang="scss">
	.outer {
		position: relative;
		width: 300px;
		height: 300px;
		border-radius: 50%;
		border: 1px solid var(--c-text);
		margin: var(--gap) auto;
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
