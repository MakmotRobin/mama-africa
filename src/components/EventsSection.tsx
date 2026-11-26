import { useLanguage } from '../context/useLanguage'
import { useEventsToShow } from '../context/useEventsToShow'
import { PAST_EVENTS } from '../data/menu'
import { formatLongDate } from '../utils/dates'
import { ScriptKicker } from './brand/ScriptKicker'
import { StripeBand } from './brand/StripeBand'

interface EventsSectionProps {
  onReserveEvent: (eventTitle: string) => void
}

const EVENTS_HEADER_PHOTO = {
  src: 'images/nightlife-show.jpg',
  caption: { it: 'Performance & Luce', en: 'Live Show & Lights' },
} as const

const EVENT_GALLERY = [
  {
    src: 'images/nightlife-led.jpg',
    caption: { it: 'Energia in Pista', en: 'Dancefloor Energy' },
  },
  {
    src: 'images/nightlife-crowd.jpg',
    caption: { it: 'Festa da Mama Africa', en: 'Mama Africa Crowd' },
  },
  {
    src: 'images/dorime-priest-pose.jpg',
    caption: { it: 'Dorime Chief Priest in Scena', en: 'Dorime Chief Priest on Stage' },
  },
] as const

export function EventsSection({ onReserveEvent }: EventsSectionProps) {
  const { lang, t } = useLanguage()
  const { featured: featuredEvent } = useEventsToShow()

  return (
    <section id="events" className="bg-[var(--color-bg)]">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-14 pb-10 sm:px-6 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-6">
          <ScriptKicker tone="orange">{t.events.kicker}</ScriptKicker>
          <h2 className="mt-1 font-display text-4xl text-[var(--color-black)] sm:text-5xl">
            {t.events.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
            {t.events.subtitle}
          </p>
        </div>

        <figure className="md:col-span-6">
          <img
            src={EVENTS_HEADER_PHOTO.src}
            alt={t.events.imageAlt}
            loading="lazy"
            width={800}
            height={520}
            className="img-pop aspect-[16/10] w-full rounded-[var(--radius-lg)] border-[3px] border-[var(--color-gold)] object-cover shadow-[var(--shadow-card)]"
          />
          <figcaption className="mt-2 text-sm font-semibold text-[var(--color-muted)]">
            {EVENTS_HEADER_PHOTO.caption[lang]}
          </figcaption>
        </figure>
      </div>

      {featuredEvent && (
        <article className="bg-[var(--color-black)] text-[var(--color-surface)]">
          <StripeBand />
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-12 md:items-center md:py-16">
            <div className="md:col-span-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-sm bg-[var(--color-gold)] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[var(--color-black)]">
                  {featuredEvent.dayBadge[lang]}
                </span>
                <span className="text-sm font-bold tabular-nums">{featuredEvent.time}</span>
              </div>

              <h3 className="mt-4 font-display text-3xl text-[var(--color-gold)] sm:text-4xl">
                {featuredEvent.title[lang]}
              </h3>

              <p className="mt-3 text-base leading-relaxed">{featuredEvent.description[lang]}</p>

              <ul className="mt-4 space-y-1.5">
                {featuredEvent.highlights.map((hl) => (
                  <li key={hl[lang]} className="text-sm font-bold text-[var(--color-white)]">
                    {hl[lang]}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => onReserveEvent(featuredEvent.title[lang])}
                className="btn btn-accent mt-6 w-full sm:w-auto"
              >
                {t.events.reserveNightCta}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:col-span-7">
              {featuredEvent.photos?.map((photo) => (
                <figure key={photo.src}>
                  <img
                    src={photo.src}
                    alt={photo.alt[lang]}
                    loading="lazy"
                    width={500}
                    height={360}
                    className="img-pop aspect-[4/3] w-full rounded-[var(--radius-lg)] border-[3px] border-[var(--color-gold)] object-cover shadow-[var(--shadow-elevated)]"
                  />
                  <figcaption className="mt-2 text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                    {photo.caption[lang]}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </article>
      )}

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
        <div>
          <h3 id="past-nights-title" className="font-display text-2xl text-[var(--color-ink)]">
            {t.events.pastTitle}
          </h3>
          <ul
            aria-labelledby="past-nights-title"
            className="mt-4 divide-y-2 divide-dotted divide-[var(--color-border)]"
          >
            {PAST_EVENTS.map((night) => (
              <li
                key={night.id}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="shrink-0 text-sm font-extrabold uppercase tracking-wider text-[var(--color-red)] tabular-nums sm:w-48">
                  {formatLongDate(night.date, lang)}
                </span>
                <span className="font-display text-lg leading-snug text-[var(--color-ink)]">
                  {night.title[lang]}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[var(--color-muted)]">{t.events.pastMore}</p>
        </div>

        <div className="mt-14">
          <h3 className="mb-5 font-display text-2xl text-[var(--color-ink)]">
            {t.events.galleryTitle}
          </h3>
          <div className="grid gap-5 sm:grid-cols-3">
            {EVENT_GALLERY.map((photo) => (
              <figure key={photo.src} className="group">
                <div className="overflow-hidden rounded-[var(--radius-lg)] border-2 border-[var(--color-gold)] shadow-[var(--shadow-card)]">
                  <img
                    src={photo.src}
                    alt={photo.caption[lang]}
                    loading="lazy"
                    width={480}
                    height={360}
                    className="img-zoom img-pop aspect-[4/3] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-sm font-semibold text-[var(--color-ink)]">
                  {photo.caption[lang]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
