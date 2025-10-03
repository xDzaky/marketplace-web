import { z } from 'zod';
import { json, badRequest } from '@/lib/http';

const bodySchema = z.object({ text: z.string().min(1) });

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parse = bodySchema.safeParse(body);
  if (!parse.success) return badRequest('Invalid body');
  // TODO: use AI moderation; placeholder flags basic profanity
  const flagged = /\b(badword|spam)\b/i.test(parse.data.text);
  return json({ flagged, categories: flagged ? ['toxicity'] : [] });
}

