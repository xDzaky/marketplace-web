'use client';

import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

type CategoryChipsProps = {
  categories: Category[];
  activeSlug?: string;
  onSelect?: (slug?: string) => void;
  hrefBuilder?: (slug?: string) => string;
};

export default function CategoryChips({ categories, activeSlug, onSelect, hrefBuilder }: CategoryChipsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSelect = (slug?: string) => {
    if (onSelect) {
      onSelect(slug);
      return;
    }
    if (hrefBuilder) {
      const url = hrefBuilder(slug);
      window.location.href = url;
      return;
    }
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug) {
        params.set('category', slug);
      } else {
        params.delete('category');
      }
      params.delete('page');
      const query = params.toString();
      router.push(query ? `?${query}` : '?', { scroll: false });
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {renderChip('All categories', undefined)}
      {categories.map((category) => renderChip(category.name, category.slug))}
    </div>
  );

  function renderChip(label: string, slug?: string) {
    const isActive = (slug ?? '') === (activeSlug ?? '');
    return (
      <button
        key={slug ?? 'all'}
        type="button"
        onClick={() => handleSelect(slug)}
        disabled={isPending}
        className={cn(
          'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition',
          isActive
            ? 'border-sky-400 bg-sky-400/20 text-white shadow-md shadow-sky-500/30'
            : 'border-white/10 bg-slate-900/60 text-slate-200 hover:border-sky-400 hover:text-white',
        )}
        aria-pressed={isActive}
      >
        {label}
      </button>
    );
  }
}
