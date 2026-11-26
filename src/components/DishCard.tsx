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
    <span className="inline-flex items-center rounded-sm bg-[var(--color-surface)] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-emerald-ink)]">
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

  const stateClasses = justAdded ? 'btn-whatsapp' : 'btn-outline'

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn min-h-[44px] px-3 text-xs ${fullWidth ? 'w-full' : ''} ${stateClasses}`}
    >
      {justAdded ? (
        <span>{t.menu.addedFeedback}</span>
      ) : (
        <span>{t.menu.addToOrder}</span>
      )}
    </button>
  )
}

function SpotlightDishCard({ dish, onAdd }: { dish: MenuItem; onAdd: () => void }) {
  const { lang } = useLanguage()

  return (
    <article className="group flex h-full flex-col">
      {dish.image && (
        <div className="overflow-hidden rounded-[var(--radius-lg)] border-[3px] border-[var(--color-gold)]">
          <img
            src={dish.image}
            alt={dish.name[lang]}
            loading="lazy"
            width={640}
            height={480}
            className="img-zoom img-pop aspect-[4/3] w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="font-display text-xl leading-tight text-[var(--color-ink)]">
            {dish.name[lang]}
          </h4>
          <span className="shrink-0 font-display text-lg text-[var(--color-red)] tabular-nums">
            {formatEuro(dish.price)}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
          {dish.description[lang]}
        </p>
        <div className="mt-4">
          <AddToOrderButton onAdd={onAdd} fullWidth />
        </div>
      </div>
    </article>
  )
}

function DishPhotoSlot({ dish }: { dish: MenuItem }) {
  const { lang } = useLanguage()

  return (
    <div data-slot="photo" className="h-16 w-16 shrink-0">
      {dish.image && (
        <img
          src={dish.image}
          alt={dish.name[lang]}
          loading="lazy"
          width={64}
          height={64}
          className="img-pop h-16 w-16 rounded-full border-[3px] border-[var(--color-gold)] object-cover shadow-[var(--shadow-card)]"
        />
      )}
    </div>
  )
}

function LedgerDishCard({ dish, onAdd }: { dish: MenuItem; onAdd: () => void }) {
  const { lang, t } = useLanguage()

  return (
    <article
      data-testid={`menu-row-${dish.id}`}
      className="flex gap-4 border-b-2 border-dotted border-[var(--color-border)] py-5"
    >
      <DishPhotoSlot dish={dish} />

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <h4 className="min-w-0 font-display text-lg leading-tight text-[var(--color-ink)] sm:text-xl">
              {dish.name[lang]}
            </h4>
            <span
              aria-hidden="true"
              className="min-w-[1rem] flex-1 border-b-2 border-dotted border-[var(--color-border)]"
            />
            <span className="shrink-0 whitespace-nowrap font-display text-lg text-[var(--color-red)] tabular-nums">
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
      </div>
    </article>
  )
}

export function DishCard({ dish, onAdd, variant = 'ledger' }: DishCardProps) {
  const handleAdd = () => onAdd(dish)

  if (variant === 'spotlight') return <SpotlightDishCard dish={dish} onAdd={handleAdd} />
  return <LedgerDishCard dish={dish} onAdd={handleAdd} />
}
