import { json } from '@/lib/http';

export async function GET() {
  // TODO: list orders for current buyer or seller (via product.store)
  return json({ items: [] });
}

