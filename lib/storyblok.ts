import StoryblokClient from 'storyblok-js-client'

// Check if required environment variables are present
const accessToken = process.env.STORYBLOK_ACCESS_TOKEN

if (!accessToken) {
  console.warn('Storyblok access token not configured. Using mock data.')
}

// Create Storyblok client
export const storyblokClient = new StoryblokClient({
  accessToken: accessToken || 'dummy-token',
  cache: {
    clear: 'auto',
    type: 'memory'
  }
})

// Helper function to get stories
export async function getStories(storyType: string = 'article') {
  try {
    if (!accessToken) {
      // Return mock data when no token is configured
      return []
    }
    
    const { data } = await storyblokClient.get('cdn/stories', {
      content_type: storyType,
      per_page: 100,
      sort_by: 'created_at:desc'
    })
    
    return data.stories || []
  } catch (error) {
    console.error('Failed to fetch stories from Storyblok:', error)
    return []
  }
}

// Helper function to get a single story by slug
export async function getStoryBySlug(slug: string, storyType: string = 'article') {
  try {
    if (!accessToken) {
      return null
    }
    
    const { data } = await storyblokClient.get(`cdn/stories/${slug}`, {
      content_type: storyType
    })
    
    return data.story || null
  } catch (error) {
    console.error('Failed to fetch story from Storyblok:', error)
    return null
  }
}

// Helper function to get all story slugs
export async function getStorySlugs(storyType: string = 'article') {
  try {
    if (!accessToken) {
      return []
    }
    
    const { data } = await storyblokClient.get('cdn/stories', {
      content_type: storyType,
      per_page: 100,
      fields: 'slug'
    })
    
    return data.stories?.map((story: any) => story.slug) || []
  } catch (error) {
    console.error('Failed to fetch story slugs from Storyblok:', error)
    return []
  }
}
