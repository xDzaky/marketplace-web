import { cn, formatCurrency } from '@/lib/utils';

type PriceTagProps = {
  cents: number;
  currency?: string;
  className?: string;
  showCurrencyCode?: boolean;
  freeLabel?: string;
};

export default function PriceTag({
  cents,
  currency = 'USD',
  className,
  showCurrencyCode = false,
  freeLabel = 'Free',
}: PriceTagProps) {
  const isFree = cents <= 0;
  const formatted = isFree ? freeLabel : formatCurrency(cents, currency);

  return (
    <span className={cn('inline-flex items-baseline gap-1 text-lg font-semibold text-white', className)}>
      <span>{formatted}</span>
      {showCurrencyCode && !isFree ? (
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{currency}</span>
      ) : null}
    </span>
  );
}

