import clsx, { type ClassValue } from 'clsx';
import type { Category, Product, Theme } from '@/lib/types';

export type ProductSort = 'newest' | 'price-asc' | 'price-desc' | 'rating';

export type ProductFilterOptions = {
  query?: string;
  categorySlug?: string;
  themeSlug?: string;
  techStacks?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSort;
};

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(cents: number, currency = 'USD') {
  const amount = cents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
// const _formatCurrencyCheck: string = formatCurrency(12500);

export function parseSearchParamsToFilters(searchParams: URLSearchParams): ProductFilterOptions & { page?: number } {
  const query = searchParams.get('q') ?? undefined;
  const categorySlug = searchParams.get('category') ?? undefined;
  const themeSlug = searchParams.get('theme') ?? undefined;
  const techStacks = searchParams.getAll('tech');
  const minPrice = parseOptionalNumber(searchParams.get('min'));
  const maxPrice = parseOptionalNumber(searchParams.get('max'));
  const sortParam = searchParams.get('sort') ?? undefined;
  const page = parseOptionalNumber(searchParams.get('page'));

  const filters: ProductFilterOptions & { page?: number } = {
    query: query?.trim() || undefined,
    categorySlug: categorySlug?.trim() || undefined,
    themeSlug: themeSlug?.trim() || undefined,
    techStacks: techStacks.length ? techStacks : undefined,
    minPrice,
    maxPrice,
    sort: isValidSort(sortParam) ?? 'newest',
  };

  if (typeof page === 'number') {
    filters.page = page;
  }

  return filters;
}
// parseSearchParamsToFilters(new URLSearchParams('q=foo'));

export function filterAndSortProducts(
  products: Product[],
  options: ProductFilterOptions,
  context?: { categories?: Category[]; themes?: Theme[] },
) {
  const categories = context?.categories ?? [];
  const themes = context?.themes ?? [];

  const categoryMap = new Map(categories.map((category) => [category.slug, category.id]));
  const themeMap = new Map(themes.map((theme) => [theme.slug, theme.id]));

  const categoryId = options.categorySlug ? categoryMap.get(options.categorySlug) : undefined;
  const themeId = options.themeSlug ? themeMap.get(options.themeSlug) : undefined;
  const techSet = new Set((options.techStacks ?? []).map((tech) => tech.toLowerCase()));

  const filtered = products.filter((product) => {
    if (categoryId && !product.categoryIds.includes(categoryId)) return false;
    if (themeId && !product.themeIds.includes(themeId)) return false;

    if (techSet.size > 0) {
      const productStacks = product.stack.map((tech) => tech.toLowerCase());
      const hasAll = Array.from(techSet).every((tech) => productStacks.includes(tech));
      if (!hasAll) return false;
    }

    if (typeof options.minPrice === 'number' && product.priceCents < options.minPrice * 100) return false;
    if (typeof options.maxPrice === 'number' && product.priceCents > options.maxPrice * 100) return false;

    if (options.query) {
      const query = options.query.toLowerCase();
      const haystack = `${product.title} ${product.description}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });

  const sorted = [...filtered];
  switch (options.sort) {
    case 'price-asc':
      sorted.sort((a, b) => a.priceCents - b.priceCents);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.priceCents - a.priceCents);
      break;
    case 'rating':
      sorted.sort((a, b) => {
        if (b.rating === a.rating) {
          return b.reviewCount - a.reviewCount;
        }
        return b.rating - a.rating;
      });
      break;
    case 'newest':
    default:
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
  }

  return sorted;
}
// filterAndSortProducts([], { sort: 'newest' });

export function getTechStacks(list: Product[]) {
  const set = new Set<string>();
  list.forEach((product) => product.stack.forEach((tech) => set.add(tech)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function parseOptionalNumber(value: string | null) {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function isValidSort(value: string | undefined): ProductSort | undefined {
  if (!value) return undefined;
  const sorts: ProductSort[] = ['newest', 'price-asc', 'price-desc', 'rating'];
  return sorts.includes(value as ProductSort) ? (value as ProductSort) : undefined;
}

