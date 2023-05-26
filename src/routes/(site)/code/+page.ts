import { base } from '$app/paths';

const articles = [
	{
		title: 'Optimize images in SvelteKit',
		description: 'Optimize images in SvelteKit using vite-imagetools.',
		imageColor: '#0f353a',
		link: `${base}/code/components/vite-imagetools-in-sveltekit`,
		tags: ['SvelteKit', 'Components'],
	},
	{
		title: 'Syntax highlighting',
		description: 'Syntax highlighting component for Svelte.',
		imageColor: '#0f353a',
		link: `${base}/code/components/syntax-highlighting`,
		tags: ['Svelte', 'Components'],
	},
	{
		title: 'Changed SvelteKit Paths',
		description: 'Using GitHub actions to find all paths in SvelteKit affected by changes in a PR.',
		imageColor: '#6b3b19',
		link: `${base}/code/github-actions/changed-sveltekit-paths`,
		tags: ['GitHub Actions', 'SvelteKit'],
	},
	{
		title: 'Pagination component',
		description: 'A pagination component for Svelte.',
		imageColor: '#6b3b19',
		link: `${base}/code/components/pagination`,
		tags: ['Svelte', 'Components'],
	},
	{
		title: 'Animation annoying bounce',
		description: 'Annimation designed to keep annoying the user to take action.',
		imageColor: '#0f353a',
		link: `${base}/code/animations/annoying-bounce`,
		tags: ['CSS', 'Animations'],
	},
	{
		title: 'Deploy Github Page',
		description: 'Building and deploy to Github Pages from a Github Action.',
		imageColor: '#0f353a',
		link: `${base}/code/github-actions/gh-pages`,
		tags: ['GitHub Actions'],
	},
	{
		title: 'Dialog component',
		description: 'A dialog component for Svelte.',
		imageColor: '#0f353a',
		link: `${base}/code/components/dialog`,
		tags: ['Svelte', 'Components'],
	},
	{
		title: 'Animation attention shake',
		description: 'Animation to grab the users attention based on an event.',
		imageColor: '#6b3b19',
		link: `${base}/code/animations/attention-shake`,
		tags: ['CSS', 'Animations'],
	},
];

export function load() {
	return {
		articles,
	};
}
