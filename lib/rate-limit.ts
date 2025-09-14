// Simple in-memory rate limiting for API routes
// Note: In production, consider using Redis or a more robust solution

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export function rateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const key = identifier
  
  // Clean up expired entries
  const keysToDelete: string[] = []
  rateLimitStore.forEach((v, k) => {
    if (now > v.resetTime) {
      keysToDelete.push(k)
    }
  })
  keysToDelete.forEach(k => rateLimitStore.delete(k))
  
  const entry = rateLimitStore.get(key)
  
  if (!entry || now > entry.resetTime) {
    // New window or expired entry
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    })
    
    return {
      success: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs
    }
  }
  
  if (entry.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime
    }
  }
  
  entry.count++
  rateLimitStore.set(key, entry)
  
  return {
    success: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime
  }
}

export function getClientIP(request: Request): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  // Fallback to a default identifier
  return 'unknown'
}
