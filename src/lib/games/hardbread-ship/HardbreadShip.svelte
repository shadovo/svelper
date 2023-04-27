<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import Image from '$lib/components/Image.svelte';
	import waterImage from './assets/hardbread-water.png?w=1024&imagetools';
	import shipImage from './assets/hardbread-ship.png?w=333&imagetools';
	import backgroundImage from './assets/hardbread-background.png?w=1024&imagetools';

	const heroImageSize = `
		(min-width: 1024px)	688px,
		(min-width: 769px) calc(100vw - 336px),
		calc(100vw - 16px)
	`;

	let gameRef: HTMLDivElement;
	let gameScale = 1;

	// let lean = tweened(30, {
	// 	duration: 3000,
	// });

	let lean = 0;

	function handleOrientation(event: DeviceOrientationEvent) {
		// const absolute = event.absolute;
		// const alpha = event.alpha;
		// const beta = event.beta;
		// const gamma = event.gamma;
		lean = event.gamma || 0;

		// Do stuff with the new orientation data
		console.log('orientation', event);
	}

	onMount(() => {
		// console.log('on mount');
		// const updateLeanInterval = setInterval(() => {
		// 	console.log('update lean');
		// 	lean.update((v) => -1 * v);
		// }, 3000);
		// return () => {
		// 	console.log('on destroy');
		// 	clearInterval(updateLeanInterval);
		// };
		console.log(gameRef.parentElement?.clientWidth);
		gameScale = (gameRef.parentElement?.clientWidth || 512) / 512;

		window.addEventListener('deviceorientation', handleOrientation, true);
	});
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

	<div class="ship" style="transform: rotate({lean}deg)">
		<Image
			alt=""
			role="presentation"
			src={shipImage}
			sizes={heroImageSize}
			aspectRatio="333/590"
			background="transparent"
		/>
	</div>

	<div class="water">
		<Image
			alt=""
			role="presentation"
			src={waterImage}
			sizes={heroImageSize}
			aspectRatio="1024/238"
			background="transparent"
		/>
	</div>
</div>

<style>
	.game {
		width: 512px;
		height: 512px;
		position: relative;
		transform-origin: top left;
	}
	.water,
	.ship,
	.background {
		position: absolute;
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
