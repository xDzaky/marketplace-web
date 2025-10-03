import { z } from 'zod';
import { createSupabaseServer } from '@/lib/supabase/server';
import { json, badRequest } from '@/lib/http';

const querySchema = z.object({
  query: z.string().optional(),
  category: z.array(z.coerce.number()).optional(),
  theme: z.array(z.coerce.number()).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  stack: z.array(z.string()).optional(),
  sort: z.enum(['newest','popular','rating']).optional(),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());
  const parse = querySchema.safeParse({
    query: params.query,
    sort: params.sort as any,
  });
  if (!parse.success) return badRequest('Invalid query');

  // Placeholder: fetch from Supabase with filters
  return json({ items: [], page: 1, pageSize: 20, total: 0 });
}

const upsertSchema = z.object({
  storeId: z.string().uuid(),
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().optional(),
  techStack: z.array(z.string()).default([]),
  priceCents: z.number().int().nonnegative(),
  currency: z.string().default('USD'),
  demoUrl: z.string().url().optional(),
  status: z.enum(['draft','published','archived']).default('draft')
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parse = upsertSchema.safeParse(body);
  if (!parse.success) return badRequest('Invalid body', { issues: parse.error.issues });
  const supabase = createSupabaseServer();
  // TODO: enforce store ownership via RLS or check
  // const { data, error } = await supabase.from('products').insert({...})
  return json({ id: 'placeholder-product-id', ...parse.data });
}
