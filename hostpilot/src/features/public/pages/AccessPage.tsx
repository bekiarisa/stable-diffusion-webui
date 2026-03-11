import { Link } from 'react-router-dom';
import { Button, Card, PageHeader } from '@/design/ui';
import { useI18n } from '@/i18n/i18nContext';

export const AccessPage = () => {
  const { lang } = useI18n();
  return (
    <div className="space-y-4">
      <PageHeader
        title={lang === 'el' ? 'Είσοδος / Εγγραφή' : 'Login / Register'}
        subtitle={lang === 'el' ? 'Προετοίμασε τον λογαριασμό σου και διάλεξε ρόλο για το σωστό workspace.' : 'Prepare your account and pick role-specific workspace.'}
      />
      <Card className="space-y-3">
        <p className="text-sm text-slate-600">{lang === 'el' ? 'Auth integration placeholder (Supabase ready).' : 'Auth integration placeholder (Supabase ready).'}</p>
        <Link to="/role-entry"><Button>{lang === 'el' ? 'Επιλογή ρόλου' : 'Role selection'}</Button></Link>
      </Card>
    </div>
  );
};
