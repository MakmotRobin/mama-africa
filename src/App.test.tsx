import '@testing-library/jest-dom/vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('Mama Africa App', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })
  it('opens in Italian by default and toggles to English', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Cucina Africana Autentica, Preparata al Momento/i,
      }),
    ).toBeInTheDocument()

    const toggleBtn = screen.getByRole('button', { name: /Passa a Inglese/i })
    fireEvent.click(toggleBtn)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Authentic African Cuisine, Cooked Fresh to Order/i,
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

  it('cycles hero gallery across 10 images every 3 seconds', () => {
    vi.useFakeTimers()
    render(<App />)

    const slide1 = screen.getByRole('button', { name: /Immagine 1 \/ 10/i })
    const slide2 = screen.getByRole('button', { name: /Immagine 2 \/ 10/i })
    expect(slide1).toHaveAttribute('aria-pressed', 'true')
    expect(slide2).toHaveAttribute('aria-pressed', 'false')

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(screen.getByRole('button', { name: /Immagine 2 \/ 10/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    vi.useRealTimers()
  })
})
