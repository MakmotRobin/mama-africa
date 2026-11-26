import type { CulturalEvent, MenuItem } from '../types'

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'jollof-rice',
    category: 'mains',
    name: {
      it: 'Riso Jollof Tradizionale',
      en: 'Signature Jollof Rice',
    },
    description: {
      it: 'Riso cotto a fuoco lento in salsa di pomodoro affumicato, peperoni e spezie dell’Africa Occidentale con carne arrosto.',
      en: 'Long-grain rice simmered in smoky tomato, bell pepper, and West African spices with roasted meat.',
    },
    price: 10.0,
    image: 'images/dish-jollof.jpg',
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
      it: 'Zuppa vellutata di okra fresca, pomodoro ed erbe aromatiche, servita con fufu o riso bianco. Preparata al momento.',
      en: 'Rich, velvety fresh okra stew with aromatic herbs, served with fufu or steamed rice. Cooked to order.',
    },
    price: 10.0,
    image: 'images/dish-okra.jpg',
    badges: ['freshToOrder', 'vegan', 'vegetarian'],
    customizableVegan: true,
  },
  {
    id: 'white-rice-stew',
    category: 'mains',
    name: {
      it: 'Riso Bianco, Stufato, Platano & Carne',
      en: 'White Rice, Stew, Plantain & Meat',
    },
    description: {
      it: 'Riso bianco servito con ricco stufato di pomodoro e peperoni, carne tenera, platano dolce fritto e uovo.',
      en: 'Steamed white rice served with rich tomato-pepper stew, tender meat, sweet fried plantain, and boiled egg.',
    },
    price: 10.0,
    image: 'images/dish-white-rice-stew.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'fried-rice',
    category: 'mains',
    name: {
      it: 'Fried Rice Nigeriano',
      en: 'Fried Rice',
    },
    description: {
      it: 'Riso saltato in stile nigeriano con verdure croccanti, mais dolce, piselli, spezie aromatiche e carne arrosto.',
      en: 'Nigerian-style savory fried rice cooked with mixed vegetables, sweet corn, peas, aromatic spices, and roasted meat.',
    },
    price: 10.0,
    image: 'images/dish-fried-rice.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'oha-soup',
    category: 'mains',
    name: {
      it: 'Oha Soup',
      en: 'Oha Soup',
    },
    description: {
      it: 'Zuppa tradizionale nigeriana con foglie fresche di oha, carne e spezie aromatiche, servita con fufu o eba.',
      en: 'Traditional Nigerian soup simmered with fresh oha leaves, tender meat, and rich spices, served with fufu or eba.',
    },
    price: 10.0,
    image: 'images/dish-oha-soup.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'vegetable-soup',
    category: 'mains',
    name: {
      it: 'Vegetable Soup (Edikang Ikong / Efo)',
      en: 'Vegetable Soup',
    },
    description: {
      it: 'Zuppa ricca di verdure verdi fresche, olio di palma e spezie tradizionali, servita con fufu o eba.',
      en: 'Rich Nigerian leafy green vegetable soup simmered with traditional spices, served with fufu or eba.',
    },
    price: 10.0,
    image: 'images/dish-vegetable-soup.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'bitter-leaf',
    category: 'mains',
    name: {
      it: 'Bitter Leaf Soup (Ofe Onugbu)',
      en: 'Bitter Leaf',
    },
    description: {
      it: 'Zuppa tradizionale Igbo con foglie di bitter leaf lavate a mano, cocoyam e carne, servita con fufu o eba.',
      en: 'Classic Igbo soup prepared with washed bitter leaves, cocoyam thickener, and tender meat, served with fufu or eba.',
    },
    price: 10.0,
    image: 'images/dish-bitter-leaf.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'egusi-soup',
    category: 'mains',
    name: {
      it: 'Egusi Soup',
      en: 'Egusi Soup',
    },
    description: {
      it: 'Zuppa cremosa di semi di melone macinati, foglie verdi, olio di palma e carne, servita con fufu o eba.',
      en: 'Rich Nigerian melon-seed soup simmered with leafy greens, palm oil, and tender meat, served with fufu or eba.',
    },
    price: 10.0,
    image: 'images/dish-egusi-soup.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'abacha-ugba',
    category: 'mains',
    name: {
      it: 'Abacha & Ugba (Insalata Africana)',
      en: 'Abacha and Ugba',
    },
    description: {
      it: 'Insalata tradizionale Igbo di manioca essiccata e ugba fermentata con olio di palma, cipolla rossa, peperoncino e carne.',
      en: 'Traditional Igbo African salad made with cassava flakes, fermented oil bean (ugba), palm oil dressing, red onions, and meat.',
    },
    price: 10.0,
    image: 'images/dish-abacha-ugba.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'indomie-noodles',
    category: 'mains',
    name: {
      it: 'Indomie Noodles Nigeriani',
      en: 'Indomie Noodles',
    },
    description: {
      it: 'Noodles saltati in stile nigeriano con uovo fritto, carne speziata, peperoncino fresco e lime.',
      en: 'Nigerian-style stir-fried Indomie noodles topped with fried egg, spiced meat, fresh chili, and lime.',
    },
    price: 12.0,
    image: 'images/dish-indomie.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'goat-meat',
    category: 'grill',
    name: {
      it: 'Carne di Capra Speziata (Goat Meat)',
      en: 'Goat Meat',
    },
    description: {
      it: 'Tagli di capra marinati con spezie nigeriane e cotti fino a doratura, saporiti e teneri.',
      en: 'Tender goat meat cuts seasoned with traditional Nigerian spices and roasted to a rich finish.',
    },
    price: 10.0,
    image: 'images/dish-goat-meat.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'nkwobi',
    category: 'grill',
    name: {
      it: 'Nkwobi',
      en: 'Nkwobi',
    },
    description: {
      it: 'Specialità tradizionale Igbo: stinco di manzo tenero in salsa speziata di olio di palma, utazi e spezie aromatiche.',
      en: 'Traditional Igbo delicacy of tender cow foot simmered in spiced palm oil sauce with utazi leaves and aromatics.',
    },
    price: 15.0,
    image: 'images/dish-nkwobi.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'isi-ewu',
    category: 'grill',
    name: {
      it: 'Isi Ewu',
      en: 'Isi Ewu',
    },
    description: {
      it: 'Specialità tradizionale Igbo di testa di capra speziata in salsa densa di olio di palma, ehuru, utazi e anelli di cipolla.',
      en: 'Traditional Igbo spiced goat head delicacy in rich palm oil sauce with calabash nutmeg, utazi leaves, and red onions.',
    },
    price: 10.0,
    image: 'images/dish-isi-ewu.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'meat-pie',
    category: 'starters',
    name: {
      it: 'Meat Pie Nigeriana',
      en: 'Meat Pie',
    },
    description: {
      it: 'Pasta frolla salata dorata ripiena di carne macinata speziata, patate e carote, cotta al forno al momento.',
      en: 'Golden baked pastry turnover filled with spiced minced meat, potatoes, and carrots.',
    },
    price: 3.0,
    image: 'images/dish-meat-pie.jpg',
    badges: ['freshToOrder'],
  },
  {
    id: 'egg-roll',
    category: 'starters',
    name: {
      it: 'Egg Roll Nigeriano',
      en: 'Egg Roll',
    },
    description: {
      it: 'Soffice impasto dorato avvolto attorno a un uovo sodo intero, fritto al momento.',
      en: 'Golden fried dough wrapped around a whole boiled egg, cooked fresh to order.',
    },
    price: 3.0,
    image: 'images/dish-egg-roll.jpg',
    badges: ['vegetarian', 'freshToOrder'],
  },
]

export const CULTURAL_EVENTS: CulturalEvent[] = [
  {
    id: 'all-white-night',
    dayBadge: { it: '12 Dicembre 2026 · Evento Speciale', en: '12th December 2026 · Special Event' },
    time: '22:00 - 02:00',
    endsAt: '2026-12-13T02:00',
    title: {
      it: 'All White Night Party',
      en: 'All White Night Party',
    },
    photos: [
      {
        src: 'images/dorime-chief-priest.jpg',
        alt: {
          it: 'Dorime Chief Priest ospite da Mama Africa',
          en: 'Dorime Chief Priest at Mama Africa',
        },
        caption: { it: 'Dorime Chief Priest', en: 'Dorime Chief Priest' },
      },
      {
        src: 'images/dj-sky-face.jpg',
        alt: { it: 'DJ Sky face alla consolle', en: 'DJ Sky face mixing live' },
        caption: { it: 'DJ Sky face', en: 'DJ Sky face' },
      },
    ],
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
