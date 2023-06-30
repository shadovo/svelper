import type { ArticlePromo } from '$lib/types/ArticlePromo';

export const prerender = false;
export const ssr = true;

export async function load({ fetch }) {
	const articleRequest = await fetch('/api/feed?tag=Widget');
	const articles: ArticlePromo[] = await articleRequest.json();

	return {
		articles,
	};
}
