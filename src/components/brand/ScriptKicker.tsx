import type { ReactNode } from 'react'

type KickerTone = 'red' | 'orange' | 'emerald' | 'gold'

const TONE_COLOUR: Record<KickerTone, string> = {
  red: 'var(--color-red)',
  orange: 'var(--color-orange)',
  emerald: 'var(--color-emerald-ink)',
  gold: 'var(--color-gold)',
}

interface ScriptKickerProps {
  children: ReactNode
  /** Use `gold` only on black backgrounds; gold on cream fails contrast. */
  tone: KickerTone
  className?: string
}

/** A short hand-lettered line above a heading, in the voice of the logo's "mama". */
export function ScriptKicker({ children, tone, className = '' }: ScriptKickerProps) {
  return (
    <p
      className={`font-[var(--font-script)] text-2xl leading-tight sm:text-3xl ${className}`}
      style={{ color: TONE_COLOUR[tone] }}
    >
      {children}
    </p>
  )
}
