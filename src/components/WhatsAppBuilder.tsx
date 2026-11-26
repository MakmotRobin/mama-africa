import { Minus, Plus, Trash2 } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { useLanguage } from '../context/useLanguage'
import { useEventsToShow } from '../context/useEventsToShow'
import { ScriptKicker } from './brand/ScriptKicker'
import type { TRANSLATIONS } from '../i18n/translations'
import type { CartItem } from '../types'
import { toLocalIsoDate } from '../utils/dates'
import {
  buildReservationMessage,
  buildTakeawayMessage,
  buildWhatsAppUrl,
  calculateCartTotal,
  formatEuro,
  MAX_PARTY_SIZE,
  MIN_PARTY_SIZE,
  validateReservation,
  validateTakeaway,
} from '../utils/whatsapp'

export type BuilderTab = 'reservation' | 'takeaway'

type WhatsAppTranslations = (typeof TRANSLATIONS)['it']['whatsapp']
type ReservationErrorKey = keyof WhatsAppTranslations['reservationForm']['errors']
type TakeawayErrorKey = keyof WhatsAppTranslations['takeawayForm']['errors']

interface WhatsAppBuilderProps {
  activeTab: BuilderTab
  onTabChange: (tab: BuilderTab) => void
  cart: CartItem[]
  onUpdateQty: (id: string, delta: number) => void
  onRemoveItem: (id: string) => void
  onClearCart: () => void
  occasion: string
  onOccasionChange: (value: string) => void
}

function getTodayIso(): string {
  return toLocalIsoDate(new Date())
}

export function WhatsAppBuilder({
  activeTab,
  onTabChange,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  occasion,
  onOccasionChange,
}: WhatsAppBuilderProps) {
  const { lang, t } = useLanguage()

  // Reservation state
  const [guestName, setGuestName] = useState('')
  const [today] = useState(getTodayIso)
  const [date, setDate] = useState(today)
  const [time, setTime] = useState('20:30')
  const [partySize, setPartySize] = useState(2)
  const [resNotes, setResNotes] = useState('')
  const [resErrors, setResErrors] = useState<Record<string, string>>({})

  // Takeaway state
  const [customerName, setCustomerName] = useState('')
  const [pickupTime, setPickupTime] = useState('20:00')
  const [dietaryNotes, setDietaryNotes] = useState('')
  const [takeErrors, setTakeErrors] = useState<Record<string, string>>({})

  const guestNameRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const customerNameRef = useRef<HTMLInputElement>(null)
  const timeRef = useRef<HTMLInputElement>(null)
  const pickupTimeRef = useRef<HTMLInputElement>(null)

  const reservationErrorText = (key: string) =>
    t.whatsapp.reservationForm.errors[key as ReservationErrorKey]
  const takeawayErrorText = (key: string) =>
    t.whatsapp.takeawayForm.errors[key as TakeawayErrorKey]

  const cartTotal = calculateCartTotal(cart)
  const bookableEvents = useEventsToShow().bookable

  const handleReservationSubmit = (e: FormEvent) => {
    e.preventDefault()
    const result = validateReservation({
      guestName,
      date,
      time,
      partySize,
      eventOrSeating: occasion,
      notes: resNotes,
    })

    if (!result.valid) {
      setResErrors(result.errors)
      if (result.errors.guestName) guestNameRef.current?.focus()
      else if (result.errors.date) dateRef.current?.focus()
      else if (result.errors.time) timeRef.current?.focus()
      return
    }

    setResErrors({})
    const msg = buildReservationMessage(
      {
        guestName,
        date,
        time,
        partySize,
        eventOrSeating: occasion || t.whatsapp.reservationForm.occasionDefault,
        notes: resNotes,
      },
      lang,
    )
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer')
  }

  const handleTakeawaySubmit = (e: FormEvent) => {
    e.preventDefault()
    const result = validateTakeaway(
      { customerName, pickupTime, dietaryNotes },
      cart,
    )

    if (!result.valid) {
      setTakeErrors(result.errors)
      if (result.errors.customerName) customerNameRef.current?.focus()
      else if (result.errors.pickupTime) pickupTimeRef.current?.focus()
      return
    }

    setTakeErrors({})
    const msg = buildTakeawayMessage(
      { customerName, pickupTime, dietaryNotes },
      cart,
      lang,
    )
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="whatsapp-builder"
      className="bg-[var(--color-surface)] py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <ScriptKicker tone="red">{t.whatsapp.kicker}</ScriptKicker>
          <h2 className="mt-1 font-display text-4xl text-[var(--color-black)] sm:text-5xl">
            {t.whatsapp.title}
          </h2>
          <p className="mt-3 text-base text-[var(--color-muted)]">{t.whatsapp.subtitle}</p>
        </div>

        <div className="mt-8">
          <div className="mx-auto max-w-2xl rounded-[var(--radius-lg)] border-t-[6px] border-[var(--color-gold)] bg-[var(--color-surface-card)] p-5 shadow-[var(--shadow-card)] sm:p-7">
            <div
              role="tablist"
              aria-label="WhatsApp actions"
              className="grid grid-cols-2 gap-2 rounded-md bg-[var(--color-surface)] p-1.5"
            >
              <button
                type="button"
                role="tab"
                id="tab-reservation"
                aria-selected={activeTab === 'reservation'}
                aria-controls="panel-reservation"
                onClick={() => onTabChange('reservation')}
                className={`inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-md px-3 text-sm font-bold transition-colors duration-150 ${
                  activeTab === 'reservation'
                    ? 'bg-[var(--color-black)] text-[var(--color-gold)]'
                    : 'text-[var(--color-ink)] hover:bg-[var(--color-bg)]'
                }`}
              >
                <span>{t.whatsapp.tabs.reservation}</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-takeaway"
                aria-selected={activeTab === 'takeaway'}
                aria-controls="panel-takeaway"
                onClick={() => onTabChange('takeaway')}
                className={`inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-md px-3 text-sm font-bold transition-colors duration-150 ${
                  activeTab === 'takeaway'
                    ? 'bg-[var(--color-black)] text-[var(--color-gold)]'
                    : 'text-[var(--color-ink)] hover:bg-[var(--color-bg)]'
                }`}
              >
                <span>
                  {t.whatsapp.tabs.takeaway} ({cart.reduce((s, c) => s + c.quantity, 0)})
                </span>
              </button>
            </div>

            {activeTab === 'reservation' ? (
              <form
                id="panel-reservation"
                role="tabpanel"
                aria-labelledby="tab-reservation"
                noValidate
                onSubmit={handleReservationSubmit}
                className="mt-6 space-y-5"
              >
                <div>
                  <label
                    htmlFor="res-name"
                    className="block text-sm font-bold text-[var(--color-ink)]"
                  >
                    {t.whatsapp.reservationForm.nameLabel}
                  </label>
                  <input
                    ref={guestNameRef}
                    id="res-name"
                    name="guestName"
                    type="text"
                    required
                    autoComplete="name"
                    value={guestName}
                    onChange={(e) => {
                      setGuestName(e.target.value)
                      if (resErrors.guestName) {
                        setResErrors((prev) => ({ ...prev, guestName: '' }))
                      }
                    }}
                    aria-invalid={resErrors.guestName ? 'true' : 'false'}
                    aria-describedby={resErrors.guestName ? 'res-name-error' : undefined}
                    placeholder={t.whatsapp.reservationForm.namePlaceholder}
                    className="mt-1.5 min-h-[48px] w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 text-[var(--color-ink)]"
                  />
                  {resErrors.guestName && (
                    <p
                      id="res-name-error"
                      className="mt-1.5 text-sm font-semibold text-[var(--color-error)]"
                    >
                      {t.whatsapp.reservationForm.errors.nameRequired}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="res-date"
                      className="block text-sm font-bold text-[var(--color-ink)]"
                    >
                      {t.whatsapp.reservationForm.dateLabel}
                    </label>
                    <input
                      ref={dateRef}
                      id="res-date"
                      name="date"
                      type="date"
                      required
                      min={today}
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value)
                        if (resErrors.date) setResErrors((prev) => ({ ...prev, date: '' }))
                      }}
                      aria-invalid={resErrors.date ? 'true' : 'false'}
                      aria-describedby={resErrors.date ? 'res-date-error' : undefined}
                      className="mt-1.5 min-h-[48px] w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-ink)]"
                    />
                    {resErrors.date && (
                      <p id="res-date-error" className="mt-1 text-xs font-semibold text-[var(--color-error)]">
                        {reservationErrorText(resErrors.date)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="res-time"
                      className="block text-sm font-bold text-[var(--color-ink)]"
                    >
                      {t.whatsapp.reservationForm.timeLabel}
                    </label>
                    <input
                      ref={timeRef}
                      id="res-time"
                      name="time"
                      type="time"
                      required
                      value={time}
                      onChange={(e) => {
                        setTime(e.target.value)
                        if (resErrors.time) setResErrors((prev) => ({ ...prev, time: '' }))
                      }}
                      aria-invalid={resErrors.time ? 'true' : 'false'}
                      aria-describedby={resErrors.time ? 'res-time-error' : undefined}
                      className="mt-1.5 min-h-[48px] w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-ink)]"
                    />
                    {resErrors.time && (
                      <p id="res-time-error" className="mt-1 text-xs font-semibold text-[var(--color-error)]">
                        {reservationErrorText(resErrors.time)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="res-party"
                      className="block text-sm font-bold text-[var(--color-ink)]"
                    >
                      {t.whatsapp.reservationForm.partyLabel}
                    </label>
                    <input
                      id="res-party"
                      name="partySize"
                      type="number"
                      min={MIN_PARTY_SIZE}
                      max={MAX_PARTY_SIZE}
                      required
                      value={partySize}
                      onChange={(e) => setPartySize(Number(e.target.value))}
                      aria-invalid={resErrors.partySize ? 'true' : 'false'}
                      className="mt-1.5 min-h-[48px] w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-ink)]"
                    />
                    {resErrors.partySize && (
                      <p className="mt-1 text-xs font-semibold text-[var(--color-error)]">
                        {t.whatsapp.reservationForm.errors.partyInvalid}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="res-occasion"
                    className="block text-sm font-bold text-[var(--color-ink)]"
                  >
                    {t.whatsapp.reservationForm.occasionLabel}
                  </label>
                  <select
                    id="res-occasion"
                    name="occasion"
                    value={occasion}
                    onChange={(e) => onOccasionChange(e.target.value)}
                    className="mt-1.5 min-h-[48px] w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 text-[var(--color-ink)]"
                  >
                    <option value="">{t.whatsapp.reservationForm.occasionDefault}</option>
                    {bookableEvents.map((ev) => (
                      <option key={ev.id} value={ev.title[lang]}>
                        {ev.title[lang]} ({ev.dayBadge[lang]})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="res-notes"
                    className="block text-sm font-bold text-[var(--color-ink)]"
                  >
                    {t.whatsapp.reservationForm.notesLabel}
                  </label>
                  <textarea
                    id="res-notes"
                    name="notes"
                    rows={2}
                    maxLength={240}
                    value={resNotes}
                    onChange={(e) => setResNotes(e.target.value)}
                    placeholder={t.whatsapp.reservationForm.notesPlaceholder}
                    className="mt-1.5 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 text-[var(--color-ink)]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-whatsapp w-full text-sm"
                >
                  <span>{t.whatsapp.reservationForm.submitCta}</span>
                </button>
              </form>
            ) : (
              <form
                id="panel-takeaway"
                role="tabpanel"
                aria-labelledby="tab-takeaway"
                noValidate
                onSubmit={handleTakeawaySubmit}
                className="mt-6 space-y-5"
              >
                <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-[var(--color-ink)]">
                      {t.whatsapp.takeawayForm.cartTitle}
                    </h3>
                    {cart.length > 0 && (
                      <button
                        type="button"
                        onClick={onClearCart}
                        className="text-xs font-bold text-[var(--color-red)] underline cursor-pointer"
                      >
                        {t.whatsapp.takeawayForm.clearCart}
                      </button>
                    )}
                  </div>

                  {cart.length === 0 ? (
                    <div className="mt-3 text-sm text-[var(--color-muted)]">
                      <p>{t.whatsapp.takeawayForm.emptyCart}</p>
                      <a
                        href="#menu"
                        className="mt-2 inline-block font-bold text-[var(--color-red)] underline"
                      >
                        {t.whatsapp.takeawayForm.browseMenu}
                      </a>
                    </div>
                  ) : (
                    <ul className="mt-3 divide-y divide-[var(--color-border)]">
                      {cart.map(({ item, quantity }) => (
                        <li key={item.id} className="flex items-center justify-between gap-3 py-2.5">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-[var(--color-ink)]">
                              {item.name[lang]}
                            </p>
                            <p className="text-xs text-[var(--color-muted)] tabular-nums">
                              {formatEuro(item.price)}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              aria-label={`${t.whatsapp.takeawayForm.decreaseQty}: ${item.name[lang]}`}
                              onClick={() => onUpdateQty(item.id, -1)}
                              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface-card)]"
                            >
                              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold tabular-nums">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`${t.whatsapp.takeawayForm.increaseQty}: ${item.name[lang]}`}
                              onClick={() => onUpdateQty(item.id, 1)}
                              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface-card)]"
                            >
                              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              aria-label={`${t.whatsapp.takeawayForm.removeItem}: ${item.name[lang]}`}
                              onClick={() => onRemoveItem(item.id)}
                              className="ml-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-[var(--color-error)] hover:bg-[var(--color-error-bg)]"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {cart.length > 0 && (
                    <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-base font-extrabold text-[var(--color-ink)]">
                      <span>{t.whatsapp.takeawayForm.totalLabel}</span>
                      <span className="text-[var(--color-red)] tabular-nums">
                        {formatEuro(cartTotal)}
                      </span>
                    </div>
                  )}

                  {takeErrors.cart && (
                    <p className="mt-2 text-sm font-semibold text-[var(--color-error)]">
                      {t.whatsapp.takeawayForm.errors.emptyCart}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="take-name"
                      className="block text-sm font-bold text-[var(--color-ink)]"
                    >
                      {t.whatsapp.takeawayForm.nameLabel}
                    </label>
                    <input
                      ref={customerNameRef}
                      id="take-name"
                      name="customerName"
                      type="text"
                      required
                      autoComplete="name"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value)
                        if (takeErrors.customerName) {
                          setTakeErrors((prev) => ({ ...prev, customerName: '' }))
                        }
                      }}
                      aria-invalid={takeErrors.customerName ? 'true' : 'false'}
                      aria-describedby={takeErrors.customerName ? 'take-name-error' : undefined}
                      placeholder={t.whatsapp.takeawayForm.namePlaceholder}
                      className="mt-1.5 min-h-[48px] w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 text-[var(--color-ink)]"
                    />
                    {takeErrors.customerName && (
                      <p
                        id="take-name-error"
                        className="mt-1.5 text-sm font-semibold text-[var(--color-error)]"
                      >
                        {t.whatsapp.takeawayForm.errors.nameRequired}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="take-pickup"
                      className="block text-sm font-bold text-[var(--color-ink)]"
                    >
                      {t.whatsapp.takeawayForm.pickupLabel}
                    </label>
                    <input
                      ref={pickupTimeRef}
                      id="take-pickup"
                      name="pickupTime"
                      type="time"
                      required
                      value={pickupTime}
                      onChange={(e) => {
                        setPickupTime(e.target.value)
                        if (takeErrors.pickupTime) {
                          setTakeErrors((prev) => ({ ...prev, pickupTime: '' }))
                        }
                      }}
                      aria-invalid={takeErrors.pickupTime ? 'true' : 'false'}
                      aria-describedby={takeErrors.pickupTime ? 'take-pickup-error' : undefined}
                      className="mt-1.5 min-h-[48px] w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 text-[var(--color-ink)]"
                    />
                    {takeErrors.pickupTime && (
                      <p
                        id="take-pickup-error"
                        className="mt-1.5 text-sm font-semibold text-[var(--color-error)]"
                      >
                        {takeawayErrorText(takeErrors.pickupTime)}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="take-notes"
                    className="block text-sm font-bold text-[var(--color-ink)]"
                  >
                    {t.whatsapp.takeawayForm.notesLabel}
                  </label>
                  <textarea
                    id="take-notes"
                    name="dietaryNotes"
                    rows={2}
                    maxLength={240}
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    placeholder={t.whatsapp.takeawayForm.notesPlaceholder}
                    className="mt-1.5 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 text-[var(--color-ink)]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-whatsapp w-full text-sm"
                >
                  <span>{t.whatsapp.takeawayForm.submitCta}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
