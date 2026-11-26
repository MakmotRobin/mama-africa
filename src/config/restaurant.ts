import type { WeeklySchedule, Weekday } from '../types'

export const RESTAURANT_CONFIG = {
  name: 'Mama Africa Restaurant & Bar',
  italianName: 'Ristorante Mamma Africa',
  whatsappDisplay: '+39 349 565 5600',
  whatsappDigits: '393495655600',
  phoneDisplay: '+39 349 437 3912',
  phoneDial: '+393494373912',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61571605631762',
  addressLine: 'Via Pietro Pompilio Rodotà, 12/14',
  cityLine: '87100 Cosenza (CS), Italia',
  landmark: {
    it: 'A pochi passi da Corso Mazzini',
    en: 'Just off Corso Mazzini',
  },
  mapsQueryUrl:
    'https://www.google.com/maps/search/?api=1&query=Via+Pietro+Pompilio+Rodot%C3%A0+12%2C+87100+Cosenza+CS%2C+Italy',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Via+Pietro+Pompilio+Rodot%C3%A0+12,+87100+Cosenza+CS,+Italy&output=embed',
} as const

const WEEKDAY_LUNCH = { open: '12:00', close: '15:00' }
const WEEKDAY_DINNER = { open: '19:00', close: '23:30' }
const WEEKEND_LATE_DINNER = { open: '19:00', close: '01:00' }

/**
 * Weekly service windows, keyed by Date.getDay() (0 = Sunday).
 * Drives both the displayed hours and booking / pickup validation.
 */
export const OPENING_SCHEDULE: WeeklySchedule = {
  0: [
    { open: '12:30', close: '15:30' },
    { open: '19:00', close: '23:00' },
  ],
  1: [],
  2: [WEEKDAY_LUNCH, WEEKDAY_DINNER],
  3: [WEEKDAY_LUNCH, WEEKDAY_DINNER],
  4: [WEEKDAY_LUNCH, WEEKDAY_DINNER],
  5: [WEEKDAY_LUNCH, WEEKEND_LATE_DINNER],
  6: [WEEKDAY_LUNCH, WEEKEND_LATE_DINNER],
}

/** Order the hours are listed in: the week starts on Tuesday, after the Monday closure. */
export const OPENING_HOURS_DISPLAY_ORDER: readonly Weekday[] = [2, 3, 4, 5, 6, 0, 1]
