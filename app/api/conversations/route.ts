import { z } from 'zod';
import { json, badRequest } from '@/lib/http';

const listSchema = z.object({ storeId: z.string().uuid().optional() });

export async function GET(req: Request) {
  const url = new URL(req.url);
  const storeId = url.searchParams.get('storeId') ?? undefined;
  const parse = listSchema.safeParse({ storeId });
  if (!parse.success) return badRequest('Invalid query');
  // TODO: fetch conversations for current user (buyer/seller)
  return json({ items: [] });
}

const createSchema = z.object({
  storeId: z.string().uuid(),
  participantBuyerId: z.string().uuid(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parse = createSchema.safeParse(body);
  if (!parse.success) return badRequest('Invalid body', { issues: parse.error.issues });
  // TODO: create conversation and participants
  return json({ id: 'placeholder-conv-id', ...parse.data });
}

