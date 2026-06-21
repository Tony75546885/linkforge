import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe() {
  if (!_stripe && process.env.STRIPE_SECRET_KEY) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-05-27.dahlia',
      typescript: true,
    })
  }
  return _stripe
}

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    limits: { links: 25, clicksPerMonth: 1000 },
    features: [
      '25 short links',
      'Basic click analytics',
      'QR code generation',
      'Standard support',
    ],
  },
  pro: {
    name: 'Pro',
    price: 9,
    limits: { links: -1, clicksPerMonth: -1 },
    features: [
      'Unlimited short links',
      'Advanced analytics',
      'Custom slugs',
      'QR codes with logo',
      'API access',
      'Priority support',
      'Export data (CSV)',
    ],
  },
} as const
