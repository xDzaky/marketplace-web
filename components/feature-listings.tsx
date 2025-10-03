'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flame, Sparkles, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Category, Product, Store, Tag } from '@/lib/types';
import ProductCard from '@/components/product-card';
import { cn } from '@/lib/utils';
import DashboardEmpty from '@/components/dashboard/empty';

type SortKey = 'trending' | 'new' | 'topRated';

type FeatureListingsProps = {
  products: Product[];
  stores: Store[];
  categories: Category[];
  tags: Tag[];
};

const SORT_OPTIONS: { key: SortKey; label: string; description: string; icon: LucideIcon }[] = [
  { key: 'trending', label: 'Trending', description: 'Most active this week', icon: Flame },
  { key: 'new', label: 'New', description: 'Recently listed', icon: Sparkles },
  { key: 'topRated', label: 'Top Rated', description: 'Highest reviews', icon: Star },
];

export default function FeatureListings({ products, stores, categories, tags }: FeatureListingsProps) {
  const [sortKey, setSortKey] = useState<SortKey>('trending');

  const storeMap = useMemo(() => new Map(stores.map((store) => [store.id, store])), [stores]);
  const categoryMap = useMemo(() => new Map(categories.map((category) => [category.id, category])), [categories]);
  const tagMap = useMemo(() => new Map(tags.map((tag) => [tag.id, tag])), [tags]);

  const sortedProducts = useMemo(() => {
    const cloned = [...products];
    switch (sortKey) {
      case 'new':
        cloned.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'topRated':
        cloned.sort((a, b) => {
          if (b.rating === a.rating) {
            return b.reviewCount - a.reviewCount;
          }
          return b.rating - a.rating;
        });
        break;
      case 'trending':
      default:
        cloned.sort((a, b) => b.totalSales - a.totalSales);
        break;
    }
    return cloned;
  }, [products, sortKey]);

  const featuredProducts = sortedProducts.slice(0, 6);

  return (
    <section className="mt-20 space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">Featured</p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
            Curated listings ready for diligence right now
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            We highlight operators with clean metrics, clear handoff kits, and real traction. Switch
            between trending, new, or top-rated listings to explore what’s performing right now.
          </p>
        </div>
        <div className="inline-flex rounded-full border border-white/10 bg-slate-900/60 p-1">
          {SORT_OPTIONS.map((option) => {
            const isActive = option.key === sortKey;
            const Icon = option.icon;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setSortKey(option.key)}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-300 hover:text-white',
                )}
                aria-pressed={isActive}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {featuredProducts.length === 0 ? (
        <DashboardEmpty title="No listings available" description="Check back soon for new curated drops." />
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={sortKey}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -32 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                store={storeMap.get(product.storeId)}
                categories={product.categoryIds
                  .map((categoryId) => categoryMap.get(categoryId))
                  .filter(Boolean) as Category[]}
                tags={product.tagIds
                  .map((tagId) => tagMap.get(tagId))
                  .filter(Boolean) as Tag[]}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
