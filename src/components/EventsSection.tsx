import { useLanguage } from '../context/useLanguage'
import { CULTURAL_EVENTS } from '../data/menu'

interface EventsSectionProps {
  onReserveEvent: (eventTitle: string) => void
}

const EVENT_GALLERY = [
  {
    src: '/images/fb-celebrity-barman.jpg',
    captionIt: 'Celebrity Barman · Dorime Chief Priest',
    captionEn: 'Celebrity Barman · Dorime Chief Priest',
  },
  {
    src: '/images/nightlife-show.jpg',
    captionIt: 'Performance & Luce',
    captionEn: 'Live Show & Lights',
  },
  {
    src: '/images/nightlife-led.jpg',
    captionIt: 'Energia in Pista',
    captionEn: 'Dancefloor Energy',
  },
  {
    src: '/images/nightlife-crowd.jpg',
    captionIt: 'Festa da Mama Africa',
    captionEn: 'Mama Africa Crowd',
  },
] as const

export function EventsSection({ onReserveEvent }: EventsSectionProps) {
  const { lang, t } = useLanguage()
  const [featuredEvent, ...weeklyEvents] = CULTURAL_EVENTS

  return (
    <section id="events" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
      <div className="grid items-center gap-8 border-b border-[var(--color-border)] pb-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--color-terracotta)]">
            {t.events.eyebrow}
          </p>
          <h2 className="mt-2 font-[var(--font-display)] text-3xl font-bold text-[var(--color-espresso)] sm:text-4xl">
            {t.events.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
            {t.events.subtitle}
          </p>
        </div>

        <figure className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-espresso)] p-2 shadow-[var(--shadow-card)] md:col-span-6">
          <img
            src="/images/dj-sky-face.jpg"
            alt={t.events.imageAlt}
            loading="lazy"
            width={800}
            height={520}
            className="aspect-[16/10] w-full rounded-sm object-cover"
          />
          <figcaption className="flex items-center justify-between px-2 pb-1 pt-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-gold)]">
            <span>DJ Sky face</span>
            <span className="text-[var(--color-surface)]">Mama Africa Cosenza</span>
          </figcaption>
        </figure>
      </div>

      {featuredEvent && (
        <article className="mt-10 grid gap-6 rounded-lg border border-[var(--color-border-dark)] bg-[var(--color-espresso)] p-6 text-[var(--color-white)] shadow-[var(--shadow-elevated)] md:grid-cols-12 md:items-center md:p-8">
          <div className="md:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-sm bg-[var(--color-gold)] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[var(--color-espresso)]">
                {featuredEvent.dayBadge[lang]}
              </span>
              <span className="text-xs font-bold text-[var(--color-surface)] tabular-nums">
                {featuredEvent.time}
              </span>
            </div>

            <h3 className="mt-4 font-[var(--font-display)] text-2xl font-bold text-[var(--color-white)] sm:text-3xl">
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
              className="mt-5 inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-md bg-[var(--color-terracotta)] px-5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-white)] transition-colors duration-150 hover:bg-[var(--color-terracotta-hover)] sm:w-auto"
            >
              {t.events.reserveNightCta}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 md:col-span-7">
            <figure className="overflow-hidden rounded-md border border-[var(--color-border-dark)] bg-[var(--color-espresso-soft)] p-1.5">
              <img
                src="/images/dorime-chief-priest.jpg"
                alt="Dorime Chief Priest at Mama Africa"
                loading="lazy"
                width={500}
                height={360}
                className="aspect-[4/3] w-full rounded-sm object-cover"
              />
              <figcaption className="px-1.5 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-[var(--color-gold)]">
                Dorime Chief Priest
              </figcaption>
            </figure>

            <figure className="overflow-hidden rounded-md border border-[var(--color-border-dark)] bg-[var(--color-espresso-soft)] p-1.5">
              <img
                src="/images/dj-sky-face.jpg"
                alt="DJ Sky face mixing live"
                loading="lazy"
                width={500}
                height={360}
                className="aspect-[4/3] w-full rounded-sm object-cover"
              />
              <figcaption className="px-1.5 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-[var(--color-gold)]">
                DJ Sky face
              </figcaption>
            </figure>
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
              <span className="inline-flex items-center rounded-sm bg-[var(--color-surface)] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-espresso)]">
                {ev.dayBadge[lang]}
              </span>
              <span className="text-xs font-bold text-[var(--color-muted)] tabular-nums">
                {ev.time}
              </span>
            </div>

            <h3 className="mt-4 font-[var(--font-display)] text-xl font-bold text-[var(--color-espresso)]">
              {ev.title[lang]}
            </h3>

            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
              {ev.description[lang]}
            </p>

            <ul className="mt-4 space-y-1.5 border-t border-[var(--color-border)] pt-4">
              {ev.highlights.map((hl) => (
                <li
                  key={hl[lang]}
                  className="text-xs font-semibold text-[var(--color-espresso)]"
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {EVENT_GALLERY.map((photo) => (
            <figure
              key={photo.src}
              className="card-hover overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-card)]"
            >
              <div className="overflow-hidden">
                <img
                  src={photo.src}
                  alt={lang === 'it' ? photo.captionIt : photo.captionEn}
                  loading="lazy"
                  width={480}
                  height={360}
                  className="img-zoom aspect-[4/3] w-full object-cover"
                />
              </div>
              <figcaption className="px-3 py-2 text-xs font-bold text-[var(--color-espresso)]">
                {lang === 'it' ? photo.captionIt : photo.captionEn}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
