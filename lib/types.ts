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
    image?: {
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
  image?: string
}

// Reference types
export interface ReferenceContent {
  title: string
  description?: string
  savings?: string
  image?: {
    filename: string
    alt: string
  }
}

export interface ReferenceStory {
  id: number
  name: string
  slug: string
  created_at: string
  published_at: string
  content: ReferenceContent
}