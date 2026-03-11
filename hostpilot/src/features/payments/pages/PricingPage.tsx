import { Badge, Card, PageHeader } from '@/design/ui';
import { useI18n } from '@/i18n/i18nContext';

export const PricingPage = () => {
  const { lang } = useI18n();
  return (
    <div className="space-y-4">
      <PageHeader
        title={lang === 'el' ? 'Τιμολόγηση & Εμπορικό Μοντέλο' : 'Pricing & Commercial Model'}
        subtitle={lang === 'el' ? 'Συνδρομές, one-off αγγελίες, featured pins και commissions short-term.' : 'Subscriptions, one-off listings, featured pins and short-term commissions.'}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold">{lang === 'el' ? 'Συνδρομές' : 'Subscriptions'}</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>Owner Basic: €12</li>
            <li>Host Pro: €29</li>
            <li>Professional Visibility: €19+</li>
            <li>{lang === 'el' ? 'Dual role bundle έκπτωση' : 'Dual role bundle discount'}</li>
          </ul>
        </Card>
        <Card>
          <h3 className="font-semibold">{lang === 'el' ? 'One-off & commissions' : 'One-off & commissions'}</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>{lang === 'el' ? 'Long-term αγγελία: €4.90–€5.90' : 'Long-term listing: €4.90–€5.90'}</li>
            <li>{lang === 'el' ? 'Sale αγγελία: €7.90–€9.90' : 'Sale listing: €7.90–€9.90'}</li>
            <li>{lang === 'el' ? 'Commission tiers: 10% / 12% / 15%' : 'Commission tiers: 10% / 12% / 15%'}</li>
          </ul>
          <div className="mt-3 flex gap-2"><Badge tone="brand">3/7/14 pins</Badge><Badge tone="success">Launch ready</Badge></div>
        </Card>
      </div>
    </div>
  );
};
