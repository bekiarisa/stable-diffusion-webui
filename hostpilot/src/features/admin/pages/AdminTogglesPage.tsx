import { Card, PageHeader, Badge } from '@/design/ui';
import { adminToggles } from '@/mocks/mockData';

export const AdminTogglesPage = () => (
  <div className="space-y-4">
    <PageHeader title="System Toggles" subtitle="Registrations, listing modes, AI tools, marketplace, launch areas." />
    <div className="grid gap-3 md:grid-cols-2">
      {adminToggles.map((toggle) => (
        <Card key={toggle.key} className="flex items-center justify-between">
          <span className="text-sm">{toggle.key}</span>
          <Badge tone={toggle.enabled ? 'success' : 'warning'}>{toggle.enabled ? 'ON' : 'OFF'}</Badge>
        </Card>
      ))}
    </div>
  </div>
);
