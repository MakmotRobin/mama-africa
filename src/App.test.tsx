import '@testing-library/jest-dom/vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

/** Wednesday 25 November 2026, 18:00: an open day, before the 12 December event. */
const WEDNESDAY_EVENING = new Date(2026, 10, 25, 18, 0)

describe('Mama Africa App', () => {
  beforeEach(() => {
    window.localStorage.clear()
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(WEDNESDAY_EVENING)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows the caption of the active hero slide and follows the slideshow', () => {
    vi.useFakeTimers()
    vi.setSystemTime(WEDNESDAY_EVENING)
    render(<App />)

    const caption = screen.getByTestId('hero-caption')
    expect(caption).toHaveTextContent('La tavola di Mama')

    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(caption).toHaveTextContent('Il nostro locale')
  })

  it('aligns menu rows without a photo with rows that have one', () => {
    render(<App />)

    const withPhoto = screen.getByTestId('menu-row-jollof-rice')
    const withoutPhoto = screen.getByTestId('menu-row-alloco-plantain')
    expect(withPhoto.querySelector('img')).not.toBeNull()
    expect(withoutPhoto.querySelector('img')).toBeNull()
    expect(withoutPhoto.querySelector('[data-slot="photo"]')).not.toBeNull()
  })

  it('switches the hero caption language with the toggle', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Passa a Inglese/i }))

    expect(screen.getByTestId('hero-caption')).toHaveTextContent('Mama’s table')
  })

  it('stops the hero slideshow when the pause button is pressed and resumes on play', () => {
    vi.useFakeTimers()
    vi.setSystemTime(WEDNESDAY_EVENING)
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Metti in pausa la galleria/i }))
    act(() => {
      vi.advanceTimersByTime(9000)
    })
    expect(screen.getByRole('button', { name: /Immagine 1 \/ 7/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )

    fireEvent.click(screen.getByRole('button', { name: /Riprendi la galleria/i }))
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.getByRole('button', { name: /Immagine 2 \/ 7/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('loads the Google map only after the visitor asks for it', () => {
    render(<App />)
    expect(screen.queryByTitle(/mappa/i)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Mostra la mappa/i }))

    expect(screen.getByTitle(/mappa/i).tagName).toBe('IFRAME')
  })

  it('links the secondary hero button to the menu', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: /Esplora il Menu/i })).toHaveAttribute('href', '#menu')
  })

  it('shows the order bar with item count and total only once the cart has items', () => {
    render(<App />)
    expect(screen.queryByRole('button', { name: /Vedi ordine/i })).not.toBeInTheDocument()

    const addButtons = screen.getAllByRole('button', { name: /Aggiungi all’ordine/i })
    fireEvent.click(addButtons[0])
    fireEvent.click(addButtons[1])

    const orderBar = screen.getByRole('button', { name: /Vedi ordine/i })
    expect(orderBar).toHaveTextContent('2')
    expect(orderBar).toHaveTextContent('€20,50')

    fireEvent.click(orderBar)
    expect(screen.getByRole('tab', { name: /Ordine d’Asporto/i })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('shows an opening-hours error when the reservation time falls between services', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<App />)

    fireEvent.change(screen.getByLabelText(/Il tuo nome \*/i), { target: { value: 'Giulia' } })
    fireEvent.change(screen.getByLabelText(/Orario \*/i), { target: { value: '17:00' } })
    fireEvent.click(screen.getByRole('button', { name: /Prenota su WhatsApp/i }))

    expect(screen.getByText(/fuori dagli orari di apertura/i)).toBeInTheDocument()
    expect(openSpy).not.toHaveBeenCalled()
    openSpy.mockRestore()
  })
  it('opens in Italian by default and toggles to English', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Vera cucina nigeriana/i,
      }),
    ).toBeInTheDocument()

    const toggleBtn = screen.getByRole('button', { name: /Passa a Inglese/i })
    fireEvent.click(toggleBtn)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Real Nigerian cooking/i,
      }),
    ).toBeInTheDocument()
  })

  it('filters menu items by category', () => {
    render(<App />)

    const grillTab = screen.getByRole('button', { name: /Griglia & Pesce/i })
    fireEvent.click(grillTab)

    expect(screen.getByRole('heading', { name: /Tilapia alla Brace/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /Bissap/i })).not.toBeInTheDocument()

    const veganTab = screen.getByRole('button', { name: /Vegano & Vegetariano/i })
    fireEvent.click(veganTab)

    expect(screen.getByRole('heading', { name: /Mafé/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /Tilapia alla Brace/i })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /^Tutto$/i }))
    expect(
      screen.getAllByRole('heading', { name: /Fataya/i }).length,
    ).toBeGreaterThanOrEqual(1)
  })

  it('adds dishes to takeaway cart and opens WhatsApp URL on valid submission', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<App />)

    const addButtons = screen.getAllByRole('button', { name: /Aggiungi all’ordine/i })
    fireEvent.click(addButtons[0])

    const takeawayTab = screen.getByRole('tab', { name: /Ordine d’Asporto/i })
    fireEvent.click(takeawayTab)

    expect(screen.getByText(/^Totale stimato$/i)).toBeInTheDocument()

    const nameInput = screen.getByLabelText(/Il tuo nome \*/i)
    fireEvent.change(nameInput, { target: { value: 'Marco Bianchi' } })

    const submitBtn = screen.getByRole('button', { name: /Invia Ordine su WhatsApp/i })
    fireEvent.click(submitBtn)

    expect(openSpy).toHaveBeenCalledTimes(1)
    const calledUrl = openSpy.mock.calls[0][0] as string
    expect(calledUrl.startsWith('https://wa.me/393495655600?text=')).toBe(true)
    expect(decodeURIComponent(calledUrl)).toContain('Marco Bianchi')
    openSpy.mockRestore()
  })

  it('shows validation error when reservation name is missing', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<App />)

    const submitBtn = screen.getByRole('button', { name: /Prenota su WhatsApp/i })
    fireEvent.click(submitBtn)

    expect(screen.getByText(/Inserisci il tuo nome per la prenotazione/i)).toBeInTheDocument()
    expect(openSpy).not.toHaveBeenCalled()
    openSpy.mockRestore()
  })

  it('displays All White Night Party on 12th December', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /All White Night Party/i }),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/12 Dicembre/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/Hypeman: Christyle/i)).toBeInTheDocument()
    expect(screen.getByText(/DJ: Sky face/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Dorime Chief Priest/i).length).toBeGreaterThanOrEqual(1)

    fireEvent.click(screen.getByRole('button', { name: /Passa a Inglese/i }))
    expect(screen.getAllByText(/12th December/i).length).toBeGreaterThanOrEqual(1)
  })

  it('cycles hero gallery across 7 images every 3 seconds', () => {
    vi.useFakeTimers()
    render(<App />)

    const slide1 = screen.getByRole('button', { name: /Immagine 1 \/ 7/i })
    const slide2 = screen.getByRole('button', { name: /Immagine 2 \/ 7/i })
    expect(slide1).toHaveAttribute('aria-pressed', 'true')
    expect(slide2).toHaveAttribute('aria-pressed', 'false')

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(screen.getByRole('button', { name: /Immagine 2 \/ 7/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    vi.useRealTimers()
  })
})
