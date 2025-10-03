import { json, notFound } from '@/lib/http';

type Ctx = { params: { slug: string } };

export async function GET(_req: Request, ctx: Ctx) {
  const { slug } = ctx.params;
  if (!slug) return notFound();
  // TODO: fetch store and products by slug
  return json({ slug, name: 'Sample Store', ratingAvg: 4.8, products: [] });
}

