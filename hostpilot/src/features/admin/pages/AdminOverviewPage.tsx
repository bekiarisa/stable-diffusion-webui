import { Card, PageHeader, StatTile } from '@/design/ui';

export const AdminOverviewPage = () => (
  <div className="space-y-4">
    <PageHeader title="Admin Overview" subtitle="Users, listings, requests, reservations, payments, moderation." />
    <div className="grid gap-3 md:grid-cols-3">
      <StatTile label="Open service requests" value="24" />
      <StatTile label="Active listings" value="312" />
      <StatTile label="Short-term bookings" value="87" />
    </div>
    <Card>System-level controls για launch περιοχές, AI εργαλεία και monetization settings.</Card>
  </div>
);
