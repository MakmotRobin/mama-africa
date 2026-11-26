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

const WEEKDAY_HOURS = { open: '09:00', close: '23:00' }

/**
 * Weekly opening hours, keyed by Date.getDay() (0 = Sunday), as confirmed by the owner on 2026-11-26.
 * Drives both the displayed hours and booking / pickup validation.
 * A close earlier than open runs past midnight (Saturday closes at 01:00 on Sunday morning).
 */
export const OPENING_SCHEDULE: WeeklySchedule = {
  0: [{ open: '11:00', close: '23:00' }],
  1: [WEEKDAY_HOURS],
  2: [WEEKDAY_HOURS],
  3: [WEEKDAY_HOURS],
  4: [WEEKDAY_HOURS],
  5: [WEEKDAY_HOURS],
  6: [{ open: '09:00', close: '01:00' }],
}

/** Order the hours are listed in: Monday to Sunday. */
export const OPENING_HOURS_DISPLAY_ORDER: readonly Weekday[] = [1, 2, 3, 4, 5, 6, 0]
