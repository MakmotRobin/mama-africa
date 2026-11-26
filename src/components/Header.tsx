import { Globe, Menu, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../context/useLanguage'

interface HeaderProps {
  cartCount: number
  onOpenTakeaway: () => void
  onOpenReservation: () => void
}

export function Header({ cartCount, onOpenTakeaway, onOpenReservation }: HeaderProps) {
  const { lang, toggleLang, t } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: '#menu', label: t.nav.menu },
    { href: '#whatsapp-builder', label: t.nav.orderReserve },
    { href: '#events', label: t.nav.events },
    { href: '#location', label: t.nav.location },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border-on-black)] bg-[var(--color-black)] text-[var(--color-white)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
        <a href="#top" className="flex min-w-0 items-center gap-2.5 text-left sm:gap-3">
          <img
            src="/images/logo.jpg"
            alt="Mama Africa Restaurant & Bar"
            width={44}
            height={44}
            className="h-10 w-10 shrink-0 rounded-md border border-[var(--color-border-on-black)] object-cover sm:h-11 sm:w-11"
          />
          <span className="min-w-0">
            <span className="block truncate font-[var(--font-display)] text-base font-bold leading-none tracking-tight text-[var(--color-white)] sm:text-lg">
              Mama Africa
            </span>
            <span className="mt-1 block truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)] sm:text-[11px] sm:tracking-[0.16em]">
              Restaurant &amp; Bar · Cosenza
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-4 lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link-underline whitespace-nowrap text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-surface)] transition-colors duration-150 hover:text-[var(--color-gold)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.nav.languageToggleAria}
            className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-md border border-[var(--color-border-on-black)] bg-[var(--color-black-soft)] px-3 text-xs font-bold uppercase tracking-wider text-[var(--color-white)] transition-colors duration-150 hover:border-[var(--color-gold)]"
          >
            <Globe className="h-3.5 w-3.5 text-[var(--color-gold)]" aria-hidden="true" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {cartCount > 0 && (
            <button
              type="button"
              onClick={onOpenTakeaway}
              aria-label={`${t.nav.cartLabel} (${cartCount})`}
              className="relative inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-md border border-[var(--color-border-on-black)] bg-[var(--color-black-soft)] px-3 text-xs font-bold text-[var(--color-white)] transition-colors duration-150 hover:border-[var(--color-gold)]"
            >
              <ShoppingBag className="h-4 w-4 text-[var(--color-gold)]" aria-hidden="true" />
              <span className="ml-1.5 tabular-nums">{cartCount}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenReservation}
            className="hidden min-h-[44px] cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-[var(--color-red)] px-4 text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-white)] transition-colors duration-150 hover:bg-[var(--color-red-hover)] sm:inline-flex"
          >
            {t.nav.reserveCta}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-md border border-[var(--color-border-on-black)] text-[var(--color-white)] lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-[var(--color-border-on-black)] bg-[var(--color-black)] px-4 pb-4 pt-2 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[44px] items-center rounded-md px-3 text-sm font-bold uppercase tracking-wider text-[var(--color-bg)] hover:bg-[var(--color-black-soft)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  onOpenReservation()
                }}
                className="flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-md bg-[var(--color-red)] px-4 text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-white)]"
              >
                {t.nav.reserveCta}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
