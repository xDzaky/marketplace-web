'use client';

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  CartesianGrid,
  type TooltipProps,
} from 'recharts';
import { motion } from 'framer-motion';

export type RevenuePoint = {
  month: string;
  amount: number;
};

type RevenueCardProps = {
  title: string;
  subtitle?: string;
  data: RevenuePoint[];
};

export default function RevenueCard({ title, subtitle, data }: RevenueCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="glass-panel col-span-full flex flex-col gap-4 p-6 lg:col-span-2"
    >
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle ? <p className="text-xs text-slate-400">{subtitle}</p> : null}
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="dashboardRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<RevenueTooltip />} cursor={{ stroke: 'rgba(56,189,248,0.4)' }} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#38bdf8"
              strokeWidth={2}
              fill="url(#dashboardRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-slate-300">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-sky-400" aria-hidden />
          MRR growth
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1">
          <span className="font-semibold text-white">
            ${data.at(-1)?.amount?.toLocaleString() ?? '0'}
          </span>
          trailing month volume
        </span>
      </div>
    </motion.section>
  );
}

type RevenueTooltipProps = TooltipProps<number, string> & {
  payload?: { value?: number }[];
  label?: string;
};

function RevenueTooltip({ active, payload, label }: RevenueTooltipProps) {
  if (!active || !payload?.length) return null;
  const value = payload[0]?.value ?? 0;
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-white shadow-lg shadow-blue-900/20 backdrop-blur">
      <p className="font-semibold">{label}</p>
      <p>${Number(value).toLocaleString()}</p>
    </div>
  );
}
