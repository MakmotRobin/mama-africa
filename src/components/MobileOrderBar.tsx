import { useLanguage } from '../context/useLanguage'
import { formatEuro } from '../utils/whatsapp'

interface MobileOrderBarProps {
  itemCount: number
  total: number
  onViewOrder: () => void
}

export function MobileOrderBar({ itemCount, total, onViewOrder }: MobileOrderBarProps) {
  const { t } = useLanguage()

  if (itemCount === 0) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border-on-black)] bg-[var(--color-black)] px-4 py-3 shadow-[var(--shadow-elevated)] lg:hidden">
      <button
        type="button"
        onClick={onViewOrder}
        className="btn btn-accent mx-auto w-full max-w-xl justify-between px-4"
      >
        <span className="flex items-center gap-2">
          <span>{t.orderBar.viewOrder}</span>
          <span className="rounded-sm bg-[var(--color-gold)] px-2 py-0.5 text-xs text-[var(--color-black)] tabular-nums">
            {itemCount}
          </span>
        </span>
        <span className="text-sm tabular-nums">{formatEuro(total)}</span>
      </button>
    </div>
  )
}
