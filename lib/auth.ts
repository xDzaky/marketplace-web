import { currentUser } from '@clerk/nextjs/server';

// Helper to fetch Clerk user; mapping to profiles table happens in webhooks
export async function requireUser() {
  const user = await currentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}
