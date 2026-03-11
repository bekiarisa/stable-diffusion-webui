import { useEffect, useState } from 'react';
import { Badge, Card, PageHeader } from '@/design/ui';
import { Property } from '@/core/types/domain';
import { listingService } from '@/services/listingService';

export const ListingsPage = () => {
  const [items, setItems] = useState<Property[]>([]);
  useEffect(() => void listingService.getPublished().then(setItems), []);

  return (
    <div className="space-y-4">
      <PageHeader title="Αγγελίες (ενοικίαση/πώληση/επένδυση)" subtitle="Bilingual-ready fields, media support και mode rules." />
      <Card className="bg-amber-50 text-amber-900">
        Κανόνας: αν ακίνητο είναι ενεργά long-term rented, το short-term mode πρέπει να απενεργοποιείται.
      </Card>
      <section className="grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const state = listingService.validateModeState(item);
          return (
            <Card key={item.id} className="p-0 overflow-hidden">
              <img src={item.media.cover} className="h-48 w-full object-cover" alt={item.title.el} />
              <div className="space-y-2 p-4">
                <div className="flex items-center justify-between"><Badge tone="brand">{item.mode}</Badge><span className="font-bold">€{item.price.toLocaleString('el-GR')}</span></div>
                <h3 className="font-semibold">{item.title.el}</h3>
                <p className="text-sm text-slate-600">{item.areaName}, {item.city} · {item.sqm}τμ · {item.bedrooms}ΥΔ/{item.bathrooms}ΜΠ</p>
                {!state.valid ? <Badge tone="warning">{state.reason}</Badge> : null}
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
};
