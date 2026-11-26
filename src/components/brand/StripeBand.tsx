const STRIPE_COLOURS = ['red', 'orange', 'gold', 'green', 'brown'] as const

/** The five headwrap colours of the logo, as one solid band. */
export function StripeBand() {
  return (
    <div aria-hidden="true" className="flex h-2 w-full">
      {STRIPE_COLOURS.map((colour) => (
        <span
          key={colour}
          data-colour={colour}
          className="flex-1"
          style={{ backgroundColor: `var(--color-${colour})` }}
        />
      ))}
    </div>
  )
}
