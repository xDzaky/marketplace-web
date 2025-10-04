import Link from 'next/link';
import type { MouseEventHandler } from 'react';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type TechBadgeProps = {
  label: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: LucideIcon;
  className?: string;
};

export default function TechBadge({
  label,
  href,
  onClick,
  icon: Icon = TrendingUp,
  className,
}: TechBadgeProps) {
  const sharedClasses = cn(
    'inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-sky-400 hover:text-white',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={sharedClasses}>
        <Icon className="h-3.5 w-3.5 text-sky-300" aria-hidden />
        {label}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={sharedClasses}>
        <Icon className="h-3.5 w-3.5 text-sky-300" aria-hidden />
        {label}
      </button>
    );
  }

  return (
    <span className={sharedClasses}>
      <Icon className="h-3.5 w-3.5 text-sky-300" aria-hidden />
      {label}
    </span>
  );
}

