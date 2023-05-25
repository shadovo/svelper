<script lang="ts" context="module">
	import type { ImageData } from '$lib/components/Image.svelte';

	export type ArticleData = {
		title: string;
		description: string;
		link: string;
		image: ImageData;
		imageColor: string | undefined;
	};

	const imageSizes = `
		(min-width: 1024px)	312px,
		(min-width: 769px)	calc((100vw - 388px) / 2),
		(min-width: 481px)	calc(50vw - 28px),
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
				<Image
					alt=""
					role="presentation"
					background={article.imageColor}
					src={article.image}
					sizes={imageSizes}
					aspectRatio="3/1"
				/>
			</div>
			<h3>{article.title}</h3>
			<p>{article.title}</p>
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
		background: var(--c-table-row);
		display: flex;
		flex-direction: column;
		height: 100%;
		text-decoration: none;
		color: var(--color-text);
		transform-origin: center;

		&:hover {
			transform: scale(1.02);
			box-shadow: 0 3px 6px 1px rgb(0, 0, 0, 0.3);
		}

		> .img {
			margin: calc(-1 * var(--gap));
			margin-bottom: var(--gap);
			padding: 0;
		}

		h3 {
			margin-bottom: 0.5rem;
			font-weight: bold;
		}
		p {
			font-weight: normal;
		}
	}

	@media (max-width: 480px) {
		.grid {
			grid-template-columns: repeat(1, minmax(200px, 1fr));
		}
	}
</style>
