'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pages = useMemo(() => {
    const range: number[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i += 1) {
      range.push(i);
    }
    if (!range.includes(1)) {
      range.unshift(1);
    }
    if (!range.includes(totalPages)) {
      range.push(totalPages);
    }
    return Array.from(new Set(range)).sort((a, b) => a - b);
  }, [currentPage, totalPages]);

  const navigate = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    const query = params.toString();
    router.push(query ? `?${query}` : '?', { scroll: true });
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-200 transition hover:border-sky-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => navigate(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => navigate(page)}
          className={`min-w-[2.5rem] rounded-full px-3 py-2 text-sm font-semibold transition ${
            page === currentPage
              ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 text-white shadow-md shadow-blue-500/30'
              : 'border border-white/10 bg-slate-900/60 text-slate-200 hover:border-sky-400 hover:text-white'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-200 transition hover:border-sky-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => navigate(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </nav>
  );
}
