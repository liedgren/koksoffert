// Storyblok story types
export interface StoryblokStory {
  id: number
  name: string
  slug: string
  created_at: string
  published_at: string
  content: {
    title: string
    excerpt: string
    content: any // Rich text content
    category: 'Design' | 'Equipment' | 'Safety' | 'Maintenance' | 'Business'
    readTime: string
    featuredImage?: {
      filename: string
      alt: string
    }
  }
}

export interface ArticleListItem {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  publishedAt: string
}
