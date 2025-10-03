import { z } from 'zod';
import { json, badRequest } from '@/lib/http';

const favSchema = z.object({ productId: z.string().uuid() });

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parse = favSchema.safeParse(body);
  if (!parse.success) return badRequest('Invalid body');
  // TODO: upsert into favorites for current profile
  return json({ ok: true });
}

