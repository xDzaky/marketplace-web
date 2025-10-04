import Link from 'next/link';
import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

type CTAActionBase = {
  label: string;
  icon?: LucideIcon;
  ariaLabel?: string;
};

type CTAActionHref = CTAActionBase & { href: string; onClick?: never };
type CTAActionButton = CTAActionBase & {
  href?: never;
  onClick: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
};

type CTAAction = CTAActionHref | CTAActionButton;

type CTAButtonsProps = {
  primary: CTAAction;
  secondary?: CTAAction;
  className?: string;
};

export default function CTAButtons({ primary, secondary, className }: CTAButtonsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {renderAction(primary, 'primary')}
      {secondary ? renderAction(secondary, 'secondary') : null}
    </div>
  );
}

function renderAction(action: CTAAction, variant: 'primary' | 'secondary') {
  const { label, icon: Icon, ariaLabel } = action;
  const IconComponent = Icon ?? (variant === 'primary' ? ArrowUpRight : Heart);

  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 focus-visible:ring-offset-slate-900',
    variant === 'primary'
      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 text-white shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40'
      : 'border border-white/20 px-3 py-2 text-slate-200 hover:border-sky-400 hover:text-white',
  );

  if ('href' in action && typeof action.href === 'string') {
    return (
      <Link href={action.href} className={baseClasses} aria-label={ariaLabel}>
        <span>{label}</span>
        {IconComponent ? <IconComponent className="h-4 w-4" aria-hidden /> : null}
      </Link>
    );
  }

  return (
    <button type="button" onClick={action.onClick} className={baseClasses} aria-label={ariaLabel ?? label}>
      <span>{label}</span>
      {IconComponent ? <IconComponent className="h-4 w-4" aria-hidden /> : null}
    </button>
  );
}

