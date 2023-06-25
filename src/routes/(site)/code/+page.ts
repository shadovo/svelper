import { base } from '$app/paths';
import type { ArticlePromo } from '$lib/types/ArticlePromo';

const articles: ArticlePromo[] = [
	{
		promotion: {
			title: 'Optimize images in SvelteKit',
			description: 'Optimize images in SvelteKit using vite-imagetools.',
		},
		url: `${base}/code/components/vite-imagetools-in-sveltekit`,
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
		url: `${base}/code/github-actions/changed-sveltekit-paths`,
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
			title: 'Pagination component',
			description: 'A pagination component for Svelte.',
		},
		url: `${base}/code/components/pagination`,
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
		url: `${base}/code/animations/annoying-bounce`,
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
		url: `${base}/code/animations/attention-shake`,
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
		url: `${base}/code/github-actions/gh-pages`,
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
		url: `${base}/code/components/syntax-highlighting`,
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
		url: `${base}/code/components/dialog`,
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

export function load() {
	return {
		articles,
	};
}
