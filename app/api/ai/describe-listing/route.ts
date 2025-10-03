import { z } from 'zod';
import { json, badRequest } from '@/lib/http';

const bodySchema = z.object({
  title: z.string().min(3),
  features: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([])
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parse = bodySchema.safeParse(body);
  if (!parse.success) return badRequest('Invalid body', { issues: parse.error.issues });
  // TODO: Call AI SDK to generate description; placeholder result for now
  const description = `Introducing ${parse.data.title}. Built with ${parse.data.stack.join(', ') || 'modern tech'}. ${parse.data.features.join(' • ')}`;
  return json({ description });
}

