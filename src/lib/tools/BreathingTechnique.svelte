<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { fade, fly } from 'svelte/transition';
	import createSoundboard from '../utils/audio/sound-board';

	type BreathConfig = {
		duration: number;
		delay: number;
	};

	type BreathAlert = {
		vibrationPattern: number[];
		soundPattern: string[][];
	};

	type BreathValues = BreathConfig &
		BreathAlert & {
			value: number;
		};

	const DEFAULT_BREATH_IN_CONFIG: BreathValues = {
		duration: 4000,
		delay: 700,
		value: 1,
		vibrationPattern: [200, 100, 200],
		soundPattern: [
			['A#3', 'D3', 'F3', 'A4'],
			['D#3', 'G3', 'A#4', 'D4'],
		],
	};

	const DEFAULT_BREATH_OUT_CONFIG: BreathValues = {
		duration: 6000,
		delay: 700,
		value: 0,
		vibrationPattern: [200],
		soundPattern: [
			['D3', 'F3', 'A3', 'C4'],
			['E3', 'G#3', 'B3', 'D4'],
		],
	};

	const DEFAULT_HOLD_ALERT_CONFIG: BreathAlert = {
		vibrationPattern: [600],
		soundPattern: [['B3', 'D3', 'F3', 'A3']],
	};

	let soundBoard = createSoundboard();

	export let breathInConfig: BreathConfig = DEFAULT_BREATH_IN_CONFIG;
	export let breathOutConfig: BreathConfig = DEFAULT_BREATH_OUT_CONFIG;
	export let sound = true;
	export let vibration = true;

	let breathInValues: BreathValues = {
		...DEFAULT_BREATH_IN_CONFIG,
		...breathInConfig,
	};

	let breathOutValues: BreathValues = {
		...DEFAULT_BREATH_OUT_CONFIG,
		...breathOutConfig,
	};

	let directionIsIn = false;
	let running = false;
	let hold = false;
	let breathTimeout: ReturnType<typeof setTimeout>;
	let delayTimeout: ReturnType<typeof setTimeout>;

	let breath = tweened(0, {
		duration: breathOutConfig.duration,
		delay: 0,
	});

	function changeAlert(config: BreathAlert) {
		if (browser) {
			if (vibration) {
				window.navigator?.vibrate?.(config.vibrationPattern);
			}
			if (sound) {
				config.soundPattern.forEach((chord, i) => soundBoard.playNotes(chord, 2, i * 0.3));
			}
		}
	}

	function toggleDirection() {
		let currentConfig = directionIsIn ? breathOutValues : breathInValues;
		if (currentConfig.delay >= 1500) {
			hold = true;
			changeAlert(DEFAULT_HOLD_ALERT_CONFIG);

			delayTimeout = setTimeout(() => {
				hold = false;
				changeAlert(currentConfig);
			}, currentConfig.delay);
		} else {
			changeAlert(currentConfig);
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
		soundBoard.destroy();
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
		max-width: 100%;
		aspect-ratio: 1;
		border-radius: 50%;
		border: 1px solid var(--c-text);
		cursor: pointer;
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
		font-size: clamp(2rem, 25vw, 5rem);
		pointer-events: none;
		user-select: none;
	}
</style>
