import { useState } from 'react'
import { CULTURAL_EVENTS } from '../data/menu'
import { selectEventsToShow, type EventsToShow } from '../utils/events'

/** Events to show, evaluated once against the time the page was opened. */
export function useEventsToShow(): EventsToShow {
  const [eventsToShow] = useState(() => selectEventsToShow(CULTURAL_EVENTS, new Date()))
  return eventsToShow
}
