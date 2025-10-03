import { z } from 'zod';
import { json, badRequest, notFound } from '@/lib/http';

type Ctx = { params: { id: string } };

export async function GET(_req: Request, ctx: Ctx) {
  const id = ctx.params.id;
  // TODO: fetch from Supabase
  if (!id) return notFound();
  return json({ id, title: 'Sample product', status: 'published' });
}

const updateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  priceCents: z.number().int().nonnegative().optional(),
  status: z.enum(['draft','published','archived']).optional()
});

export async function PUT(req: Request, ctx: Ctx) {
  const id = ctx.params.id;
  const body = await req.json().catch(() => ({}));
  const parse = updateSchema.safeParse(body);
  if (!parse.success) return badRequest('Invalid body');
  return json({ id, updated: true, changes: parse.data });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const id = ctx.params.id;
  return json({ id, deleted: true });
}

