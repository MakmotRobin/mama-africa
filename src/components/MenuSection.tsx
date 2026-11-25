import { useMemo, useState } from 'react'
import { useLanguage } from '../context/useLanguage'
import { MENU_ITEMS } from '../data/menu'
import type { MenuCategory, MenuItem } from '../types'
import { DishCard } from './DishCard'

interface MenuSectionProps {
  onAddToCart: (dish: MenuItem) => void
}

const CATEGORIES: MenuCategory[] = ['all', 'starters', 'mains', 'grill', 'vegan', 'drinks']
const SIGNATURE_IDS = new Set(['fataya-pies', 'jollof-rice', 'okra-soup', 'tilapia-grill'])

export function MenuSection({ onAddToCart }: MenuSectionProps) {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all')

  const signatureDishes = useMemo(
    () => MENU_ITEMS.filter((item) => SIGNATURE_IDS.has(item.id)),
    [],
  )

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      return (
        activeCategory === 'all' ||
        item.category === activeCategory ||
        (activeCategory === 'vegan' &&
          (item.badges.includes('vegan') || item.badges.includes('vegetarian')))
      )
    })
  }, [activeCategory])

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
      <div className="flex flex-col justify-between gap-6 border-b border-[var(--color-border)] pb-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--color-terracotta)]">
            {t.menu.eyebrow}
          </p>
          <h2 className="mt-2 font-[var(--font-display)] text-3xl font-bold text-[var(--color-espresso)] sm:text-4xl">
            {t.menu.title}
          </h2>
          <p className="mt-3 text-base text-[var(--color-muted)]">{t.menu.subtitle}</p>
        </div>
      </div>

      {activeCategory === 'all' && (
        <div className="mt-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
            {t.menu.signatureTitle}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {signatureDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} onAdd={onAddToCart} variant="spotlight" />
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <div
          role="group"
          aria-label="Menu categories"
          className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
        >
          {CATEGORIES.map((category) => {
            const active = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(category)}
                className={`min-h-[44px] cursor-pointer rounded-md px-3 text-center text-xs font-bold uppercase tracking-[0.06em] transition-colors duration-150 sm:px-4 sm:tracking-[0.08em] ${
                  active
                    ? 'bg-[var(--color-terracotta)] text-[var(--color-white)]'
                    : 'border border-[var(--color-border)] bg-[var(--color-surface-card)] text-[var(--color-espresso)] hover:bg-[var(--color-surface)]'
                }`}
              >
                {t.menu.categories[category]}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-8 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface-card)] p-2 shadow-[var(--shadow-card-hover)] sm:p-3">
        <div className="border border-[var(--color-border)] px-5 py-7 sm:px-9 sm:py-10">
          <div className="border-b-2 border-[var(--color-espresso)] pb-4 text-center">
            <h3 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-espresso)] sm:text-3xl">
              {t.menu.fullLedgerTitle}
            </h3>
          </div>

          <div className="mt-4 grid gap-x-10 md:grid-cols-2">
            {filteredItems.map((dish) => (
              <DishCard key={dish.id} dish={dish} onAdd={onAddToCart} variant="ledger" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
