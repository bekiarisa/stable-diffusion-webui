import { ReactNode } from 'react';

export const PageHeader = ({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) => (
  <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
    <div>
      <h2 className="text-2xl font-bold text-brand-900">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
    </div>
    {actions}
  </div>
);
