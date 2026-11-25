import type { DietaryBadge, Language, MenuCategory } from '../types'

export const TRANSLATIONS: Record<
  Language,
  {
    skipToContent: string
    nav: {
      menu: string
      orderReserve: string
      events: string
      location: string
      reserveCta: string
      cartLabel: string
      languageToggleAria: string
    }
    hero: {
      eyebrow: string
      title: string
      subtitle: string
      primaryCta: string
      secondaryCta: string
      highlights: string[]
      facts: {
        addressLabel: string
        addressValue: string
        hoursLabel: string
        hoursValue: string
        kitchenLabel: string
        kitchenValue: string
        whatsappLabel: string
      }
      imageAlt: string
    }
    menu: {
      eyebrow: string
      title: string
      subtitle: string
      signatureTitle: string
      fullLedgerTitle: string
      categories: Record<MenuCategory, string>
      dietaryFilterLabel: string
      dietaryAll: string
      badges: Record<DietaryBadge, string>
      customizableHint: string
      addToOrder: string
      addedFeedback: string
      emptyState: string
      resetFilters: string
    }
    whatsapp: {
      eyebrow: string
      title: string
      subtitle: string
      tabs: {
        reservation: string
        takeaway: string
      }
      reservationForm: {
        nameLabel: string
        namePlaceholder: string
        dateLabel: string
        timeLabel: string
        partyLabel: string
        occasionLabel: string
        occasionDefault: string
        notesLabel: string
        notesPlaceholder: string
        submitCta: string
        copyCta: string
        copied: string
        errors: {
          nameRequired: string
          dateRequired: string
          datePast: string
          dayClosed: string
          timeRequired: string
          timeOutsideHours: string
          partyInvalid: string
        }
      }
      takeawayForm: {
        cartTitle: string
        emptyCart: string
        browseMenu: string
        totalLabel: string
        nameLabel: string
        namePlaceholder: string
        pickupLabel: string
        notesLabel: string
        notesPlaceholder: string
        submitCta: string
        copyCta: string
        copied: string
        clearCart: string
        removeItem: string
        decreaseQty: string
        increaseQty: string
        errors: {
          emptyCart: string
          nameRequired: string
          pickupRequired: string
          pickupOutsideHours: string
        }
      }
      previewLabel: string
    }
    events: {
      eyebrow: string
      title: string
      subtitle: string
      sponsoredBy: string
      reserveNightCta: string
      galleryTitle: string
      imageAlt: string
    }
    location: {
      eyebrow: string
      title: string
      subtitle: string
      addressTitle: string
      hoursTitle: string
      closedLabel: string
      directionsTitle: string
      directionsList: string[]
      openMapsCta: string
      whatsappDirectCta: string
      mapIframeTitle: string
    }
    footer: {
      tagline: string
      rights: string
      demoNote: string
    }
  }
> = {
  it: {
    skipToContent: 'Vai al contenuto principale',
    nav: {
      menu: 'Menu',
      orderReserve: 'Prenota & Asporto',
      events: 'Serate & Musica',
      location: 'Dove Siamo',
      reserveCta: 'Prenota Tavolo',
      cartLabel: 'Ordine asporto',
      languageToggleAria: 'Passa a Inglese',
    },
    hero: {
      eyebrow: 'Via Pietro Pompilio Rodotà 12/14 · Cosenza',
      title: 'Cucina Africana Autentica, Preparata al Momento.',
      subtitle:
        'Sapori genuini dell’Africa Occidentale nel cuore di Cosenza, a due passi da Corso Mazzini. Ideale per cene tra amici, studenti UniCal e amanti della musica dal vivo.',
      primaryCta: 'Prenota o Ordina su WhatsApp',
      secondaryCta: 'Esplora il Menu',
      highlights: [
        'Ogni piatto preparato espresso al momento',
        'Opzioni vegane e vegetariane personalizzabili',
        'Bar, cocktail tropicali e serate culturali',
      ],
      facts: {
        addressLabel: 'Indirizzo',
        addressValue: 'Via Rodotà 12/14 · Cosenza',
        hoursLabel: 'Cucina & Bar',
        hoursValue: 'Mar–Dom · 12:00 / 19:00',
        kitchenLabel: 'Cucina',
        kitchenValue: 'Espresso al momento · Opzioni Vegane',
        whatsappLabel: 'WhatsApp Diretto',
      },
      imageAlt:
        'Tavola imbandita da Mama Africa con riso Jollof, Fataya croccanti, pesce alla griglia e zuppa di okra',
    },
    menu: {
      eyebrow: 'La Nostra Cucina',
      title: 'Menu Digitale Interattivo',
      subtitle:
        'Filtra per categoria o esigenza alimentare e aggiungi i piatti direttamente al tuo ordine d’asporto WhatsApp.',
      signatureTitle: 'Piatti Firma della Casa',
      fullLedgerTitle: 'Carta Completa',
      categories: {
        all: 'Tutto',
        starters: 'Antipasti & Street Food',
        mains: 'Piatti Unici & Riso',
        grill: 'Griglia & Pesce',
        vegan: 'Vegano & Vegetariano',
        drinks: 'Bar & Bevande',
      },
      dietaryFilterLabel: 'Filtra per stile:',
      dietaryAll: 'Tutti i piatti',
      badges: {
        vegan: 'Vegano',
        vegetarian: 'Vegetariano',
        freshToOrder: 'Preparato al Momento',
      },
      customizableHint: 'Personalizzabile 100% vegano su richiesta',
      addToOrder: 'Aggiungi all’ordine',
      addedFeedback: 'Aggiunto',
      emptyState: 'Nessun piatto corrisponde ai filtri selezionati.',
      resetFilters: 'Mostra tutto il menu',
    },
    whatsapp: {
      eyebrow: 'Prenotazione & Asporto Diretto',
      title: 'Invia in 1 Click su WhatsApp',
      subtitle:
        'Compila i dati qui sotto: generiamo il messaggio pronto per il nostro WhatsApp (+39 349 565 5600) senza attese.',
      tabs: {
        reservation: 'Prenota un Tavolo',
        takeaway: 'Ordine d’Asporto',
      },
      reservationForm: {
        nameLabel: 'Il tuo nome *',
        namePlaceholder: 'Es. Giulia Rossi',
        dateLabel: 'Data *',
        timeLabel: 'Orario *',
        partyLabel: 'Persone *',
        occasionLabel: 'Tavolo o serata',
        occasionDefault: 'Cena standard',
        notesLabel: 'Note o richieste alimentari',
        notesPlaceholder: 'Es. Opzione vegana, allergie, tavolo vicino alla musica...',
        submitCta: 'Prenota su WhatsApp',
        copyCta: 'Copia messaggio',
        copied: 'Messaggio copiato',
        errors: {
          nameRequired: 'Inserisci il tuo nome per la prenotazione.',
          dateRequired: 'Seleziona una data valida.',
          datePast: 'La data è già passata. Scegli oggi o un giorno futuro.',
          dayClosed: 'In quel giorno siamo chiusi. Scegli un altro giorno.',
          timeRequired: 'Seleziona un orario.',
          timeOutsideHours: 'Orario fuori dagli orari di apertura. Controlla gli orari qui sotto.',
          partyInvalid: 'Inserisci un numero di persone tra 1 e 20.',
        },
      },
      takeawayForm: {
        cartTitle: 'Il tuo carrello d’asporto',
        emptyCart: 'Il carrello è vuoto. Aggiungi i tuoi piatti dal Menu qui sopra.',
        browseMenu: 'Vai al Menu',
        totalLabel: 'Totale stimato',
        nameLabel: 'Il tuo nome *',
        namePlaceholder: 'Es. Marco Bianchi',
        pickupLabel: 'Orario di ritiro *',
        notesLabel: 'Personalizzazioni (piccante, vegano, allergie)',
        notesPlaceholder: 'Es. Poco piccante, versione vegana per il Jollof...',
        submitCta: 'Invia Ordine su WhatsApp',
        copyCta: 'Copia ordine',
        copied: 'Ordine copiato',
        clearCart: 'Svuota',
        removeItem: 'Rimuovi piatto',
        decreaseQty: 'Riduci quantità',
        increaseQty: 'Aumenta quantità',
        errors: {
          emptyCart: 'Aggiungi almeno un piatto dal menu prima di inviare l’ordine.',
          nameRequired: 'Inserisci il tuo nome per il ritiro.',
          pickupRequired: 'Indica l’orario di ritiro.',
          pickupOutsideHours: 'Oggi a quell’orario la cucina è chiusa. Controlla gli orari qui sotto.',
        },
      },
      previewLabel: 'Anteprima messaggio WhatsApp',
    },
    events: {
      eyebrow: 'Cultura, Ritmo & Bar',
      title: 'Serate Culturali & Musica dal Vivo',
      subtitle:
        'Mama Africa è il punto d’incontro tra Cosenza e la comunità internazionale dell’UniCal: percussioni, Afrobeats, aperitivi e cucina calda fino a tardi.',
      sponsoredBy: 'Tutti gli eventi sono sponsorizzati da Celebrity Barman',
      reserveNightCta: 'Prenota per questa serata',
      galleryTitle: 'Atmosfera & Ospiti dal Vivo',
      imageAlt: 'Performance dal vivo con luci di scena durante una serata da Mama Africa a Cosenza',
    },
    location: {
      eyebrow: 'Vieni a Trovarci',
      title: 'Nel Cuore di Cosenza',
      subtitle:
        'Facilmente raggiungibile a piedi da Corso Mazzini e in autobus dal campus UniCal di Rende.',
      addressTitle: 'Indirizzo',
      hoursTitle: 'Orari di Apertura (Demo)',
      closedLabel: 'Chiuso',
      directionsTitle: 'Come Arrivare',
      directionsList: [
        'A piedi: 1 minuto da Corso Mazzini (traversa all’altezza di Piazza Bilotti / area pedonale).',
        'Da UniCal (Rende): autobus urbani verso Cosenza Centro / Piazza Mancini, poi 5 minuti a piedi.',
        'In auto: parcheggi disponibili su Piazza Bilotti e vie adiacenti.',
      ],
      openMapsCta: 'Apri su Google Maps',
      whatsappDirectCta: 'Scrivici su WhatsApp',
      mapIframeTitle: 'Mappa di Mama Africa Restaurant & Bar a Via Pietro Pompilio Rodotà 12/14, Cosenza',
    },
    footer: {
      tagline: 'Sapori autentici dell’Africa Occidentale, bar e cultura nel centro di Cosenza.',
      rights: 'Mama Africa Restaurant & Bar · Via Pietro Pompilio Rodotà, 12/14, Cosenza',
      demoNote: 'Sito demo interattivo · Prenotazioni e ordini diretti via WhatsApp.',
    },
  },
  en: {
    skipToContent: 'Skip to main content',
    nav: {
      menu: 'Menu',
      orderReserve: 'Reserve & Takeaway',
      events: 'Events & Music',
      location: 'Location',
      reserveCta: 'Book a Table',
      cartLabel: 'Takeaway order',
      languageToggleAria: 'Switch to Italian',
    },
    hero: {
      eyebrow: 'Via Pietro Pompilio Rodotà 12/14 · Cosenza',
      title: 'Authentic African Cuisine, Cooked Fresh to Order.',
      subtitle:
        'Vibrant West African flavors in the heart of Cosenza, just off Corso Mazzini. A welcoming hub for locals, UniCal students, and travelers.',
      primaryCta: 'Book or Order on WhatsApp',
      secondaryCta: 'Explore Menu',
      highlights: [
        'Every dish cooked fresh to order',
        'Customizable vegan and vegetarian options',
        'Full bar service and live cultural nights',
      ],
      facts: {
        addressLabel: 'Address',
        addressValue: 'Via Rodotà 12/14 · Cosenza',
        hoursLabel: 'Kitchen & Bar',
        hoursValue: 'Tue–Sun · 12:00 / 19:00',
        kitchenLabel: 'Philosophy',
        kitchenValue: 'Fresh to Order · Vegan Options',
        whatsappLabel: 'Direct WhatsApp',
      },
      imageAlt:
        'Mama Africa feast spread featuring Jollof rice, crispy Fataya pies, grilled fish, and okra soup',
    },
    menu: {
      eyebrow: 'Our Kitchen',
      title: 'Interactive Digital Menu',
      subtitle:
        'Filter by course or dietary preference and add dishes directly to your WhatsApp takeaway order.',
      signatureTitle: 'Signature Plates',
      fullLedgerTitle: 'Full Menu',
      categories: {
        all: 'All',
        starters: 'Starters & Street Food',
        mains: 'Mains & Rice',
        grill: 'Grill & Fish',
        vegan: 'Vegan & Vegetarian',
        drinks: 'Bar & Drinks',
      },
      dietaryFilterLabel: 'Filter by badge:',
      dietaryAll: 'All dishes',
      badges: {
        vegan: 'Vegan',
        vegetarian: 'Vegetarian',
        freshToOrder: 'Fresh to Order',
      },
      customizableHint: 'Customizable 100% vegan on request',
      addToOrder: 'Add to order',
      addedFeedback: 'Added',
      emptyState: 'No dishes match the selected filters.',
      resetFilters: 'Show full menu',
    },
    whatsapp: {
      eyebrow: 'Direct Booking & Takeaway',
      title: '1-Click WhatsApp Builder',
      subtitle:
        'Fill in your details below to generate a ready-to-send message for our WhatsApp (+39 349 565 5600).',
      tabs: {
        reservation: 'Book a Table',
        takeaway: 'Takeaway Order',
      },
      reservationForm: {
        nameLabel: 'Your name *',
        namePlaceholder: 'e.g. Alex Taylor',
        dateLabel: 'Date *',
        timeLabel: 'Time *',
        partyLabel: 'Guests *',
        occasionLabel: 'Table or night',
        occasionDefault: 'Standard dinner',
        notesLabel: 'Dietary notes or requests',
        notesPlaceholder: 'e.g. Vegan option, allergies, table near live music...',
        submitCta: 'Reserve via WhatsApp',
        copyCta: 'Copy message',
        copied: 'Message copied',
        errors: {
          nameRequired: 'Please enter your name for the reservation.',
          dateRequired: 'Please choose a valid date.',
          datePast: 'That date has passed. Please choose today or a later day.',
          dayClosed: 'We are closed on that day. Please choose another day.',
          timeRequired: 'Please choose a time.',
          timeOutsideHours: 'That time is outside our opening hours. See the hours below.',
          partyInvalid: 'Please enter between 1 and 20 guests.',
        },
      },
      takeawayForm: {
        cartTitle: 'Your takeaway bag',
        emptyCart: 'Your bag is empty. Add dishes from the Menu above.',
        browseMenu: 'Browse Menu',
        totalLabel: 'Estimated total',
        nameLabel: 'Your name *',
        namePlaceholder: 'e.g. Samira Diallo',
        pickupLabel: 'Pickup time *',
        notesLabel: 'Customizations (spice level, vegan, allergies)',
        notesPlaceholder: 'e.g. Mild spice, make Jollof 100% vegan...',
        submitCta: 'Send Order on WhatsApp',
        copyCta: 'Copy order',
        copied: 'Order copied',
        clearCart: 'Clear',
        removeItem: 'Remove dish',
        decreaseQty: 'Decrease quantity',
        increaseQty: 'Increase quantity',
        errors: {
          emptyCart: 'Add at least one dish from the menu before ordering.',
          nameRequired: 'Please enter your name for pickup.',
          pickupRequired: 'Please choose a pickup time.',
          pickupOutsideHours: 'The kitchen is closed at that time today. See the hours below.',
        },
      },
      previewLabel: 'WhatsApp message preview',
    },
    events: {
      eyebrow: 'Culture, Rhythm & Bar',
      title: 'Cultural Events & Music Nights',
      subtitle:
        'Where Cosenza meets the UniCal international community: live percussion, Afrobeats, tropical aperitivos, and late-night kitchen service.',
      sponsoredBy: 'All events are sponsored by Celebrity Barman',
      reserveNightCta: 'Reserve for this night',
      galleryTitle: 'Live Nights & Guest Moments',
      imageAlt: 'Live performance under stage lights during a party night at Mama Africa in Cosenza',
    },
    location: {
      eyebrow: 'Visit Us',
      title: 'In the Heart of Cosenza',
      subtitle:
        'Steps away from Corso Mazzini and easily reached by bus from the UniCal campus in Rende.',
      addressTitle: 'Address',
      hoursTitle: 'Opening Hours (Demo)',
      closedLabel: 'Closed',
      directionsTitle: 'Directions',
      directionsList: [
        'On foot: 1 minute off Corso Mazzini (near Piazza Bilotti pedestrian area).',
        'From UniCal (Rende): Take city bus to Cosenza Centro / Piazza Mancini, then a 5-minute walk.',
        'By car: Paid and street parking available around Piazza Bilotti.',
      ],
      openMapsCta: 'Open in Google Maps',
      whatsappDirectCta: 'Message us on WhatsApp',
      mapIframeTitle: 'Map of Mama Africa Restaurant & Bar at Via Pietro Pompilio Rodotà 12/14, Cosenza',
    },
    footer: {
      tagline: 'Authentic West African flavors, bar service, and culture in central Cosenza.',
      rights: 'Mama Africa Restaurant & Bar · Via Pietro Pompilio Rodotà, 12/14, Cosenza',
      demoNote: 'Interactive demo website · Direct table reservations and takeaway via WhatsApp.',
    },
  },
}
