import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const newsCollection = await getCollection('news');

	// Sort newest first (matches the "oldest = first article" logic used in [slug].astro)
	const sortedNews = newsCollection.sort(
		(a, b) => new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime()
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: sortedNews.map((entry) => ({
			title: entry.data.title,
			pubDate: new Date(entry.data.createdAt),
			link: `/news/${entry.data.slug}/`,
			description: entry.data.heroImage
				? `<img src="${entry.data.heroImage}" alt="${entry.data.imageAlt ?? ''}" />${entry.data.previewText ?? ''}`
				: entry.data.previewText,
			categories: entry.data.tags?.map((tag) => tag.name),
		})),
	});
}