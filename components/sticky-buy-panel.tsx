'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import type { Product, Store } from '@/lib/types';
import RatingStars from '@/components/rating-stars';
import PriceTag from '@/components/price-tag';

type StickyBuyPanelProps = {
  product: Product;
  store: Store;
};

export default function StickyBuyPanel({ product, store }: StickyBuyPanelProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass-panel sticky top-24 flex flex-col gap-6 p-6"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">Current price</p>
        <PriceTag cents={product.priceCents} currency={product.currency} />
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
      </div>

      <ul className="space-y-2 text-sm text-slate-200">
        {product.highlights.slice(0, 4).map((highlight) => (
          <li key={highlight} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300" aria-hidden />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/stores/${store.slug}`}
        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3 transition hover:border-sky-400"
      >
        <span className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10">
          <Image src={store.avatarUrl} alt={store.name} fill sizes="48px" className="object-cover" />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{store.name}</p>
          <p className="text-xs text-slate-400">{store.tagline}</p>
        </div>
      </Link>

      <div className="flex flex-col gap-3">
        <Link
          href={`/chat/${store.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-sky-400 hover:text-white"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Chat seller
        </Link>
        <Link
          href={`/checkout?product=${product.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:shadow-xl hover:shadow-blue-500/40"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden />
          Buy now
        </Link>
      </div>

      <p className="text-xs text-slate-400">
        Protected by escrow and KYB. Funds are released after successful transfer and verification.
      </p>
    </motion.aside>
  );
}
