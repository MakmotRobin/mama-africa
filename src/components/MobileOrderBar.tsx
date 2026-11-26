import { ShoppingBag } from 'lucide-react'
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
        className="mx-auto flex min-h-[48px] w-full max-w-xl cursor-pointer items-center justify-between gap-3 rounded-md bg-[var(--color-red)] px-4 text-sm font-bold text-[var(--color-white)] transition-colors duration-150 hover:bg-[var(--color-red-hover)]"
      >
        <span className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          <span className="uppercase tracking-[0.08em]">{t.orderBar.viewOrder}</span>
          <span className="rounded-sm bg-[var(--color-black)] px-2 py-0.5 text-xs tabular-nums">
            {itemCount}
          </span>
        </span>
        <span className="tabular-nums">{formatEuro(total)}</span>
      </button>
    </div>
  )
}
