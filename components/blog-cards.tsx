'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export type BlogPostCard = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readingTime: string;
  publishedAt: string;
  image: string;
  href: string;
};

type BlogCardsProps = {
  posts: BlogPostCard[];
};

export default function BlogCards({ posts }: BlogCardsProps) {
  return (
    <section className="mt-24 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">
            Marketplace playbooks
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
            Insights from acquisitions we help close
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            Each week we unpack tactics from founders and buyers scaling profitable internet
            businesses—from growth strategy to post-sale integration frameworks.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-sky-400 hover:text-white"
        >
          View all posts
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-lg shadow-blue-900/15 transition hover:border-sky-400/60"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900">
                {post.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="text-xs text-slate-400">
                <span>{post.publishedAt}</span>
                <span className="mx-2">•</span>
                <span>{post.readingTime}</span>
              </div>
              <Link
                href={post.href}
                className="text-lg font-semibold text-white transition hover:text-sky-300"
              >
                {post.title}
              </Link>
              <p className="text-sm leading-relaxed text-slate-300">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between text-sm text-slate-400">
                <span>By {post.author}</span>
                <ArrowUpRight className="h-4 w-4 opacity-70 transition group-hover:opacity-100" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
