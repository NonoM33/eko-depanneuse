import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  let stripe: import('stripe').default
  try {
    stripe = (await import('@/lib/stripe')).getStripe()
  } catch {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }

  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 })
  }

  let event: { type: string; data: { object: { id: string } } }
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret) as { type: string; data: { object: { id: string } } }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    await prisma.order.update({
      where: { stripeSessionId: session.id },
      data: { status: 'paid' },
    }).catch(() => {})
  }

  return NextResponse.json({ received: true })
}
