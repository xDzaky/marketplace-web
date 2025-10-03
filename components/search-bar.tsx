'use client';

import { useState } from 'react';
import { Search, ArrowRight, X } from 'lucide-react';
import type { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

type Option = { label: string; value: string };

export type SearchValues = {
  query: string;
  category?: string;
};

type SearchBarProps = {
  categories?: Array<Category | Option>;
  defaultQuery?: string;
  defaultCategory?: string;
  placeholder?: string;
  buttonLabel?: string;
  onSearch?: (values: SearchValues) => void;
  action?: string;
  method?: 'get' | 'post';
  className?: string;
};

export default function SearchBar({
  categories = [],
  defaultQuery = '',
  defaultCategory = '',
  placeholder = 'Search listings…',
  buttonLabel = 'Search',
  onSearch,
  action = '/products',
  method = 'get',
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultQuery);
  const [category, setCategory] = useState(defaultCategory);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (onSearch) {
      event.preventDefault();
      onSearch({ query, category: category || undefined });
    }
  };

  const resetQuery = () => {
    setQuery('');
    if (onSearch) {
      onSearch({ query: '', category: category || undefined });
    }
  };

  const selectOptions = categories.map((item) =>
    'slug' in item ? { label: item.name, value: item.slug } : item,
  );

  const hasCategories = selectOptions.length > 0;

  return (
    <form
      className={cn(
        'flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-lg shadow-blue-900/15 backdrop-blur md:flex-row md:items-center md:p-5',
        className,
      )}
      action={onSearch ? undefined : action}
      method={onSearch ? undefined : method}
      onSubmit={handleSubmit}
    >
      <div role="search" aria-label="Search marketplace listings">
        <label htmlFor="dashboard-search-query" className="sr-only">
          Search query
        </label>
        <div className="flex w-full items-center gap-3 rounded-xl bg-slate-900/80 px-4 py-3 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-sky-400">
          <Search className="h-5 w-5 text-slate-400" aria-hidden />
          <input
            id="dashboard-search-query"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Search listings"
            aria-describedby="search-description"
          />
        {query ? (
          <button
            type="button"
            onClick={resetQuery}
            className="rounded-full border border-white/10 p-1 text-slate-300 transition hover:border-sky-400 hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        ) : null}
      </div>

      {hasCategories ? (
        <label className="flex w-full items-center gap-3 rounded-xl bg-slate-900/80 px-4 py-3 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-sky-400 md:max-w-xs">
          <span className="sr-only">Category</span>
          <select
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 focus:outline-none"
          >
            <option value="">All categories</option>
            {selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:shadow-xl hover:shadow-blue-500/40 md:w-auto"
      >
        <span>{buttonLabel}</span>
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}

