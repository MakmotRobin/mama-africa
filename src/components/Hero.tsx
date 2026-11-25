import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
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

export function Hero({ onOpenWhatsapp }: HeroProps) {
  const { lang, t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, SLIDE_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [paused])

  return (
    <section
      id="top"
      className="border-b border-[var(--color-border-dark)] bg-[var(--color-espresso)] text-[var(--color-white)]"
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

            <div className="mt-8">
              <button
                type="button"
                onClick={onOpenWhatsapp}
                className="inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2.5 rounded-md bg-[var(--color-terracotta)] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[var(--color-white)] transition-colors duration-150 hover:bg-[var(--color-terracotta-hover)]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>{t.hero.primaryCta}</span>
              </button>
            </div>
          </div>

          <div
            className="lg:col-span-5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="overflow-hidden rounded-lg border border-[var(--color-border-dark)] bg-[var(--color-espresso-soft)] p-2 shadow-[var(--shadow-elevated)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[var(--color-espresso)]">
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

              <div
                className="flex items-center justify-center gap-1.5 pt-2.5 pb-1"
                role="group"
                aria-label={lang === 'it' ? 'Galleria hero' : 'Hero gallery'}
              >
                {HERO_IMAGES.map((img, idx) => (
                  <button
                    key={img.src}
                    type="button"
                    aria-label={`${lang === 'it' ? 'Immagine' : 'Image'} ${idx + 1} / ${HERO_IMAGES.length}`}
                    aria-pressed={idx === activeIndex}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 cursor-pointer rounded-full transition-all duration-200 ${
                      idx === activeIndex
                        ? 'w-5 bg-[var(--color-gold)]'
                        : 'w-2 bg-[var(--color-border-dark)] hover:bg-[var(--color-surface)]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
