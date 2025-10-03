import { z } from 'zod';
import { json, badRequest } from '@/lib/http';

type Ctx = { params: { id: string } };

const updateSchema = z.object({
  status: z.enum(['open','in_review','quoted','in_progress','delivered','closed']).optional(),
  quoteCents: z.number().int().nonnegative().optional(),
});

export async function PUT(req: Request, ctx: Ctx) {
  const body = await req.json().catch(() => ({}));
  const parse = updateSchema.safeParse(body);
  if (!parse.success) return badRequest('Invalid body', { issues: parse.error.issues });
  // TODO: update custom request; check seller permissions
  return json({ id: ctx.params.id, updated: true, changes: parse.data });
}

