import { z } from 'zod';
import { json, badRequest } from '@/lib/http';

const createSchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(3),
  bio: z.string().optional(),
  bannerUrl: z.string().url().optional()
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parse = createSchema.safeParse(body);
  if (!parse.success) return badRequest('Invalid body', { issues: parse.error.issues });
  // TODO: insert store and link to current seller profile
  return json({ id: 'placeholder-store-id', ...parse.data });
}

