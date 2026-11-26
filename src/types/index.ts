export type Language = 'it' | 'en'

export type MenuCategory = 'all' | 'starters' | 'mains' | 'grill' | 'vegan' | 'drinks'

export type DietaryBadge = 'vegan' | 'vegetarian' | 'freshToOrder'

export interface LocalizedText {
  it: string
  en: string
}

export interface MenuItem {
  id: string
  category: Exclude<MenuCategory, 'all'>
  name: LocalizedText
  description: LocalizedText
  price: number
  /** Photo of this exact dish; omitted when no genuine photo exists. */
  image?: string
  badges: DietaryBadge[]
  customizableVegan?: boolean
}

/** Day index as returned by Date.getDay(): 0 = Sunday ... 6 = Saturday. */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6

/** A service period in 24h "HH:MM". A close earlier than open runs past midnight. */
export interface ServiceWindow {
  open: string
  close: string
}

export type WeeklySchedule = Record<Weekday, readonly ServiceWindow[]>

export interface CartItem {
  item: MenuItem
  quantity: number
}

export interface CulturalEvent {
  id: string
  dayBadge: LocalizedText
  time: string
  title: LocalizedText
  description: LocalizedText
  highlights: LocalizedText[]
  /** Local end date-time ("YYYY-MM-DDTHH:MM") of a one-off event; absent for weekly events. */
  endsAt?: string
  /** Photos shown when the event is featured. */
  photos?: EventPhoto[]
}

/** A night that already happened, shown as proof of the restaurant's events. */
export interface PastEvent {
  id: string
  /** Local date "YYYY-MM-DD". */
  date: string
  title: LocalizedText
}

export interface EventPhoto {
  src: string
  alt: LocalizedText
  caption: LocalizedText
}

export interface ReservationInput {
  guestName: string
  date: string
  time: string
  partySize: number
  eventOrSeating: string
  notes: string
}

export interface TakeawayInput {
  customerName: string
  pickupTime: string
  dietaryNotes: string
}
