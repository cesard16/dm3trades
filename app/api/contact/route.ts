import { NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'edge'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = contactSchema.parse(body)

    const apiKey = process.env.RESEND_API_KEY

    // If Resend is configured, send the email
    if (apiKey && apiKey !== 'your_resend_api_key_here') {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)

      await resend.emails.send({
        from: 'DM3Trades <onboarding@resend.dev>',
        to: 'contacto@dm3trades.com',
        subject: `[DM3Trades Contact] ${validated.subject}`,
        text: `
Name: ${validated.name}
Email: ${validated.email}

Message:
${validated.message}
        `.trim(),
        replyTo: validated.email,
      })
    }

    // Always return success (even without API key, form still "works" for MVP)
    return NextResponse.json({ success: true, message: 'Message received' })
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
