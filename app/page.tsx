import Hero from '@/components/hero';
import TrustStrip from '@/components/trust-strip';
import QuickActions from '@/components/quick-actions';
import FeatureListings from '@/components/feature-listings';
import CategoryChips from '@/components/category-chips';
import TechBadge from '@/components/tech-badge';
import MarketStats from '@/components/market-stats';
import BlogCards, { type BlogPostCard } from '@/components/blog-cards';
import { categories, products, tags, stores, marketplaceStats } from '@/lib/dummy-data';
import { Handshake, Layers, Rocket } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium Digital Assets Marketplace — Buy & Sell Digital Products',
  description: 'Find high-quality web templates, source code, and digital services. Connect with verified sellers and buy with confidence using our secure escrow system.',
  alternates: {
    canonical: 'https://marketplace.web'
  },
  openGraph: {
    title: 'Premium Digital Assets Marketplace — Buy & Sell Digital Products',
    description: 'Find high-quality web templates, source code, and digital services. Connect with verified sellers and buy with confidence using our secure escrow system.',
  }
};

const techFilters = Array.from(new Set(products.flatMap((product) => product.stack))).slice(0, 10);

const blogPosts: BlogPostCard[] = [
  {
    id: 'blog-valuation',
    title: 'How to package your metrics for a premium valuation',
    excerpt:
      'Leverage cohort retention, LTV:CAC, and defensibility storytelling to negotiate higher multiples with serious buyers.',
    category: 'Playbook',
    author: 'Tania Carter',
    readingTime: '7 min read',
    publishedAt: 'Oct 1, 2024',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    href: '/blog/how-to-package-metrics',
  },
  {
    id: 'blog-diligence',
    title: 'The diligence checklist modern buyers expect in 2025',
    excerpt:
      'From SOC2-lite controls to AI content provenance, unpack the diligence signals that help you close faster.',
    category: 'Guides',
    author: 'Rahul Sharma',
    readingTime: '5 min read',
    publishedAt: 'Sep 21, 2024',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    href: '/blog/diligence-checklist',
  },
  {
    id: 'blog-trends',
    title: 'Marketplace trends: categories with the fastest MRR growth',
    excerpt:
      'We analyzed 3,200 closed deals to surface the verticals commanding the strongest growth and premium multiples.',
    category: 'Insights',
    author: 'Emily Cho',
    readingTime: '6 min read',
    publishedAt: 'Sep 10, 2024',
    image:
      'https://images.unsplash.com/photo-1520607162513-62b3a7d89414?auto=format&fit=crop&w=1200&q=80',
    href: '/blog/mrr-growth-trends',
  },
];

const howItWorks = [
  {
    title: 'Browse vetted listings',
    description:
      'Filter by monetization, stack, and revenue profile. Every listing ships with metrics, growth story, and verified identity.',
    icon: Layers,
  },
  {
    title: 'Connect securely',
    description:
      'Use escrow-backed chat, NDAs, and data rooms to evaluate operators. We keep conversations structured and audit-ready.',
    icon: Handshake,
  },
  {
    title: 'Close with confidence',
    description:
      'Escrow, Stripe payouts, and post-sale support ensure a clean handoff so both sides stay focused on what matters.',
    icon: Rocket,
  },
];

export default function HomePage() {
  return (
    <>
      <Hero categories={categories} />
      <TrustStrip />
      <QuickActions />
      <FeatureListings products={products} stores={stores} categories={categories} tags={tags} />

      <section className="mt-20 rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-10 shadow-xl shadow-blue-900/10 backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">
              Curated search presets
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Quick filters to jump into the right listings faster
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              Filter by business model or tech stack in a single tap. Each preset opens a refined
              marketplace view with live metrics, growth arcs, and diligence-ready documents.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-sky-400 hover:text-white"
          >
            Explore all filters
          </Link>
        </div>

        <div className="mt-8 space-y-6">
          <CategoryChips
            categories={categories}
            hrefBuilder={(slug) =>
              slug ? `/products?category=${encodeURIComponent(slug)}` : '/products'
            }
          />
          <div className="flex flex-wrap gap-2">
            {techFilters.map((tech) => (
              <TechBadge
                key={tech}
                label={tech}
                href={`/products?stack=${encodeURIComponent(tech.toLowerCase())}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">How it works</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            Ship a deal from first chat to closed-won in days, not months
          </h2>
          <p className="mt-4 text-sm text-slate-300">
            Our workflow mirrors the way modern operators build, evaluate, and acquire software
            businesses. Each step is guided with templates, guardrails, and embedded experts.
          </p>
        </div>
        <div className="space-y-6 lg:col-span-2">
          {howItWorks.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-blue-900/10 backdrop-blur sm:flex-row sm:items-start"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/20">
                <step.icon className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <MarketStats stats={marketplaceStats} categories={categories} products={products} />
      <BlogCards posts={blogPosts} />

      <section className="mt-24 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 px-8 py-12 shadow-2xl shadow-blue-500/30">
        <div className="max-w-4xl space-y-4 text-white">
          <p className="text-sm font-semibold uppercase tracking-wide">Get started today</p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Ready to sell or acquire your next digital business?
          </h2>
          <p className="text-sm md:text-base">
            Join thousands of founders navigating diligence, escrow, and post-sale transitions with
            Marketplace Web. Launch your listing or find your next acquisition in minutes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/20 transition hover:shadow-xl"
            >
              View listings
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Launch seller dashboard
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
