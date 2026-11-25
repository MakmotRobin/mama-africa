import { useState } from 'react'
import { EventsSection } from './components/EventsSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LocationSection } from './components/LocationSection'
import { MenuSection } from './components/MenuSection'
import { WhatsAppBuilder, type BuilderTab } from './components/WhatsAppBuilder'
import { LanguageProvider } from './context/LanguageContext'
import { useLanguage } from './context/useLanguage'
import type { CartItem, MenuItem } from './types'

function MamaAfricaPage() {
  const { t } = useLanguage()
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeTab, setActiveTab] = useState<BuilderTab>('reservation')
  const [selectedEventLabel, setSelectedEventLabel] = useState('')

  const scrollToBuilder = (tab: BuilderTab) => {
    setActiveTab(tab)
    const el = document.getElementById('whatsapp-builder')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAddToCart = (dish: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.item.id === dish.id)
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === dish.id
            ? { ...entry, quantity: Math.min(25, entry.quantity + 1) }
            : entry,
        )
      }
      return [...prev, { item: dish, quantity: 1 }]
    })
  }

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((entry) =>
          entry.item.id === id ? { ...entry, quantity: entry.quantity + delta } : entry,
        )
        .filter((entry) => entry.quantity > 0),
    )
  }

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((entry) => entry.item.id !== id))
  }

  const handleReserveEvent = (eventTitle: string) => {
    setSelectedEventLabel(eventTitle)
    scrollToBuilder('reservation')
  }

  const totalItems = cart.reduce((sum, entry) => sum + entry.quantity, 0)

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-espresso)]">
      <a href="#main-content" className="skip-link">
        {t.skipToContent}
      </a>

      <Header
        cartCount={totalItems}
        onOpenTakeaway={() => scrollToBuilder('takeaway')}
        onOpenReservation={() => scrollToBuilder('reservation')}
      />

      <main id="main-content" tabIndex={-1}>
        <Hero onOpenWhatsapp={() => scrollToBuilder('reservation')} />
        <MenuSection onAddToCart={handleAddToCart} />
        <WhatsAppBuilder
          activeTab={activeTab}
          onTabChange={setActiveTab}
          cart={cart}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onClearCart={() => setCart([])}
          occasion={selectedEventLabel}
          onOccasionChange={setSelectedEventLabel}
        />
        <EventsSection onReserveEvent={handleReserveEvent} />
        <LocationSection />
      </main>

      <Footer />
    </div>
  )
}

export function App() {
  return (
    <LanguageProvider>
      <MamaAfricaPage />
    </LanguageProvider>
  )
}

export default App
