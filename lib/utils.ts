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

export function parseSearchParamsToFilters(searchParams: URLSearchParams): ProductFilterOptions & { page?: number } {
  const query = searchParams.get('q') ?? undefined;
  const categorySlug = searchParams.get('category') ?? undefined;
  const themeSlug = searchParams.get('theme') ?? undefined;
  const techStacks = searchParams
    .getAll('tech')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
  const minPrice = parseOptionalNumber(searchParams.get('min'));
  const maxPrice = parseOptionalNumber(searchParams.get('max'));
  const sortParam = searchParams.get('sort') ?? undefined;
  const page = parseOptionalNumber(searchParams.get('page'));

  const filters: ProductFilterOptions & { page?: number } = {
    query: query?.trim() || undefined,
    categorySlug: categorySlug?.trim() || undefined,
    themeSlug: themeSlug?.trim() || undefined,
    techStacks: techStacks.length ? Array.from(new Set(techStacks)) : undefined,
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

  const { query, categorySlug, themeSlug, techStacks, minPrice, maxPrice, sort = 'newest' } = options;

  const categoryId = categorySlug ? categoryMap.get(categorySlug) : undefined;
  const themeId = themeSlug ? themeMap.get(themeSlug) : undefined;
  const techTokens = new Set((techStacks ?? []).map((tech) => tech.toLowerCase()));
  const searchTokens = query
    ? query
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
    : [];

  const filtered = products.filter((product) => {
    if (categoryId && !product.categoryIds.includes(categoryId)) return false;
    if (themeId && !product.themeIds.includes(themeId)) return false;

    if (techTokens.size > 0) {
      const productStacks = product.stack.map((tech) => tech.toLowerCase());
      const hasAll = Array.from(techTokens).every((tech) => productStacks.includes(tech));
      if (!hasAll) return false;
    }

    if (typeof minPrice === 'number' && product.priceCents < minPrice * 100) return false;
    if (typeof maxPrice === 'number' && product.priceCents > maxPrice * 100) return false;

    if (searchTokens.length > 0) {
      const haystack = `${product.title} ${product.description}`.toLowerCase();
      const matchesAll = searchTokens.every((token) => haystack.includes(token));
      if (!matchesAll) return false;
    }

    return true;
  });

  const sorted = [...filtered];
  switch (sort) {
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

/*
const _formatCurrencyCheck: string = formatCurrency(12500);
const _filtersCheck = parseSearchParamsToFilters(
  new URLSearchParams('q=ai&category=design&tech=react&tech=react&min=10&max=200&sort=rating&page=2'),
);
const _sortedCheck: Product[] = filterAndSortProducts([], { sort: 'newest' });
*/

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

