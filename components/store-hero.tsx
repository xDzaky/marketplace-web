'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Link as LinkIcon, Linkedin, Twitter } from 'lucide-react';
import type { Store } from '@/lib/types';
import RatingStars from '@/components/rating-stars';

type StoreHeroProps = {
  store: Store;
  totalListings: number;
};

export default function StoreHero({ store, totalListings }: StoreHeroProps) {
  const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    twitter: Twitter,
    github: Github,
    linkedin: Linkedin,
    website: LinkIcon,
    dribbble: LinkIcon,
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-blue-900/20 backdrop-blur"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-white/10">
            <Image src={store.avatarUrl} alt={store.name} fill sizes="96px" className="object-cover" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-white">{store.name}</h1>
            <p className="max-w-xl text-sm text-slate-300">{store.bio}</p>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <RatingStars rating={store.rating} reviewCount={store.reviewCount} />
              <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden />
              <span>{store.responseTime}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {store.socials.map((social) => {
                const Icon = socialIconMap[social.platform] ?? LinkIcon;
                return (
                  <Link
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-sky-400 hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    <span className="capitalize">{social.platform}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid flex-shrink-0 grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center text-sm text-slate-200">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Listings</p>
            <p className="mt-1 text-lg font-semibold text-white">{totalListings}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Sales</p>
            <p className="mt-1 text-lg font-semibold text-white">{store.totalSales.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Rating</p>
            <p className="mt-1 text-lg font-semibold text-white">{store.rating.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

