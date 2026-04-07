'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { type Locale, type LocaleInfo, AVAILABLE_LOCALES, getInitialLocale, t, formatCurrency } from '@/lib/i18n';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
  locales: LocaleInfo[];
  localeInfo: LocaleInfo;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('securfix-locale', newLocale);
    }
    document.documentElement.lang = newLocale;
  }, []);

  // Sync lang attribute on mount
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const translate = useCallback((key: string) => t(locale, key), [locale]);
  const fmtCurrency = useCallback((amount: number) => formatCurrency(locale, amount), [locale]);
  const localeInfo = AVAILABLE_LOCALES.find(l => l.code === locale)!;

  return (
    <I18nContext.Provider value={{
      locale,
      setLocale,
      t: translate,
      formatCurrency: fmtCurrency,
      locales: AVAILABLE_LOCALES,
      localeInfo,
    }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
