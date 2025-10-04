import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const maxWidthMap = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-[96rem]',
} as const;

type MaxWidthKey = keyof typeof maxWidthMap;

type ShellProps<T extends ElementType = 'div'> = {
  as?: T;
  children: ReactNode;
  className?: string;
  padded?: boolean;
  maxWidth?: MaxWidthKey;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export default function Shell<T extends ElementType = 'div'>({
  as,
  children,
  className,
  padded = true,
  maxWidth = 'lg',
  ...props
}: ShellProps<T>) {
  const Component = (as ?? 'div') as ElementType;

  return (
    <Component
      className={cn(
        'mx-auto w-full',
        maxWidthMap[maxWidth] ?? maxWidthMap.lg,
        padded && 'px-4 sm:px-6 lg:px-8',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

