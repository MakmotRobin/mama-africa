import { describe, expect, it } from 'vitest'
import { MENU_ITEMS } from '../data/menu'
import {
  buildReservationMessage,
  buildTakeawayMessage,
  buildWhatsAppUrl,
  calculateCartTotal,
  formatEuro,
  sanitizeText,
  validateReservation,
  validateTakeaway,
} from './whatsapp'

/** Wednesday 25 November 2026, 18:00 local time. */
const WEDNESDAY_EVENING = new Date(2026, 10, 25, 18, 0)
/** Monday 30 November 2026, 18:00 local time: the restaurant is closed on Mondays. */
const MONDAY_EVENING = new Date(2026, 10, 30, 18, 0)

const VALID_RESERVATION = {
  guestName: 'Giulia Rossi',
  date: '2026-11-25',
  time: '20:30',
  partySize: 4,
  eventOrSeating: '',
  notes: '',
}

describe('reservation validation against the calendar and opening hours', () => {
  it('accepts a dinner booking for today', () => {
    expect(validateReservation(VALID_RESERVATION, WEDNESDAY_EVENING).valid).toBe(true)
  })

  it('rejects a date in the past', () => {
    const result = validateReservation({ ...VALID_RESERVATION, date: '2026-11-24' }, WEDNESDAY_EVENING)

    expect(result.errors.date).toBe('datePast')
  })

  it('rejects a day the restaurant is closed', () => {
    const result = validateReservation({ ...VALID_RESERVATION, date: '2026-11-30' }, WEDNESDAY_EVENING)

    expect(result.errors.date).toBe('dayClosed')
  })

  it('rejects a time between lunch and dinner service', () => {
    const result = validateReservation(
      { ...VALID_RESERVATION, date: '2026-11-26', time: '17:00' },
      WEDNESDAY_EVENING,
    )

    expect(result.errors.time).toBe('timeOutsideHours')
  })

  it('accepts a booking during the All White Night even before regular dinner opens', () => {
    const result = validateReservation(
      { ...VALID_RESERVATION, date: '2026-12-12', time: '18:30' },
      WEDNESDAY_EVENING,
    )

    expect(result.valid).toBe(true)
  })

  it('still rejects 18:30 on a Saturday without a special event', () => {
    const result = validateReservation(
      { ...VALID_RESERVATION, date: '2026-12-19', time: '18:30' },
      WEDNESDAY_EVENING,
    )

    expect(result.errors.time).toBe('timeOutsideHours')
  })

  it('accepts a late Friday booking that runs past midnight', () => {
    const result = validateReservation(
      { ...VALID_RESERVATION, date: '2026-11-27', time: '00:30' },
      WEDNESDAY_EVENING,
    )

    expect(result.valid).toBe(true)
  })
})

/** Thursday 26 November 2026, 23:24: Thursday dinner runs until 23:30. */
const THURSDAY_LATE = new Date(2026, 10, 26, 23, 24)
/** Friday 27 November 2026, 23:50: Friday dinner runs past midnight until 01:00. */
const FRIDAY_LATE = new Date(2026, 10, 27, 23, 50)

describe('times that have already passed today', () => {
  const cart = [{ item: MENU_ITEMS[0], quantity: 1 }]
  const order = { customerName: 'Marco', pickupTime: '20:00', dietaryNotes: '' }

  it('rejects a pickup time earlier today', () => {
    const result = validateTakeaway(order, cart, THURSDAY_LATE)

    expect(result.errors.pickupTime).toBe('pickupPast')
  })

  it('accepts a pickup later today', () => {
    expect(validateTakeaway({ ...order, pickupTime: '23:29' }, cart, THURSDAY_LATE).valid).toBe(true)
  })

  it('accepts an after-midnight pickup during a service that runs past midnight', () => {
    expect(validateTakeaway({ ...order, pickupTime: '00:30' }, cart, FRIDAY_LATE).valid).toBe(true)
  })

  it('rejects a booking for a time earlier today', () => {
    const result = validateReservation(
      { ...VALID_RESERVATION, date: '2026-11-26', time: '20:30' },
      THURSDAY_LATE,
    )

    expect(result.errors.time).toBe('timePast')
  })

  it('accepts the same time on a later day', () => {
    const result = validateReservation(
      { ...VALID_RESERVATION, date: '2026-11-27', time: '20:30' },
      THURSDAY_LATE,
    )

    expect(result.valid).toBe(true)
  })
})

describe('takeaway validation against opening hours', () => {
  const cart = [{ item: MENU_ITEMS[0], quantity: 1 }]
  const order = { customerName: 'Marco', pickupTime: '20:00', dietaryNotes: '' }

  it('accepts a pickup during today’s dinner service', () => {
    expect(validateTakeaway(order, cart, WEDNESDAY_EVENING).valid).toBe(true)
  })

  it('rejects a pickup outside today’s service windows', () => {
    const result = validateTakeaway({ ...order, pickupTime: '17:00' }, cart, WEDNESDAY_EVENING)

    expect(result.errors.pickupTime).toBe('pickupOutsideHours')
  })

  it('rejects any pickup on a closed day', () => {
    const result = validateTakeaway(order, cart, MONDAY_EVENING)

    expect(result.errors.pickupTime).toBe('pickupOutsideHours')
  })
})

describe('whatsapp utilities', () => {
  it('sanitizes angle brackets and normalizes whitespace', () => {
    expect(sanitizeText('  <script>alert(1)</script>  Giulia   Rossi  ')).toBe(
      'scriptalert(1)/script Giulia Rossi',
    )
  })

  it('validates reservation input and rejects invalid party size or empty name', () => {
    const invalid = validateReservation({
      guestName: '   ',
      date: '',
      time: '20:30',
      partySize: 0,
      eventOrSeating: '',
      notes: '',
    })
    expect(invalid.valid).toBe(false)
    expect(invalid.errors).toEqual({
      guestName: 'nameRequired',
      date: 'dateRequired',
      partySize: 'partyInvalid',
    })

    const valid = validateReservation({
      guestName: 'Giulia Rossi',
      date: '2026-12-01',
      time: '20:30',
      partySize: 4,
      eventOrSeating: 'Venerdi Afrobeats',
      notes: 'Opzione vegana',
    }, WEDNESDAY_EVENING)
    expect(valid.valid).toBe(true)
  })

  it('builds localized reservation messages and valid wa.me URLs for +39 349 565 5600', () => {
    const msgIt = buildReservationMessage(
      {
        guestName: 'Giulia Rossi',
        date: '2026-12-01',
        time: '20:30',
        partySize: 4,
        eventOrSeating: 'Cena standard',
        notes: 'Tavolo tranquillo',
      },
      'it',
    )
    expect(msgIt).toContain('Vorrei prenotare un tavolo')
    expect(msgIt).toContain('Giulia Rossi')

    const url = buildWhatsAppUrl(msgIt)
    expect(url.startsWith('https://wa.me/393495655600?text=')).toBe(true)
    expect(decodeURIComponent(url.split('text=')[1])).toBe(msgIt)
  })

  it('calculates cart totals and formats takeaway order in Italian and English', () => {
    const cart = [
      { item: MENU_ITEMS[0], quantity: 2 },
      { item: MENU_ITEMS[2], quantity: 1 },
    ]
    const total = calculateCartTotal(cart)
    expect(total).toBeCloseTo(30.0)
    expect(formatEuro(total)).toBe('€30,00')

    const takeawayCheck = validateTakeaway(
      { customerName: 'Marco', pickupTime: '20:00', dietaryNotes: '' },
      [],
      WEDNESDAY_EVENING,
    )
    expect(takeawayCheck.valid).toBe(false)
    expect(takeawayCheck.errors.cart).toBe('emptyCart')

    const msgEn = buildTakeawayMessage(
      { customerName: 'Marco', pickupTime: '20:00', dietaryNotes: 'Vegan Jollof' },
      cart,
      'en',
    )
    expect(msgEn).toContain('2x Signature Jollof Rice')
    expect(msgEn).toContain('Estimated total: €30,00')
    expect(msgEn).toContain('Vegan Jollof')
  })
})
