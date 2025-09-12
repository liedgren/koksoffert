import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

interface SubmitData {
  name: string
  email: string
  message: string
  blobUrl?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: SubmitData = await request.json()

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
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
                ${data.blobUrl ? `<p><strong>PDF File:</strong> <a href="${data.blobUrl}" style="color: #3498db;">Download PDF</a></p>` : ''}
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
      name: data.name,
      email: data.email,
      message: data.message,
      blobUrl: data.blobUrl,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json(
      { error: 'Submission failed' }, 
      { status: 500 }
    )
  }
}
