import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getClientIP } from '@/lib/rate-limit'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 3 uploads per 15 minutes per IP
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(clientIP, 3, 15 * 60 * 1000)
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many uploads. Please try again later.' }, 
        { status: 429 }
      )
    }

    // Check content length (limit to 15MB for file uploads)
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Request too large' }, 
        { status: 413 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 })
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 })
    }

    // Sanitize filename to prevent path traversal
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, 100)

    // Check if blob storage is configured
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN

    if (blobToken) {
      // Store file with Vercel Blob
      const blob = await put(sanitizedFileName, file, {
        access: 'public',
      })

      return NextResponse.json({ 
        blobUrl: blob.url,
        message: 'File uploaded successfully' 
      })
    } else {
      return NextResponse.json({ 
        error: 'Blob storage not configured' 
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Upload error:', error)
    // Don't expose internal error details to client
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' }, 
      { status: 500 }
    )
  }
}
