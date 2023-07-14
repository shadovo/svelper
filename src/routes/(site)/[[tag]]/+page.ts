import type { ArticlePromo } from '$data/articles.js';
import { get as getTag, type Tag } from '$data/tags';

export const prerender = false;
export const ssr = true;

export async function load({ fetch, params }) {
	const tag = params.tag;
	const currentTag = tag ? getTag(tag) : undefined;
	const fetchUrl = currentTag ? `/api/feed/${currentTag.slug}` : '/api/feed';
	const articleRequest = await fetch(fetchUrl);
	const result = await articleRequest.json();
	const articles: ArticlePromo[] = result.articles;
	const tags: { tag: Tag; count: number }[] = result.tags;

	return {
		articles,
		tags,
		meta: {
			currentTag,
		},
	};
}
