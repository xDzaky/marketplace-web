'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ProductTab = {
  key: string;
  label: string;
  content: ReactNode;
};

type ProductTabsProps = {
  tabs: ProductTab[];
};

export default function ProductTabs({ tabs }: ProductTabsProps) {
  const [activeKey, setActiveKey] = useState(tabs[0]?.key ?? '');

  const activeTab = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveKey(tab.key)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              tab.key === activeKey
                ? 'border-sky-400 bg-sky-400/20 text-white shadow-md shadow-sky-500/30'
                : 'border-white/10 bg-slate-900/60 text-slate-200 hover:border-sky-400 hover:text-white'
            }`}
            aria-pressed={tab.key === activeKey}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab?.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-blue-900/15"
          >
            {activeTab?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
