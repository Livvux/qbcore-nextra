import type { NextApiRequest, NextApiResponse } from 'next'

interface SubscribeRequest {
  email: string
}

interface SubscribeResponse {
  success: boolean
  message: string
  contactId?: string
}

interface PlunkErrorResponse {
  error: string
  message?: string
}

interface PlunkContactResponse {
  success: boolean
  id: string
  email: string
  subscribed: boolean
  data?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscribeResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    })
  }

  const { email }: SubscribeRequest = req.body

  // Validate email
  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Email is required',
    })
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format',
    })
  }

  // Get Plunk API key from environment
  const plunkSecretKey = process.env.PLUNK_SECRET_KEY
  const welcomeActionId = process.env.PLUNK_WELCOME_ACTION_ID

  if (!plunkSecretKey) {
    console.error('PLUNK_SECRET_KEY is not configured')
    return res.status(500).json({
      success: false,
      message: 'Server configuration error',
    })
  }

  try {
    // Create or update contact in Plunk
    const contactResponse = await fetch('https://api.useplunk.com/v1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${plunkSecretKey}`,
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        subscribed: true,
        data: {
          source: 'qbcore-website-newsletter',
          subscribed_at: new Date().toISOString(),
          website: 'qbcore.net',
        },
      }),
    })

    if (!contactResponse.ok) {
      const errorData = (await contactResponse.json()) as PlunkErrorResponse
      
      // Handle duplicate email (409 conflict) as success
      if (contactResponse.status === 409) {
        return res.status(200).json({
          success: true,
          message: 'You are already subscribed to our newsletter!',
        })
      }

      console.error('Plunk contact creation failed:', errorData)
      return res.status(500).json({
        success: false,
        message: 'Failed to subscribe. Please try again later.',
      })
    }

    const contactData = (await contactResponse.json()) as PlunkContactResponse

    // Track subscription event and trigger welcome email if action ID is configured
    if (welcomeActionId) {
      try {
        const trackResponse = await fetch('https://api.useplunk.com/v1/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${plunkSecretKey}`,
          },
          body: JSON.stringify({
            event: 'welcome',
            email: email.toLowerCase().trim(),
            subscribed: true,
            data: {
              source: 'qbcore-website-newsletter',
              subscribed_at: new Date().toISOString(),
              action_id: welcomeActionId,
            },
          }),
        })

        if (!trackResponse.ok) {
          console.warn('Plunk track event failed, but contact was created:', await trackResponse.text())
        }
      } catch (trackError) {
        console.warn('Failed to track subscription event:', trackError)
        // Don't fail the request if tracking fails
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed! Check your email for a welcome message.',
      contactId: contactData.id,
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    })
  }
}