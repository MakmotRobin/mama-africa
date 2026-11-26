import type { Language } from '../types'

const LOCALE_BY_LANGUAGE: Record<Language, string> = { it: 'it-IT', en: 'en-GB' }

function padTwoDigits(value: number): string {
  return String(value).padStart(2, '0')
}

export function toLocalIsoDate(date: Date): string {
  const month = padTwoDigits(date.getMonth() + 1)
  const day = padTwoDigits(date.getDate())
  return `${date.getFullYear()}-${month}-${day}`
}

export function parseLocalIsoDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/** "2026-06-20" -> "20 giugno 2026" (it) / "20 June 2026" (en). */
export function formatLongDate(isoDate: string, lang: Language): string {
  return new Intl.DateTimeFormat(LOCALE_BY_LANGUAGE[lang], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parseLocalIsoDate(isoDate))
}
