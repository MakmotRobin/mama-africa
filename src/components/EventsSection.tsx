import { useLanguage } from '../context/useLanguage'
import { useEventsToShow } from '../context/useEventsToShow'

interface EventsSectionProps {
  onReserveEvent: (eventTitle: string) => void
}

const EVENTS_HEADER_PHOTO = {
  src: '/images/nightlife-show.jpg',
  caption: { it: 'Performance & Luce', en: 'Live Show & Lights' },
} as const

const EVENT_GALLERY = [
  {
    src: '/images/nightlife-led.jpg',
    caption: { it: 'Energia in Pista', en: 'Dancefloor Energy' },
  },
  {
    src: '/images/nightlife-crowd.jpg',
    caption: { it: 'Festa da Mama Africa', en: 'Mama Africa Crowd' },
  },
  {
    src: '/images/dorime-priest-pose.jpg',
    caption: { it: 'Dorime Chief Priest in Scena', en: 'Dorime Chief Priest on Stage' },
  },
] as const

export function EventsSection({ onReserveEvent }: EventsSectionProps) {
  const { lang, t } = useLanguage()
  const { featured: featuredEvent, weekly: weeklyEvents } = useEventsToShow()

  return (
    <section id="events" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
      <div className="grid items-center gap-8 border-b border-[var(--color-border)] pb-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--color-red)]">
            {t.events.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
            {t.events.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
            {t.events.subtitle}
          </p>
        </div>

        <figure className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-black)] p-2 shadow-[var(--shadow-card)] md:col-span-6">
          <img
            src={EVENTS_HEADER_PHOTO.src}
            alt={t.events.imageAlt}
            loading="lazy"
            width={800}
            height={520}
            className="aspect-[16/10] w-full rounded-sm object-cover"
          />
          <figcaption className="flex items-center justify-between px-2 pb-1 pt-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-gold)]">
            <span>{EVENTS_HEADER_PHOTO.caption[lang]}</span>
            <span className="text-[var(--color-surface)]">Mama Africa Cosenza</span>
          </figcaption>
        </figure>
      </div>

      {featuredEvent && (
        <article className="mt-10 grid gap-6 rounded-lg border border-[var(--color-border-on-black)] bg-[var(--color-black)] p-6 text-[var(--color-white)] shadow-[var(--shadow-elevated)] md:grid-cols-12 md:items-center md:p-8">
          <div className="md:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-sm bg-[var(--color-gold)] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[var(--color-ink)]">
                {featuredEvent.dayBadge[lang]}
              </span>
              <span className="text-xs font-bold text-[var(--color-surface)] tabular-nums">
                {featuredEvent.time}
              </span>
            </div>

            <h3 className="mt-4 font-display text-2xl font-bold text-[var(--color-white)] sm:text-3xl">
              {featuredEvent.title[lang]}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-[var(--color-surface)]">
              {featuredEvent.description[lang]}
            </p>

            <ul className="mt-4 space-y-1.5">
              {featuredEvent.highlights.map((hl) => (
                <li
                  key={hl[lang]}
                  className="text-sm font-bold text-[var(--color-gold)]"
                >
                  {hl[lang]}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => onReserveEvent(featuredEvent.title[lang])}
              className="mt-5 inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-md bg-[var(--color-red)] px-5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-white)] transition-colors duration-150 hover:bg-[var(--color-red-hover)] sm:w-auto"
            >
              {t.events.reserveNightCta}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 md:col-span-7">
            {featuredEvent.photos?.map((photo) => (
              <figure
                key={photo.src}
                className="overflow-hidden rounded-md border border-[var(--color-border-on-black)] bg-[var(--color-black-soft)] p-1.5"
              >
                <img
                  src={photo.src}
                  alt={photo.alt[lang]}
                  loading="lazy"
                  width={500}
                  height={360}
                  className="aspect-[4/3] w-full rounded-sm object-cover"
                />
                <figcaption className="px-1.5 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-[var(--color-gold)]">
                  {photo.caption[lang]}
                </figcaption>
              </figure>
            ))}
          </div>
        </article>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {weeklyEvents.map((ev) => (
          <article
            key={ev.id}
            className="card-hover flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-card)] p-6 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center rounded-sm bg-[var(--color-surface)] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
                {ev.dayBadge[lang]}
              </span>
              <span className="text-xs font-bold text-[var(--color-muted)] tabular-nums">
                {ev.time}
              </span>
            </div>

            <h3 className="mt-4 font-display text-xl font-bold text-[var(--color-ink)]">
              {ev.title[lang]}
            </h3>

            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
              {ev.description[lang]}
            </p>

            <ul className="mt-4 space-y-1.5 border-t border-[var(--color-border)] pt-4">
              {ev.highlights.map((hl) => (
                <li
                  key={hl[lang]}
                  className="text-xs font-semibold text-[var(--color-ink)]"
                >
                  {hl[lang]}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
          {t.events.galleryTitle}
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {EVENT_GALLERY.map((photo) => (
            <figure
              key={photo.src}
              className="card-hover overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-card)]"
            >
              <div className="overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.caption[lang]}
                  loading="lazy"
                  width={480}
                  height={360}
                  className="img-zoom aspect-[4/3] w-full object-cover"
                />
              </div>
              <figcaption className="px-3 py-2 text-xs font-bold text-[var(--color-ink)]">
                {photo.caption[lang]}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
