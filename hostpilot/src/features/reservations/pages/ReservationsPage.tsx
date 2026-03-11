import { useState } from 'react';
import { Badge, Card, PageHeader, Button } from '@/design/ui';
import { reservationService } from '@/services/reservationService';
import { commissionTiers } from '@/mocks/mockData';

export const ReservationsPage = () => {
  const [tier, setTier] = useState<(typeof commissionTiers)[number]['mode']>('launch_offer');
  const activeRate = commissionTiers.find((t) => t.mode === tier)?.rate ?? 12;
  const quote = reservationService.quote({ nights: 4, nightlyPrice: 120, cleaningFee: 35, commissionRate: activeRate });

  return (
    <div className="space-y-4">
      <PageHeader title="Short-term Reservation + Commission" subtitle="Inquiry → request → booking status → payment placeholder → availability blocking." />
      <Card>
        <h3 className="font-semibold">Flow status model</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {reservationService.getFlow().map((step) => <Badge key={step} tone="neutral">{step}</Badge>)}
        </div>
      </Card>
      <Card>
        <div className="flex flex-wrap items-center gap-2">
          {commissionTiers.map((t) => <Button key={t.mode} variant={tier === t.mode ? 'primary' : 'secondary'} onClick={() => setTier(t.mode)}>{t.mode} ({t.rate}%)</Button>)}
        </div>
        <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
          <p>Base: <strong>€{quote.baseAmount.toFixed(2)}</strong></p>
          <p>Cleaning: <strong>€{quote.cleaningFee.toFixed(2)}</strong></p>
          <p>Commission: <strong>€{quote.commissionAmount.toFixed(2)}</strong></p>
          <p>Payout: <strong>€{quote.payoutAmount.toFixed(2)}</strong></p>
        </div>
        <p className="mt-3 text-xs text-slate-500">Availability locking should be applied when status enters confirmed.</p>
      </Card>
    </div>
  );
};
