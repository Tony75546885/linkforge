import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getBaseUrl } from '@/lib/utils'

export async function POST() {
  const stripe = getStripe()

  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const priceId = process.env.STRIPE_PRICE_ID_PRO
  if (!priceId) {
    return NextResponse.json({ error: 'Stripe price not configured' }, { status: 500 })
  }

  const baseUrl = getBaseUrl()

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/dashboard?upgraded=true`,
    cancel_url: `${baseUrl}/dashboard`,
  })

  return NextResponse.json({ url: session.url })
}
