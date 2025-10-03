'use client';

import { motion } from 'framer-motion';
import { Award, BarChart3, ShieldCheck, Users } from 'lucide-react';

const TRUST_METRICS = [
  {
    label: 'Average rating',
    value: '4.9 / 5',
    description: 'Based on 1,200+ verified reviews',
    icon: Award,
  },
  {
    label: 'Closed volume',
    value: '$550M+',
    description: 'Total deal value completed on platform',
    icon: BarChart3,
  },
  {
    label: 'Active buyers',
    value: '32,000',
    description: 'Founder-led teams ready to acquire',
    icon: Users,
  },
  {
    label: 'Deal protection',
    value: 'Escrow & KYB',
    description: 'Stripe powered payouts & verification',
    icon: ShieldCheck,
  },
];

export default function TrustStrip() {
  return (
    <section className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="grid gap-4 rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-6 shadow-lg shadow-blue-900/10 backdrop-blur sm:grid-cols-2 lg:grid-cols-4"
      >
        {TRUST_METRICS.map((metric) => (
          <div key={metric.label} className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/20">
              <metric.icon className="h-6 w-6" aria-hidden />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {metric.label}
              </p>
              <p className="mt-1 text-lg font-semibold text-white">{metric.value}</p>
              <p className="text-sm text-slate-300">{metric.description}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

