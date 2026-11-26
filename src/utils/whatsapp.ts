import { OPENING_SCHEDULE, RESTAURANT_CONFIG } from '../config/restaurant'
import type { CartItem, Language, ReservationInput, TakeawayInput, Weekday } from '../types'
import { parseLocalIsoDate, toLocalIsoDate } from './dates'
import { isClosedOn, isWithinOpeningHours } from './openingHours'

const MAX_TEXT_LENGTH = 240
export const MIN_PARTY_SIZE = 1
export const MAX_PARTY_SIZE = 20

export function sanitizeText(value: string): string {
  return value.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, MAX_TEXT_LENGTH)
}

export function formatEuro(amount: number): string {
  return `€${amount.toFixed(2).replace('.', ',')}`
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0)
}

export interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
}

function weekdayOf(date: Date): Weekday {
  return date.getDay() as Weekday
}

function reservationDateError(isoDate: string, now: Date): string | null {
  if (!isoDate.trim()) return 'dateRequired'
  if (isoDate < toLocalIsoDate(now)) return 'datePast'
  if (isClosedOn(OPENING_SCHEDULE, weekdayOf(parseLocalIsoDate(isoDate)))) return 'dayClosed'
  return null
}

function reservationTimeError(isoDate: string, time: string): string | null {
  if (!time.trim()) return 'timeRequired'
  const weekday = weekdayOf(parseLocalIsoDate(isoDate))
  if (!isWithinOpeningHours(OPENING_SCHEDULE, weekday, time)) return 'timeOutsideHours'
  return null
}

function pickupTimeError(pickupTime: string, now: Date): string | null {
  if (!pickupTime.trim()) return 'pickupRequired'
  if (!isWithinOpeningHours(OPENING_SCHEDULE, weekdayOf(now), pickupTime)) {
    return 'pickupOutsideHours'
  }
  return null
}

function toValidationResult(errors: Record<string, string | null>): ValidationResult {
  const presentErrors: Record<string, string> = {}
  for (const [field, error] of Object.entries(errors)) {
    if (error) presentErrors[field] = error
  }
  return { valid: Object.keys(presentErrors).length === 0, errors: presentErrors }
}

function isValidPartySize(partySize: number): boolean {
  return Number.isFinite(partySize) && partySize >= MIN_PARTY_SIZE && partySize <= MAX_PARTY_SIZE
}

export function validateReservation(input: ReservationInput, now = new Date()): ValidationResult {
  const dateError = reservationDateError(input.date, now)

  return toValidationResult({
    guestName: sanitizeText(input.guestName) ? null : 'nameRequired',
    date: dateError,
    time: dateError ? null : reservationTimeError(input.date, input.time),
    partySize: isValidPartySize(input.partySize) ? null : 'partyInvalid',
  })
}

export function validateTakeaway(
  input: TakeawayInput,
  items: CartItem[],
  now = new Date(),
): ValidationResult {
  return toValidationResult({
    cart: items.length === 0 ? 'emptyCart' : null,
    customerName: sanitizeText(input.customerName) ? null : 'nameRequired',
    pickupTime: pickupTimeError(input.pickupTime, now),
  })
}

export function buildReservationMessage(input: ReservationInput, lang: Language): string {
  const name = sanitizeText(input.guestName)
  const occasion = sanitizeText(input.eventOrSeating)
  const notes = sanitizeText(input.notes)

  if (lang === 'it') {
    const lines = [
      'Ciao Mama Africa Cosenza! Vorrei prenotare un tavolo:',
      `- Nome: ${name}`,
      `- Data: ${input.date}`,
      `- Orario: ${input.time}`,
      `- Persone: ${input.partySize}`,
      occasion ? `- Tavolo / Serata: ${occasion}` : null,
      notes ? `- Note: ${notes}` : null,
      'Grazie!',
    ]
    return lines.filter(Boolean).join('\n')
  }

  const lines = [
    'Hello Mama Africa Cosenza! I would like to book a table:',
    `- Name: ${name}`,
    `- Date: ${input.date}`,
    `- Time: ${input.time}`,
    `- Guests: ${input.partySize}`,
    occasion ? `- Table / Night: ${occasion}` : null,
    notes ? `- Notes: ${notes}` : null,
    'Thank you!',
  ]
  return lines.filter(Boolean).join('\n')
}

export function buildTakeawayMessage(
  input: TakeawayInput,
  items: CartItem[],
  lang: Language,
): string {
  const name = sanitizeText(input.customerName)
  const notes = sanitizeText(input.dietaryNotes)
  const total = formatEuro(calculateCartTotal(items))

  const itemLines = items.map(
    (entry) =>
      `- ${entry.quantity}x ${entry.item.name[lang]} (${formatEuro(entry.item.price * entry.quantity)})`,
  )

  if (lang === 'it') {
    return [
      'Ciao Mama Africa Cosenza! Vorrei ordinare da asporto (preparato al momento):',
      ...itemLines,
      `Totale stimato: ${total}`,
      `- Nome: ${name}`,
      `- Orario ritiro: ${input.pickupTime}`,
      notes ? `- Note / Personalizzazioni: ${notes}` : null,
      'Grazie!',
    ]
      .filter(Boolean)
      .join('\n')
  }

  return [
    'Hello Mama Africa Cosenza! I would like to place a fresh-to-order takeaway:',
    ...itemLines,
    `Estimated total: ${total}`,
    `- Name: ${name}`,
    `- Pickup time: ${input.pickupTime}`,
    notes ? `- Notes / Customizations: ${notes}` : null,
    'Thank you!',
  ]
    .filter(Boolean)
    .join('\n')
}

export const WHATSAPP_CHAT_URL = `https://wa.me/${RESTAURANT_CONFIG.whatsappDigits}`
export const PHONE_CALL_URL = `tel:${RESTAURANT_CONFIG.phoneDial}`

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message)
  return `${WHATSAPP_CHAT_URL}?text=${encoded}`
}
