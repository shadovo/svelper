import {
	minesweeperHeroImage,
	floppyOcctyHeroImage,
	soundboardHeroImage,
	breathingHeroImage,
	shadovoProfileImage,
} from './images';
import { get as getTag, type Tag } from './tags';
import { notEmpty } from '$lib/utils/helpers';
import type { Picture } from 'vite-imagetools';

export type ArticlePromo = {
	url: string;
	promotion: {
		title: string;
		description: string;
		imageData?: Picture;
	};
	meta: {
		publishedDate?: string;
		tags: Tag[];
	};
	origin: {
		author: {
			name: string;
			profilePicture: Picture;
		};
		publication: string;
	};
};

const ARTICLES: Readonly<ArticlePromo>[] = [
	{
		promotion: {
			title: 'Using vite-imagetools with SvelteKit',
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
			title: 'Affected SvelteKit paths in PR',
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
			tags: [getTag('games'), getTag('widgets'), getTag('svelte')].filter(notEmpty),
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
			title: 'Breathing timer',
			description: 'A breathing technique to help you relax built in Svelte.',
			imageData: breathingHeroImage,
		},
		url: `/tools/breath`,
		meta: {
			tags: [getTag('widgets'), getTag('svelte')].filter(notEmpty),
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
			title: 'Minesweeper',
			description: 'The classic game minesweeper as Svelte component.',
			imageData: minesweeperHeroImage,
		},
		url: `/games/minesweeper`,
		meta: {
			tags: [getTag('games'), getTag('widgets'), getTag('svelte')].filter(notEmpty),
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
			title: 'Pagination Svelte component',
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
			title: 'Annoying bounce animation',
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
			title: 'Attention shake animation',
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
			title: 'Deploy npm build output to GitHub pages',
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
			title: 'Component with syntax highlighting',
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
			title: 'Dialog implementation as Svelte component',
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
