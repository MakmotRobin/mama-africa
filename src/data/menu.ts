import type { CulturalEvent, MenuItem } from '../types'

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'fataya-pies',
    category: 'starters',
    name: {
      it: 'Fataya (Meat Pies Africane)',
      en: 'Fataya (African Meat Pies)',
    },
    description: {
      it: 'Fagottini dorati e croccanti ripieni di manzo speziato o verdure, serviti con salsa al pomodoro e peperoncino fatta in casa.',
      en: 'Golden crispy turnovers filled with spiced beef or savory vegetables, served with homemade tomato-chili dipping sauce.',
    },
    price: 7.5,
    image: '/images/dish-fataya.jpg',
    badges: ['freshToOrder', 'vegetarian'],
    customizableVegan: true,
  },
  {
    id: 'alloco-plantain',
    category: 'starters',
    name: {
      it: 'Alloco & Salse Speziate',
      en: 'Alloco & Spiced Dips',
    },
    description: {
      it: 'Platano dolce fritto al momento fino a doratura, accompagnato da cipolla rossa marinata e salsa piccante allo zenzero.',
      en: 'Freshly fried sweet ripe plantains served with marinated red onions and house ginger-pepper sauce.',
    },
    price: 6.0,
    image: '/images/dish-fataya.jpg',
    badges: ['vegan', 'vegetarian', 'freshToOrder'],
  },
  {
    id: 'jollof-rice',
    category: 'mains',
    name: {
      it: 'Riso Jollof Tradizionale',
      en: 'Signature Jollof Rice',
    },
    description: {
      it: 'Riso cotto a fuoco lento in salsa di pomodoro affumicato, peperoni e spezie dell’Africa Occidentale con platano dolce. Con pollo, manzo o 100% vegano.',
      en: 'Long-grain rice simmered in smoky tomato, bell pepper, and West African spices with sweet plantains. Choice of chicken, beef, or 100% vegan.',
    },
    price: 13.0,
    image: '/images/dish-jollof.jpg',
    badges: ['freshToOrder', 'vegan', 'vegetarian'],
    customizableVegan: true,
  },
  {
    id: 'okra-soup',
    category: 'mains',
    name: {
      it: 'Okra Soup (Sauce Gombo)',
      en: 'Okra Soup (Sauce Gombo)',
    },
    description: {
      it: 'Zuppa vellutata di okra fresca, pomodoro ed erbe aromatiche, servita con fufu o riso bianco. Preparata al momento in versione classica o vegana.',
      en: 'Rich, velvety fresh okra stew with aromatic herbs, served with fufu or steamed rice. Cooked to order in classic or vegan style.',
    },
    price: 14.0,
    image: '/images/dish-okra.jpg',
    badges: ['freshToOrder', 'vegan', 'vegetarian'],
    customizableVegan: true,
  },
  {
    id: 'mafe-stew',
    category: 'vegan',
    name: {
      it: 'Mafé alle Arachidi & Patate Dolci',
      en: 'Mafé Peanut & Sweet Potato Stew',
    },
    description: {
      it: 'Crema di arachidi tostate, patate dolci, spinaci e verdure di stagione con riso basmati profumato.',
      en: 'Slow-simmered roasted peanut sauce with sweet potatoes, leafy greens, and seasonal vegetables over fragrant rice.',
    },
    price: 12.5,
    image: '/images/dish-okra.jpg',
    badges: ['vegan', 'vegetarian', 'freshToOrder'],
  },
  {
    id: 'tilapia-grill',
    category: 'grill',
    name: {
      it: 'Tilapia alla Brace & Attiéké',
      en: 'Charcoal-Grilled Tilapia & Attiéké',
    },
    description: {
      it: 'Tilapia intera marinata con limone, aglio e spezie africane, grigliata al momento e servita con attiéké di manioca e platano.',
      en: 'Whole tilapia marinated in citrus, garlic, and African spices, grilled to order with cassava attiéké and fried plantains.',
    },
    price: 16.5,
    image: '/images/dish-grill.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'suya-skewers',
    category: 'grill',
    name: {
      it: 'Spiedini & Carne Speziata alla Brace',
      en: 'Charcoal Spiced Meat & Suya',
    },
    description: {
      it: 'Teneri tagli di carne speziati alla polvere di arachidi tostate e zenzero, serviti con cipolle rosse e platano.',
      en: 'Tender cuts crusted in toasted peanut-ginger suya spice, served with crisp red onions and plantains.',
    },
    price: 14.5,
    image: '/images/dish-suya-real.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'bissap-cooler',
    category: 'drinks',
    name: {
      it: 'Bissap (Infuso di Ibisco & Menta)',
      en: 'Bissap (Hibiscus & Mint Cooler)',
    },
    description: {
      it: 'Bevanda fresca ai fiori di karkadè, menta fresca e una nota di zenzero. Analcolica e naturalmente vegana.',
      en: 'Chilled West African hibiscus flower infusion with fresh mint and a hint of ginger. Alcohol-free and vegan.',
    },
    price: 4.5,
    image: '/images/hero-feast.jpg',
    badges: ['vegan', 'vegetarian', 'freshToOrder'],
  },
  {
    id: 'ginger-pineapple',
    category: 'drinks',
    name: {
      it: 'Gnamakoudji (Zenzero & Ananas)',
      en: 'Gnamakoudji (Ginger Pineapple Elixir)',
    },
    description: {
      it: 'Estratto fresco di zenzero piccante, ananas dolce e lime, preparato giornalmente al nostro bar.',
      en: 'Fresh-pressed spicy ginger, sweet pineapple, and lime elixir crafted daily at our bar.',
    },
    price: 5.0,
    image: '/images/hero-feast.jpg',
    badges: ['vegan', 'vegetarian', 'freshToOrder'],
  },
  {
    id: 'afro-calabrian-cocktail',
    category: 'drinks',
    name: {
      it: 'Afro-Calabrian Sunset Cocktail',
      en: 'Afro-Calabrian Sunset Cocktail',
    },
    description: {
      it: 'Cocktail signature del nostro bar con infuso di ibisco, bergamotto calabrese, rum scuro e lime fresco.',
      en: 'Signature bar cocktail blending hibiscus infusion, Calabrian bergamot, dark rum, and fresh lime.',
    },
    price: 7.5,
    image: '/images/events-night.jpg',
    badges: ['vegan', 'vegetarian', 'freshToOrder'],
  },
  {
    id: 'nkwobi-isi-ewu',
    category: 'mains',
    name: {
      it: 'Nkwobi / Isi-Ewu Tradizionale',
      en: 'Traditional Nkwobi / Isi-Ewu',
    },
    description: {
      it: 'Specialità nigeriana in salsa ricca di olio di palma, spezie calde e cipolla rossa fresca, preparata al momento.',
      en: 'Authentic Nigerian delicacy simmered in rich spiced palm-oil sauce and topped with crisp red onions.',
    },
    price: 15.0,
    image: '/images/fb-dish-5.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'peppered-wings-kpomo',
    category: 'starters',
    name: {
      it: 'Alette Speziate & Peppered Kpomo',
      en: 'Glazed Spicy Wings & Peppered Kpomo',
    },
    description: {
      it: 'Alette di pollo glassate al peperoncino dolce o tenero kpomo speziato in stile West Africa, ideali da condividere.',
      en: 'West African chili-glazed chicken wings or tender peppered kpomo, cooked fresh for sharing.',
    },
    price: 9.0,
    image: '/images/fb-dish-2.jpg',
    badges: ['freshToOrder'],
  },
]

export const CULTURAL_EVENTS: CulturalEvent[] = [
  {
    id: 'all-white-night',
    dayBadge: { it: '12 Dicembre 2026 · Evento Speciale', en: '12th December 2026 · Special Event' },
    time: '22:00 - 02:00',
    title: {
      it: 'All White Night Party',
      en: 'All White Night Party',
    },
    description: {
      it: 'Serata esclusiva con dress code total white nel cuore di Cosenza: musica, energia e cocktail d’autore fino a tarda notte.',
      en: 'Exclusive total white dress code night in the heart of Cosenza: non-stop music, high energy, and signature cocktails late into the night.',
    },
    highlights: [
      { it: 'Hypeman: Christyle', en: 'Hypeman: Christyle' },
      { it: 'DJ: Sky face', en: 'DJ: Sky face' },
      { it: 'Dorime Chief Priest', en: 'Dorime Chief Priest' },
    ],
  },
  {
    id: 'unical-aperitivo',
    dayBadge: { it: 'Ogni Giovedì', en: 'Every Thursday' },
    time: '19:30 - 22:30',
    title: {
      it: 'UniCal International Aperitivo',
      en: 'UniCal International Aperitivo',
    },
    description: {
      it: 'Serata dedicata a studenti internazionali, Erasmus e cosentini: tagliere di Fataya e Alloco con Bissap o cocktail della casa.',
      en: 'A lively meet-up for UniCal international students and Cosenza locals: Fataya & Alloco sharing boards with Bissap or house cocktails.',
    },
    highlights: [
      { it: 'Menu aperitivo con opzioni vegane', en: 'Aperitivo platter with vegan options' },
      { it: 'Selezione Afrobeats & Soul', en: 'Afrobeats & Soul playlist' },
    ],
  },
  {
    id: 'afrobeats-friday',
    dayBadge: { it: 'Ogni Venerdì', en: 'Every Friday' },
    time: '21:30 - 01:00',
    title: {
      it: 'Venerdì Afrobeats & Highlife',
      en: 'Afrobeats & Highlife Fridays',
    },
    description: {
      it: 'Cucina calda fino a tardi, cocktail tropicali al bar e DJ set tra Afrobeats, Amapiano e Highlife classico.',
      en: 'Late-night hot kitchen, tropical bar cocktails, and DJ sets blending Afrobeats, Amapiano, and classic Highlife.',
    },
    highlights: [
      { it: 'Bar aperto fino alle 01:00', en: 'Bar open until 01:00' },
      { it: 'Griglia & Jollof serviti al momento', en: 'Fresh grill & Jollof served to order' },
    ],
  },
  {
    id: 'griot-saturday',
    dayBadge: { it: 'Ogni Sabato', en: 'Every Saturday' },
    time: '21:00 - 00:30',
    title: {
      it: 'Sabato Live Percussioni & Acustico',
      en: 'Saturday Live Percussion & Acoustic',
    },
    description: {
      it: 'Djembe, chitarra acustica e racconti musicali dal vivo per una cena calda e conviviale a due passi da Corso Mazzini.',
      en: 'Live djembe, acoustic guitar, and warm storytelling rhythms for a vibrant Saturday dinner just off Corso Mazzini.',
    },
    highlights: [
      { it: 'Musica acustica dal vivo', en: 'Live acoustic & djembe session' },
      { it: 'Consigliata prenotazione tavolo', en: 'Table booking recommended' },
    ],
  },
]
