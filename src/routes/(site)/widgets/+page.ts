import type { ArticlePromo } from '$lib/types/ArticlePromo';
import type { PageLoad } from '../$types';

export const prerender = false;
export const ssr = true;

export const load = (async ({ fetch }) => {
	const articleRequest = await fetch('/api/feed?tag=Widget');
	const articles = (await articleRequest.json()) as ArticlePromo[];

	return {
		articles,
	};
}) satisfies PageLoad;
