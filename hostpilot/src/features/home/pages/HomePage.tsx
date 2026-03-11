import { Link } from 'react-router-dom';
import { Button, Card, PageHeader, StatTile } from '@/design/ui';
import { useI18n } from '@/i18n/i18nContext';

export const HomePage = () => {
  const { dict, lang } = useI18n();
  const roleCtas = [
    { to: '/app/owner', label: dict.roles.owner },
    { to: '/app/agent', label: dict.roles.agent },
    { to: '/app/professional', label: dict.roles.professional },
    { to: '/app/buyer', label: dict.roles.buyer },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={dict.home.title} subtitle={dict.home.subtitle} actions={<Link to="/role-entry"><Button>{dict.home.ctaPrimary}</Button></Link>} />
      <Card className="bg-brand-900 text-white">
        <p className="text-sm">{dict.home.launch}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {roleCtas.map((r) => <Link key={r.to} to={r.to}><Button variant="secondary" className="border-white/40 bg-white/10 text-white hover:bg-white/20">{r.label}</Button></Link>)}
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-3">
        <StatTile label={lang === 'el' ? 'Owner Basic' : 'Owner Basic'} value="€12" help={lang === 'el' ? 'Έως 2 ακίνητα + AI εργαλεία' : 'Up to 2 properties + AI tools'} />
        <StatTile label="Host Pro" value="€29" help={lang === 'el' ? 'Πλήρες operational workflow' : 'Advanced operations workflow'} />
        <StatTile label={lang === 'el' ? 'Professional Visibility' : 'Professional Visibility'} value="€19+" help={lang === 'el' ? 'Leads + προτεραιότητα αναζήτησης' : 'Leads + search priority'} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold">{lang === 'el' ? 'Για ποιους είναι το HostPilot' : 'Who HostPilot is for'}</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>{dict.roles.owner}</li>
            <li>{dict.roles.agent}</li>
            <li>{dict.roles.professional}</li>
            <li>{dict.roles.buyer}</li>
          </ul>
        </Card>
        <Card>
          <h3 className="font-semibold">{lang === 'el' ? 'Κύρια αξία προϊόντος' : 'Key product value'}</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>{lang === 'el' ? 'Ενιαίες αγγελίες για όλους τους modes ακινήτων' : 'Unified listing modes for all property use-cases'}</li>
            <li>{lang === 'el' ? 'Marketplace + AI dispatcher για λειτουργικές ανάγκες' : 'Marketplace + AI dispatcher for operational requests'}</li>
            <li>{lang === 'el' ? 'Κρατήσεις, commissions και επενδυτικές εκτιμήσεις' : 'Reservations, commissions and investment estimations'}</li>
          </ul>
        </Card>
      </section>
    </div>
  );
};
