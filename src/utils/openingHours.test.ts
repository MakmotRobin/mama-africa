import { describe, expect, it } from 'vitest'
import type { WeeklySchedule, Weekday } from '../types'
import {
  formatOpeningHoursRows,
  groupOpeningHours,
  isClosedOn,
  isWithinOpeningHours,
} from './openingHours'

const LUNCH = { open: '12:00', close: '15:00' }
const DINNER = { open: '19:00', close: '23:30' }
const LATE_DINNER = { open: '19:00', close: '01:00' }

const SCHEDULE: WeeklySchedule = {
  0: [{ open: '12:30', close: '15:30' }, { open: '19:00', close: '23:00' }],
  1: [],
  2: [LUNCH, DINNER],
  3: [LUNCH, DINNER],
  4: [LUNCH, DINNER],
  5: [LUNCH, LATE_DINNER],
  6: [LUNCH, LATE_DINNER],
}

const TUESDAY_FIRST: Weekday[] = [2, 3, 4, 5, 6, 0, 1]

describe('isClosedOn', () => {
  it('is true for a day with no service windows', () => {
    expect(isClosedOn(SCHEDULE, 1)).toBe(true)
  })

  it('is false for a day with service windows', () => {
    expect(isClosedOn(SCHEDULE, 2)).toBe(false)
  })
})

describe('isWithinOpeningHours', () => {
  it('accepts the opening minute and rejects the closing minute', () => {
    expect(isWithinOpeningHours(SCHEDULE, 2, '12:00')).toBe(true)
    expect(isWithinOpeningHours(SCHEDULE, 2, '14:59')).toBe(true)
    expect(isWithinOpeningHours(SCHEDULE, 2, '15:00')).toBe(false)
  })

  it('rejects the gap between lunch and dinner', () => {
    expect(isWithinOpeningHours(SCHEDULE, 3, '17:00')).toBe(false)
  })

  it('accepts times after midnight when the dinner window closes the next day', () => {
    expect(isWithinOpeningHours(SCHEDULE, 5, '23:45')).toBe(true)
    expect(isWithinOpeningHours(SCHEDULE, 5, '00:30')).toBe(true)
    expect(isWithinOpeningHours(SCHEDULE, 5, '01:00')).toBe(false)
  })

  it('does not treat the small hours as open when the window closes before midnight', () => {
    expect(isWithinOpeningHours(SCHEDULE, 2, '00:30')).toBe(false)
  })

  it('rejects every time on a closed day', () => {
    expect(isWithinOpeningHours(SCHEDULE, 1, '20:00')).toBe(false)
  })

  it('rejects malformed time strings', () => {
    expect(isWithinOpeningHours(SCHEDULE, 2, '')).toBe(false)
    expect(isWithinOpeningHours(SCHEDULE, 2, '25:99')).toBe(false)
  })
})

describe('groupOpeningHours', () => {
  it('merges consecutive days that share identical windows', () => {
    const rows = groupOpeningHours(SCHEDULE, TUESDAY_FIRST)

    expect(rows.map((row) => row.days)).toEqual([[2, 3, 4], [5, 6], [0], [1]])
  })
})

describe('formatOpeningHoursRows', () => {
  it('renders Italian day ranges and windows exactly as the site shows them', () => {
    const rows = formatOpeningHoursRows(SCHEDULE, TUESDAY_FIRST, 'it')

    expect(rows).toEqual([
      { days: 'Mar - Gio', time: '12:00 - 15:00 / 19:00 - 23:30' },
      { days: 'Ven - Sab', time: '12:00 - 15:00 / 19:00 - 01:00' },
      { days: 'Domenica', time: '12:30 - 15:30 / 19:00 - 23:00' },
      { days: 'Lunedì', time: null },
    ])
  })

  it('renders English day names', () => {
    const rows = formatOpeningHoursRows(SCHEDULE, TUESDAY_FIRST, 'en')

    expect(rows.map((row) => row.days)).toEqual(['Tue - Thu', 'Fri - Sat', 'Sunday', 'Monday'])
  })
})
