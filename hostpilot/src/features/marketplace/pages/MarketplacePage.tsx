import { useEffect, useState } from 'react';
import { Badge, Card, PageHeader } from '@/design/ui';
import { Professional } from '@/core/types/domain';
import { marketplaceService } from '@/services/marketplaceService';
import { useI18n } from '@/i18n/i18nContext';

export const MarketplacePage = () => {
  const { lang } = useI18n();
  const [pros, setPros] = useState<Professional[]>([]);
  useEffect(() => void marketplaceService.getProfessionals().then(setPros), []);

  return (
    <div className="space-y-4">
      <PageHeader
        title={lang === 'el' ? 'Marketplace Επαγγελματιών' : 'Professional Marketplace'}
        subtitle={lang === 'el' ? 'Όλη η πρώτη επικοινωνία γίνεται εντός πλατφόρμας.' : 'All first contact happens inside the platform.'}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {pros.map((pro) => (
          <Card key={pro.id}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">{pro.category}</h3>
              <Badge tone={pro.paidVisibility ? 'success' : 'neutral'}>{pro.paidVisibility ? (lang === 'el' ? 'Πληρωμένη προβολή' : 'Paid visibility') : (lang === 'el' ? 'Free preview' : 'Free preview')}</Badge>
            </div>
            <p className="text-sm text-slate-600">{pro.city} · {pro.serviceAreas.join(', ')}</p>
            <p className="mt-2 text-xs text-slate-500">Emergency: {pro.emergencyAvailable ? 'Yes' : 'No'} · Same-day: {pro.sameDayJobs ? 'Yes' : 'No'}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
