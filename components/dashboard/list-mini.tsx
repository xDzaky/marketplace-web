'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export type DashboardListItem = {
  id: string;
  title: string;
  description?: string;
  href: string;
  meta?: string;
};

type DashboardListMiniProps = {
  title: string;
  subtitle?: string;
  items: DashboardListItem[];
  empty?: ReactNode;
  listRole?: 'list' | 'log';
  ariaLabel?: string;
  ariaLive?: 'polite' | 'assertive' | 'off';
};

export default function DashboardListMini({
  title,
  subtitle,
  items,
  empty,
  listRole = 'list',
  ariaLabel,
  ariaLive = 'off',
}: DashboardListMiniProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="glass-panel flex flex-col gap-4 p-5"
    >
      <div>
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {subtitle ? <p className="text-xs text-slate-400">{subtitle}</p> : null}
      </div>
      {items.length === 0 ? (
        empty ?? <p className="text-xs text-slate-400">Nothing to show yet.</p>
      ) : (
        <ul
          className="space-y-3"
          role={listRole === 'list' ? undefined : listRole}
          aria-live={ariaLive === 'off' ? undefined : ariaLive}
          aria-label={ariaLabel}
        >
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="block rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 transition hover:border-sky-400"
              >
                <div className="flex items-center justify-between gap-3 text-sm">
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    {item.description ? (
                      <p className="text-xs text-slate-400">{item.description}</p>
                    ) : null}
                  </div>
                  {item.meta ? <span className="text-xs text-slate-300">{item.meta}</span> : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  );
}

