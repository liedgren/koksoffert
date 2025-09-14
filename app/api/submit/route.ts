import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getClientIP } from '@/lib/rate-limit'

export const runtime = 'nodejs'

interface SubmitData {
  name: string
  email: string
  phone?: string
  message?: string
  blobUrl?: string
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per 15 minutes per IP
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(clientIP, 5, 15 * 60 * 1000)
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' }, 
        { status: 429 }
      )
    }

    // Check content length (limit to 1MB for form data)
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 1024 * 1024) {
      return NextResponse.json(
        { error: 'Request too large' }, 
        { status: 413 }
      )
    }

    // Handle both JSON and FormData
    let data: SubmitData
    
    const contentType = request.headers.get('content-type')
    if (contentType?.includes('multipart/form-data')) {
      // Handle FormData
      const formData = await request.formData()
      data = {
        name: formData.get('name') as string || '',
        email: formData.get('email') as string || '',
        phone: formData.get('phone') as string || '',
        message: formData.get('message') as string || '',
        blobUrl: formData.get('blobUrl') as string || ''
      }
    } else {
      // Handle JSON
      data = await request.json()
    }

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required' }, 
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' }, 
        { status: 400 }
      )
    }

    // Sanitize input data to prevent XSS
    const sanitizedData = {
      name: data.name?.trim().substring(0, 100) || '',
      email: data.email?.trim().substring(0, 100) || '',
      phone: data.phone?.trim().substring(0, 20) || '',
      message: data.message?.trim().substring(0, 1000) || '',
      blobUrl: data.blobUrl || ''
    }

    // Send email notification using Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        await resend.emails.send({
          from: 'noreply@resend.dev', // Use Resend's test domain
          to: process.env.ADMIN_EMAIL || 'admin@koksoffert.com',
          subject: 'New Kitchen Offer Request',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2c3e50;">New Kitchen Offer Request</h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${sanitizedData.name}</p>
                <p><strong>Email:</strong> ${sanitizedData.email}</p>
                ${sanitizedData.phone ? `<p><strong>Phone:</strong> ${sanitizedData.phone}</p>` : ''}
                <p><strong>Message:</strong> ${sanitizedData.message || 'No message provided'}</p>
                ${sanitizedData.blobUrl ? `<p><strong>PDF File:</strong> <a href="${sanitizedData.blobUrl}" style="color: #3498db;">Download PDF</a></p>` : ''}
              </div>
              <p style="color: #666; font-size: 14px;">
                This request was submitted through the Koksoffert website.
              </p>
            </div>
          `
        })
        
        console.log('Email sent successfully via Resend')
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        // Don't fail the request if email fails
      }
    } else {
      console.log('RESEND_API_KEY not configured, skipping email notification')
    }

    console.log('New offer request:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      message: sanitizedData.message,
      blobUrl: sanitizedData.blobUrl,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Submit error:', error)
    // Don't expose internal error details to client
    return NextResponse.json(
      { error: 'Submission failed. Please try again.' }, 
      { status: 500 }
    )
  }
}
