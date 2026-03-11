import { useEffect, useState } from 'react';
import { Badge, Card, PageHeader } from '@/design/ui';
import { Professional } from '@/core/types/domain';
import { marketplaceService } from '@/services/marketplaceService';

export const MarketplacePage = () => {
  const [pros, setPros] = useState<Professional[]>([]);
  useEffect(() => void marketplaceService.getProfessionals().then(setPros), []);

  return (
    <div className="space-y-4">
      <PageHeader title="Professional Marketplace" subtitle="Free preview χωρίς δημόσια στοιχεία επικοινωνίας. Όλα τα first contacts in-platform." />
      <div className="grid gap-4 md:grid-cols-2">
        {pros.map((pro) => (
          <Card key={pro.id}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">{pro.category}</h3>
              <Badge tone={pro.paidVisibility ? 'success' : 'neutral'}>{pro.paidVisibility ? 'Paid visibility' : 'Free preview'}</Badge>
            </div>
            <p className="text-sm text-slate-600">{pro.city} · Περιοχές: {pro.serviceAreas.join(', ')}</p>
            <p className="mt-2 text-xs text-slate-500">Emergency: {pro.emergencyAvailable ? 'Ναι' : 'Όχι'} · Same-day: {pro.sameDayJobs ? 'Ναι' : 'Όχι'}</p>
            {pro.freePreview ? <p className="mt-2 text-xs text-amber-700">Τα direct contact στοιχεία μένουν κρυφά στο free preview.</p> : null}
          </Card>
        ))}
      </div>
    </div>
  );
};
