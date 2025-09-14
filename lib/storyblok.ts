import StoryblokClient from 'storyblok-js-client'

// Helper function to get access token
function getAccessToken(): string {
  return '9DGra75hYTHrLddwyhVI5wtt'
}

// Lazy initialization of Storyblok client
let storyblokClientInstance: StoryblokClient | null = null

function getStoryblokClient(): StoryblokClient {
  if (!storyblokClientInstance) {
    const accessToken = getAccessToken()
    
    storyblokClientInstance = new StoryblokClient({
      accessToken,
      cache: {
        clear: 'auto',
        type: 'memory'
      }
    })
  }
  return storyblokClientInstance
}

// Export the lazy client getter
export const storyblokClient = {
  get: async (path: string, options?: any) => {
    const client = getStoryblokClient()
    return client.get(path, options)
  }
}

// Helper function to get stories
export async function getStories(storyType: string = 'article') {
  try {
    const queryParams: any = {
      per_page: 100,
      sort_by: 'created_at:desc'
    }
    
    // Add content type filter if specified
    if (storyType && storyType !== 'all') {
      queryParams.content_type = storyType
    }
    
    const { data } = await storyblokClient.get('cdn/stories', queryParams)
        
    return data.stories || []
  } catch (error) {
    return []
  }
}

// Helper function to get a single story by slug
export async function getStoryBySlug(slug: string, storyType: string = 'article') {
  try {
    
    // Try different slug formats based on story type
    let storyData = null
    const slugVariations = [
      slug, // Direct slug
      `${storyType}/${slug}`, // With story type prefix
      `${storyType}s/${slug}`, // With pluralized story type prefix
    ]
    
    // Add specific variations for articles
    if (storyType === 'article') {
      slugVariations.push(`artiklar/${slug}`)
    }
    
    // Add specific variations for references
    if (storyType === 'reference') {
      slugVariations.push(`references/${slug}`)
    }
    
    // Try each slug variation
    for (const slugVariation of slugVariations) {
      try {
        const { data } = await storyblokClient.get(`cdn/stories/${slugVariation}`)
        storyData = data.story
        break // Success, exit the loop
      } catch (error) {
        // Continue to next variation
        continue
      }
    }
    
    return storyData || null
  } catch (error) {
    return null
  }
}

// Helper function to get all story slugs
export async function getStorySlugs(storyType: string = 'article') {
  try {
    
    // Build query parameters based on story type
    const queryParams: any = {
      per_page: 100
    }
    
    // Add content type filter if specified
    if (storyType && storyType !== 'all') {
      queryParams.content_type = storyType
    }
    
    const { data } = await storyblokClient.get('cdn/stories', queryParams)
    
    // Extract slugs and clean them based on story type
    const slugs = data.stories?.map((story: any) => {
      let cleanSlug = story.slug
      
      // Remove story type prefix if it exists
      if (storyType === 'article' && cleanSlug.startsWith('artiklar/')) {
        cleanSlug = cleanSlug.replace('artiklar/', '')
      } else if (storyType === 'reference' && cleanSlug.startsWith('references/')) {
        cleanSlug = cleanSlug.replace('references/', '')
      } else if (cleanSlug.startsWith(`${storyType}/`)) {
        cleanSlug = cleanSlug.replace(`${storyType}/`, '')
      } else if (cleanSlug.startsWith(`${storyType}s/`)) {
        cleanSlug = cleanSlug.replace(`${storyType}s/`, '')
      }
      
      return cleanSlug
    }) || []
    
    return slugs
  } catch (error) {
    return []
  }
}
