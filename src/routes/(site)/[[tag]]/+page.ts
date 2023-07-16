import type { ArticlePromo } from '../../../data/articles.js';
import { get as getTag, type Tag } from '../../../data/tags';
import type { PageLoad } from './$types';

export const prerender = false;
export const ssr = true;

export const load = (async ({ fetch, params }) => {
	const tag = params.tag;
	const currentTag = tag ? getTag(tag) : undefined;
	const fetchUrl = currentTag ? `/api/feed/${currentTag.slug}` : '/api/feed';
	const articleRequest = await fetch(fetchUrl);
	const result = (await articleRequest.json()) as {
		articles: ArticlePromo[];
		tags: { tag: Tag; count: number }[];
	};
	const articles: ArticlePromo[] = result.articles;
	const tags: { tag: Tag; count: number }[] = result.tags;

	return {
		articles,
		tags,
		meta: {
			currentTag,
		},
	};
}) satisfies PageLoad;
