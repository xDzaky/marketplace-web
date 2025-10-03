import { z } from 'zod';
import { json, badRequest } from '@/lib/http';

const itemSchema = z.object({ productId: z.string().uuid(), quantity: z.number().int().positive().default(1) });
const bodySchema = z.object({
  items: z.array(itemSchema).min(1),
  successUrl: z.string().url(),
  cancelUrl: z.string().url()
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parse = bodySchema.safeParse(body);
  if (!parse.success) return badRequest('Invalid body', { issues: parse.error.issues });

  // TODO: create order draft and create Stripe Payment Intent
  // For MVP return placeholder clientSecret to confirm on client-side
  return json({
    orderId: 'placeholder-order-id',
    clientSecret: 'pi_12345_secret_abc'
  });
}
