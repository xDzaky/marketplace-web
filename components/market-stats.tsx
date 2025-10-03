'use client';

import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  type TooltipProps,
} from 'recharts';
import type { Category, MarketplaceStats, Product } from '@/lib/types';
import { Users, TrendingUp, Target, Award } from 'lucide-react';

type MarketStatsProps = {
  stats: MarketplaceStats;
  categories: Category[];
  products: Product[];
};

type ChartDatum = {
  category: string;
  deals: number;
  volume: number;
};

const STAT_CARDS = [
  {
    label: 'Total products',
    icon: Target,
    key: 'totalProducts' as const,
  },
  {
    label: 'Active sellers',
    icon: Users,
    key: 'totalSellers' as const,
  },
  {
    label: 'Lifetime downloads',
    icon: TrendingUp,
    key: 'totalDownloads' as const,
  },
  {
    label: 'Satisfaction rate',
    icon: Award,
    key: 'satisfactionRate' as const,
    suffix: '%',
  },
];

export default function MarketStats({ stats, categories, products }: MarketStatsProps) {
  const chartData: ChartDatum[] = categories
    .map((category) => {
      const relevantProducts = products.filter((product) => product.categoryIds.includes(category.id));
      const deals = relevantProducts.length;
      const volume =
        relevantProducts.reduce(
          (accumulator, product) => accumulator + product.totalSales * (product.priceCents / 100),
          0
        ) / 1000;

      return {
        category: category.name,
        deals,
        volume: Number(volume.toFixed(1)),
      };
    })
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 6);

  return (
    <section className="mt-24 space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">Market pulse</p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
            Live stats across the marketplace
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            We aggregate anonymized metrics from verified deals to surface where capital is flowing.
            Explore which categories are moving volume and how buyer demand is shifting week to week.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {STAT_CARDS.map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-blue-900/15 backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sky-200">
                <card.icon className="h-5 w-5" aria-hidden />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {card.label}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-white">
              {stats[card.key].toLocaleString()}
              {card.suffix ?? ''}
            </p>
            <p className="mt-2 text-xs text-slate-400">Updated daily at midnight UTC</p>
          </div>
        ))}
      </motion.div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-blue-900/15 backdrop-blur">
        <h3 className="text-lg font-semibold text-white">Category volume (k USD)</h3>
        <p className="mt-1 text-sm text-slate-300">
          Weighted by closed deal volume and average customer counts across verified transfers.
        </p>
        <div className="mt-6 h-80 text-slate-200">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid stroke="rgba(148, 163, 184, 0.2)" vertical={false} />
              <XAxis
                dataKey="category"
                tick={{ fill: '#cbd5f5', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(148,163,184,0.3)' }}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(59,130,246,0.1)' }} />
              <Bar radius={[8, 8, 0, 0]} dataKey="volume" fill="url(#market-gradient)" />
              <defs>
                <linearGradient id="market-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: { value?: number }[];
  label?: string;
};

function ChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const datum = payload[0];
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white shadow-lg shadow-blue-900/20 backdrop-blur">
      <p className="font-semibold">{label}</p>
      <p className="text-xs text-slate-300">Volume: ${datum.value?.toLocaleString()}k</p>
    </div>
  );
}
