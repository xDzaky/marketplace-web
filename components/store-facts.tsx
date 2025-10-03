'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import type { Store } from '@/lib/types';

type StoreFactsProps = {
  store: Store;
};

export default function StoreFacts({ store }: StoreFactsProps) {
  return (
    <aside className="glass-panel flex flex-col gap-6 p-6">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-300">Contact</h3>
        <p className="mt-2 text-xs text-slate-400">
          Ready to discuss a deal or custom engagement? Reach out to the storefront team directly.
        </p>
        <Link
          href={`/chat/${store.id}`}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:shadow-xl hover:shadow-blue-500/40"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Chat seller
        </Link>
      </div>

      <div className="space-y-4 text-sm text-slate-200">
        <Fact label="Response time" value={store.responseTime} />
        <Fact label="Badges" value={store.badges.join(', ')} />
        <Fact label="Social" value={`${store.socials.length} channels`} />
        <Fact label="Average rating" value={`${store.rating.toFixed(1)} / 5`} />
      </div>
    </aside>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

