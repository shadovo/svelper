<script module lang="ts">
	export type BreathConfig = { duration: number; delay: number };
</script>

<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { fade, fly } from 'svelte/transition';
	import createSoundboard from '../utils/audio/soundboard';

	type BreathAlert = { vibrationPattern: number[]; soundPattern: string[][] };

	type BreathValues = BreathConfig & BreathAlert & { value: number };

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

	interface Props {
		breathInConfig?: BreathConfig;
		breathOutConfig?: BreathConfig;
		sound?: boolean;
		vibration?: boolean;
	}

	let {
		breathInConfig = DEFAULT_BREATH_IN_CONFIG,
		breathOutConfig = DEFAULT_BREATH_OUT_CONFIG,
		sound = true,
		vibration = true,
	}: Props = $props();

	let soundBoard = createSoundboard();

	let breathInValues: BreathValues = $derived({ ...DEFAULT_BREATH_IN_CONFIG, ...breathInConfig });

	let breathOutValues: BreathValues = $derived({
		...DEFAULT_BREATH_OUT_CONFIG,
		...breathOutConfig,
	});

	let directionIsIn = $state(false);
	let running = $state(false);
	let hold = $state(false);
	let breathTimeout: ReturnType<typeof setTimeout>;
	let delayTimeout: ReturnType<typeof setTimeout>;

	let breath = tweened(0, { duration: breathOutConfig.duration, delay: 0 });

	function changeAlert(config: BreathAlert) {
		if (vibration) {
			window.navigator?.vibrate?.(config.vibrationPattern);
		}
		if (sound) {
			config.soundPattern.forEach((chord, i) => soundBoard.playNotes(chord, 2, i * 0.3));
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
		breath.set($breath, { delay: 0, duration: 0 });
	}

	function handleClick() {
		running = !running;
		if (running) {
			toggleDirection();
		} else {
			stopTimout();
		}
	}

	$effect(() => {
		return () => {
			stopTimout();
			soundBoard.destroy();
		};
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="outer" onclick={handleClick}>
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
	<div class="inner" style="transform: scale({$breath})"></div>
</div>

<style lang="scss">
	.outer {
		position: relative;
		width: 300px;
		max-width: 100%;
		aspect-ratio: 1;
		border-radius: 50%;
		border: 1px solid var(--c-text);
		background-color: var(--surface-1);
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
