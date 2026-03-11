import { Card, PageHeader } from '@/design/ui';
import { useI18n } from '@/i18n/i18nContext';

export const AreasPage = () => {
  const { lang } = useI18n();
  return (
    <div className="space-y-4">
      <PageHeader
        title={lang === 'el' ? 'Περιοχές Εκκίνησης' : 'Launch Areas'}
        subtitle={lang === 'el' ? 'Η πλατφόρμα ξεκινά με λειτουργικό focus σε Θεσσαλονίκη και Χαλκιδική.' : 'Platform launches with operational focus on Thessaloniki and Halkidiki.'}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Card><h3 className="font-semibold">Thessaloniki</h3><p className="text-sm text-slate-600">Urban rentals, student/Erasmus demand, professional services.</p></Card>
        <Card><h3 className="font-semibold">Halkidiki</h3><p className="text-sm text-slate-600">Seasonal demand, short-term operations, investment and transfers.</p></Card>
      </div>
    </div>
  );
};
