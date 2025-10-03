import { json, notFound } from '@/lib/http';

type Ctx = { params: { id: string } };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = ctx.params;
  if (!id) return notFound();
  // TODO: fetch order with items
  return json({ id, status: 'pending', items: [] });
}

