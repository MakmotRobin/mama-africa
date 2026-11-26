import { MessageCircle, Pause, Play, UtensilsCrossed } from 'lucide-react'
import { useEffect, useState, type FocusEvent } from 'react'
import { useLanguage } from '../context/useLanguage'

interface HeroProps {
  onOpenWhatsapp: () => void
}

const HERO_IMAGES = [
  {
    src: '/images/hero-feast.jpg',
    altIt: 'Tavola imbandita da Mama Africa con riso Jollof, Fataya e pesce alla griglia',
    altEn: 'Mama Africa feast with Jollof rice, Fataya pies, and grilled fish',
  },
  {
    src: '/images/fb-cover.jpg',
    altIt: 'Interno accogliente di Mama Africa Restaurant & Bar a Cosenza',
    altEn: 'Cozy lounge interior at Mama Africa Restaurant & Bar in Cosenza',
  },
  {
    src: '/images/dish-jollof.jpg',
    altIt: 'Riso Jollof tradizionale con platano dolce fritto',
    altEn: 'Signature Jollof rice with caramelized sweet plantains',
  },
  {
    src: '/images/dish-grill.jpg',
    altIt: 'Tilapia alla brace e spiedini Suya con platano e lime',
    altEn: 'Charcoal-grilled tilapia and Suya skewers with plantains and lime',
  },
  {
    src: '/images/dish-suya-real.jpg',
    altIt: 'Carne speziata alla brace dalla cucina di Mama Africa',
    altEn: 'Spiced charcoal meat from the Mama Africa kitchen',
  },
  {
    src: '/images/dj-sky-face.jpg',
    altIt: 'DJ Sky face alla consolle durante una serata da Mama Africa',
    altEn: 'DJ Sky face on the decks during a party night at Mama Africa',
  },
  {
    src: '/images/dorime-chief-priest.jpg',
    altIt: 'Dorime Chief Priest ospite speciale da Mama Africa',
    altEn: 'Dorime Chief Priest special guest at Mama Africa',
  },
  {
    src: '/images/nightlife-crowd.jpg',
    altIt: 'Festa e musica in pista da Mama Africa Restaurant & Bar',
    altEn: 'Dancefloor energy and drinks at Mama Africa Restaurant & Bar',
  },
] as const

const SLIDE_INTERVAL_MS = 3000

function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

export function Hero({ onOpenWhatsapp }: HeroProps) {
  const { lang, t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocusInside, setHasFocusInside] = useState(false)
  const [isPausedByUser, setIsPausedByUser] = useState(false)
  const isPaused = isHovered || hasFocusInside || isPausedByUser

  useEffect(() => {
    if (isPaused || prefersReducedMotion()) return

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, SLIDE_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [isPaused])

  // Pause only for keyboard focus: a mouse click on Play must not keep the gallery paused.
  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (event.target.matches(':focus-visible')) setHasFocusInside(true)
  }

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const focusStaysInside = event.currentTarget.contains(event.relatedTarget as Node | null)
    if (!focusStaysInside) setHasFocusInside(false)
  }

  return (
    <section
      id="top"
      className="border-b border-[var(--color-border-on-black)] bg-[var(--color-black)] text-[var(--color-white)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="font-[var(--font-display)] text-4xl font-bold leading-[1.08] text-[var(--color-white)] sm:text-5xl lg:text-[3.5rem]">
              {t.hero.title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-surface)] sm:text-lg">
              {t.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onOpenWhatsapp}
                className="inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2.5 rounded-md bg-[var(--color-red)] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[var(--color-white)] transition-colors duration-150 hover:bg-[var(--color-red-hover)]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>{t.hero.primaryCta}</span>
              </button>
              <a
                href="#menu"
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-md border border-[var(--color-surface)] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[var(--color-white)] transition-colors duration-150 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              >
                <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
                <span>{t.hero.secondaryCta}</span>
              </a>
            </div>
          </div>

          <div
            className="lg:col-span-5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <div className="overflow-hidden rounded-lg border border-[var(--color-border-on-black)] bg-[var(--color-black-soft)] p-2 shadow-[var(--shadow-elevated)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[var(--color-black)]">
                {HERO_IMAGES.map((img, idx) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={lang === 'it' ? img.altIt : img.altEn}
                    width={800}
                    height={600}
                    aria-hidden={idx !== activeIndex}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                      idx === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center gap-1 pt-1">
                <button
                  type="button"
                  onClick={() => setIsPausedByUser((prev) => !prev)}
                  aria-label={isPausedByUser ? t.hero.playSlideshow : t.hero.pauseSlideshow}
                  className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-[var(--color-surface)] transition-colors duration-150 hover:text-[var(--color-gold)]"
                >
                  {isPausedByUser ? (
                    <Play className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Pause className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>

                <div className="flex items-center" role="group" aria-label={t.hero.galleryLabel}>
                  {HERO_IMAGES.map((img, idx) => (
                    <button
                      key={img.src}
                      type="button"
                      aria-label={`${t.hero.slideLabel} ${idx + 1} / ${HERO_IMAGES.length}`}
                      aria-pressed={idx === activeIndex}
                      onClick={() => setActiveIndex(idx)}
                      className="group inline-flex h-11 cursor-pointer items-center justify-center px-1"
                    >
                      <span
                        aria-hidden="true"
                        className={`block h-2 rounded-full transition-all duration-200 ${
                          idx === activeIndex
                            ? 'w-5 bg-[var(--color-gold)]'
                            : 'w-2 bg-[var(--color-border-on-black)] group-hover:bg-[var(--color-surface)]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
