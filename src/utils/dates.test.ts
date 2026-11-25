import { describe, expect, it } from 'vitest'
import { parseLocalIsoDate, toLocalIsoDate } from './dates'

describe('toLocalIsoDate', () => {
  it('returns the local calendar date, not the UTC one, just after midnight in Italy', () => {
    const halfPastMidnightRome = new Date(2026, 10, 26, 0, 30)

    expect(toLocalIsoDate(halfPastMidnightRome)).toBe('2026-11-26')
  })

  it('pads single-digit months and days', () => {
    expect(toLocalIsoDate(new Date(2026, 0, 5, 12, 0))).toBe('2026-01-05')
  })

  it('handles the last moment of the year', () => {
    expect(toLocalIsoDate(new Date(2026, 11, 31, 23, 59))).toBe('2026-12-31')
  })
})

describe('parseLocalIsoDate', () => {
  it('parses an ISO date as local midnight so the weekday matches the calendar', () => {
    const parsed = parseLocalIsoDate('2026-11-30')

    expect(parsed.getDate()).toBe(30)
    expect(parsed.getDay()).toBe(1)
    expect(parsed.getHours()).toBe(0)
  })
})
