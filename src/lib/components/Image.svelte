<script lang="ts">
	interface ImageSource {
		src: string;
		w: number;
	}

	interface ImageSources {
		[format: string]: ImageSource[];
	}

	interface Image {
		fallback: ImageSource;
		sources: ImageSources;
	}

	export let src: Image;
	export let alt: string;
	export let aspectRatio: string;
</script>

<picture style="width: 100%; aspect-ratio:{aspectRatio}">
	{#each Object.entries(src.sources) as [format, images]}
		<source srcset={images.map((i) => `${i.src} ${i.w}w`).join(', ')} type={'image/' + format} />
	{/each}
	<img style="width: 100%; aspect-ratio:{aspectRatio}" src={src.fallback.src} {alt} />
</picture>

<style>
	picture {
		display: flex;
	}
	img {
		width: 100%;
	}
</style>
