import { Card, PageHeader } from '@/design/ui';
import { useI18n } from '@/i18n/i18nContext';

export const FeaturesPage = () => {
  const { lang } = useI18n();
  const title = lang === 'el' ? 'Βασικές Δυνατότητες' : 'Core Capabilities';
  const subtitle = lang === 'el'
    ? 'AI εργαλεία, αγγελίες, marketplace επαγγελματιών, κρατήσεις και επενδυτική υποστήριξη.'
    : 'AI tools, listings, professional marketplace, reservations, and investment support.';
  const items = lang === 'el'
    ? ['AI Property Tools', 'Listing modes (LT/ST/Flexible/Erasmus/Sale/Buy requests)', 'Professional marketplace + dispatcher', 'Reservation and commission flows', 'Admin control center']
    : ['AI Property Tools', 'Listing modes (LT/ST/Flexible/Erasmus/Sale/Buy requests)', 'Professional marketplace + dispatcher', 'Reservation and commission flows', 'Admin control center'];

  return (
    <div className="space-y-4">
      <PageHeader title={title} subtitle={subtitle} />
      <Card>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </Card>
    </div>
  );
};
