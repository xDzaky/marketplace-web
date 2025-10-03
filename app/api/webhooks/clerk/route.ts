import { json, badRequest } from '@/lib/http';

// Clerk user webhook: upsert profile by clerk_user_id
export async function POST(req: Request) {
  const payload = await req.json().catch(() => null);
  if (!payload) return badRequest('Invalid JSON');
  // TODO: verify webhook signature with CLERK_WEBHOOK_SECRET
  // TODO: upsert into profiles table
  return json({ ok: true });
}

