<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import ArticleGrid from '$lib/components/ArticleGrid.svelte';

	const articles = [
		{
			title: 'Optimize images in SvelteKit',
			description: 'Optimize images in SvelteKit using vite-imagetools.',
			imageColor: '#0f353a',
			link: '/components/vite-imagetools-in-sveltekit',
			tags: ['SvelteKit', 'Components'],
		},
		{
			title: 'Syntax highlighting',
			description: 'Syntax highlighting component for Svelte.',
			imageColor: '#0f353a',
			link: '/components/syntax-highlighting',
			tags: ['Svelte', 'Components'],
		},
		{
			title: 'Changed SvelteKit Paths',
			description:
				'Using GitHub actions to find all paths in SvelteKit affected by changes in a PR.',
			imageColor: '#6b3b19',
			link: '/github-actions/changed-sveltekit-paths',
			tags: ['GitHub Actions', 'SvelteKit'],
		},
		{
			title: 'Pagination component',
			description: 'A pagination component for Svelte.',
			imageColor: '#6b3b19',
			link: '/components/pagination',
			tags: ['Svelte', 'Components'],
		},
		{
			title: 'Animation annoying bounce',
			description: 'Annimation designed to keep annoying the user to take action.',
			imageColor: '#0f353a',
			link: '/animations/annoying-bounce',
			tags: ['CSS', 'Animations'],
		},
		{
			title: 'Deploy Github Page',
			description: 'Building and deploy to Github Pages from a Github Action.',
			imageColor: '#0f353a',
			link: '/github-actions/gh-pages',
			tags: ['GitHub Actions'],
		},
		{
			title: 'Dialog component',
			description: 'A dialog component for Svelte.',
			imageColor: '#0f353a',
			link: '/components/dialog',
			tags: ['Svelte', 'Components'],
		},
		{
			title: 'Animation attention shake',
			description: 'Animation to grab the users attention based on an event.',
			imageColor: '#6b3b19',
			link: '/animations/attention-shake',
			tags: ['CSS', 'Animations'],
		},
	];
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
