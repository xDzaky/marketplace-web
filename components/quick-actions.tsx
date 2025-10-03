'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ClipboardList, FileText, MessageSquare, Rocket, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const QUICK_CARDS = [
  {
    title: 'Sell a website',
    description: 'Publish your listing with metrics, story, and growth roadmap in minutes.',
    icon: Rocket,
    accent: 'from-blue-500 to-indigo-500',
    cta: { label: 'Launch seller dashboard', href: '/dashboard' },
    steps: [
      {
        title: 'Upload performance',
        description: 'Connect Stripe, Supabase, or upload P&L to auto-fill growth metrics.',
        icon: TrendingUp,
      },
      {
        title: 'Craft the pitch',
        description: 'Use AI prompts to summarize positioning, defensibility, and handoff plan.',
        icon: FileText,
      },
      {
        title: 'Go live & engage',
        description: 'Chat with verified buyers in escrow-backed rooms and manage offers.',
        icon: MessageSquare,
      },
    ],
  },
  {
    title: 'Buy a website',
    description: 'Filter, diligence, and close deals faster with escrow and guided workflows.',
    icon: ClipboardList,
    accent: 'from-cyan-400 to-blue-500',
    cta: { label: 'Browse live listings', href: '/products' },
    steps: [
      {
        title: 'Set your criteria',
        description: 'Pick revenue bands, stack, growth velocity, and strategic fit in minutes.',
        icon: ArrowRight,
      },
      {
        title: 'Request access',
        description: 'Sign NDAs, access private metrics, and sync with founders over secure chat.',
        icon: MessageSquare,
      },
      {
        title: 'Close with escrow',
        description: 'Stripe-managed escrow and migration templates keep handoffs bulletproof.',
        icon: Rocket,
      },
    ],
  },
];

export default function QuickActions() {
  return (
    <section className="mt-20 grid gap-6 lg:grid-cols-2">
      {QUICK_CARDS.map((card, cardIndex) => (
        <motion.article
          key={card.title}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: cardIndex * 0.1, duration: 0.55, ease: 'easeOut' }}
          className="glass-panel flex h-full flex-col overflow-hidden"
        >
          <div className={`rounded-t-3xl bg-gradient-to-br ${card.accent} px-6 py-6 text-white`}>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <card.icon className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-sm text-white/80">{card.description}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-5 p-6">
            {card.steps.map((step, index) => (
              <div key={step.title} className="flex gap-4 rounded-2xl border border-white/10 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/70 text-sky-200">
                  <step.icon className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Step {index + 1}
                  </p>
                  <h4 className="text-sm font-semibold text-white">{step.title}</h4>
                  <p className="text-sm text-slate-300">{step.description}</p>
                </div>
              </div>
            ))}

            <Link
              href={card.cta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              {card.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </motion.article>
      ))}
    </section>
  );
}

