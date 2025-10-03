'use client';

import { Star } from 'lucide-react';
import clsx from 'clsx';

type RatingStarsProps = {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
};

export default function RatingStars({ rating, reviewCount, showCount = true }: RatingStarsProps) {
  const rounded = Math.round(rating);

  return (
    <div className="flex items-center gap-1 text-sm text-slate-200">
      <div className="flex items-center" aria-hidden>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={clsx('h-4 w-4', index < rounded ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600')}
          />
        ))}
      </div>
      <span className="font-semibold" aria-label={`Rating ${rating.toFixed(1)} out of 5`}>
        {rating.toFixed(1)}
      </span>
      {showCount && typeof reviewCount === 'number' ? (
        <span className="text-xs text-slate-400">({reviewCount.toLocaleString()} reviews)</span>
      ) : null}
    </div>
  );
}

