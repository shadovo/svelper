<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	export let data;
	let { articles } = data;
</script>

<svelte:head>
	<title>Widgets, tools and games built in Svelte – Svelper</title>
	<meta name="description" content="Widgets, tools and games built in Svelte." />
</svelte:head>

<section>
	{#each articles as article}
		<ArticleCard {article} />
	{/each}
</section>

<style lang="scss">
</style>
