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

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		gap: var(--gap-2);
		padding: var(--gap-2);
		background-color: var(--c-background);
		border-radius: var(--gap);
		box-shadow: 0 0 10px rgba(var(--c-background-rgb), 0.4);
		height: 100%;
		max-width: 860px;
		margin: var(--gap-2) auto;

		& > :global(*:not(:last-child)) {
			border-bottom: 1px solid var(--c-text);
			padding-bottom: var(--gap-2);
		}

		& :global(section > p + p) {
			margin-top: var(--gap-2);
		}
	}

	h2 {
		font-size: 1.5rem;
		width: 100%;
		margin: 0;
		padding: 0;
		border: none;
	}

	.hero {
		padding: 0;
		margin: calc(-1 * var(--gap-2)) calc(-1 * var(--gap-2)) calc(-1 * var(--gap-half));
		position: relative;
		aspect-ratio: 3 / 1;
		overflow: hidden;
		border-radius: var(--gap) var(--gap) 0 0;
		border-bottom: none;

		img {
			width: 100%;
			height: auto;
			position: absolute;
		}

		h2 {
			position: absolute;
			color: white;
			bottom: 0;
			padding: var(--gap-2) var(--gap-2) calc(var(--gap-half) + 2px);
			font-size: 2rem;
			margin: 0;
			margin-bottom: -2px;
			width: 100%;
			background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);
		}
	}

	@media (max-width: 768px) {
		article {
			padding: var(--gap);
		}

		h2 {
			font-size: 1.4rem;
		}
		.hero {
			margin: calc(-1 * var(--gap)) calc(-1 * var(--gap)) var(--gap);
			h2 {
				padding-left: var(--gap);
			}
		}
	}
</style>
