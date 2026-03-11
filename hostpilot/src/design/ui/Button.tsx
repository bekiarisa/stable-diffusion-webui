import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/core/utils/cn';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export const Button = ({ variant = 'primary', className, ...props }: Props) => (
  <button
    className={cn(
      'rounded-xl px-4 py-2 text-sm font-semibold transition',
      variant === 'primary' && 'bg-brand-600 text-white hover:bg-brand-700',
      variant === 'secondary' && 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50',
      variant === 'ghost' && 'text-slate-700 hover:bg-slate-100',
      className,
    )}
    {...props}
  />
);
