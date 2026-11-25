import { createContext, useContext } from 'react'
import { TRANSLATIONS } from '../i18n/translations'
import type { Language } from '../types'

export interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  toggleLang: () => void
  t: (typeof TRANSLATIONS)['it']
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
