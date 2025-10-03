'use client';

import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowDown, ArrowUp, Clock, Star } from 'lucide-react';
import type { ProductSort } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

const OPTIONS: { value: ProductSort; label: string; description: string; icon: LucideIcon }[] = [
  { value: 'newest', label: 'Newest', description: 'Recently listed', icon: Clock },
  { value: 'price-asc', label: 'Price: Low → High', description: 'Budget friendly', icon: ArrowUp },
  { value: 'price-desc', label: 'Price: High → Low', description: 'Premium deals', icon: ArrowDown },
  { value: 'rating', label: 'Rating', description: 'Top reviewed', icon: Star },
];

type SortSelectProps = {
  value: ProductSort;
};

export default function SortSelect({ value }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleChange = (nextValue: ProductSort) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('sort', nextValue);
      params.delete('page');
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="inline-flex rounded-full border border-white/10 bg-slate-900/60 p-1">
      {OPTIONS.map((option) => {
        const isActive = option.value === value;
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            disabled={isPending}
            onClick={() => handleChange(option.value)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-300 hover:text-white'
            }`}
            aria-pressed={isActive}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
