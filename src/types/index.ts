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
  image: string
  badges: DietaryBadge[]
  customizableVegan?: boolean
}

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
