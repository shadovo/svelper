<script lang="ts">
	import type { Picture } from 'vite-imagetools';

	interface Props {
		src: Picture;
		alt: string;
		aspectRatio: string;
		sizes: string;
		background?: string;
		loading?: 'eager' | 'lazy';
		role?: string;
	}

	let { src, alt, aspectRatio, sizes, background = 'transparent', loading = 'eager', role }: Props = $props();
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
