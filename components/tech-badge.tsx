import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type TechBadgeProps = {
  label: string;
  href: string;
  className?: string;
};

export default function TechBadge({ label, href, className }: TechBadgeProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-sky-400 hover:text-white',
        className,
      )}
    >
      <TrendingUp className="h-3.5 w-3.5 text-sky-300" aria-hidden />
      {label}
    </Link>
  );
}

