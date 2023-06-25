<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import { relativeTimeFromDates } from '$lib/utils/dates';
	import type { ArticlePromo } from '$lib/types/ArticlePromo';

	export let article: ArticlePromo;

	const imageSize = `
		(min-width: 768px)	650px,
		(min-width: 516px) 500px,
		calc(100vw - 16px)
	`;
</script>

<a class="card" href={article.url}>
	{#if article.promotion.imageData}
		<div class="preview">
			<Image
				src={article.promotion.imageData}
				alt={article.promotion.title}
				sizes={imageSize}
				aspectRatio="3 / 1"
			/>
		</div>
	{/if}
	<div class="content">
		<img width="100%" src={article.origin.author.profilePicture} alt="" />
		<div class="text">
			<div class="top-row">
				{#if article.origin.author}
					<span class="author"
						><strong>{article.origin.author.name}</strong
						>{#if article.origin.publication !== article.origin.author.name}<span
								class="publication">{' @ ' + article.origin.publication}</span
							>{/if}</span
					>
					{#if article.meta.publishedDate}
						<span class="date" title={article.meta.publishedDate}
							>{relativeTimeFromDates(new Date(article.meta.publishedDate))}</span
						>
					{/if}
				{/if}
			</div>
			<div>
				<h2 style:margin={0}>{article.promotion.title}</h2>
			</div>

			<p class="description">{article.promotion.description}</p>
			<div class="tags">
				{#each article.meta.tags as tag}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		</div>
	</div>
</a>

<style lang="scss">
	.card {
		display: flex;
		flex-direction: column;
		background-color: var(--surface-1);
		border-radius: var(--gap);
		height: 100%;
		width: calc(100% - var(--gap));
		max-width: 650px;
		margin: var(--gap-3) auto;
		overflow: hidden;
		color: var(--c-text);
		text-decoration: none;
		font-weight: var(--font-weight-normal);

		&:hover {
			text-decoration: none;

			h2 {
				text-decoration: underline;
			}
		}
	}

	.preview {
		margin: calc(-1 * var(--gap-3));
		margin-bottom: 0;
	}

	.content {
		display: grid;
		grid-template-columns: 80px 1fr;
		gap: var(--gap-2);
		padding: var(--gap-3);
	}

	.text {
		/* padding: var(--gap-2); */
		display: grid;
		gap: var(--gap);
	}
	.top-row {
		display: flex;
		justify-content: space-between;
	}

	.date {
		color: var(--c-text-2);
		font-weight: var(--font-weight-light);

		&::after {
			content: '';
			display: block;
			clear: both;
		}
	}

	.publication {
		font-weight: var(--font-weight-light);
		color: var(--c-text-2);
	}

	h2 {
		margin: 0;
		font-size: 1.5em;
		font-weight: 500;
		line-height: 1.6;
		font-weight: var(--font-weight-light);
		text-wrap: balance;
	}

	.description {
		max-width: 60ch;
		text-wrap: balance;
		color: var(--c-text-2);
	}

	.tags {
		display: flex;
		margin: var(--gap-half) 0 0;
		gap: var(--gap-half);
	}

	.tag {
		background: var(--surface-3);
		color: var(--c-text);
		padding: 0.3em 0.7em;
		border-radius: 1em;
		font-weight: var(--font-weight-light);
		font-size: 0.8em;
	}

	@media (width < 768px) {
		.card {
			max-width: 500px;
			margin: var(--gap) auto;
		}
		.content {
			padding: var(--gap);
			grid-template-columns: 60px 1fr;
			gap: var(--gap);
		}
		.text {
			gap: var(--gap-half);
			font-size: 0.9em;
		}
		.top-row {
			flex-direction: column;
		}
		.description {
			line-height: 1.4;
		}
	}
</style>
