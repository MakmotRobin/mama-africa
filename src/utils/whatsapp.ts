import { RESTAURANT_CONFIG } from '../config/restaurant'
import type { CartItem, Language, ReservationInput, TakeawayInput } from '../types'

const MAX_TEXT_LENGTH = 240

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

export function validateReservation(input: ReservationInput): ValidationResult {
  const errors: Record<string, string> = {}

  if (!sanitizeText(input.guestName)) {
    errors.guestName = 'nameRequired'
  }
  if (!input.date.trim()) {
    errors.date = 'dateRequired'
  }
  if (!input.time.trim()) {
    errors.time = 'timeRequired'
  }
  if (!Number.isFinite(input.partySize) || input.partySize < 1 || input.partySize > 20) {
    errors.partySize = 'partyInvalid'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

export function validateTakeaway(input: TakeawayInput, items: CartItem[]): ValidationResult {
  const errors: Record<string, string> = {}

  if (items.length === 0) {
    errors.cart = 'emptyCart'
  }
  if (!sanitizeText(input.customerName)) {
    errors.customerName = 'nameRequired'
  }
  if (!input.pickupTime.trim()) {
    errors.pickupTime = 'pickupRequired'
  }

  return { valid: Object.keys(errors).length === 0, errors }
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

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${RESTAURANT_CONFIG.whatsappDigits}?text=${encoded}`
}
