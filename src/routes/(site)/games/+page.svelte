<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import ArticleGrid from '$lib/components/ArticleGrid.svelte';
	// import hardbreadHeroImage from '$img/games/hardbread.png?w=1098;936;750;732;624;500;366;312;275;250&imagetools';
	import minesweeperHeroImage from '$img/games/minesweeper.png?w=1098;936;750;732;624;500;366;312;275;250&imagetools';
	import floppyOcctyHeroImage from '$img/games/floppy-octty.png?w=1098;936;750;732;624;500;366;312;275;250&imagetools';

	const articles = [
		// {
		// 	title: 'Hardbread delivery',
		// 	description: 'Balance the ship as long as you can before it capsizes.',
		// 	image: hardbreadHeroImage,
		// 	imageColor: '#0f353a',
		// 	link: '/games/hardbread-ship',
		// },
		{
			title: 'Floppy Octty',
			description: 'Underwater version of the classic Flappy Bird game.',
			image: floppyOcctyHeroImage,
			imageColor: '#0f353a',
			link: '/games/floppy-octty',
		},
		{
			title: 'Minesweeper',
			description: 'The classic game Minesweeper as Svelte component.',
			image: minesweeperHeroImage,
			imageColor: '#6b3b19',
			link: '/games/minesweeper',
		},
	];
</script>

<svelte:head>
	<title>Games built in Svelte - Svelper</title>
	<meta name="description" content="A collection games built with Svelte." />
</svelte:head>

<Article title="Tools built in Svelte">
	<section class="content-width">
		<ArticleGrid {articles} />
	</section>
</Article>
