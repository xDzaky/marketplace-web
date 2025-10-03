import { z } from 'zod';
import { json, badRequest } from '@/lib/http';

type Ctx = { params: { id: string } };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = ctx.params;
  // TODO: fetch messages ordered by created_at desc
  return json({ conversationId: id, messages: [] });
}

const sendSchema = z.object({
  type: z.enum(['text','file','quote']).default('text'),
  content: z.string().optional(),
  attachmentPath: z.string().optional(),
  metadata: z.any().optional()
});

export async function POST(req: Request, ctx: Ctx) {
  const { id } = ctx.params;
  const body = await req.json().catch(() => ({}));
  const parse = sendSchema.safeParse(body);
  if (!parse.success) return badRequest('Invalid body', { issues: parse.error.issues });
  // TODO: insert message; Supabase Realtime will broadcast
  return json({ conversationId: id, message: { ...parse.data, id: 'placeholder-msg-id' } });
}

