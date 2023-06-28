import type { ArticlePromo } from '$lib/types/ArticlePromo';
import minesweeperHeroImage from '$img/games/minesweeper.png?w=2400;1600;1200;800;400&imagetools';
import floppyOcctyHeroImage from '$img/games/floppy-octty.png?w=2400;1600;1200;800;400&imagetools';
import soundboardHeroImage from '$img/tools/soundboard.png?w=2400;1600;1200;800;400&imagetools';
import breathingHeroImage from '$img/tools/breath.png?w=2400;1600;1200;800;400&imagetools';

const articles: ArticlePromo[] = [
	{
		promotion: {
			title: 'Optimize images in SvelteKit',
			description: 'Optimize images in SvelteKit using vite-imagetools.',
		},
		url: `/code/components/vite-imagetools-in-sveltekit`,
		meta: {
			tags: ['SvelteKit', 'Components'],
			publishedDate: '2023-04-09',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: '/images/shadovo-profile.png',
			},
			publication: 'Svelper',
		},
	},
	{
		promotion: {
			title: 'Changed SvelteKit Paths',
			description:
				'Using GitHub actions to find all paths in SvelteKit affected by changes in a PR.',
		},
		url: `/code/github-actions/changed-sveltekit-paths`,
		meta: {
			tags: ['GitHub Actions', 'SvelteKit'],
			publishedDate: '2023-04-02',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: '/images/shadovo-profile.png',
			},
			publication: 'Svelper',
		},
	},
	{
		promotion: {
			title: 'Soundboard',
			description: 'Using the Web Audio API to create a soundboard.',
			imageData: soundboardHeroImage,
		},
		url: `/tools/soundboard`,
		meta: {
			tags: ['Web API', 'Svelte'],
			publishedDate: '2023-03-22',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: '/images/shadovo-profile.png',
			},
			publication: 'Svelper',
		},
	},
	{
		promotion: {
			title: 'Floppy Octty',
			description: 'Underwater adventure in the spirrit of Flappy Bird.',
			imageData: floppyOcctyHeroImage,
		},
		url: `/games/floppy-octty`,
		meta: {
			tags: ['Game', 'Widget', 'Svelte'],
			publishedDate: '2023-03-28',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: '/images/shadovo-profile.png',
			},
			publication: 'Svelper',
		},
	},
	{
		promotion: {
			title: 'Breathing technique',
			description: 'A breathing technique to help you relax built in Svelte.',
			imageData: breathingHeroImage,
		},
		url: `/tools/breath`,
		meta: {
			tags: ['Widget', 'Svelte'],
			publishedDate: '2023-03-07',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: '/images/shadovo-profile.png',
			},
			publication: 'Svelper',
		},
	},
	{
		promotion: {
			title: 'Minesweepery',
			description: 'The classic game minesweeper as Svelte component.',
			imageData: minesweeperHeroImage,
		},
		url: `/games/minesweeper`,
		meta: {
			tags: ['Game', 'Widget', 'Svelte'],
			publishedDate: '2023-02-24',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: '/images/shadovo-profile.png',
			},
			publication: 'Svelper',
		},
	},
	{
		promotion: {
			title: 'Pagination component',
			description: 'A pagination component for Svelte.',
		},
		url: `/code/components/pagination`,
		meta: {
			tags: ['Svelte', 'Components'],
			publishedDate: '2022-08-20',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: '/images/shadovo-profile.png',
			},
			publication: 'Svelper',
		},
	},
	{
		promotion: {
			title: 'Animation annoying bounce',
			description: 'Annimation designed to keep annoying the user to take action.',
		},
		url: `/code/animations/annoying-bounce`,
		meta: {
			tags: ['CSS', 'Animations'],
			publishedDate: '2022-08-13',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: '/images/shadovo-profile.png',
			},
			publication: 'Svelper',
		},
	},
	{
		promotion: {
			title: 'Animation attention shake',
			description: 'Animation to grab the users attention based on an event.',
		},
		url: `/code/animations/attention-shake`,
		meta: {
			tags: ['CSS', 'Animations'],
			publishedDate: '2022-08-13',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: '/images/shadovo-profile.png',
			},
			publication: 'Svelper',
		},
	},
	{
		promotion: {
			title: 'Deploy Github Page',
			description: 'Building and deploy to Github Pages from a Github Action.',
		},
		url: `/code/github-actions/gh-pages`,
		meta: {
			tags: ['GitHub Actions'],
			publishedDate: '2022-08-11',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: '/images/shadovo-profile.png',
			},
			publication: 'Svelper',
		},
	},
	{
		promotion: {
			title: 'Syntax highlighting',
			description: 'Syntax highlighting component for Svelte.',
		},
		url: `/code/components/syntax-highlighting`,
		meta: {
			tags: ['Svelte', 'Components'],
			publishedDate: '2022-08-11',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: '/images/shadovo-profile.png',
			},
			publication: 'Svelper',
		},
	},
	{
		promotion: {
			title: 'Dialog component',
			description: 'A dialog component for Svelte.',
		},
		url: `/code/components/dialog`,
		meta: {
			tags: ['Svelte', 'Components'],
			publishedDate: '2022-08-08',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: '/images/shadovo-profile.png',
			},
			publication: 'Svelper',
		},
	},
];

export function GET({ url }) {
	const tag = url.searchParams.get('tag');
	const articlesWithTag = tag
		? articles.filter((article) => article.meta.tags.includes(tag))
		: articles;
	return new Response(JSON.stringify(articlesWithTag));
}
