<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import ArticleGrid from '$lib/components/ArticleGrid.svelte';
	import soundboardHeroImage from '$img/tools/soundboard.png?w=1098;936;750;732;624;500;366;312;275;250&imagetools';
	import breathHeroImage from '$img/tools/breath.png?w=1098;936;750;732;624;500;366;312;275;250&imagetools';

	const articles = [
		{
			title: 'Soundboard',
			description: 'Soundboard with WebAudio API.',
			image: soundboardHeroImage,
			imageColor: '#1d6a64',
			link: '/tools/soundboard',
		},
		{
			title: 'Breathing technique',
			description: 'Breathing timer as Svelte component.',
			image: breathHeroImage,
			imageColor: '#202b3f',
			link: '/tools/breath',
		},
	];
</script>

<svelte:head>
	<title>Tools built in Svelte - Svelper</title>
	<meta name="description" content="A collection games built with Svelte." />
</svelte:head>

<Article title="Tools built in Svelte">
	<section class="content-width">
		<ArticleGrid {articles} />
	</section>
</Article>
