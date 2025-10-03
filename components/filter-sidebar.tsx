'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Category, Theme } from '@/lib/types';

type FilterSidebarProps = {
  categories: Category[];
  themes: Theme[];
  techStacks: string[];
  selectedCategory?: string;
  selectedTheme?: string;
  selectedTechs: string[];
  minPrice?: number;
  maxPrice?: number;
};

export default function FilterSidebar(props: FilterSidebarProps) {
  const {
    categories,
    themes,
    techStacks,
    selectedCategory,
    selectedTheme,
    selectedTechs,
    minPrice,
    maxPrice,
  } = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [minInput, setMinInput] = useState(minPrice?.toString() ?? '');
  const [maxInput, setMaxInput] = useState(maxPrice?.toString() ?? '');

  useEffect(() => {
    setMinInput(minPrice?.toString() ?? '');
  }, [minPrice]);

  useEffect(() => {
    setMaxInput(maxPrice?.toString() ?? '');
  }, [maxPrice]);

  const selectedTechSet = useMemo(() => new Set(selectedTechs), [selectedTechs]);

  const updateParams = (updater: (params: URLSearchParams) => void) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      updater(params);
      params.delete('page');
      router.push(params.size ? `?${params.toString()}` : '?', { scroll: false });
    });
  };

  const handleCategoryChange = (slug?: string) => {
    updateParams((params) => {
      if (slug) {
        params.set('category', slug);
      } else {
        params.delete('category');
      }
    });
  };

  const handleThemeChange = (slug?: string) => {
    updateParams((params) => {
      if (slug) {
        params.set('theme', slug);
      } else {
        params.delete('theme');
      }
    });
  };

  const handleTechToggle = (tech: string) => {
    updateParams((params) => {
      const current = new Set(params.getAll('tech'));
      if (current.has(tech)) {
        current.delete(tech);
      } else {
        current.add(tech);
      }
      params.delete('tech');
      current.forEach((value) => params.append('tech', value));
    });
  };

  const applyPriceRange = () => {
    updateParams((params) => {
      if (minInput) {
        params.set('min', minInput);
      } else {
        params.delete('min');
      }
      if (maxInput) {
        params.set('max', maxInput);
      } else {
        params.delete('max');
      }
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      ['category', 'theme', 'tech', 'min', 'max', 'page'].forEach((key) => params.delete(key));
      router.push(params.size ? `?${params.toString()}` : '?', { scroll: false });
    });
  };

  return (
    <aside className="glass-panel flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-sky-300">Filters</h2>
          <p className="text-xs text-slate-400">Refine listings to match your acquisition thesis.</p>
        </div>
        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-semibold text-slate-300 transition hover:text-white"
          disabled={isPending}
        >
          Reset
        </button>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Category
        </legend>
        <CategoryOption
          name="category-filter"
          label="All categories"
          value=""
          checked={!selectedCategory}
          onChange={() => handleCategoryChange(undefined)}
        />
        {categories.map((category) => (
          <CategoryOption
            key={category.id}
            name="category-filter"
            label={category.name}
            value={category.slug}
            checked={selectedCategory === category.slug}
            onChange={() => handleCategoryChange(category.slug)}
          />
        ))}
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-semibold uppercase tracking-wide text-slate-400">Theme</legend>
        <CategoryOption
          name="theme-filter"
          label="All themes"
          value=""
          checked={!selectedTheme}
          onChange={() => handleThemeChange(undefined)}
        />
        {themes.map((theme) => (
          <CategoryOption
            key={theme.id}
            name="theme-filter"
            label={theme.name}
            value={theme.slug}
            checked={selectedTheme === theme.slug}
            onChange={() => handleThemeChange(theme.slug)}
          />
        ))}
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Tech stack
        </legend>
        <div className="grid grid-cols-1 gap-2">
          {techStacks.map((tech) => (
            <label key={tech} className="flex items-center gap-2 text-sm text-slate-200">
              <input
                type="checkbox"
                name="tech"
                value={tech}
                checked={selectedTechSet.has(tech)}
                onChange={() => handleTechToggle(tech)}
                className="h-4 w-4 rounded border-white/20 bg-slate-900/50 text-sky-400 focus:ring-sky-400"
              />
              {tech}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Price range (USD)
        </legend>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <label htmlFor="min-price" className="text-xs text-slate-400">
              Min
            </label>
            <input
              id="min-price"
              type="number"
              inputMode="numeric"
              min={0}
              value={minInput}
              onChange={(event) => setMinInput(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="max-price" className="text-xs text-slate-400">
              Max
            </label>
            <input
              id="max-price"
              type="number"
              inputMode="numeric"
              min={0}
              value={maxInput}
              onChange={(event) => setMaxInput(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={applyPriceRange}
          className="w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/30 transition hover:shadow-lg hover:shadow-blue-500/40"
          disabled={isPending}
        >
          Apply range
        </button>
      </fieldset>
    </aside>
  );
}

type CategoryOptionProps = {
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
};

function CategoryOption({ name, label, value, checked, onChange }: CategoryOptionProps) {
  return (
    <label className="flex items-center gap-3 text-sm text-slate-200">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 border-white/20 text-sky-400 focus:ring-sky-400"
      />
      {label}
    </label>
  );
}
