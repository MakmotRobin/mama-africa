import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLanguage } from '../context/useLanguage'
import type { DietaryBadge, MenuItem } from '../types'
import { formatEuro } from '../utils/whatsapp'

interface DishCardProps {
  dish: MenuItem
  onAdd: (dish: MenuItem) => void
  variant?: 'spotlight' | 'ledger'
}

function BadgePill({ badge, label }: { badge: DietaryBadge; label: string }) {
  if (badge === 'vegan') {
    return (
      <span className="inline-flex items-center rounded-sm bg-[var(--color-emerald)] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-white)]">
        {label}
      </span>
    )
  }

  if (badge === 'vegetarian') {
    return (
      <span className="inline-flex items-center rounded-sm bg-[var(--color-emerald-tint)] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-emerald-ink)]">
        {label}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center rounded-sm bg-[var(--color-surface)] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-gold-text)]">
      {label}
    </span>
  )
}

const ADDED_FEEDBACK_MS = 1200

function AddToOrderButton({ onAdd, fullWidth }: { onAdd: () => void; fullWidth: boolean }) {
  const { t } = useLanguage()
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!justAdded) return
    const timer = window.setTimeout(() => setJustAdded(false), ADDED_FEEDBACK_MS)
    return () => window.clearTimeout(timer)
  }, [justAdded])

  const handleClick = () => {
    onAdd()
    setJustAdded(true)
  }

  const stateClasses = justAdded
    ? 'border-[var(--color-emerald)] bg-[var(--color-emerald)] text-[var(--color-white)]'
    : 'border-[var(--color-espresso)] bg-[var(--color-surface-card)] text-[var(--color-espresso)] hover:bg-[var(--color-espresso)] hover:text-[var(--color-white)]'

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-md border px-3 text-xs font-bold uppercase tracking-wider transition-colors duration-150 ${fullWidth ? 'w-full' : ''} ${stateClasses}`}
    >
      {justAdded ? (
        <>
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t.menu.addedFeedback}</span>
        </>
      ) : (
        <span>{t.menu.addToOrder}</span>
      )}
    </button>
  )
}

function SpotlightDishCard({ dish, onAdd }: { dish: MenuItem; onAdd: () => void }) {
  const { lang } = useLanguage()

  return (
    <article className="card-hover flex h-full flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-card)] shadow-[var(--shadow-card)]">
      {dish.image && (
        <div className="overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name[lang]}
            loading="lazy"
            width={640}
            height={480}
            className="img-zoom aspect-[4/3] w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-espresso)]">
            {dish.name[lang]}
          </h3>
          <span className="shrink-0 text-sm font-extrabold text-[var(--color-terracotta)] tabular-nums">
            {formatEuro(dish.price)}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-[var(--color-muted)]">
          {dish.description[lang]}
        </p>
        <div className="mt-4">
          <AddToOrderButton onAdd={onAdd} fullWidth />
        </div>
      </div>
    </article>
  )
}

function LedgerDishCard({ dish, onAdd }: { dish: MenuItem; onAdd: () => void }) {
  const { lang, t } = useLanguage()

  return (
    <article className="flex h-full flex-col justify-between gap-3 border-b border-dashed border-[var(--color-border)] py-4 transition-colors duration-150 hover:bg-[var(--color-bg)]">
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <h3 className="min-w-0 font-[var(--font-display)] text-lg font-bold text-[var(--color-espresso)] sm:text-xl">
            {dish.name[lang]}
          </h3>
          <span
            aria-hidden="true"
            className="min-w-[1.5rem] flex-1 border-b border-dotted border-[var(--color-border)]"
          />
          <span className="shrink-0 font-[var(--font-display)] text-base font-bold text-[var(--color-terracotta)] tabular-nums">
            {formatEuro(dish.price)}
          </span>
        </div>

        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
          {dish.description[lang]}
        </p>

        {dish.customizableVegan && (
          <p className="mt-1 text-xs font-bold text-[var(--color-emerald-ink)]">
            {t.menu.customizableHint}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap gap-1.5">
          {dish.badges.map((badge) => (
            <BadgePill key={badge} badge={badge} label={t.menu.badges[badge]} />
          ))}
        </div>

        <AddToOrderButton onAdd={onAdd} fullWidth={false} />
      </div>
    </article>
  )
}

export function DishCard({ dish, onAdd, variant = 'ledger' }: DishCardProps) {
  const handleAdd = () => onAdd(dish)

  if (variant === 'spotlight') return <SpotlightDishCard dish={dish} onAdd={handleAdd} />
  return <LedgerDishCard dish={dish} onAdd={handleAdd} />
}
