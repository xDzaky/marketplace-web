import { z } from 'zod';
import { json, badRequest } from '@/lib/http';

const bodySchema = z.object({ query: z.string().min(1) });

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parse = bodySchema.safeParse(body);
  if (!parse.success) return badRequest('Invalid body');
  // TODO: semantic rerank suggestion using AI; placeholder suggestions
  return json({
    normalizedQuery: parse.data.query.trim().toLowerCase(),
    suggestions: {
      categories: ['company', 'ecommerce'],
      techStack: ['Next.js', 'Laravel'],
      priceRange: { min: 0, max: 500000 }
    }
  });
}

