import { describe, expect, it } from 'vitest'
import type { CulturalEvent } from '../types'
import { selectEventsToShow } from './events'

function buildEvent(id: string, endsAt?: string): CulturalEvent {
  const text = { it: id, en: id }
  return { id, dayBadge: text, time: '21:00', title: text, description: text, highlights: [], endsAt }
}

const SPECIAL_NIGHT = buildEvent('special-night', '2026-12-13T02:00')
const THURSDAY_WEEKLY = buildEvent('thursday-weekly')
const FRIDAY_WEEKLY = buildEvent('friday-weekly')
const EVENTS = [SPECIAL_NIGHT, THURSDAY_WEEKLY, FRIDAY_WEEKLY]

describe('selectEventsToShow', () => {
  it('features an upcoming special event and lists the weekly ones separately', () => {
    const shown = selectEventsToShow(EVENTS, new Date(2026, 10, 25, 18, 0))

    expect(shown.featured?.id).toBe('special-night')
    expect(shown.weekly.map((event) => event.id)).toEqual(['thursday-weekly', 'friday-weekly'])
    expect(shown.bookable.map((event) => event.id)).toEqual([
      'special-night',
      'thursday-weekly',
      'friday-weekly',
    ])
  })

  it('keeps the special event visible while it is still running after midnight', () => {
    const shown = selectEventsToShow(EVENTS, new Date(2026, 11, 13, 1, 30))

    expect(shown.featured?.id).toBe('special-night')
  })

  it('drops the special event once it has ended, keeping the weekly events', () => {
    const shown = selectEventsToShow(EVENTS, new Date(2026, 11, 13, 2, 0))

    expect(shown.featured).toBeUndefined()
    expect(shown.weekly).toHaveLength(2)
    expect(shown.bookable.map((event) => event.id)).not.toContain('special-night')
  })
})
