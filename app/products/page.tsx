import { categories, themes, tags, products, stores } from '@/lib/dummy-data';
import type { Category, Product, Tag } from '@/lib/types';
import {
  filterAndSortProducts,
  getTechStacks,
  parseSearchParamsToFilters,
  type ProductFilterOptions,
} from '@/lib/utils';
import ProductsSearchBar from '@/components/products-search-bar';
import FilterSidebar from '@/components/filter-sidebar';
import SortSelect from '@/components/sort-select';
import Pagination from '@/components/pagination';
import CategoryChips from '@/components/category-chips';
import ProductCard from '@/components/product-card';
import DashboardEmpty from '@/components/dashboard/empty';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketplace Web — Browse Listings',
  description: 'Search and filter vetted web businesses ready for acquisition on Marketplace Web.',
};

const PAGE_SIZE = 12;

type ProductsPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const urlParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => urlParams.append(key, entry));
    } else if (typeof value === 'string') {
      urlParams.set(key, value);
    }
  });

  const { page: pageParam = 1, ...filterOptions } = parseSearchParamsToFilters(urlParams);
  const filters: ProductFilterOptions = filterOptions;

  const filteredProducts = filterAndSortProducts(products, filters, { categories, themes });
  const techFilters = filters.techStacks ?? [];
  const categorySlug = filters.categorySlug;
  const themeSlug = filters.themeSlug;

  const totalResults = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const currentPage = Math.min(Math.max(pageParam, 1), totalPages);
  const paginatedProducts = paginate(filteredProducts, currentPage, PAGE_SIZE);

  const techStacks = getTechStacks(products);
  const tagsMap = new Map<string, Tag>(tags.map((tag) => [tag.id, tag]));
  const categoryMap = new Map<string, Category>(categories.map((category) => [category.id, category]));
  const minPrice = filters.minPrice;
  const maxPrice = filters.maxPrice;

  return (
    <div className="space-y-10">
      <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-blue-900/15 backdrop-blur">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">Marketplace</p>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">Explore live listings</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Filter by stack, monetization, and revenue profile to surface digital businesses that
              fit your acquisition thesis. Every listing includes metrics, diligence docs, and escrow
              workflow.
            </p>
          </div>
          <div className="text-sm text-slate-300">
            <span className="font-semibold text-white">{totalResults}</span> results • Page{' '}
            {currentPage} of {Math.max(totalPages, 1)}
          </div>
        </div>
        <ProductsSearchBar categories={categories} />
      </section>

      <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
        <div className="lg:sticky lg:top-28">
          <FilterSidebar
            categories={categories}
            themes={themes}
            techStacks={techStacks}
            selectedCategory={categorySlug}
            selectedTheme={themeSlug}
            selectedTechs={techFilters}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>

        <div className="space-y-8">
          <div className="sticky top-24 z-10 rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3 shadow-lg shadow-blue-900/15 backdrop-blur">
            <CategoryChips categories={categories} activeSlug={categorySlug} />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-slate-300">
              Showing{' '}
              <span className="font-semibold text-white">
                {paginatedProducts.length > 0
                  ? `${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(
                      currentPage * PAGE_SIZE,
                      totalResults,
                    )}`
                  : 0}
              </span>{' '}
              of <span className="font-semibold text-white">{totalResults}</span> listings
            </div>
            <SortSelect value={filters.sort ?? 'newest'} />
          </div>

          {paginatedProducts.length === 0 ? (
            <DashboardEmpty
              title="No listings match your filters"
              description="Try widening your price range or removing some tech stack filters to see more results."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedProducts.map((product) => {
                const productCategories = product.categoryIds
                  .map((id) => categoryMap.get(id))
                  .filter(Boolean) as Category[];
                const productTags = product.tagIds
                  .map((tagId) => tagsMap.get(tagId))
                  .filter(Boolean) as Tag[];

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    store={stores.find((store) => store.id === product.storeId)}
                    categories={productCategories}
                    tags={productTags}
                  />
                );
              })}
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

function paginate(list: Product[], page: number, pageSize: number): Product[] {
  const start = (page - 1) * pageSize;
  return list.slice(start, start + pageSize);
}
