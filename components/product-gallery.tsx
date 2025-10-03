'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type ProductGalleryProps = {
  thumbnail: string;
  gallery: string[];
  title: string;
};

export default function ProductGallery({ thumbnail, gallery, title }: ProductGalleryProps) {
  const images = [thumbnail, ...gallery];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[activeIndex] ?? thumbnail}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex] ?? thumbnail}
              alt={`${title} preview ${activeIndex + 1}`}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 40vw"
              className="object-cover"
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {images.map((src, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border transition ${
                isActive
                  ? 'border-sky-400 ring-2 ring-sky-400'
                  : 'border-white/10 hover:border-sky-400'
              }`}
              aria-pressed={isActive}
            >
              <Image src={src} alt={`${title} thumbnail ${index + 1}`} fill sizes="112px" className="object-cover" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

