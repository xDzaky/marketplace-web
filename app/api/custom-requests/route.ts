import { z } from 'zod';
import { json, badRequest } from '@/lib/http';

const createSchema = z.object({
  storeId: z.string().uuid(),
  title: z.string().min(3),
  brief: z.string().optional(),
  budgetCents: z.number().int().nonnegative().optional(),
  currency: z.string().default('USD'),
  dueDate: z.coerce.date().optional()
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parse = createSchema.safeParse(body);
  if (!parse.success) return badRequest('Invalid body', { issues: parse.error.issues });
  // TODO: insert custom request linked to requester profile
  return json({ id: 'placeholder-request-id', ...parse.data });
}
