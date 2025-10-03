import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products, stores, categories, tags, themes } from '@/lib/dummy-data';
import type { Category, Store, Tag } from '@/lib/types';
import StoreHero from '@/components/store-hero';
import StoreTabs from '@/components/store-tabs';
import StoreFacts from '@/components/store-facts';
import SortSelect from '@/components/sort-select';
import ProductCard from '@/components/product-card';
import { filterAndSortProducts, parseSearchParamsToFilters, type ProductFilterOptions, type ProductSort } from '@/lib/utils';

type StorePageProps = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export function generateMetadata({ params }: StorePageProps): Metadata {
  const store = stores.find((item) => item.slug === params.slug);
  if (!store) {
    return { title: 'Store not found — Marketplace Web' };
  }

  return {
    title: `${store.name} — Marketplace Web`,
    description: store.bio,
  };
}

export default function StorePage({ params, searchParams }: StorePageProps) {
  const store = stores.find((item) => item.slug === params.slug);
  if (!store) {
    notFound();
  }

  const storeProducts = products.filter((product) => product.storeId === store.id);

  const urlParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => urlParams.append(key, entry));
    } else if (typeof value === 'string') {
      urlParams.set(key, value);
    }
  });

  const filterOptions = parseSearchParamsToFilters(urlParams);
  const sort = (filterOptions.sort ?? 'newest') as ProductSort;

  const filteredProducts = filterAndSortProducts(
    storeProducts,
    { sort } as ProductFilterOptions,
    { categories, themes },
  );

  const categoryMap = new Map<string, Category>(categories.map((category) => [category.id, category]));
  const tagMap = new Map<string, Tag>(tags.map((tag) => [tag.id, tag]));

  const listingsTab = (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-300">
          {filteredProducts.length} listing{filteredProducts.length === 1 ? '' : 's'} from this seller
        </p>
        <SortSelect value={sort} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            store={store}
            categories={product.categoryIds
              .map((id) => categoryMap.get(id))
              .filter(Boolean) as Category[]}
            tags={product.tagIds
              .map((id) => tagMap.get(id))
              .filter(Boolean) as Tag[]}
          />
        ))}
      </div>
    </div>
  );

  const aboutTab = (
    <div className="space-y-4 text-sm text-slate-200">
      <p className="leading-relaxed">{store.bio}</p>
      <ul className="grid gap-3 md:grid-cols-2">
        <Fact label="Primary focus" value={store.badges.join(', ')} />
        <Fact label="Response time" value={store.responseTime} />
        <Fact label="Region" value="Remote-first" />
        <Fact label="Social reach" value={`${store.socials.length} channels active`} />
      </ul>
    </div>
  );

  const reviewsTab = (
    <div className="space-y-4">
      {getStoreReviews(store).map((review) => (
        <div key={review.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">{review.author}</p>
              <p className="text-xs text-slate-400">{review.role}</p>
            </div>
            <p className="text-sm font-semibold text-white">{review.rating}/5</p>
          </div>
          <p className="mt-3 text-sm font-semibold text-white">{review.title}</p>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">{review.body}</p>
          <p className="mt-3 text-xs text-slate-500">{review.publishedAt}</p>
        </div>
      ))}
    </div>
  );

  const tabs = [
    { key: 'listings', label: 'Listings', content: listingsTab },
    { key: 'about', label: 'About', content: aboutTab },
    { key: 'reviews', label: 'Reviews', content: reviewsTab },
  ];

  return (
    <div className="space-y-10">
      <StoreHero store={store} totalListings={storeProducts.length} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr),300px]">
        <div className="space-y-6">
          <StoreTabs tabs={tabs} />
        </div>
        <div className="lg:sticky lg:top-24">
          <StoreFacts store={store} />
        </div>
      </div>
    </div>
  );
}
function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

type StoreReview = {
  id: string;
  author: string;
  role: string;
  rating: number;
  title: string;
  body: string;
  publishedAt: string;
};

function getStoreReviews(store: Store): StoreReview[] {
  return [
    {
      id: `${store.id}-rev-1`,
      author: 'Devon Lewis',
      role: 'Founder, Circuit Labs',
      rating: 5,
      title: 'Responsive and transparent',
      body:
        'Every question we had about metrics and customer handoff got a clear answer within the hour. Post-sale support was proactive and detailed.',
      publishedAt: 'August 3, 2024',
    },
    {
      id: `${store.id}-rev-2`,
      author: 'Sabrina Po',
      role: 'Growth Lead, OrbitStack',
      rating: 4,
      title: 'Quality deliverables',
      body:
        'Documentation shipped with the listing ensured we could redeploy infra in less than two days. Minor tweaks were handled via live call.',
      publishedAt: 'July 15, 2024',
    },
    {
      id: `${store.id}-rev-3`,
      author: 'Riko Matsuda',
      role: 'Operator, Horizon Ventures',
      rating: 5,
      title: 'Top-tier communication',
      body:
        'The seller shared Loom walkthroughs, diligence docs, and migration plans ahead of schedule. Zero gaps between promise and delivery.',
      publishedAt: 'June 27, 2024',
    },
  ];
}
