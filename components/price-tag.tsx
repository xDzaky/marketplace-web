import { cn, formatCurrency } from '@/lib/utils';

type PriceTagProps = {
  cents: number;
  currency?: string;
  className?: string;
};

export default function PriceTag({ cents, currency = 'USD', className }: PriceTagProps) {
  return <span className={cn('text-lg font-semibold text-white', className)}>{formatCurrency(cents, currency)}</span>;
}

