import type { CulturalEvent } from '../types'

export interface EventsToShow {
  /** The next one-off event still to finish, if any. */
  featured?: CulturalEvent
  /** Recurring weekly events. */
  weekly: CulturalEvent[]
  /** Every event a guest can still book a table for. */
  bookable: CulturalEvent[]
}

function isOneOff(event: CulturalEvent): boolean {
  return event.endsAt !== undefined
}

function hasEnded(event: CulturalEvent, now: Date): boolean {
  return event.endsAt !== undefined && new Date(event.endsAt) <= now
}

export function selectEventsToShow(events: CulturalEvent[], now: Date): EventsToShow {
  const bookable = events.filter((event) => !hasEnded(event, now))

  return {
    featured: bookable.find(isOneOff),
    weekly: bookable.filter((event) => !isOneOff(event)),
    bookable,
  }
}
