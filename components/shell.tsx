import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ShellProps = {
  children: ReactNode;
  className?: string;
};

export default function Shell({ children, className }: ShellProps) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8', className)}>{children}</div>;
}

