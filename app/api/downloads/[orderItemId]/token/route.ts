import { json, notFound } from '@/lib/http';

type Ctx = { params: { orderItemId: string } };

export async function GET(_req: Request, ctx: Ctx) {
  const { orderItemId } = ctx.params;
  if (!orderItemId) return notFound();
  // TODO: verify ownership and generate signed URL via Supabase Storage
  return json({ token: 'placeholder-token', expiresAt: new Date(Date.now() + 15 * 60_000).toISOString() });
}

