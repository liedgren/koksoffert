import { MetadataRoute } from 'next'
import { getStorySlugs } from '@/lib/storyblok'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://koksoffert.com'

  // Fetch article slugs from Storyblok
  let articleSlugs: string[] = []
  try {
    articleSlugs = await getStorySlugs('article')
  } catch (error) {
    console.error('Failed to fetch article slugs for sitemap:', error)
  }

  // Clean slugs and create article URLs with proper priorities
  const articleUrls = articleSlugs.map(slug => {
    // Clean the slug if it contains 'artiklar/'
    const cleanSlug = slug.includes("artiklar/") 
      ? slug.replace("artiklar/", "") 
      : slug;
    
    return {
      url: `${baseUrl}/artiklar/${cleanSlug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  })
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/offer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artiklar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/om-oss`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sa-fungerar-det`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/success`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...articleUrls,
  ]
}
