import { useI18n } from '@/i18n/i18nContext';

export const LanguageSwitcher = () => {
  const { lang, setLang, dict } = useI18n();
  return (
    <label className="flex items-center gap-2 text-xs text-slate-600">
      <span>{dict.common.language}</span>
      <select className="rounded-lg border border-slate-300 bg-white px-2 py-1" value={lang} onChange={(e) => setLang(e.target.value as 'el' | 'en')}>
        <option value="el">Ελληνικά</option>
        <option value="en">English</option>
      </select>
    </label>
  );
};
