import { getAll as getAllArticles } from '../../../../data/articles';
import { get as getTag } from '../../../../data/tags';
import { getAllByTag as getAllArticlesByTag } from '../../../../data/articles';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET = (({ params }) => {
	const tag = params.tag;
	const currentTag = tag ? getTag(tag) : undefined;
	const articles = currentTag ? getAllArticlesByTag(currentTag.slug) : getAllArticles();

	const tags = Object.entries(
		articles.reduce(
			(tags, article) => {
				article.meta.tags.forEach(({ slug }) => {
					tags[slug] = (tags[slug] ?? 0) + 1;
				});
				return tags;
			},
			{} as Record<string, number>,
		),
	)
		.map(([slug, count]) => ({
			tag: getTag(slug),
			count,
		}))
		.sort((a, b) => b.count - a.count);

	return new Response(
		JSON.stringify({
			articles,
			tags,
			meta: {
				currentTag,
			},
		}),
	);
}) satisfies RequestHandler;
