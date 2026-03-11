import { HTMLAttributes } from 'react';
import { cn } from '@/core/utils/cn';

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('rounded-2xl border border-slate-200 bg-white p-5 shadow-soft', className)} {...props} />
);
