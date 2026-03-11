import { Card, PageHeader, StatTile } from '@/design/ui';
import { useI18n } from '@/i18n/i18nContext';

export const AdminOverviewPage = () => {
  const { dict } = useI18n();
  return (
    <div className="space-y-4">
      <PageHeader title={dict.admin.title} subtitle={dict.admin.subtitle} />
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="users" value="4,820" help="active accounts" />
        <StatTile label="listings" value="1,132" help="published" />
        <StatTile label="requests" value="214" help="open" />
        <StatTile label="reservations" value="87" help="this week" />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card><h3 className="font-semibold">Operational control</h3><p className="mt-1 text-sm text-slate-600">Manage registrations, listing modes, AI modules, featured pins and launch-area switches from one place.</p></Card>
        <Card><h3 className="font-semibold">Commercial control</h3><p className="mt-1 text-sm text-slate-600">Plans, one-off prices, commission tiers and boost packages are editable via admin pricing controls.</p></Card>
      </div>
    </div>
  );
};
