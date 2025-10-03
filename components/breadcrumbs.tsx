'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-xs" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-slate-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const content = item.href && !isLast ? (
            <Link
              href={item.href}
              className="rounded-full border border-white/10 bg-slate-900/40 px-2 py-1 text-slate-200 transition hover:border-sky-400 hover:text-white"
            >
              {item.label}
            </Link>
          ) : (
            <span className="rounded-full border border-white/5 bg-slate-900/40 px-2 py-1 text-white">
              {item.label}
            </span>
          );

          return (
            <motion.li key={`${item.label}-${index}`} layout className="flex items-center gap-1">
              {content}
              {!isLast ? <ChevronRight className="h-4 w-4 text-slate-600" aria-hidden /> : null}
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}

