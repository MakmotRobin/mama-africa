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
    })
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
    expect(total).toBeCloseTo(28.0)
    expect(formatEuro(total)).toBe('€28,00')

    const takeawayCheck = validateTakeaway(
      { customerName: 'Marco', pickupTime: '20:00', dietaryNotes: '' },
      [],
    )
    expect(takeawayCheck.valid).toBe(false)
    expect(takeawayCheck.errors.cart).toBe('emptyCart')

    const msgEn = buildTakeawayMessage(
      { customerName: 'Marco', pickupTime: '20:00', dietaryNotes: 'Vegan Jollof' },
      cart,
      'en',
    )
    expect(msgEn).toContain('2x Fataya (African Meat Pies)')
    expect(msgEn).toContain('Estimated total: €28,00')
    expect(msgEn).toContain('Vegan Jollof')
  })
})
