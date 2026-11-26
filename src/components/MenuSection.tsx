import { useMemo, useState } from 'react'
import { useLanguage } from '../context/useLanguage'
import { MENU_ITEMS } from '../data/menu'
import type { MenuCategory, MenuItem } from '../types'
import { DishCard } from './DishCard'
import { ScriptKicker } from './brand/ScriptKicker'
import { ZigzagDivider } from './brand/ZigzagDivider'

interface MenuSectionProps {
  onAddToCart: (dish: MenuItem) => void
}

const CATEGORIES: MenuCategory[] = ['all', 'starters', 'mains', 'grill', 'vegan']
const SIGNATURE_IDS = new Set(['jollof-rice', 'okra-soup', 'white-rice-stew', 'nkwobi'])

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
    <section id="menu" className="bg-[var(--color-bg)]">
      <ZigzagDivider />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <ScriptKicker tone="orange">{t.menu.kicker}</ScriptKicker>
          <h2 className="mt-1 font-display text-4xl text-[var(--color-black)] sm:text-5xl">
            {t.menu.title}
          </h2>
          <p className="mt-3 text-base text-[var(--color-muted)]">{t.menu.subtitle}</p>
        </div>

        {activeCategory === 'all' && (
          <div className="mt-12">
            <h3 className="mb-5 font-display text-2xl text-[var(--color-ink)]">
              {t.menu.signatureTitle}
            </h3>
            <ul className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
              {signatureDishes.map((dish) => (
                <li key={dish.id} className="w-[78%] shrink-0 snap-start sm:w-auto">
                  <DishCard dish={dish} onAdd={onAddToCart} variant="spotlight" />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-14 border-t-2 border-dotted border-[var(--color-border)] pt-10">
          <h3 className="text-center font-display text-3xl text-[var(--color-black)]">
            {t.menu.fullLedgerTitle}
          </h3>

          <div
            role="group"
            aria-label={t.menu.categoriesLabel}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const active = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-[44px] cursor-pointer rounded-full border-2 px-4 text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-150 ${
                    active
                      ? 'border-[var(--color-black)] bg-[var(--color-black)] text-[var(--color-gold)]'
                      : 'border-[var(--color-border)] bg-transparent text-[var(--color-ink)] hover:border-[var(--color-ink)]'
                  }`}
                >
                  {t.menu.categories[category]}
                </button>
              )
            })}
          </div>

          <div className="mt-8 grid gap-x-12 md:grid-cols-2">
            {filteredItems.map((dish) => (
              <DishCard key={dish.id} dish={dish} onAdd={onAddToCart} variant="ledger" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
