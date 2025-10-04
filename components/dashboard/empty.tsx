'use client';

import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';

type DashboardEmptyProps = {
  title: string;
  description?: string;
  announceRole?: 'status' | 'alert';
};

const roleToAriaLive: Record<'status' | 'alert', 'polite' | 'assertive'> = {
  status: 'polite',
  alert: 'assertive',
};

export default function DashboardEmpty({ title, description, announceRole = 'status' }: DashboardEmptyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-white/15 bg-slate-900/40 px-4 py-8 text-center"
      role={announceRole}
      aria-live={roleToAriaLive[announceRole]}
    >
      <Inbox className="h-8 w-8 text-slate-500" aria-hidden />
      <p className="text-sm font-semibold text-white">{title}</p>
      {description ? <p className="text-xs text-slate-400">{description}</p> : null}
    </motion.div>
  );
}

