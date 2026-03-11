import { Link } from 'react-router-dom';
import { Button, Card, PageHeader } from '@/design/ui';
import { useI18n } from '@/i18n/i18nContext';
import { useAuth } from '@/features/auth/authContext';

export const RoleEntryPage = () => {
  const { dict } = useI18n();
  const { switchRole } = useAuth();

  const options = [
    { key: 'owner_host', label: dict.roles.owner, to: '/app/owner' },
    { key: 'agent_property_manager', label: dict.roles.agent, to: '/app/agent' },
    { key: 'professional', label: dict.roles.professional, to: '/app/professional' },
    { key: 'buyer_investor', label: dict.roles.buyer, to: '/app/buyer' },
  ] as const;

  return (
    <div className="space-y-4">
      <PageHeader title={dict.roles.title} />
      <div className="grid gap-4 md:grid-cols-2">
        {options.map((o) => (
          <Card key={o.key} className="space-y-3">
            <h3 className="text-lg font-semibold">{o.label}</h3>
            <Link to={o.to}>
              <Button onClick={() => switchRole(o.key)}>{o.label}</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};
