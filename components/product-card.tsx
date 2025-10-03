import Image from 'next/image';
import Link from 'next/link';
import type { Category, Product, Store, Tag } from '@/lib/types';
import PriceTag from '@/components/price-tag';
import TechBadge from '@/components/tech-badge';
import CTAButtons from '@/components/cta-buttons';
import RatingStars from '@/components/rating-stars';
import { cn } from '@/lib/utils';

type ProductCardProps = {
  product: Product;
  store?: Store;
  categories?: Category[];
  tags?: Tag[];
  className?: string;
};

export default function ProductCard({ product, store, categories = [], tags = [], className }: ProductCardProps) {
  const stackItems = product.stack.slice(0, 3);
  const tagItems = tags.slice(0, 2);

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-lg shadow-blue-900/15 transition hover:border-sky-400/60',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={product.thumbnailUrl}
          alt={product.title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {product.featured ? (
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            Trending
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-3">
          {store ? <StoreBadge store={store} /> : null}
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        <div>
          <Link href={`/products/${product.slug}`} className="text-lg font-semibold text-white transition hover:text-sky-300">
            {product.title}
          </Link>
          <p className="mt-2 text-sm leading-relaxed text-slate-300 line-clamp-3">{product.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category.id} className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-slate-200">
              {category.name}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {stackItems.map((tech) => (
            <TechBadge key={tech} label={tech} href={`/products?tech=${encodeURIComponent(tech)}`} />
          ))}
          {tagItems.map((tag) => (
            <TechBadge key={tag.id} label={tag.name} href={`/products?tag=${encodeURIComponent(tag.slug)}`} />
          ))}
        </div>

        <ul className="space-y-2 text-sm text-slate-300">
          {product.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300" aria-hidden />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div className="space-y-1">
            <PriceTag cents={product.priceCents} currency={product.currency} />
            <span className="text-xs text-slate-400">{product.totalSales.toLocaleString()} lifetime customers</span>
          </div>
          <CTAButtons primaryHref={`/products/${product.slug}`} secondaryHref={store ? `/stores/${store.slug}` : undefined} />
        </div>
      </div>
    </article>
  );
}

function StoreBadge({ store }: { store: Store }) {
  return (
    <Link href={`/stores/${store.slug}`} className="flex items-center gap-2 text-sm text-slate-200">
      <span className="relative h-8 w-8 overflow-hidden rounded-full border border-white/10">
        <Image src={store.avatarUrl} alt={store.name} fill sizes="32px" className="object-cover" />
      </span>
      <span className="font-semibold transition hover:text-sky-300">{store.name}</span>
    </Link>
  );
}

