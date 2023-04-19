<script lang="ts" context="module">
	interface ImageSource {
		src: string;
		w: number;
	}

	interface ImageSources {
		[format: string]: ImageSource[];
	}

	export interface ImageData {
		fallback: ImageSource;
		sources: ImageSources;
	}
</script>

<script lang="ts">
	export let src: ImageData;
	export let alt: string;
	export let aspectRatio: string;
	export let sizes: string;
	export let background = 'transparent';
	export let loading: 'eager' | 'lazy' = 'eager';
	export let role: string | undefined = undefined;
</script>

<picture style="width: 100%; aspect-ratio:{aspectRatio}; background-color: {background}">
	{#each Object.entries(src.sources) as [format, images]}
		<source
			srcset={images.map((i) => `${i.src} ${i.w}w`).join(', ')}
			type={'image/' + format}
			{sizes}
		/>
	{/each}
	<img
		style="width: 100%; aspect-ratio:{aspectRatio}"
		src={src.fallback.src}
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
