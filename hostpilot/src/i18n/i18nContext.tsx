import { createContext, useContext, useMemo, useState } from 'react';
import { dictionaries, Dictionary, Lang } from '@/i18n/dictionaries';

type I18nCtx = {
  lang: Lang;
  dict: Dictionary;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18nCtx | null>(null);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>('el');
  const value = useMemo(() => ({ lang, setLang, dict: dictionaries[lang] }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};
