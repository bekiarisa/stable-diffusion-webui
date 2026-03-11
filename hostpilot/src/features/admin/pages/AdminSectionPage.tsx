import { Card, PageHeader } from '@/design/ui';

export const AdminSectionPage = ({ title }: { title: string }) => (
  <div className="space-y-4">
    <PageHeader title={title} subtitle={`Management workspace for ${title}.`} />
    <div className="grid gap-3 md:grid-cols-3">
      <Card><p className="text-xs text-slate-500">status</p><p className="font-semibold">healthy</p></Card>
      <Card><p className="text-xs text-slate-500">pending actions</p><p className="font-semibold">8</p></Card>
      <Card><p className="text-xs text-slate-500">last update</p><p className="font-semibold">today</p></Card>
    </div>
  </div>
);
