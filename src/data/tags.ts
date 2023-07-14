export type Tag = {
	name: string;
	slug: string;
};

const TAGS: Readonly<Tag>[] = [
	{ slug: 'sveltekit', name: 'SvelteKit' },
	{ slug: 'svelte', name: 'Svelte' },
	{ slug: 'games', name: 'Games' },
	{ slug: 'widget', name: 'Widget' },
	{ slug: 'web-api', name: 'Web API' },
	{ slug: 'github-actions', name: 'GitHub Actions' },
	{ slug: 'components', name: 'Components' },
	{ slug: 'tools', name: 'Tools' },
	{ slug: 'css', name: 'CSS' },
	{ slug: 'animation', name: 'Animation' },
];

export const get = (slug: string) => {
	return TAGS.find((t) => t.slug === slug);
};

export const getAll = () => {
	return [...TAGS];
};
