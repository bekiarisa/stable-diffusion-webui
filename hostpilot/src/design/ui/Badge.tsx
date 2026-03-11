import { ReactNode } from 'react';
import { cn } from '@/core/utils/cn';

export const Badge = ({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'warning' | 'brand' }) => (
  <span className={cn(
    'rounded-full px-2.5 py-1 text-xs font-semibold',
    tone === 'neutral' && 'bg-slate-100 text-slate-700',
    tone === 'success' && 'bg-emerald-100 text-emerald-700',
    tone === 'warning' && 'bg-amber-100 text-amber-800',
    tone === 'brand' && 'bg-brand-100 text-brand-700',
  )}>{children}</span>
);
