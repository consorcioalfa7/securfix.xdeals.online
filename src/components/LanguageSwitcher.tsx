'use client';

import { useRef, useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';

export default function LanguageSwitcher() {
  const { locale, setLocale, locales, localeInfo } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea6663] focus-visible:ring-offset-2"
        aria-label={localeInfo.nativeLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{localeInfo.flag}</span>
        <span className="hidden sm:inline">{localeInfo.nativeLabel}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1 min-w-[180px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg animate-in fade-in-0 zoom-in-95 duration-100"
          role="listbox"
          aria-label="Select language"
        >
          <div className="py-1">
            {locales.map((l) => (
              <button
                key={l.code}
                role="option"
                aria-selected={l.code === locale}
                onClick={() => {
                  setLocale(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                  l.code === locale
                    ? 'bg-[#ea6663]/10 text-[#ea6663] font-semibold'
                    : 'text-gray-700'
                }`}
              >
                <span className="text-lg leading-none">{l.flag}</span>
                <span>{l.nativeLabel}</span>
                {l.code === locale && (
                  <svg
                    className="ml-auto h-4 w-4 text-[#ea6663]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
