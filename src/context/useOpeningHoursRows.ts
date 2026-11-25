import { OPENING_HOURS_DISPLAY_ORDER, OPENING_SCHEDULE } from '../config/restaurant'
import { formatOpeningHoursRows } from '../utils/openingHours'
import { useLanguage } from './useLanguage'

export interface DisplayedOpeningHoursRow {
  days: string
  time: string
}

export function useOpeningHoursRows(): DisplayedOpeningHoursRow[] {
  const { lang, t } = useLanguage()

  return formatOpeningHoursRows(OPENING_SCHEDULE, OPENING_HOURS_DISPLAY_ORDER, lang).map(
    (row) => ({ days: row.days, time: row.time ?? t.location.closedLabel }),
  )
}
