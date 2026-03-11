import { useEffect, useMemo, useState } from 'react';
import { Badge, Card, PageHeader } from '@/design/ui';
import { Property } from '@/core/types/domain';
import { listingService } from '@/services/listingService';
import { useI18n } from '@/i18n/i18nContext';

const allModes = ['all', 'long_term', 'short_term', 'flexible_mid_term', 'erasmus', 'sale', 'buy_request'] as const;

export const ListingsPage = () => {
  const { dict, lang } = useI18n();
  const [rows, setRows] = useState<Property[]>([]);
  const [mode, setMode] = useState<(typeof allModes)[number]>('all');

  useEffect(() => void listingService.getPublished().then(setRows), []);

  const filtered = useMemo(() => (mode === 'all' ? rows : rows.filter((r) => r.mode === mode)), [rows, mode]);

  return (
    <div className="space-y-4">
      <PageHeader title={dict.listings.title} subtitle={dict.listings.subtitle} />
      <Card className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {allModes.map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`rounded-lg px-3 py-1.5 text-sm ${mode === m ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
              {m}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-600">{dict.listings.media}</p>
      </Card>
      <div className="grid gap-4">
        {filtered.map((item) => (
          <Card key={item.id}>
            <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
              <img src={item.media.cover} alt={item.title.el} className="h-40 w-full rounded-xl object-cover" />
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="brand">{item.mode}</Badge>
                  <Badge>{item.city}</Badge>
                  <Badge tone={item.shortTermEnabled ? 'success' : 'warning'}>{item.shortTermEnabled ? 'short-term ON' : 'short-term OFF'}</Badge>
                </div>
                <h3 className="text-lg font-semibold">{lang === 'el' ? item.title.el : item.title.en}</h3>
                <p className="text-sm text-slate-600">{lang === 'el' ? item.description.el : item.description.en}</p>
                <p className="text-sm text-slate-600">{item.areaName} · {item.sqm}sqm · {item.bedrooms}BR / {item.bathrooms}BA</p>
                <p className="font-semibold text-brand-900">€{item.price.toLocaleString('el-GR')}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
