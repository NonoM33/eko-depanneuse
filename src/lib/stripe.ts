let stripeInstance: import('stripe').default | null = null

export function getStripe(): import('stripe').default {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Stripe = require('stripe')
    stripeInstance = new Stripe(key, { apiVersion: '2024-06-20' }) as import('stripe').default
  }
  return stripeInstance as import('stripe').default
}
