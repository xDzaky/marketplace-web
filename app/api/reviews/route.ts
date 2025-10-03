import { z } from 'zod';
import { json, badRequest } from '@/lib/http';

const createSchema = z.object({
  productId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parse = createSchema.safeParse(body);
  if (!parse.success) return badRequest('Invalid body', { issues: parse.error.issues });
  // TODO: check buyer entitlement (purchased) then insert review
  return json({ id: 'placeholder-review-id', ...parse.data });
}

