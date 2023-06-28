<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	export let data;
	let { articles } = data;
</script>

<svelte:head>
	<title>Code tips and tricks for Svelte, CSS and web development in general - Svelper</title>
	<meta
		name="description"
		content="Tips and tricks for Svelte, CSS and web development in general."
	/>
</svelte:head>

<section>
	{#each articles as article}
		<ArticleCard {article} />
	{/each}
</section>

<style lang="scss">
</style>
