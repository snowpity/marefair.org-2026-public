/**
 * Interface for a news article
 */

// Keep in sync with src/content/news.ts please
export interface NewsArticle {
  id: string
  slug: string
  title: string
  previewText?: string|undefined
  content: string
  createdAt: string
  createdBy: string
  heroImage?: string|undefined
  isArchived: boolean
  isFeatured: boolean
  tags?: { name: string }[]
}