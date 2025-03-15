<script lang="ts">
	import type { Picture } from 'vite-imagetools';

	export let src: Picture;
	export let alt: string;
	export let aspectRatio: string;
	export let sizes: string;
	export let background = 'transparent';
	export let loading: 'eager' | 'lazy' = 'eager';
	export let role: string | undefined = undefined;
</script>

<picture style="width: 100%; aspect-ratio:{aspectRatio}; background-color: {background}">
	{#each Object.entries(src.sources) as [format, srcset] (srcset)}
		<source {srcset} {sizes} type="image/{format}" />
	{/each}
	<img
		style="width: 100%; aspect-ratio:{aspectRatio}"
		src={src.img.src}
		{alt}
		{loading}
		{...role ? { role } : {}}
	/>
</picture>

<style>
	picture {
		display: flex;
	}
	img {
		width: 100%;
	}
</style>
