'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Sparkles, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/stores/stellarforge', label: 'Stores' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      role="banner"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-lg"
    >
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:block focus-visible:rounded-lg focus-visible:bg-sky-500 focus-visible:px-4 focus-visible:py-2 focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Marketplace Web home">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30">
            <Sparkles className="h-5 w-5 text-white" aria-hidden />
          </div>
          <span className="text-lg font-semibold tracking-tight md:text-xl">
            Marketplace <span className="text-blue-300">Web</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                  active ? 'text-white' : 'text-slate-300'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/auth/sign-in"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-blue-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/30 transition hover:shadow-lg hover:shadow-blue-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Launch dashboard
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-200 transition hover:border-blue-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            aria-label="Mobile navigation"
            role="navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-t border-white/5 bg-slate-950/95 px-4 pb-6 pt-4 md:hidden"
          >
            <div className="flex flex-col gap-3 text-base font-medium text-slate-200">
              {NAV_LINKS.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3 py-2 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                      active ? 'bg-white/10 text-white' : 'text-slate-300'
                    }`}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/auth/sign-in"
                className="rounded-full border border-white/15 px-4 py-2 text-center text-sm font-medium text-slate-200 transition hover:border-blue-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 px-4 py-2 text-center text-sm font-semibold text-white shadow-md shadow-blue-500/30 transition hover:shadow-lg hover:shadow-blue-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                onClick={() => setIsOpen(false)}
              >
                Launch dashboard
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

