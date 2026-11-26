import { ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'
import { RESTAURANT_CONFIG } from '../config/restaurant'
import { useLanguage } from '../context/useLanguage'
import { useOpeningHoursRows } from '../context/useOpeningHoursRows'
import { PHONE_CALL_URL, WHATSAPP_CHAT_URL } from '../utils/whatsapp'
import { ScriptKicker } from './brand/ScriptKicker'
import { ZigzagDivider } from './brand/ZigzagDivider'

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
          <ScriptKicker tone="emerald">{t.location.kicker}</ScriptKicker>
          <h2 className="mt-1 font-display text-4xl text-[var(--color-black)] sm:text-5xl">
            {t.location.title}
          </h2>
          <p className="mt-3 text-base text-[var(--color-muted)]">{t.location.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="space-y-6 lg:col-span-5">
            <div>
              <h3 className="font-display text-xl text-[var(--color-ink)]">
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
              <h3 className="font-display text-xl text-[var(--color-ink)]">
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
                className="btn btn-primary w-full"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span>{t.location.openMapsCta}</span>
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={WHATSAPP_CHAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp w-full"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={PHONE_CALL_URL}
                  className="btn btn-outline w-full"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t.location.callCta}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] lg:col-span-7">
            {isMapLoaded ? (
              <iframe
                title={t.location.mapIframeTitle}
                src={RESTAURANT_CONFIG.mapsEmbedUrl}
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full border-0 lg:h-full lg:min-h-[460px]"
              />
            ) : (
              <div className="flex h-[360px] flex-col bg-[var(--color-bg)] lg:h-full lg:min-h-[460px]">
                <ZigzagDivider />
                <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
                  <MapPin className="h-10 w-10 text-[var(--color-red)]" aria-hidden="true" />
                  <div>
                    <p className="font-display text-lg text-[var(--color-ink)]">
                      {RESTAURANT_CONFIG.addressLine}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">{RESTAURANT_CONFIG.cityLine}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMapLoaded(true)}
                    className="btn btn-outline"
                  >
                    {t.location.loadMapCta}
                  </button>
                  <p className="max-w-xs text-xs text-[var(--color-muted)]">{t.location.mapConsentNote}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
