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

const ONE_DAY_MS = 24 * 60 * 60 * 1000

function localDateTime(isoDate: string, time: string): Date {
  return new Date(`${isoDate}T${time}`)
}

/**
 * True when a booking for `isoDate` at `time` falls inside a one-off event.
 * Times before the event's start on its date count as the small hours of that night (00:30 -> next day).
 */
export function isDuringSpecialEvent(
  events: CulturalEvent[],
  isoDate: string,
  time: string,
): boolean {
  return events.some((event) => {
    if (!event.startsAt || !event.endsAt) return false
    const start = new Date(event.startsAt)
    const end = new Date(event.endsAt)
    if (isoDate !== event.startsAt.slice(0, 10)) return false

    const sameDay = localDateTime(isoDate, time)
    const candidate = sameDay < start ? new Date(sameDay.getTime() + ONE_DAY_MS) : sameDay
    return candidate >= start && candidate < end
  })
}
