export const RESTAURANT_CONFIG = {
  name: 'Mama Africa Restaurant & Bar',
  italianName: 'Ristorante Mamma Africa',
  whatsappDisplay: '+39 349 565 5600',
  whatsappDigits: '393495655600',
  phoneDisplay: '+39 349 437 3912',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61571605631762',
  addressLine: 'Via Pietro Pompilio Rodotà, 12/14',
  cityLine: '87100 Cosenza (CS), Italia',
  landmark: {
    it: 'A pochi passi da Corso Mazzini',
    en: 'Just off Corso Mazzini',
  },
  mapsQueryUrl:
    'https://www.google.com/maps/search/?api=1&query=Via+Pietro+Pompilio+Rodot%C3%A0+12%2C+87100+Cosenza+CS%2C+Italy',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Via+Pietro+Pompilio+Rodot%C3%A0+12,+87100+Cosenza+CS,+Italy&output=embed',
  hours: {
    it: [
      { days: 'Mar - Gio', time: '12:00 - 15:00 / 19:00 - 23:30' },
      { days: 'Ven - Sab', time: '12:00 - 15:00 / 19:00 - 01:00' },
      { days: 'Domenica', time: '12:30 - 15:30 / 19:00 - 23:00' },
      { days: 'Lunedì', time: 'Chiuso' },
    ],
    en: [
      { days: 'Tue - Thu', time: '12:00 - 15:00 / 19:00 - 23:30' },
      { days: 'Fri - Sat', time: '12:00 - 15:00 / 19:00 - 01:00' },
      { days: 'Sunday', time: '12:30 - 15:30 / 19:00 - 23:00' },
      { days: 'Monday', time: 'Closed' },
    ],
  },
} as const
