import { json, badRequest } from '@/lib/http';

// Stripe webhook: verify signature and reconcile payment events
export async function POST(req: Request) {
  const payload = await req.text();
  if (!payload) return badRequest('Invalid payload');

  // TODO: verify signature via stripe.webhooks.constructEvent using STRIPE_WEBHOOK_SECRET
  // const signature = req.headers.get('stripe-signature');
  // const event = stripe.webhooks.constructEvent(payload, signature!, process.env.STRIPE_WEBHOOK_SECRET!);

  // TODO: handle event types (payment_intent.succeeded, payment_intent.payment_failed, charge.refunded, ...)
  // - set orders.status
  // - create transactions entries
  // - generate download tokens for fulfilled order items

  return json({ ok: true });
}

