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
        clear: 'manual',
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
    console.log(`Fetching story with slug: ${slug}, type: ${storyType}`)
    
    // Determine the correct slug format based on story type
    let fullSlug = slug
    
    if (storyType === 'article') {
      fullSlug = `artiklar/${slug}`
    } else if (storyType === 'reference') {
      fullSlug = `references/${slug}`
    }
    
    console.log(`Using full slug: ${fullSlug}`)
    
    const { data } = await storyblokClient.get(`cdn/stories/${fullSlug}`)
    
    if (data.story) {
      console.log(`Successfully fetched story: ${data.story.name}`)
      return data.story
    }
    
    return null
  } catch (error) {
    console.error(`Failed to fetch story with slug ${slug}:`, error)
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
