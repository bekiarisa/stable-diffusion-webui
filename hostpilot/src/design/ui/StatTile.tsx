import { Card } from '@/design/ui/Card';

export const StatTile = ({ label, value, help }: { label: string; value: string; help?: string }) => (
  <Card>
    <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-bold text-brand-900">{value}</p>
    {help ? <p className="mt-1 text-xs text-slate-500">{help}</p> : null}
  </Card>
);
