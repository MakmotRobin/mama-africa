import type { Language, ServiceWindow, WeeklySchedule, Weekday } from '../types'

const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 24
const TIME_PATTERN = /^(\d{2}):(\d{2})$/
/** 4 January 2026 is a Sunday, so adding a Weekday index lands on that weekday. */
const REFERENCE_SUNDAY = new Date(2026, 0, 4)
const LOCALE_BY_LANGUAGE: Record<Language, string> = { it: 'it-IT', en: 'en-GB' }

export interface OpeningHoursGroup {
  days: Weekday[]
  windows: readonly ServiceWindow[]
}

export interface OpeningHoursRow {
  days: string
  /** Null when the restaurant is closed on these days. */
  time: string | null
}

export function toMinutes(time: string): number | null {
  const match = TIME_PATTERN.exec(time)
  if (!match) return null

  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (hours >= HOURS_PER_DAY || minutes >= MINUTES_PER_HOUR) return null

  return hours * MINUTES_PER_HOUR + minutes
}

function windowContains(window: ServiceWindow, minutes: number): boolean {
  const open = toMinutes(window.open) ?? 0
  const close = toMinutes(window.close) ?? 0
  const runsPastMidnight = close <= open

  if (runsPastMidnight) return minutes >= open || minutes < close
  return minutes >= open && minutes < close
}

/** True when `time` is the after-midnight part of a service that started the evening before. */
export function isAfterMidnightPart(
  schedule: WeeklySchedule,
  weekday: Weekday,
  time: string,
): boolean {
  const minutes = toMinutes(time)
  if (minutes === null) return false

  return schedule[weekday].some((window) => {
    const open = toMinutes(window.open) ?? 0
    const close = toMinutes(window.close) ?? 0
    return close <= open && minutes < close
  })
}

export function isClosedOn(schedule: WeeklySchedule, weekday: Weekday): boolean {
  return schedule[weekday].length === 0
}

export function isWithinOpeningHours(
  schedule: WeeklySchedule,
  weekday: Weekday,
  time: string,
): boolean {
  const minutes = toMinutes(time)
  if (minutes === null) return false

  return schedule[weekday].some((window) => windowContains(window, minutes))
}

function haveSameWindows(a: readonly ServiceWindow[], b: readonly ServiceWindow[]): boolean {
  return (
    a.length === b.length &&
    a.every((window, index) => window.open === b[index].open && window.close === b[index].close)
  )
}

export function groupOpeningHours(
  schedule: WeeklySchedule,
  weekOrder: readonly Weekday[],
): OpeningHoursGroup[] {
  const groups: OpeningHoursGroup[] = []

  for (const weekday of weekOrder) {
    const previous = groups.at(-1)
    if (previous && haveSameWindows(previous.windows, schedule[weekday])) {
      previous.days.push(weekday)
    } else {
      groups.push({ days: [weekday], windows: schedule[weekday] })
    }
  }

  return groups
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function weekdayName(weekday: Weekday, lang: Language, style: 'long' | 'short'): string {
  const date = new Date(REFERENCE_SUNDAY)
  date.setDate(REFERENCE_SUNDAY.getDate() + weekday)
  const name = new Intl.DateTimeFormat(LOCALE_BY_LANGUAGE[lang], { weekday: style }).format(date)
  return capitalize(name.replace('.', ''))
}

function formatDays(days: Weekday[], lang: Language): string {
  if (days.length === 1) return weekdayName(days[0], lang, 'long')

  const first = weekdayName(days[0], lang, 'short')
  const last = weekdayName(days[days.length - 1], lang, 'short')
  return `${first} - ${last}`
}

function formatWindows(windows: readonly ServiceWindow[]): string | null {
  if (windows.length === 0) return null
  return windows.map((window) => `${window.open} - ${window.close}`).join(' / ')
}

export function formatOpeningHoursRows(
  schedule: WeeklySchedule,
  weekOrder: readonly Weekday[],
  lang: Language,
): OpeningHoursRow[] {
  return groupOpeningHours(schedule, weekOrder).map((group) => ({
    days: formatDays(group.days, lang),
    time: formatWindows(group.windows),
  }))
}
