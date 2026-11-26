import { RESTAURANT_CONFIG } from '../config/restaurant'
import { useLanguage } from '../context/useLanguage'
import { useOpeningHoursRows } from '../context/useOpeningHoursRows'
import { StripeBand } from './brand/StripeBand'
import { PHONE_CALL_URL, WHATSAPP_CHAT_URL } from '../utils/whatsapp'

export function Footer() {
  const { t } = useLanguage()
  const openingHoursRows = useOpeningHoursRows()

  return (
    <footer className="bg-[var(--color-black)] text-[var(--color-surface)]">
      <StripeBand />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <img
              src="images/logo.jpg"
              alt="Mama Africa Restaurant & Bar"
              loading="lazy"
              width={52}
              height={52}
              className="h-13 w-13 rounded-md border border-[var(--color-border-on-black)] object-cover"
            />
            <span className="font-display text-xl text-[var(--color-gold)]">
              {RESTAURANT_CONFIG.name}
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-surface)]">
            {t.footer.tagline}
          </p>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-gold)]">
            {t.location.hoursTitle}
          </p>
          <dl className="mt-3 space-y-1.5 text-sm">
            {openingHoursRows.map((row) => (
              <div key={row.days} className="flex justify-between gap-4">
                <dt className="font-semibold text-[var(--color-white)]">{row.days}</dt>
                <dd className="text-[var(--color-surface)] tabular-nums">{row.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-2 text-sm md:col-span-3 md:text-right">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-gold)]">
            {t.location.addressTitle}
          </p>
          <p className="font-semibold text-[var(--color-white)]">
            {RESTAURANT_CONFIG.addressLine}, Cosenza
          </p>
          <p>
            <a
              href={WHATSAPP_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center font-bold text-[var(--color-gold)] tabular-nums underline-offset-4 hover:underline md:min-h-0"
            >
              WhatsApp: {RESTAURANT_CONFIG.whatsappDisplay}
            </a>
          </p>
          <p>
            <a
              href={PHONE_CALL_URL}
              className="inline-flex min-h-[44px] items-center font-semibold text-[var(--color-surface)] tabular-nums underline-offset-4 hover:text-[var(--color-white)] hover:underline md:min-h-0"
            >
              Tel: {RESTAURANT_CONFIG.phoneDisplay}
            </a>
          </p>
          <p>
            <a
              href={RESTAURANT_CONFIG.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)] underline hover:text-[var(--color-white)]"
            >
              Facebook
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
