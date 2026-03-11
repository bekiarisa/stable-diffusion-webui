import { Card, PageHeader } from '@/design/ui';

export const AdminPricingPage = () => (
  <div className="space-y-4">
    <PageHeader title="plans & pricing" subtitle="Edit subscription plans, one-off listing prices, commissions and featured durations." />
    <div className="grid gap-3 md:grid-cols-2">
      <Card>Owner Basic €12 · Host Pro €29 · Professional Visibility €19+</Card>
      <Card>One-off: long-term €5.90 · sale €8.90 · Pins 3/7/14 days</Card>
    </div>
  </div>
);
