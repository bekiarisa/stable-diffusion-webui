import { Card, PageHeader, Badge } from '@/design/ui';

export const PricingPage = () => (
  <div className="space-y-4">
    <PageHeader title="Commercial Model" subtitle="Subscriptions, one-off listings, featured pin durations και commission structure." />
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="font-semibold">Subscriptions</h3>
        <ul className="mt-2 space-y-1 text-sm text-slate-600">
          <li>Owner Basic: €12/μήνα (έως 2 ακίνητα)</li>
          <li>Host Pro: €29/μήνα</li>
          <li>Professional Visibility: από €19/μήνα</li>
          <li>Dual-role bundle: owner + professional discount</li>
        </ul>
      </Card>
      <Card>
        <h3 className="font-semibold">One-off listings + pins</h3>
        <ul className="mt-2 space-y-1 text-sm text-slate-600">
          <li>Long-term listing: €4.90–€5.90</li>
          <li>Sale listing: €7.90–€9.90</li>
          <li>Featured pin packages: 3 / 7 / 14 ημέρες</li>
        </ul>
        <div className="mt-3 flex gap-2"><Badge tone="brand">Launch</Badge><Badge tone="warning">Pricing editable από Admin</Badge></div>
      </Card>
    </div>
  </div>
);
