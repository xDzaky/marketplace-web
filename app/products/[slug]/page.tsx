import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  categories as allCategories,
  themes as allThemes,
  tags as allTags,
  products,
  stores,
} from '@/lib/dummy-data';
import type { Category, Product, Tag } from '@/lib/types';
import ProductGallery from '@/components/product-gallery';
import StickyBuyPanel from '@/components/sticky-buy-panel';
import Breadcrumbs from '@/components/breadcrumbs';
import RatingStars from '@/components/rating-stars';
import ProductTabs, { type ProductTab } from '@/components/product-tabs';
import ProductCard from '@/components/product-card';
import TechBadge from '@/components/tech-badge';

type ProductPageProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) {
    return { title: 'Listing not found — Marketplace Web' };
  }

  return {
    title: `${product.title} — Marketplace Web`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) {
    notFound();
  }

  const store = stores.find((item) => item.id === product.storeId);
  if (!store) {
    notFound();
  }

  const categoryMap = new Map<string, Category>(allCategories.map((category) => [category.id, category]));
  const tagMap = new Map<string, Tag>(allTags.map((tag) => [tag.id, tag]));

  const similarListings = getSimilarListings(product);

  const reviews = getSampleReviews(product);

  return (
    <div className="space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.title },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr),minmax(280px,360px)]">
        <div className="space-y-8">
          <ProductGallery thumbnail={product.thumbnailUrl} gallery={product.gallery} title={product.title} />

          <ProductTabs tabs={buildTabs(product, reviews)} />

          <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-blue-900/15">
            <h2 className="text-xl font-semibold text-white">What you&apos;ll get</h2>
            <ul className="mt-4 grid gap-3 text-sm text-slate-200 md:grid-cols-2">
              {product.highlights.concat(EXTRA_DELIVERABLES).slice(0, 8).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-blue-900/15">
            <h2 className="text-xl font-semibold text-white">Tech stack</h2>
            <p className="mt-2 text-sm text-slate-300">
              Built with modern frameworks and services. Extend or replace integrations with minimal effort.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.stack.map((tech) => (
                <TechBadge key={tech} label={tech} href={`/products?tech=${encodeURIComponent(tech)}`} />
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-blue-900/15">
            <h2 className="text-xl font-semibold text-white">Live demo</h2>
            <p className="mt-2 text-sm text-slate-300">
              Explore the experience buyers will receive before migrating.
            </p>
            <a
              href={product.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-sky-400 hover:text-white"
            >
              Visit demo
              <span aria-hidden>↗</span>
            </a>
          </section>
        </div>

        <StickyBuyPanel product={product} store={store} />
      </div>

      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-blue-900/15">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">Similar listings</p>
            <h2 className="text-2xl font-semibold text-white">You might also like</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {similarListings.map((similar) => (
            <ProductCard
              key={similar.id}
              product={similar}
              store={stores.find((item) => item.id === similar.storeId)}
              categories={similar.categoryIds
                .map((id) => categoryMap.get(id))
                .filter(Boolean) as Category[]}
              tags={similar.tagIds
                .map((id) => tagMap.get(id))
                .filter(Boolean) as Tag[]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

const EXTRA_DELIVERABLES = [
  'Figma design source files and component tokens',
  'Playbook for go-to-market launch and onboarding',
  'Escrow-ready asset checklist for migration',
  'Customer retention email journeys powered by Resend',
];

type Review = {
  id: string;
  author: string;
  role: string;
  rating: number;
  title: string;
  body: string;
  publishedAt: string;
};

function getSampleReviews(product: Product): Review[] {
  return [
    {
      id: `${product.id}-rev-1`,
      author: 'Alya Rahman',
      role: 'Founder, FlowOps',
      rating: 5,
      title: 'Migration-ready from day one',
      body:
        'The codebase is immaculate and every integration from Stripe to Supabase came documented. We shipped new onboarding flows within a week of handoff.',
      publishedAt: 'August 14, 2024',
    },
    {
      id: `${product.id}-rev-2`,
      author: 'Marcelo Wong',
      role: 'Principal, Northbound Labs',
      rating: 5,
      title: 'Exceeded diligence checklist',
      body:
        'Seller shared cohort metrics, churn drivers, and automation docs up front. Escrow closed in 6 days with zero surprises.',
      publishedAt: 'July 28, 2024',
    },
    {
      id: `${product.id}-rev-3`,
      author: 'Grace Tan',
      role: 'Growth PM, Bridge AI',
      rating: 4,
      title: 'Clear path to scale revenue',
      body:
        'We plugged into the analytics stack on day one and the expansion roadmap made it simple to prioritize monetization experiments.',
      publishedAt: 'June 9, 2024',
    },
  ];
}

function getSimilarListings(product: Product): Product[] {
  const categoryIds = new Set(product.categoryIds);
  const ranked = products
    .filter((item) => item.id !== product.id)
    .map((item) => {
      const sharedCategories = item.categoryIds.filter((id) => categoryIds.has(id)).length;
      return {
        item,
        score: sharedCategories * 3 + item.rating * 2 + item.totalSales / 1000,
      };
    })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);

  return ranked.slice(0, 4);
}
function buildTabs(product: Product, reviews: Review[]): ProductTab[] {
  return [
    {
      key: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-4 text-sm text-slate-200">
          <p className="leading-relaxed">{product.description}</p>
          <p>
            Built by <strong>{product.stack[0]}</strong> veterans and proven across{' '}
            {product.totalSales.toLocaleString()} lifetime customers.
          </p>
        </div>
      ),
    },
    {
      key: 'tech',
      label: 'Tech',
      content: (
        <ul className="grid gap-3 text-sm text-slate-200">
          {product.stack.map((tech) => (
            <li key={tech} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300" aria-hidden />
              <span>{tech}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: 'license',
      label: 'License',
      content: (
        <div className="space-y-3 text-sm text-slate-200">
          <p>
            This listing includes both single-use and extended commercial licenses. Transfer of IP,
            domains, and brand assets is handled during escrow with structured checklists.
          </p>
          <ul className="grid gap-2 text-sm text-slate-200">
            <li>✔ Commercial use for unlimited projects</li>
            <li>✔ Twelve months of security updates</li>
            <li>✔ Escrow-backed legal agreement templates</li>
          </ul>
        </div>
      ),
    },
    {
      key: 'reviews',
      label: `Reviews (${reviews.length})`,
      content: (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-white">{review.author}</p>
                  <p className="text-xs text-slate-400">{review.role}</p>
                </div>
                <RatingStars rating={review.rating} showCount={false} />
              </div>
              <p className="mt-3 text-sm font-semibold text-white">{review.title}</p>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{review.body}</p>
              <p className="mt-3 text-xs text-slate-500">{review.publishedAt}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];
}
