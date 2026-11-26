import { useEffect, useState, type ReactNode } from 'react'
import { TRANSLATIONS } from '../i18n/translations'
import type { Language, LocalizedText } from '../types'
import { LanguageContext } from './useLanguage'

const STORAGE_KEY = 'mama-africa-lang'

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'it'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'it' || saved === 'en') return saved
  } catch {
    // Ignore storage access errors in restricted contexts
  }
  return 'it'
}

interface LanguageProviderProps {
  children: ReactNode
  /** Browser tab title for this page; defaults to the home page title. */
  pageTitle?: LocalizedText
}

export function LanguageProvider({ children, pageTitle }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = pageTitle?.[lang] ?? TRANSLATIONS[lang].documentTitle
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Ignore storage access errors
    }
  }, [lang, pageTitle])

  const setLang = (next: Language) => setLangState(next)
  const toggleLang = () => setLangState((prev) => (prev === 'it' ? 'en' : 'it'))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}
