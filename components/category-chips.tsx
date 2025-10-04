'use client';

import { useCallback, useMemo, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

type LinkBuilderOptions = {
  basePath: string;
  queryKey?: string;
  emptyHref?: string;
};

type CategoryChipsProps = {
  categories: Category[];
  activeSlug?: string;
  onSelect?: (slug?: string) => void;
  hrefBuilder?: ((slug?: string) => string) | LinkBuilderOptions;
  allLabel?: string;
  className?: string;
};

export default function CategoryChips({
  categories,
  activeSlug,
  onSelect,
  hrefBuilder,
  allLabel = 'All categories',
  className,
}: CategoryChipsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const derivedActive = activeSlug ?? searchParams.get('category') ?? undefined;

  const categoryItems = useMemo(
    () =>
      categories.map((category) => ({
        label: category.name,
        slug: category.slug,
      })),
    [categories],
  );

  const buildHref = useMemo(() => {
    if (!hrefBuilder) return undefined;
    if (typeof hrefBuilder === 'function') {
      return hrefBuilder;
    }

    const { basePath, queryKey = 'category', emptyHref } = hrefBuilder;
    return (slug?: string) => {
      if (!slug) {
        return emptyHref ?? basePath;
      }
      const separator = basePath.includes('?') ? '&' : '?';
      return `${basePath}${separator}${queryKey}=${encodeURIComponent(slug)}`;
    };
  }, [hrefBuilder]);

  const handleSelect = useCallback(
    (slug?: string) => {
      if (onSelect) {
        onSelect(slug);
        return;
      }

      const target = buildHref ? buildHref(slug) : undefined;

      startTransition(() => {
        if (target) {
          router.push(target, { scroll: false });
          return;
        }

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
    },
    [buildHref, onSelect, router, searchParams],
  );

  const renderChip = useCallback(
    (label: string, slug?: string) => {
      const isActive = (slug ?? '') === (derivedActive ?? '');

      return (
        <button
          key={slug ?? 'all'}
          type="button"
          onClick={() => handleSelect(slug)}
          disabled={isPending}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 focus-visible:ring-offset-slate-900',
            isActive
              ? 'border-sky-400 bg-sky-400/20 text-white shadow-md shadow-sky-500/30'
              : 'border-white/10 bg-slate-900/60 text-slate-200 hover:border-sky-400 hover:text-white',
          )}
          aria-pressed={isActive}
          aria-busy={isPending}
        >
          {label}
        </button>
      );
    },
    [derivedActive, handleSelect, isPending],
  );

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {renderChip(allLabel, undefined)}
      {categoryItems.map((category) => renderChip(category.label, category.slug))}
    </div>
  );
}
