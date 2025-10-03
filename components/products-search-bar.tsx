'use client';

import SearchBar, { type SearchValues } from '@/components/search-bar';
import type { Category } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

type ProductsSearchBarProps = {
  categories: Category[];
};

export default function ProductsSearchBar({ categories }: ProductsSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = ({ query, category }: SearchValues) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set('q', query);
      } else {
        params.delete('q');
      }
      if (category) {
        params.set('category', category);
      }
      params.delete('page');
      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : '?', { scroll: false });
    });
  };

  return (
    <SearchBar
      categories={categories}
      defaultQuery={searchParams.get('q') ?? ''}
      defaultCategory={searchParams.get('category') ?? ''}
      onSearch={handleSearch}
      buttonLabel={isPending ? 'Searching…' : 'Search'}
    />
  );
}

