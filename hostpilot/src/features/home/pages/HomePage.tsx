import { Link } from 'react-router-dom';
import { Card, PageHeader, StatTile } from '@/design/ui';

export const HomePage = () => (
  <div className="space-y-5">
    <PageHeader
      title="HostPilot: Greek AI + Marketplace για real-estate operations"
      subtitle="Εκκίνηση σε Θεσσαλονίκη και Χαλκιδική με δίγλωσση αρχιτεκτονική (EL/EN)."
      actions={<Link className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white" to="/listings">Εξερεύνηση αγγελιών</Link>}
    />
    <section className="grid gap-4 md:grid-cols-3">
      <StatTile label="Owner Basic" value="€12/μήνα" help="Έως 2 ακίνητα + AI tools" />
      <StatTile label="Host Pro" value="€29/μήνα" help="Advanced workflows + tracking" />
      <StatTile label="Professional Visibility" value="από €19/μήνα" help="Leads + search boost" />
    </section>
    <Card>
      <h3 className="font-semibold">Launch coverage</h3>
      <p className="mt-2 text-sm text-slate-600">Υποστηρίζονται long-term, short-term, flexible/mid-term, Erasmus, sale και buy requests μαζί με AI dispatcher, reservation flow και επενδυτικό assistant.</p>
    </Card>
  </div>
);
