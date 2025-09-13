import StoryblokClient from 'storyblok-js-client'

// Helper function to get access token
function getAccessToken(): string | undefined {
  // Try multiple ways to access the environment variable
  const token = process.env.STORYBLOK_ACCESS_TOKEN || process.env['STORYBLOK_ACCESS_TOKEN']
  
  // TEMPORARY: Hardcode token for testing
  const hardcodedToken = '9DGra75hYTHrLddwyhVI5wtt'
  
  // Debug: Show all environment variables that contain "STORYBLOK"
  const storyblokVars = Object.keys(process.env).filter(key => 
    key.toUpperCase().includes('STORYBLOK')
  )
  console.log('🔍 All STORYBLOK env vars:', storyblokVars)
  
  // Debug: Show the actual value if found
  if (token) {
    console.log('🔑 Storyblok token found:', token.substring(0, 8) + '...')
    return token
  } else {
    console.log('❌ Storyblok token not found, using hardcoded token for testing')
    console.log('🔍 Available env vars:', Object.keys(process.env).slice(0, 10))
    return hardcodedToken
  }
}

// Create Storyblok client
export const storyblokClient = new StoryblokClient({
  accessToken: getAccessToken() || 'dummy-token',
  cache: {
    clear: 'auto',
    type: 'memory'
  }
})

// Helper function to get stories
export async function getStories(storyType: string = 'article') {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      console.warn('Storyblok access token not configured. Returning empty array.')
      return []
    }
    
    console.log('Fetching stories from Storyblok with type:', storyType)
    
    const { data } = await storyblokClient.get('cdn/stories', {
      per_page: 100,
      sort_by: 'created_at:desc'
    })
    
    console.log('Storyblok response:', data)
    console.log('Number of stories found:', data.stories?.length || 0)
    
    return data.stories || []
  } catch (error) {
    console.error('Failed to fetch stories from Storyblok:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      status: (error as any)?.status,
      response: (error as any)?.response?.data
    })
    return []
  }
}

// Helper function to get a single story by slug
export async function getStoryBySlug(slug: string, storyType: string = 'article') {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      console.warn('Storyblok access token not configured. Cannot fetch story.')
      return null
    }
    
    console.log('Fetching story from Storyblok with slug:', slug)
    
    // Try different slug formats
    let storyData = null
    
    // First try with the slug as-is
    try {
      const { data } = await storyblokClient.get(`cdn/stories/${slug}`)
      storyData = data.story
    } catch (error) {
      console.log('Failed with slug as-is, trying with artiklar/ prefix')
      
      // Try with artiklar/ prefix
      try {
        const { data } = await storyblokClient.get(`cdn/stories/artiklar/${slug}`)
        storyData = data.story
      } catch (error2) {
        console.log('Failed with artiklar/ prefix, trying full path')
        
        // Try with full path
        try {
          const { data } = await storyblokClient.get(`cdn/stories/artiklar/${slug}`)
          storyData = data.story
        } catch (error3) {
          throw error3 // Re-throw the last error
        }
      }
    }
    
    console.log('Storyblok story response:', storyData)
    
    return storyData || null
  } catch (error) {
    console.error('Failed to fetch story from Storyblok:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      status: (error as any)?.status,
      response: (error as any)?.response?.data
    })
    return null
  }
}

// Helper function to get all story slugs
export async function getStorySlugs(storyType: string = 'article') {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      console.warn('Storyblok access token not configured. Cannot fetch story slugs.')
      return []
    }
    
    console.log('Fetching story slugs from Storyblok with type:', storyType)
    
    const { data } = await storyblokClient.get('cdn/stories', {
      per_page: 100
    })
    
    console.log('Storyblok slugs response:', data)
    
    return data.stories?.map((story: any) => story.slug) || []
  } catch (error) {
    console.error('Failed to fetch story slugs from Storyblok:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      status: (error as any)?.status,
      response: (error as any)?.response?.data
    })
    return []
  }
}
