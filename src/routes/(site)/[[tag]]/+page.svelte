<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	export let data;
	let articles: typeof data.articles;
	// let tags: typeof data.tags;
	// let meta: typeof data.meta;

	$: articles = data.articles;
	// $: tags = data.tags;
	// $: meta = data.meta;
</script>

<svelte:head>
	<title>Code tips and tricks for Svelte, CSS and web development in general - Svelper</title>
	<meta
		name="description"
		content="Tips and tricks for Svelte, CSS and web development in general."
	/>
</svelte:head>

<div class="wrapper">
	<section>
		{#each articles as article}
			<ArticleCard {article} />
		{/each}
	</section>
</div>

<style lang="scss">
	.wrapper {
		margin: var(--gap-2) auto;
		gap: var(--gap-2);
		align-items: flex-start;
		justify-content: center;
		width: calc(100% - var(--gap));
		max-width: 650px;
		margin-bottom: var(--gap-3);
	}

	section {
		display: grid;
		gap: var(--gap-3);
	}

	@media (width < 768px) {
		.wrapper {
			margin: var(--gap) auto;
		}
	}
</style>
