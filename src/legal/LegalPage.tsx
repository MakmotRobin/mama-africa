import { ArrowLeft } from 'lucide-react'
import { LEGAL_LAST_UPDATED } from '../config/restaurant'
import { useLanguage } from '../context/useLanguage'
import { Footer } from '../components/Footer'
import { StripeBand } from '../components/brand/StripeBand'
import { formatLongDate } from '../utils/dates'
import type { LegalDocument } from './legalContent'

const HOME_URL = './'

function LegalHeader() {
  const { lang, toggleLang, t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-black)] text-[var(--color-white)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:px-6">
        <a href={HOME_URL} className="flex min-w-0 items-center gap-2.5">
          <img
            src="images/logo-128.jpg"
            alt="Mama Africa Restaurant & Bar"
            width={44}
            height={44}
            className="h-10 w-10 shrink-0 rounded-md object-cover sm:h-11 sm:w-11"
          />
          <span className="truncate font-display text-base leading-none text-[var(--color-gold)] sm:text-lg">
            Mama Africa
          </span>
        </a>
        <button
          type="button"
          onClick={toggleLang}
          aria-label={t.nav.languageToggleAria}
          className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-md border border-[var(--color-border-on-black)] bg-[var(--color-black-soft)] px-3 text-xs font-bold uppercase tracking-wider text-[var(--color-white)] transition-colors duration-150 hover:border-[var(--color-gold)]"
        >
          {lang.toUpperCase()}
        </button>
      </div>
      <StripeBand />
    </header>
  )
}

export function LegalPage({ document: legalDocument }: { document: LegalDocument }) {
  const { lang, t } = useLanguage()

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      <a href="#main-content" className="skip-link">
        {t.skipToContent}
      </a>
      <LegalHeader />

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <a
          href={HOME_URL}
          className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-[var(--color-red)] underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t.legal.backToSite}
        </a>

        <h1 className="mt-4 font-display text-4xl leading-tight text-[var(--color-black)] sm:text-5xl">
          {legalDocument.title[lang]}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          {t.legal.lastUpdated}: {formatLongDate(LEGAL_LAST_UPDATED, lang)}
        </p>
        <p className="mt-6 text-base leading-relaxed">{legalDocument.intro[lang]}</p>

        {legalDocument.sections.map((section) => (
          <section key={section.heading.en} className="mt-10">
            <h2 className="font-display text-2xl text-[var(--color-black)]">{section.heading[lang]}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.en} className="mt-3 text-base leading-relaxed">
                {paragraph[lang]}
              </p>
            ))}
            {section.items && (
              <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed marker:text-[var(--color-red)]">
                {section.items.map((item) => (
                  <li key={item.en}>{item[lang]}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </main>

      <Footer />
    </div>
  )
}
