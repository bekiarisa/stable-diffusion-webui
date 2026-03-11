import { Card, PageHeader } from '@/design/ui';

export const RoleSectionPage = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="space-y-4">
    <PageHeader title={title} subtitle={subtitle} />
    <Card className="text-sm text-slate-700">{subtitle}</Card>
  </div>
);
