import Link from 'next/link';
import { ArrowUpRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

type CTAButtonsProps = {
  primaryHref: string;
  secondaryHref?: string;
  className?: string;
};

export default function CTAButtons({ primaryHref, secondaryHref, className }: CTAButtonsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Link
        href={primaryHref}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/30 transition hover:shadow-lg hover:shadow-blue-500/40"
      >
        View listing
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </Link>
      {secondaryHref ? (
        <Link
          href={secondaryHref}
          className="inline-flex items-center justify-center rounded-full border border-white/20 p-2 text-slate-200 transition hover:border-sky-400 hover:text-white"
          aria-label="Save listing"
        >
          <Heart className="h-4 w-4" aria-hidden />
        </Link>
      ) : null}
    </div>
  );
}

