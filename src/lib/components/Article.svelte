<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import type { Snippet } from 'svelte';
	import Image from '$lib/components/Image.svelte';

	interface Props {
		title: string;
		image?: Picture;
		imageColor?: string;
		children?: Snippet;
	}

	let { title, image, imageColor, children }: Props = $props();

	const heroImageSize = `
		(min-width: 816px)	800px,
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
		</div>
	{/if}
	<div class="content">
		<h1>{title}</h1>
		{@render children?.()}
	</div>
</article>

<style lang="scss">
	article {
		padding: var(--gap-3);
		background-color: var(--surface-1);
		border-radius: var(--gap);
		height: 100%;
		width: calc(100% - var(--gap));
		max-width: 800px;
		margin: var(--gap-2) auto;
		overflow: hidden;
		font-size: 18px;
		font-weight: var(--font-weight-text);
		color: var(--c-text-3);

		& > :global(section > p) {
			max-width: 60ch;
		}

		& :global(section > p + p) {
			margin-top: var(--gap-2);
		}
	}

	h1 {
		width: calc(100% - var(--gap));
		max-width: 800px;
		width: 100%;
		margin: 0;
		padding: 0;
		text-wrap: balance;
		font-weight: var(--font-weight-title);
		color: var(--c-text);
		max-width: 20ch;
	}

	.hero {
		padding: 0;
		margin: calc(-1 * var(--gap-3));
		margin-bottom: var(--gap-2);
		position: relative;
		aspect-ratio: 3 / 1;
		overflow: hidden;
		border-bottom: none;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--gap-3);
	}

	@media (width < 768px) {
		article {
			padding: var(--gap);
			margin: var(--gap) auto;
			font-size: 16px;
		}

		h1 {
			font-size: 1.7rem;
		}

		.hero {
			margin: calc(-1 * var(--gap)) calc(-1 * var(--gap)) var(--gap);
		}
	}
</style>
