import type { DietaryBadge, Language, MenuCategory } from '../types'

export const TRANSLATIONS: Record<
  Language,
  {
    skipToContent: string
    documentTitle: string
    orderBar: {
      viewOrder: string
    }
    nav: {
      menu: string
      orderReserve: string
      events: string
      location: string
      reserveCta: string
      cartLabel: string
      languageToggleAria: string
      openMenu: string
      closeMenu: string
      primaryLabel: string
      mobileLabel: string
    }
    hero: {
      kicker: string
      titleStart: string
      titleHighlight: string
      titleEnd: string
      subtitle: string
      primaryCta: string
      secondaryCta: string
      galleryLabel: string
      slideLabel: string
      pauseSlideshow: string
      playSlideshow: string
    }
    menu: {
      kicker: string
      title: string
      subtitle: string
      signatureTitle: string
      fullLedgerTitle: string
      categories: Record<MenuCategory, string>
      categoriesLabel: string
      badges: Record<DietaryBadge, string>
      customizableHint: string
      allergenNote: string
      addToOrder: string
      addedFeedback: string
    }
    whatsapp: {
      kicker: string
      title: string
      subtitle: string
      tabs: {
        reservation: string
        takeaway: string
      }
      tabsLabel: string
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
        errors: {
          nameRequired: string
          dateRequired: string
          datePast: string
          dayClosed: string
          timeRequired: string
          timeOutsideHours: string
          timePast: string
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
        clearCart: string
        removeItem: string
        decreaseQty: string
        increaseQty: string
        errors: {
          emptyCart: string
          nameRequired: string
          pickupRequired: string
          pickupOutsideHours: string
          pickupPast: string
        }
      }
    }
    events: {
      kicker: string
      title: string
      subtitle: string
      reserveNightCta: string
      galleryTitle: string
      imageAlt: string
      pastTitle: string
      pastMore: string
    }
    location: {
      kicker: string
      title: string
      subtitle: string
      addressTitle: string
      hoursTitle: string
      closedLabel: string
      openMapsCta: string
      callCta: string
      followUs: string
      mapIframeTitle: string
      loadMapCta: string
      mapConsentNote: string
    }
    footer: {
      tagline: string
    }
  }
> = {
  it: {
    skipToContent: 'Vai al contenuto principale',
    documentTitle: 'Mama Africa Restaurant & Bar | Cucina Nigeriana a Cosenza',
    orderBar: {
      viewOrder: 'Vedi ordine',
    },
    nav: {
      menu: 'Menu',
      orderReserve: 'Prenota & Asporto',
      events: 'Serate & Musica',
      location: 'Dove Siamo',
      reserveCta: 'Prenota Tavolo',
      cartLabel: 'Ordine asporto',
      languageToggleAria: 'Passa a Inglese',
      openMenu: 'Apri il menu',
      closeMenu: 'Chiudi il menu',
      primaryLabel: 'Principale',
      mobileLabel: 'Menu di navigazione',
    },
    hero: {
      kicker: 'benvenuti a casa',
      titleStart: 'Vera cucina nigeriana,',
      titleHighlight: 'fatta al momento',
      titleEnd: 'a Cosenza',
      subtitle:
        'Dal party jollof all’egusi soup, ogni piatto è cucinato al momento, come lo fa mama.',
      primaryCta: 'Prenota o Ordina su WhatsApp',
      secondaryCta: 'Esplora il Menu',
      galleryLabel: 'Galleria foto',
      slideLabel: 'Immagine',
      pauseSlideshow: 'Metti in pausa la galleria',
      playSlideshow: 'Riprendi la galleria',
    },
    menu: {
      kicker: 'cosa bolle in pentola',
      title: 'Il Menu',
      subtitle:
        'Filtra per categoria o esigenza alimentare e aggiungi i piatti direttamente al tuo ordine d’asporto WhatsApp.',
      signatureTitle: 'Piatti Firma della Casa',
      fullLedgerTitle: 'Carta Completa',
      categories: {
        all: 'Tutto',
        starters: 'Antipasti & Street Food',
        mains: 'Piatti Unici & Riso',
        grill: 'Carni & Specialità',
        vegan: 'Vegano & Vegetariano',
        drinks: 'Bar & Bevande',
      },
      categoriesLabel: 'Categorie del menu',
      badges: {
        vegan: 'Vegano',
        vegetarian: 'Vegetariano',
        freshToOrder: 'Preparato al Momento',
      },
      customizableHint: 'Personalizzabile 100% vegano su richiesta',
      allergenNote:
        'Informazioni sugli allergeni disponibili su richiesta: segnalaci eventuali allergie quando prenoti o ordini.',
      addToOrder: 'Aggiungi all’ordine',
      addedFeedback: 'Aggiunto',
    },
    whatsapp: {
      kicker: 'un tavolo per te',
      title: 'Invia in 1 Click su WhatsApp',
      subtitle:
        'Compila i dati qui sotto: generiamo il messaggio pronto per il nostro WhatsApp (+39 349 565 5600) senza attese.',
      tabs: {
        reservation: 'Prenota un Tavolo',
        takeaway: 'Ordine d’Asporto',
      },
      tabsLabel: 'Prenotazione o asporto',
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
        errors: {
          nameRequired: 'Inserisci il tuo nome per la prenotazione.',
          dateRequired: 'Seleziona una data valida.',
          datePast: 'La data è già passata. Scegli oggi o un giorno futuro.',
          dayClosed: 'In quel giorno siamo chiusi. Scegli un altro giorno.',
          timeRequired: 'Seleziona un orario.',
          timeOutsideHours: 'Orario fuori dagli orari di apertura. Controlla gli orari qui sotto.',
          timePast: 'Quell’orario di oggi è già passato. Scegli un orario più tardi.',
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
        clearCart: 'Svuota',
        removeItem: 'Rimuovi piatto',
        decreaseQty: 'Riduci quantità',
        increaseQty: 'Aumenta quantità',
        errors: {
          emptyCart: 'Aggiungi almeno un piatto dal menu prima di inviare l’ordine.',
          nameRequired: 'Inserisci il tuo nome per il ritiro.',
          pickupRequired: 'Indica l’orario di ritiro.',
          pickupOutsideHours: 'Oggi a quell’orario la cucina è chiusa. Controlla gli orari qui sotto.',
          pickupPast: 'Quell’orario di oggi è già passato. Scegli un orario di ritiro più tardi.',
        },
      },
    },
    events: {
      kicker: 'la sera da mama',
      title: 'Feste & Ospiti Speciali',
      subtitle:
        'Feste del sabato sera, ospiti speciali e grandi serate firmate Celebrity Barman, con musica africana e cucina calda fino a tardi.',
      reserveNightCta: 'Prenota per questa serata',
      galleryTitle: 'Atmosfera & Ospiti dal Vivo',
      pastTitle: 'Serate passate',
      pastMore:
        'Altre serate: 16 e 23 agosto, 27 settembre, 18 e 28 ottobre, 15 e 29 novembre, 20 e 27 dicembre 2025.',
      imageAlt: 'Performance dal vivo con luci di scena durante una serata da Mama Africa a Cosenza',
    },
    location: {
      kicker: 'vieni a trovarci',
      title: 'Nel Cuore di Cosenza',
      subtitle:
        'Facilmente raggiungibile a piedi da Corso Mazzini e in autobus dal campus UniCal di Rende.',
      addressTitle: 'Indirizzo',
      hoursTitle: 'Orari di Apertura',
      closedLabel: 'Chiuso',
      openMapsCta: 'Apri su Google Maps',
      callCta: 'Chiamaci',
      followUs: 'Seguici su',
      loadMapCta: 'Mostra la mappa',
      mapConsentNote: 'La mappa è fornita da Google, che può impostare cookie al caricamento.',
      mapIframeTitle: 'Mappa di Mama Africa Restaurant & Bar a Via Pietro Pompilio Rodotà 12/14, Cosenza',
    },
    footer: {
      tagline: 'Sapori autentici dell’Africa Occidentale, bar e cultura nel centro di Cosenza.',
    },
  },
  en: {
    skipToContent: 'Skip to main content',
    documentTitle: 'Mama Africa Restaurant & Bar | Nigerian Food in Cosenza',
    orderBar: {
      viewOrder: 'View order',
    },
    nav: {
      menu: 'Menu',
      orderReserve: 'Reserve & Takeaway',
      events: 'Events & Music',
      location: 'Location',
      reserveCta: 'Book a Table',
      cartLabel: 'Takeaway order',
      languageToggleAria: 'Switch to Italian',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      primaryLabel: 'Main',
      mobileLabel: 'Navigation menu',
    },
    hero: {
      kicker: 'welcome home',
      titleStart: 'Real Nigerian cooking,',
      titleHighlight: 'made fresh',
      titleEnd: 'in Cosenza',
      subtitle:
        'From party jollof to egusi soup, every plate is cooked to order, the way mama makes it.',
      primaryCta: 'Book or Order on WhatsApp',
      secondaryCta: 'Explore Menu',
      galleryLabel: 'Photo gallery',
      slideLabel: 'Image',
      pauseSlideshow: 'Pause the gallery',
      playSlideshow: 'Resume the gallery',
    },
    menu: {
      kicker: 'what’s cooking',
      title: 'The Menu',
      subtitle:
        'Filter by course or dietary preference and add dishes directly to your WhatsApp takeaway order.',
      signatureTitle: 'Signature Plates',
      fullLedgerTitle: 'Full Menu',
      categories: {
        all: 'All',
        starters: 'Starters & Street Food',
        mains: 'Mains & Rice',
        grill: 'Meats & Specials',
        vegan: 'Vegan & Vegetarian',
        drinks: 'Bar & Drinks',
      },
      categoriesLabel: 'Menu categories',
      badges: {
        vegan: 'Vegan',
        vegetarian: 'Vegetarian',
        freshToOrder: 'Fresh to Order',
      },
      customizableHint: 'Customizable 100% vegan on request',
      allergenNote:
        'Allergen information is available on request: please tell us about any allergies when you book or order.',
      addToOrder: 'Add to order',
      addedFeedback: 'Added',
    },
    whatsapp: {
      kicker: 'a table for you',
      title: '1-Click WhatsApp Builder',
      subtitle:
        'Fill in your details below to generate a ready-to-send message for our WhatsApp (+39 349 565 5600).',
      tabs: {
        reservation: 'Book a Table',
        takeaway: 'Takeaway Order',
      },
      tabsLabel: 'Booking or takeaway',
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
        errors: {
          nameRequired: 'Please enter your name for the reservation.',
          dateRequired: 'Please choose a valid date.',
          datePast: 'That date has passed. Please choose today or a later day.',
          dayClosed: 'We are closed on that day. Please choose another day.',
          timeRequired: 'Please choose a time.',
          timeOutsideHours: 'That time is outside our opening hours. See the hours below.',
          timePast: 'That time has already passed today. Please choose a later time.',
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
        clearCart: 'Clear',
        removeItem: 'Remove dish',
        decreaseQty: 'Decrease quantity',
        increaseQty: 'Increase quantity',
        errors: {
          emptyCart: 'Add at least one dish from the menu before ordering.',
          nameRequired: 'Please enter your name for pickup.',
          pickupRequired: 'Please choose a pickup time.',
          pickupOutsideHours: 'The kitchen is closed at that time today. See the hours below.',
          pickupPast: 'That time has already passed today. Please choose a later pickup time.',
        },
      },
    },
    events: {
      kicker: 'nights at mama’s',
      title: 'Parties & Special Guests',
      subtitle:
        'Saturday parties, special guests and big nights hosted by Celebrity Barman, with African music and a hot kitchen till late.',
      reserveNightCta: 'Reserve for this night',
      galleryTitle: 'Live Nights & Guest Moments',
      pastTitle: 'Past nights',
      pastMore:
        'More nights: 16 and 23 August, 27 September, 18 and 28 October, 15 and 29 November, 20 and 27 December 2025.',
      imageAlt: 'Live performance under stage lights during a party night at Mama Africa in Cosenza',
    },
    location: {
      kicker: 'come and see us',
      title: 'In the Heart of Cosenza',
      subtitle:
        'Steps away from Corso Mazzini and easily reached by bus from the UniCal campus in Rende.',
      addressTitle: 'Address',
      hoursTitle: 'Opening Hours',
      closedLabel: 'Closed',
      openMapsCta: 'Open in Google Maps',
      callCta: 'Call us',
      followUs: 'Follow us on',
      loadMapCta: 'Show the map',
      mapConsentNote: 'The map is provided by Google, which may set cookies when it loads.',
      mapIframeTitle: 'Map of Mama Africa Restaurant & Bar at Via Pietro Pompilio Rodotà 12/14, Cosenza',
    },
    footer: {
      tagline: 'Authentic West African flavors, bar service, and culture in central Cosenza.',
    },
  },
}
