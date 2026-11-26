import { ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'
import { RESTAURANT_CONFIG } from '../config/restaurant'
import { useLanguage } from '../context/useLanguage'
import { useOpeningHoursRows } from '../context/useOpeningHoursRows'
import { PHONE_CALL_URL, WHATSAPP_CHAT_URL } from '../utils/whatsapp'

export function LocationSection() {
  const { lang, t } = useLanguage()
  const openingHoursRows = useOpeningHoursRows()
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  return (
    <section
      id="location"
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-red)]">
            {t.location.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
            {t.location.title}
          </h2>
          <p className="mt-3 text-base text-[var(--color-muted)]">{t.location.subtitle}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="space-y-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-card)] p-6 shadow-[var(--shadow-card)] lg:col-span-5">
            <div>
              <h3 className="font-display text-lg font-bold text-[var(--color-ink)]">
                {t.location.addressTitle}
              </h3>
              <p className="mt-1.5 text-base font-bold text-[var(--color-ink)]">
                {RESTAURANT_CONFIG.addressLine}
              </p>
              <p className="text-sm text-[var(--color-muted)]">{RESTAURANT_CONFIG.cityLine}</p>
              <p className="mt-1 text-xs font-bold text-[var(--color-emerald-ink)]">
                {RESTAURANT_CONFIG.landmark[lang]}
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-[var(--color-ink)]">
                {t.location.hoursTitle}
              </h3>
              <dl className="mt-2 space-y-1.5 text-sm">
                {openingHoursRows.map((row) => (
                  <div key={row.days} className="flex justify-between gap-4">
                    <dt className="font-bold text-[var(--color-ink)]">{row.days}</dt>
                    <dd className="text-[var(--color-muted)] tabular-nums">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={RESTAURANT_CONFIG.mapsQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[var(--color-red)] px-4 text-sm font-bold text-[var(--color-white)] transition-colors duration-150 hover:bg-[var(--color-red-hover)]"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span>{t.location.openMapsCta}</span>
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={WHATSAPP_CHAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[var(--color-emerald)] px-3 text-sm font-bold text-[var(--color-white)] transition-colors duration-150 hover:bg-[var(--color-emerald-hover)]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={PHONE_CALL_URL}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-[var(--color-black)] bg-[var(--color-surface-card)] px-3 text-sm font-bold text-[var(--color-ink)] transition-colors duration-150 hover:bg-[var(--color-black)] hover:text-[var(--color-white)]"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t.location.callCta}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-card)] lg:col-span-7">
            {isMapLoaded ? (
              <iframe
                title={t.location.mapIframeTitle}
                src={RESTAURANT_CONFIG.mapsEmbedUrl}
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full border-0 lg:h-full lg:min-h-[460px]"
              />
            ) : (
              <div className="flex h-[360px] flex-col items-center justify-center gap-4 bg-[var(--color-bg)] p-6 text-center lg:h-full lg:min-h-[460px]">
                <MapPin className="h-10 w-10 text-[var(--color-red)]" aria-hidden="true" />
                <div>
                  <p className="font-display text-lg font-bold text-[var(--color-ink)]">
                    {RESTAURANT_CONFIG.addressLine}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">{RESTAURANT_CONFIG.cityLine}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMapLoaded(true)}
                  className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-md border border-[var(--color-black)] bg-[var(--color-surface-card)] px-5 text-sm font-bold text-[var(--color-ink)] transition-colors duration-150 hover:bg-[var(--color-black)] hover:text-[var(--color-white)]"
                >
                  {t.location.loadMapCta}
                </button>
                <p className="max-w-xs text-xs text-[var(--color-muted)]">{t.location.mapConsentNote}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
