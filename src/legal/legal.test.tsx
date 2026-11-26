import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { LEGAL_ENTITY, RESTAURANT_CONFIG } from '../config/restaurant'
import { PrivacyPage } from './PrivacyPage'
import { TermsPage } from './TermsPage'

describe('privacy policy page', () => {
  beforeEach(() => window.localStorage.clear())

  it('names the data controller and how to contact them', () => {
    render(<PrivacyPage />)

    expect(screen.getByRole('heading', { level: 1, name: 'Informativa sulla privacy' })).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent(LEGAL_ENTITY.name)
    expect(screen.getByRole('main')).toHaveTextContent(RESTAURANT_CONFIG.whatsappDisplay)
    expect(screen.getByRole('main')).toHaveTextContent(/Garante per la protezione dei dati personali/)
  })

  it('switches to English with the language toggle, including the tab title', () => {
    render(<PrivacyPage />)

    fireEvent.click(screen.getByRole('button', { name: /Passa a Inglese/i }))

    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeInTheDocument()
    expect(document.title).toBe('Privacy Policy | Mama Africa Restaurant & Bar')
  })

  it('links back to the home page', () => {
    render(<PrivacyPage />)

    expect(screen.getByRole('link', { name: /Torna al sito/i })).toHaveAttribute('href', './')
  })
})

describe('terms of service page', () => {
  beforeEach(() => window.localStorage.clear())

  it('explains that a booking is a request until the restaurant confirms it', () => {
    render(<TermsPage />)

    expect(screen.getByRole('heading', { level: 1, name: 'Termini di servizio' })).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent(/conferma/i)
  })

  it('switches to English with the language toggle', () => {
    render(<TermsPage />)

    fireEvent.click(screen.getByRole('button', { name: /Passa a Inglese/i }))

    expect(screen.getByRole('heading', { level: 1, name: 'Terms of Service' })).toBeInTheDocument()
    expect(document.title).toBe('Terms of Service | Mama Africa Restaurant & Bar')
  })
})
