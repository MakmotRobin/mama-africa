import { Pause, Play } from 'lucide-react'
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
    src: 'images/dish-jollof.jpg',
    alt: {
      it: 'Riso Jollof tradizionale con carne arrosto',
      en: 'Signature Jollof rice with roasted meat',
    },
    caption: {
      title: { it: 'Party Jollof', en: 'Party Jollof' },
      line: { it: 'Riso affumicato con carne arrosto', en: 'Smoky rice with roasted meat' },
    },
  },
  {
    src: 'images/dish-white-rice-stew.jpg',
    alt: {
      it: 'Riso bianco con stufato, platano dolce e carne',
      en: 'White rice with stew, sweet plantain, and meat',
    },
    caption: {
      title: { it: 'Riso & Stufato', en: 'Rice & Stew' },
      line: { it: 'Riso bianco, stufato, platano e carne', en: 'White rice, stew, plantain and meat' },
    },
  },
  {
    src: 'images/dish-fried-rice.jpg',
    alt: {
      it: 'Fried rice nigeriano con verdure e carne arrosto',
      en: 'Nigerian fried rice with vegetables and roasted meat',
    },
    caption: {
      title: { it: 'Fried Rice', en: 'Fried Rice' },
      line: { it: 'Verdure croccanti e carne arrosto', en: 'Crisp vegetables and roasted meat' },
    },
  },
  {
    src: 'images/dish-egusi-soup.jpg',
    alt: {
      it: 'Egusi Soup servita con fufu',
      en: 'Egusi soup served with fufu',
    },
    caption: {
      title: { it: 'Egusi Soup', en: 'Egusi Soup' },
      line: { it: 'Semi di melone, foglie verdi e fufu', en: 'Melon-seed soup with greens and fufu' },
    },
  },
  {
    src: 'images/dish-okra.jpg',
    alt: {
      it: 'Okra Soup servita con fufu',
      en: 'Okra soup served with fufu',
    },
    caption: {
      title: { it: 'Okra Soup', en: 'Okra Soup' },
      line: { it: 'Okra fresca con fufu fatto in casa', en: 'Fresh okra soup with homemade fufu' },
    },
  },
  {
    src: 'images/dish-nkwobi.jpg',
    alt: {
      it: 'Nkwobi tradizionale in salsa di olio di palma',
      en: 'Traditional Nkwobi in spiced palm-oil sauce',
    },
    caption: {
      title: { it: 'Nkwobi', en: 'Nkwobi' },
      line: { it: 'Specialità Igbo in salsa speziata', en: 'Traditional Igbo spiced delicacy' },
    },
  },
  {
    src: 'images/dish-abacha-ugba.jpg',
    alt: {
      it: 'Abacha e Ugba con cipolla rossa e peperoncino',
      en: 'Abacha and Ugba with red onions and peppers',
    },
    caption: {
      title: { it: 'Abacha & Ugba', en: 'Abacha & Ugba' },
      line: { it: 'Insalata africana fatta al momento', en: 'Fresh Nigerian African salad' },
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
              <span>{t.hero.primaryCta}</span>
            </button>
            <a href="#menu" className="btn btn-ghost">
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
