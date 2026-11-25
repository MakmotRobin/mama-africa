import { ExternalLink } from 'lucide-react'
import { RESTAURANT_CONFIG } from '../config/restaurant'
import { useLanguage } from '../context/useLanguage'
import { useOpeningHoursRows } from '../context/useOpeningHoursRows'

export function LocationSection() {
  const { lang, t } = useLanguage()
  const openingHoursRows = useOpeningHoursRows()

  return (
    <section
      id="location"
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-terracotta)]">
            {t.location.eyebrow}
          </p>
          <h2 className="mt-2 font-[var(--font-display)] text-3xl font-bold text-[var(--color-espresso)] sm:text-4xl">
            {t.location.title}
          </h2>
          <p className="mt-3 text-base text-[var(--color-muted)]">{t.location.subtitle}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="space-y-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-card)] p-6 shadow-[var(--shadow-card)] lg:col-span-5">
            <div>
              <h3 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-espresso)]">
                {t.location.addressTitle}
              </h3>
              <p className="mt-1.5 text-base font-bold text-[var(--color-espresso)]">
                {RESTAURANT_CONFIG.addressLine}
              </p>
              <p className="text-sm text-[var(--color-muted)]">{RESTAURANT_CONFIG.cityLine}</p>
              <p className="mt-1 text-xs font-bold text-[var(--color-emerald-ink)]">
                {RESTAURANT_CONFIG.landmark[lang]}
              </p>
            </div>

            <div>
              <h3 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-espresso)]">
                {t.location.hoursTitle}
              </h3>
              <dl className="mt-2 space-y-1.5 text-sm">
                {openingHoursRows.map((row) => (
                  <div key={row.days} className="flex justify-between gap-4">
                    <dt className="font-bold text-[var(--color-espresso)]">{row.days}</dt>
                    <dd className="text-[var(--color-muted)] tabular-nums">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="pt-2">
              <a
                href={RESTAURANT_CONFIG.mapsQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-terracotta)] px-4 text-sm font-bold text-[var(--color-white)] transition-colors duration-150 hover:bg-[var(--color-terracotta-hover)]"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span>{t.location.openMapsCta}</span>
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-card)] lg:col-span-7">
            <iframe
              title={t.location.mapIframeTitle}
              src={RESTAURANT_CONFIG.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full border-0 lg:h-full lg:min-h-[460px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
