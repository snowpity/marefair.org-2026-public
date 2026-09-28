import { defineCollection, z } from 'astro:content';
//import data from '@data/GetPagedAnnouncements.json';

// Define the schema for news articles
// Keep in sync with src/data/NewsArticle.ts please
const newsSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  previewText: z.string().optional(),
  content: z.string(),
  heroImage: z.string().optional(),
  createdAt: z.string(),
  createdBy: z.string(),
  isArchived: z.boolean(),
  isFeatured: z.boolean(),
  tags: z.array(z.object({
    name: z.string()
  }))
});

export type NewsArticle = z.infer<typeof newsSchema>;

const CONTENT_API = import.meta.env.API_BASE_URL;

export const news = defineCollection({
  loader: async () => {
    try {

      const response = await fetch(`${CONTENT_API}/announcement/GetPagedAnnouncements?pageSize=50&pageIndex=1&year=2026`);
      if (!response.ok) {
        console.error(`Failed to fetch announcements: ${response.statusText}`);
        return [];
      }

      const data = await response.json();


      return data.map((article: NewsArticle) => ({
        id: article.slug,
        slug: article.slug,
        title: article.title,
        previewText: article.previewText || '',
        content: article.content,
        heroImage: article.heroImage || '',
        createdAt: article.createdAt,
        createdBy: article.createdBy,
        isArchived: article.isArchived,
        isFeatured: article.isFeatured,
        tags: article.tags || []
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  },
  schema: newsSchema,
});
