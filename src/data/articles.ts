import {
	minesweeperHeroImage,
	floppyOcctyHeroImage,
	soundboardHeroImage,
	breathingHeroImage,
	shadovoProfileImage,
} from '$data/images';
import { get as getTag, type Tag } from '$data/tags';
import type { ImageData } from '$lib/components/Image.svelte';
import { notEmpty } from '$lib/utils/helpers';

export type ArticlePromo = {
	url: string;
	promotion: {
		title: string;
		description: string;
		imageData?: ImageData;
	};
	meta: {
		publishedDate?: string;
		tags: Tag[];
	};
	origin: {
		author: {
			name: string;
			profilePicture: ImageData;
		};
		publication: string;
	};
};

const ARTICLES: Readonly<ArticlePromo>[] = [
	{
		promotion: {
			title: 'Optimize images in SvelteKit',
			description: 'Optimize images in SvelteKit using vite-imagetools.',
		},
		url: `/code/components/vite-imagetools-in-sveltekit`,
		meta: {
			tags: [getTag('sveltekit'), getTag('components')].filter(notEmpty),
			publishedDate: '2023-04-09',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: shadovoProfileImage,
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
			tags: [getTag('github-actions'), getTag('sveltekit')].filter(notEmpty),
			publishedDate: '2023-04-02',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: shadovoProfileImage,
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
			tags: [getTag('web-api'), getTag('svelte')].filter(notEmpty),
			publishedDate: '2023-03-22',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: shadovoProfileImage,
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
			tags: [getTag('games'), getTag('widget'), getTag('svelte')].filter(notEmpty),
			publishedDate: '2023-03-28',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: shadovoProfileImage,
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
			tags: [getTag('widget'), getTag('svelte')].filter(notEmpty),
			publishedDate: '2023-03-07',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: shadovoProfileImage,
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
			tags: [getTag('games'), getTag('widget'), getTag('svelte')].filter(notEmpty),
			publishedDate: '2023-02-24',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: shadovoProfileImage,
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
			tags: [getTag('svelte'), getTag('components')].filter(notEmpty),
			publishedDate: '2022-08-20',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: shadovoProfileImage,
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
			tags: [getTag('css'), getTag('animation')].filter(notEmpty),
			publishedDate: '2022-08-13',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: shadovoProfileImage,
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
			tags: [getTag('css'), getTag('animation')].filter(notEmpty),
			publishedDate: '2022-08-13',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: shadovoProfileImage,
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
			tags: [getTag('github-actions')].filter(notEmpty),
			publishedDate: '2022-08-11',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: shadovoProfileImage,
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
			tags: [getTag('svelte'), getTag('components')].filter(notEmpty),
			publishedDate: '2022-08-11',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: shadovoProfileImage,
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
			tags: [getTag('svelte'), getTag('components')].filter(notEmpty),
			publishedDate: '2022-08-08',
		},
		origin: {
			author: {
				name: 'Oscar',
				profilePicture: shadovoProfileImage,
			},
			publication: 'Svelper',
		},
	},
];

export const getAll = () => {
	return [...ARTICLES];
};

export const getAllByTag = (tagSlug: string) => {
	return ARTICLES.filter((article) => article.meta.tags.some((tag) => tag.slug === tagSlug));
};
