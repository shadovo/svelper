<script lang="ts" context="module">
	import type { ImageData } from '$lib/components/Image.svelte';

	export type ArticleData = {
		title: string;
		description: string;
		link: string;
		image?: ImageData;
		imageColor: string | undefined;
		tags?: string[];
	};

	const imageSizes = `
		(min-width: 816px)	368px,
		(min-width: 481px)	calc(50vw - 32px),
		calc(100vw - 48px)`;
</script>

<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	export let articles: ArticleData[];
</script>

<div class="grid">
	{#each articles as article}
		<a class="card" href={article.link}>
			<div class="img">
				{#if article.image}
					<Image
						alt=""
						role="presentation"
						background={article.imageColor}
						src={article.image}
						sizes={imageSizes}
						aspectRatio="3/1"
					/>
				{/if}
			</div>
			<h3>{article.title}</h3>
			<p>{article.description}</p>
			{#if article.tags}
				<div class="tag-container">
					{#each article.tags as tag}
						<span class="tag">{tag}</span>
					{/each}
				</div>
			{/if}
		</a>
	{/each}
</div>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(200px, 1fr));
		gap: var(--gap);
	}

	.card {
		background: var(--color-bg);
		box-shadow: 0 2px 3px 1px rgb(0, 0, 0, 0.3);
		padding: 1rem;
		background: var(--surface-3);
		display: flex;
		flex-direction: column;
		height: 100%;
		text-decoration: none;
		color: var(--color-text);
		transform-origin: center;
		gap: var(--gap-half);

		&:hover {
			transform: scale(1.02);
			box-shadow: 0 3px 6px 1px rgb(0, 0, 0, 0.3);
		}

		> .img {
			margin: calc(-1 * var(--gap));
			margin-bottom: 0;
			padding: 0;
		}

		h3 {
			margin: var(--gap-half) 0 0;
			font-weight: bold;
		}
		p {
			font-weight: normal;
			flex-grow: 1;
		}
	}

	.tag-container {
		display: flex;
		gap: var(--gap-half);
	}

	.tag {
		background: var(--surface-2);
		color: var(--c-text);
		padding: var(--gap-quarter) var(--gap-half);
		border-radius: 0.5rem;
		font-size: 0.75rem;
	}

	@media (width < 480px) {
		.grid {
			grid-template-columns: repeat(1, minmax(200px, 1fr));
		}
	}
</style>
