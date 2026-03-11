import { Card, PageHeader, Badge } from '@/design/ui';
import { useI18n } from '@/i18n/i18nContext';

const categories = ['Airbnb cleaners', 'Electricians', 'Plumbers', 'Engineers', 'Lawyers', 'Notaries', 'Accountants', 'Property photographers'];

export const CategoriesPage = () => {
  const { lang } = useI18n();
  return (
    <div className="space-y-4">
      <PageHeader
        title={lang === 'el' ? 'Κατηγορίες Επαγγελματιών' : 'Professional Categories'}
        subtitle={lang === 'el' ? 'Marketplace για τεχνικές, νομικές, λογιστικές και operational υπηρεσίες.' : 'Marketplace categories for technical, legal, accounting and operational services.'}
      />
      <Card className="flex flex-wrap gap-2">
        {categories.map((c) => <Badge key={c} tone="brand">{c}</Badge>)}
      </Card>
    </div>
  );
};
