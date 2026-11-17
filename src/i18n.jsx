// Lightweight multi-language support.
//
// German is the source language: German text stays inline in the components,
// wrapped in t('...'). Other languages map that German text to a translation
// in src/locales/<code>.js. Anything without a translation falls back to the
// German original, so new or changed German text never breaks the page.
//
// Adding a language: create src/locales/<code>.js (copy en.js) and add it to
// LANGUAGES below. Run `npm run i18n:check` to list missing translations.

import React, { createContext, useContext, useEffect, useState } from 'react';
import './i18n.css';
import en from './locales/en.js';

export const LANGUAGES = [
  { code: 'de', label: 'DE', name: 'Deutsch', locale: 'de-AT', dict: null },
  { code: 'en', label: 'EN', name: 'English', locale: 'en-GB', dict: en },
];

const DEFAULT_LANG = 'de';
const STORAGE_KEY = 'kurbelkunst-lang';
const isSupported = code => LANGUAGES.some(l => l.code === code);

function initialLang() {
  try {
    // 1. ?lang=en in the URL (shareable links)
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (isSupported(fromUrl)) return fromUrl;
    // 2. previously chosen language
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isSupported(stored)) return stored;
  } catch { /* storage unavailable */ }
  // 3. browser language
  for (const l of navigator.languages || [navigator.language]) {
    const code = (l || '').slice(0, 2).toLowerCase();
    if (isSupported(code)) return code;
  }
  return DEFAULT_LANG;
}

const interpolate = (s, vars) =>
  vars ? s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)) : s;

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);
  const current = LANGUAGES.find(l => l.code === lang);
  const dict = current.dict;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(code) {
    if (!isSupported(code)) return;
    setLangState(code);
    try { window.localStorage.setItem(STORAGE_KEY, code); } catch { /* ignore */ }
  }

  // t('German text', { var: value }) -> translated text
  const t = (de, vars) => interpolate(dict?.strings?.[de] ?? de, vars);

  // tm(motif, 'title') -> translated motif field, falling back to motifs.json
  const tm = (m, field) => dict?.motifs?.[m.id]?.[field] ?? m[field];

  return (
    <I18nContext.Provider value={{ lang, setLang, t, tm, locale: current.locale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="lang-switch" role="group" aria-label={t('Sprache wählen')}>
      {LANGUAGES.map(l => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          title={l.name}
          aria-pressed={lang === l.code}
          className={lang === l.code ? 'active' : ''}
          onClick={() => setLang(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
