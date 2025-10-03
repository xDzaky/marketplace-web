'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BadgeCheck, ShieldCheck, Sparkles } from 'lucide-react';
import type { Category } from '@/lib/types';
import SearchBar from '@/components/search-bar';

type HeroProps = {
  categories: Category[];
};

const TRUST_POINTS = [
  { icon: ShieldCheck, label: 'Escrow-protected transfers' },
  { icon: BadgeCheck, label: 'Verified seller identities' },
  { icon: Sparkles, label: 'AI-powered deal screening' },
];

const FEATURED_BRANDS = ['Vanta', 'Zapier', 'Linear', 'Webflow', 'Segment', 'Figma'];

export default function Hero({ categories }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 py-16 shadow-2xl shadow-blue-900/20 backdrop-blur">
      <svg
        className="absolute inset-x-0 top-0 -z-10 h-[520px] w-full"
        viewBox="0 0 1440 520"
        aria-hidden
      >
        <defs>
          <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M0,240 C240,360 480,80 720,180 C960,280 1200,520 1440,360 L1440,0 L0,0 Z"
          fill="url(#hero-gradient)"
        />
      </svg>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-sky-200 shadow-lg shadow-sky-500/20"
        >
          <Sparkles className="h-4 w-4" aria-hidden />
          45,000+ founders trust Marketplace Web
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.55, ease: 'easeOut' }}
          className="mt-6 text-balance text-4xl font-semibold text-white md:text-5xl lg:text-6xl"
        >
          #1 Platform to Buy &amp; Sell Websites
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: 'easeOut' }}
          className="mt-6 max-w-2xl text-sm text-slate-200 md:text-base"
        >
          Discover vetted SaaS, e-commerce, and content businesses with transparent metrics, growth
          stories, and escrow-backed transactions. Close your next deal with confidence in record
          time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
          className="mt-10 w-full"
        >
          <SearchBar
            categories={categories}
            placeholder="Search by keyword, niche, or revenue..."
            action="/products"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-200"
        >
          {TRUST_POINTS.map((item) => (
            <div
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-md shadow-sky-500/10"
            >
              <item.icon className="h-4 w-4 text-sky-300" aria-hidden />
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
          className="mt-12 space-y-2 text-xs uppercase tracking-[0.2em] text-slate-400"
        >
          <p className="text-[10px] font-semibold">Trusted by teams scaling faster</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-300">
            {FEATURED_BRANDS.map((brand) => (
              <span key={brand} className="opacity-70">
                {brand}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55, ease: 'easeOut' }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:shadow-xl hover:shadow-blue-500/40"
          >
            View listings
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-400 hover:text-white"
          >
            Start selling
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
