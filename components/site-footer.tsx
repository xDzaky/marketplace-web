'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const FOOTER_LINKS = [
  {
    title: 'Marketplace',
    links: [
      { label: 'Browse products', href: '/products' },
      { label: 'Featured stores', href: '/stores/stellarforge' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Seller handbook', href: '/docs/seller-handbook' },
      { label: 'Buyer protection', href: '/docs/buyer-protection' },
      { label: 'Support', href: '/support' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
];

export default function SiteFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="border-t border-white/10 bg-slate-950"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[2fr_3fr]">
          <div className="max-w-md">
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              Build your next launch faster.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Marketplace Web is the hub for production-ready web templates, premium source code, and
              boutique services curated for product teams. Join thousands of founders shipping their
              next release with confidence.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:border-blue-400 hover:text-white"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                  {group.title}
                </h4>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  {group.links.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="transition hover:text-white">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Marketplace Web. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/legal/terms" className="transition hover:text-white">
              Terms
            </Link>
            <Link href="/legal/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/legal/cookies" className="transition hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

