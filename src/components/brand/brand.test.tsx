import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ScriptKicker } from './ScriptKicker'
import { StripeBand } from './StripeBand'
import { ZigzagDivider } from './ZigzagDivider'

describe('brand motifs', () => {
  it('hides the stripe band and zigzag from assistive technology', () => {
    const { container } = render(
      <>
        <StripeBand />
        <ZigzagDivider />
      </>,
    )

    expect(container.querySelectorAll(':scope > [aria-hidden="true"]')).toHaveLength(2)
  })

  it('renders the stripe band with the five logo colours in order', () => {
    const { container } = render(<StripeBand />)

    const stripes = [...container.firstElementChild!.children].map((el) =>
      el.getAttribute('data-colour'),
    )
    expect(stripes).toEqual(['red', 'orange', 'gold', 'green', 'brown'])
  })

  it('renders the script kicker as readable text', () => {
    render(<ScriptKicker tone="red">benvenuti a casa</ScriptKicker>)

    expect(screen.getByText('benvenuti a casa')).toBeVisible()
  })
})
