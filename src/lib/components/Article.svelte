<script lang="ts">
	import Image, { type ImageData } from '$lib/components/Image.svelte';

	export let title: string;
	export let image: ImageData | undefined = undefined;
	export let imageColor: string | undefined = undefined;

	const heroImageSize = `
		(min-width: 1024px)	688px,
		(min-width: 769px) calc(100vw - 336px),
		calc(100vw - 16px)
	`;
</script>

<article>
	{#if image}
		<div class="hero">
			<Image
				alt=""
				role="presentation"
				src={image}
				sizes={heroImageSize}
				aspectRatio="3/1"
				background={imageColor}
			/>
			<h2>{title}</h2>
		</div>
	{:else}
		<h2>{title}</h2>
	{/if}
	<slot />
</article>
