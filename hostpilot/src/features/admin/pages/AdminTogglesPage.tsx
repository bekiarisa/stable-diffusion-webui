import { useState } from 'react';
import { Badge, Button, Card, PageHeader } from '@/design/ui';
import { adminToggles } from '@/mocks/mockData';

export const AdminTogglesPage = () => {
  const [items, setItems] = useState(adminToggles);
  const flip = (key: string) => setItems((prev) => prev.map((x) => (x.key === key ? { ...x, enabled: !x.enabled } : x)));

  return (
    <div className="space-y-4">
      <PageHeader title="system toggles" subtitle="Enable/disable registrations, listing modes, AI modules, featured pins, and launch areas." />
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((toggle) => (
          <Card key={toggle.key} className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">{toggle.key}</p>
              <Badge tone={toggle.enabled ? 'success' : 'warning'}>{toggle.enabled ? 'enabled' : 'disabled'}</Badge>
            </div>
            <Button variant="secondary" onClick={() => flip(toggle.key)}>{toggle.enabled ? 'Disable' : 'Enable'}</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
