import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { ArticlePromo } from '$data/articles.js';
import { get as getTag, type Tag } from '$data/tags';

export const prerender = false;
export const ssr = true;

export const load = (async ({ fetch, params }) => {
	const tag = params.tag;
	const currentTag = tag ? getTag(tag) : undefined;
	if (tag && !currentTag) {
		error(404, {
			message: 'The page does not exist',
		});
	}
	const fetchUrl = currentTag ? `/api/feed/${currentTag.slug}` : '/api/feed';
	const articleRequest = await fetch(fetchUrl);
	const { articles, tags } = (await articleRequest.json()) as {
		articles: ArticlePromo[];
		tags: { tag: Tag; count: number }[];
	};

	return {
		articles,
		tags,
		meta: {
			currentTag,
		},
	};
}) satisfies PageLoad;
