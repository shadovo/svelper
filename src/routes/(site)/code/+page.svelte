<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import ArticleGrid from '$lib/components/ArticleGrid.svelte';

	export let data;
	let { articles } = data;
</script>

<svelte:head>
	<title>Games built in Svelte - Svelper</title>
	<meta name="description" content="A collection games built with Svelte." />
</svelte:head>

<Article title="Code">
	<section>
		<ArticleGrid {articles} />
	</section>
</Article>
