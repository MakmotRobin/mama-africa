import { MessageCircle, Pause, Play, UtensilsCrossed } from 'lucide-react'
import { useEffect, useState, type FocusEvent } from 'react'
import { useLanguage } from '../context/useLanguage'
import type { LocalizedText } from '../types'
import { ScriptKicker } from './brand/ScriptKicker'

interface HeroProps {
  onOpenWhatsapp: () => void
}

interface HeroSlide {
  src: string
  alt: LocalizedText
  caption: { title: LocalizedText; line: LocalizedText }
}

const HERO_SLIDES: readonly HeroSlide[] = [
  {
    src: '/images/hero-feast.jpg',
    alt: {
      it: 'Tavola imbandita da Mama Africa con riso Jollof, Fataya e pesce alla griglia',
      en: 'Mama Africa feast with Jollof rice, Fataya pies, and grilled fish',
    },
    caption: {
      title: { it: 'La tavola di Mama', en: 'Mama’s table' },
      line: { it: 'Jollof, fataya e pesce alla brace', en: 'Jollof, fataya and grilled fish' },
    },
  },
  {
    src: '/images/fb-cover.jpg',
    alt: {
      it: 'Interno accogliente di Mama Africa Restaurant & Bar a Cosenza',
      en: 'Cozy lounge interior at Mama Africa Restaurant & Bar in Cosenza',
    },
    caption: {
      title: { it: 'Il nostro locale', en: 'Our place' },
      line: { it: 'A due passi da Corso Mazzini', en: 'Just off Corso Mazzini' },
    },
  },
  {
    src: '/images/dish-jollof.jpg',
    alt: {
      it: 'Riso Jollof tradizionale con platano dolce fritto',
      en: 'Signature Jollof rice with caramelized sweet plantains',
    },
    caption: {
      title: { it: 'Party Jollof', en: 'Party Jollof' },
      line: { it: 'Riso affumicato con platano dolce', en: 'Smoky rice with sweet plantain' },
    },
  },
  {
    src: '/images/dish-grill.jpg',
    alt: {
      it: 'Tilapia alla brace con platano e lime',
      en: 'Charcoal-grilled tilapia with plantains and lime',
    },
    caption: {
      title: { it: 'Dalla brace', en: 'Off the grill' },
      line: {
        it: 'Tilapia alla brace con platano e lime',
        en: 'Grilled tilapia with plantain and lime',
      },
    },
  },
  {
    src: '/images/dj-sky-face.jpg',
    alt: {
      it: 'DJ Sky face alla consolle durante una serata da Mama Africa',
      en: 'DJ Sky face on the decks during a party night at Mama Africa',
    },
    caption: {
      title: { it: 'DJ Sky face', en: 'DJ Sky face' },
      line: { it: 'Afrobeats e Amapiano il venerdì', en: 'Afrobeats and Amapiano on Fridays' },
    },
  },
  {
    src: '/images/dorime-chief-priest.jpg',
    alt: {
      it: 'Dorime Chief Priest ospite speciale da Mama Africa',
      en: 'Dorime Chief Priest special guest at Mama Africa',
    },
    caption: {
      title: { it: 'Ospiti speciali', en: 'Special guests' },
      line: {
        it: 'Dorime Chief Priest da Mama Africa',
        en: 'Dorime Chief Priest at Mama Africa',
      },
    },
  },
  {
    src: '/images/nightlife-crowd.jpg',
    alt: {
      it: 'Festa e musica in pista da Mama Africa Restaurant & Bar',
      en: 'Dancefloor energy and drinks at Mama Africa Restaurant & Bar',
    },
    caption: {
      title: { it: 'Venerdì in pista', en: 'Friday on the dancefloor' },
      line: { it: 'Musica e drink fino a tardi', en: 'Music and drinks till late' },
    },
  },
]

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
  const activeCaption = HERO_SLIDES[activeIndex].caption

  useEffect(() => {
    if (isPaused || prefersReducedMotion()) return

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length)
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
    <section id="top" className="bg-[var(--color-bg)] lg:grid lg:grid-cols-2">
      <div className="border-b-[10px] border-[var(--color-gold)] px-4 py-12 sm:px-8 md:py-16 lg:border-b-0 lg:border-r-[10px] lg:py-20">
        <div className="mx-auto max-w-xl lg:ml-auto lg:mr-0 lg:pr-6">
          <ScriptKicker tone="red">{t.hero.kicker}</ScriptKicker>

          <h1 className="mt-2 font-display text-4xl leading-[1.05] text-[var(--color-black)] text-balance sm:text-5xl lg:text-[3.4rem]">
            {t.hero.titleStart}{' '}
            <span className="text-[var(--color-emerald-ink)]">{t.hero.titleHighlight}</span>{' '}
            {t.hero.titleEnd}
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <button type="button" onClick={onOpenWhatsapp} className="btn btn-primary">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>{t.hero.primaryCta}</span>
            </button>
            <a href="#menu" className="btn btn-ghost">
              <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
              <span>{t.hero.secondaryCta}</span>
            </a>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-black)] lg:aspect-auto lg:flex-1">
          {HERO_SLIDES.map((slide, idx) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt[lang]}
              width={800}
              height={600}
              aria-hidden={idx !== activeIndex}
              className={`img-pop absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                idx === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            />
          ))}

          <div
            data-testid="hero-caption"
            aria-live="polite"
            className="absolute bottom-4 left-4 max-w-[16rem] border-l-[6px] border-[var(--color-red)] bg-[var(--color-bg)] px-4 py-3 shadow-[var(--shadow-card)]"
          >
            <p className="font-display text-lg leading-tight text-[var(--color-ink)]">
              {activeCaption.title[lang]}
            </p>
            <p className="mt-0.5 text-sm text-[var(--color-muted)]">{activeCaption.line[lang]}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1 bg-[var(--color-surface)] py-1">
          <button
            type="button"
            onClick={() => setIsPausedByUser((prev) => !prev)}
            aria-label={isPausedByUser ? t.hero.playSlideshow : t.hero.pauseSlideshow}
            className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-[var(--color-ink)] transition-colors duration-150 hover:text-[var(--color-red)]"
          >
            {isPausedByUser ? (
              <Play className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Pause className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <div className="flex items-center" role="group" aria-label={t.hero.galleryLabel}>
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`${t.hero.slideLabel} ${idx + 1} / ${HERO_SLIDES.length}`}
                aria-pressed={idx === activeIndex}
                onClick={() => setActiveIndex(idx)}
                className="group inline-flex h-11 cursor-pointer items-center justify-center px-1"
              >
                <span
                  aria-hidden="true"
                  className={`block h-2 rounded-full transition-all duration-200 ${
                    idx === activeIndex
                      ? 'w-5 bg-[var(--color-red)]'
                      : 'w-2 bg-[var(--color-border)] group-hover:bg-[var(--color-muted)]'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
