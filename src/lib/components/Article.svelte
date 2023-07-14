<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import Image from '$lib/components/Image.svelte';

	export let title: string;
	export let image: Picture | undefined = undefined;
	export let imageColor: string | undefined = undefined;

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
	<h2>{title}</h2>
	<div class="content">
		<slot />
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
		font-size: 20px;
		font-weight: var(--font-weight-light);
		color: var(--c-text-3);

		& > :global(section > p) {
			max-width: 60ch;
		}

		& :global(section > p + p) {
			margin-top: var(--gap-2);
		}
	}

	h2 {
		font-size: 2.3rem;
		width: 100%;
		margin: 0 0 var(--gap);
		padding: 0;
		border: none;
		text-wrap: balance;
		font-weight: var(--font-weight-light);
		color: var(--c-text);
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
			margin: var(--gap-half) auto var(--gap);
			font-size: 16px;
		}

		h2 {
			font-size: 1.7rem;
		}

		.hero {
			margin: calc(-1 * var(--gap)) calc(-1 * var(--gap)) var(--gap);
		}
	}
</style>
