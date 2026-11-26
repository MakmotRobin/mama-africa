import { LEGAL_ENTITY, RESTAURANT_CONFIG } from '../config/restaurant'
import type { LocalizedText } from '../types'

export interface LegalSection {
  heading: LocalizedText
  paragraphs: LocalizedText[]
  items?: LocalizedText[]
}

const SITE_NAME = 'Mama Africa Restaurant & Bar'

/** Browser tab title for a legal page: "<page title> | Mama Africa Restaurant & Bar". */
export function legalPageTitle(document: LegalDocument): LocalizedText {
  return {
    it: `${document.title.it} | ${SITE_NAME}`,
    en: `${document.title.en} | ${SITE_NAME}`,
  }
}

export interface LegalDocument {
  title: LocalizedText
  intro: LocalizedText
  sections: LegalSection[]
}

const CONTACTS = `WhatsApp ${RESTAURANT_CONFIG.whatsappDisplay}, tel. ${RESTAURANT_CONFIG.phoneDisplay}`
const CONTACTS_EN = `WhatsApp ${RESTAURANT_CONFIG.whatsappDisplay}, phone ${RESTAURANT_CONFIG.phoneDisplay}`
/** "Name, P.IVA 123…, address": leaves out the Partita IVA while it is not known yet. */
function describeController(vatLabel: string): string {
  const vat = LEGAL_ENTITY.vatNumber ? `${vatLabel} ${LEGAL_ENTITY.vatNumber}` : null
  return [LEGAL_ENTITY.name, vat, LEGAL_ENTITY.address].filter(Boolean).join(', ')
}

const CONTROLLER = describeController('P.IVA')
const CONTROLLER_EN = describeController('VAT no.')
/** Only needed when the legal name differs from the restaurant's trading name. */
const RUNS_RESTAURANT = LEGAL_ENTITY.name === RESTAURANT_CONFIG.name ? '' : `, che gestisce ${RESTAURANT_CONFIG.name}`
const RUNS_RESTAURANT_EN =
  LEGAL_ENTITY.name === RESTAURANT_CONFIG.name ? '' : `, operator of ${RESTAURANT_CONFIG.name}`

export const PRIVACY_POLICY: LegalDocument = {
  title: { it: 'Informativa sulla privacy', en: 'Privacy Policy' },
  intro: {
    it: `Questa informativa spiega quali dati personali tratta ${RESTAURANT_CONFIG.name} quando usi questo sito, perché e quali sono i tuoi diritti, ai sensi del Regolamento (UE) 2016/679 (GDPR) e del D.Lgs. 196/2003.`,
    en: `This policy explains what personal data ${RESTAURANT_CONFIG.name} processes when you use this site, why, and what your rights are, under Regulation (EU) 2016/679 (GDPR) and Italian Legislative Decree 196/2003.`,
  },
  sections: [
    {
      heading: { it: 'Titolare del trattamento', en: 'Data controller' },
      paragraphs: [
        {
          it: `Il titolare del trattamento è ${CONTROLLER}${RUNS_RESTAURANT}.`,
          en: `The data controller is ${CONTROLLER_EN}${RUNS_RESTAURANT_EN}.`,
        },
        {
          it: `Per qualsiasi richiesta sulla privacy puoi contattarci a: ${CONTACTS}.`,
          en: `For any privacy request you can contact us at: ${CONTACTS_EN}.`,
        },
      ],
    },
    {
      heading: { it: 'Quali dati trattiamo', en: 'What data we process' },
      paragraphs: [
        {
          it: 'Il sito non ha account, non salva dati su un server e non usa cookie di profilazione o di statistica. Trattiamo solo:',
          en: 'The site has no accounts, stores no data on a server and uses no profiling or analytics cookies. We only process:',
        },
      ],
      items: [
        {
          it: 'i dati che scrivi nei moduli di prenotazione e di asporto (nome, data, orario, numero di persone, piatti scelti, note). Il sito li usa solo per comporre un messaggio WhatsApp: siamo noi a riceverli quando decidi di inviarlo, insieme al tuo numero di telefono e al nome del tuo profilo WhatsApp;',
          en: 'the details you type into the booking and takeaway forms (name, date, time, number of guests, dishes, notes). The site only uses them to write a WhatsApp message: we receive them when you choose to send it, together with your phone number and WhatsApp profile name;',
        },
        {
          it: 'eventuali informazioni su allergie o intolleranze che scegli di indicare nelle note. Sono dati relativi alla salute: li usiamo solo per preparare i tuoi piatti in sicurezza, sulla base del tuo consenso esplicito, che esprimi scrivendoli;',
          en: 'any allergy or intolerance details you choose to add in the notes. These are health data: we use them only to prepare your food safely, based on your explicit consent, which you give by writing them;',
        },
        {
          it: 'la lingua che scegli (italiano o inglese), salvata solo nel tuo browser per ricordarla alla prossima visita. Non viene inviata a nessuno;',
          en: 'the language you choose (Italian or English), saved only in your browser so the site remembers it next time. It is not sent to anyone;',
        },
        {
          it: 'i dati tecnici di navigazione (come l’indirizzo IP) che il servizio di hosting registra per motivi di sicurezza e funzionamento.',
          en: 'technical browsing data (such as your IP address) that the hosting service records for security and operation.',
        },
      ],
    },
    {
      heading: { it: 'Perché li trattiamo e su quale base', en: 'Why we process it, and on what legal basis' },
      paragraphs: [],
      items: [
        {
          it: 'Gestire prenotazioni e ordini da asporto che ci richiedi: esecuzione di misure precontrattuali e del contratto (art. 6.1.b GDPR).',
          en: 'Handling the bookings and takeaway orders you request: steps prior to and performance of a contract (Art. 6(1)(b) GDPR).',
        },
        {
          it: 'Preparare piatti adatti alle tue allergie: tuo consenso esplicito (art. 9.2.a GDPR), che puoi revocare in qualsiasi momento.',
          en: 'Preparing food that suits your allergies: your explicit consent (Art. 9(2)(a) GDPR), which you can withdraw at any time.',
        },
        {
          it: 'Rispettare obblighi di legge, ad esempio fiscali: obbligo legale (art. 6.1.c GDPR).',
          en: 'Meeting legal obligations, for example tax rules: legal obligation (Art. 6(1)(c) GDPR).',
        },
        {
          it: 'Far funzionare il sito in sicurezza: nostro legittimo interesse (art. 6.1.f GDPR).',
          en: 'Running the site securely: our legitimate interest (Art. 6(1)(f) GDPR).',
        },
      ],
    },
    {
      heading: { it: 'Servizi di terze parti', en: 'Third-party services' },
      paragraphs: [
        {
          it: 'Alcuni servizi esterni trattano dati come titolari autonomi, secondo le proprie informative:',
          en: 'Some external services process data as independent controllers, under their own privacy policies:',
        },
      ],
      items: [
        {
          it: 'WhatsApp (WhatsApp Ireland Ltd., gruppo Meta): i messaggi di prenotazione e ordine passano da WhatsApp quando li invii.',
          en: 'WhatsApp (WhatsApp Ireland Ltd., Meta group): booking and order messages travel through WhatsApp when you send them.',
        },
        {
          it: 'Google Maps (Google Ireland Ltd.): la mappa si carica solo se premi “Mostra la mappa”; da quel momento Google può impostare cookie e ricevere il tuo indirizzo IP.',
          en: 'Google Maps (Google Ireland Ltd.): the map loads only if you press “Show the map”; from then on Google may set cookies and receive your IP address.',
        },
        {
          it: 'GitHub Pages (GitHub Inc.): ospita il sito e registra dati tecnici come l’indirizzo IP.',
          en: 'GitHub Pages (GitHub Inc.): hosts the site and records technical data such as your IP address.',
        },
        {
          it: 'Instagram e Facebook (Meta): solo se apri i nostri profili dai link del sito.',
          en: 'Instagram and Facebook (Meta): only if you open our profiles from the links on the site.',
        },
      ],
    },
    {
      heading: { it: 'Trasferimenti fuori dall’UE', en: 'Transfers outside the EU' },
      paragraphs: [
        {
          it: 'Meta, Google e GitHub possono trattare dati negli Stati Uniti. Questi trasferimenti avvengono sulla base dell’EU-U.S. Data Privacy Framework o delle clausole contrattuali standard approvate dalla Commissione europea.',
          en: 'Meta, Google and GitHub may process data in the United States. These transfers rely on the EU-U.S. Data Privacy Framework or on standard contractual clauses approved by the European Commission.',
        },
      ],
    },
    {
      heading: { it: 'Per quanto tempo conserviamo i dati', en: 'How long we keep data' },
      paragraphs: [
        {
          it: 'Conserviamo i messaggi di prenotazione e ordine solo per il tempo necessario a gestirli, poi li cancelliamo, salvo che la legge ci imponga di conservare alcuni dati più a lungo (ad esempio per obblighi fiscali). Le informazioni sulle allergie vengono cancellate dopo la tua visita o il ritiro dell’ordine.',
          en: 'We keep booking and order messages only as long as we need to handle them, then delete them, unless the law requires us to keep some data longer (for example for tax purposes). Allergy details are deleted after your visit or pickup.',
        },
      ],
    },
    {
      heading: { it: 'I tuoi diritti', en: 'Your rights' },
      paragraphs: [
        {
          it: `Puoi chiederci in qualsiasi momento di accedere ai tuoi dati, correggerli, cancellarli, limitarne il trattamento, opporti al trattamento, riceverli in un formato portabile e revocare il consenso (artt. 15-22 GDPR). Scrivici o chiamaci: ${CONTACTS}.`,
          en: `You can ask us at any time to access, correct or delete your data, restrict or object to its processing, receive it in a portable format, and withdraw your consent (Arts. 15-22 GDPR). Message or call us: ${CONTACTS_EN}.`,
        },
        {
          it: 'Hai anche il diritto di presentare reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).',
          en: 'You also have the right to lodge a complaint with the Italian data protection authority, the Garante per la protezione dei dati personali (www.garanteprivacy.it).',
        },
      ],
    },
    {
      heading: { it: 'Modifiche a questa informativa', en: 'Changes to this policy' },
      paragraphs: [
        {
          it: 'Se cambiamo il modo in cui trattiamo i dati, aggiorneremo questa pagina e la data di ultimo aggiornamento.',
          en: 'If we change how we process data, we will update this page and its last-updated date.',
        },
      ],
    },
  ],
}

export const TERMS_OF_SERVICE: LegalDocument = {
  title: { it: 'Termini di servizio', en: 'Terms of Service' },
  intro: {
    it: `Questi termini regolano l’uso di questo sito e le richieste di prenotazione e di asporto inviate a ${RESTAURANT_CONFIG.name}. Usando il sito li accetti.`,
    en: `These terms govern your use of this site and the booking and takeaway requests you send to ${RESTAURANT_CONFIG.name}. By using the site you accept them.`,
  },
  sections: [
    {
      heading: { it: 'Chi siamo', en: 'Who we are' },
      paragraphs: [
        {
          it: `Il sito è gestito da ${CONTROLLER}${RUNS_RESTAURANT}. Contatti: ${CONTACTS}.`,
          en: `The site is run by ${CONTROLLER_EN}${RUNS_RESTAURANT_EN}. Contact: ${CONTACTS_EN}.`,
        },
      ],
    },
    {
      heading: { it: 'Prenotazioni', en: 'Table bookings' },
      paragraphs: [
        {
          it: 'Il modulo di prenotazione prepara un messaggio WhatsApp con la tua richiesta. La prenotazione è confermata solo quando ti rispondiamo con la conferma. Per le serate speciali i posti sono limitati e confermati in ordine di arrivo delle richieste.',
          en: 'The booking form prepares a WhatsApp message with your request. A booking is confirmed only when we reply to confirm it. For special nights, places are limited and confirmed in the order requests arrive.',
        },
        {
          it: 'Se non puoi più venire, avvisaci il prima possibile su WhatsApp o per telefono, così possiamo liberare il tavolo.',
          en: 'If you can no longer come, please let us know as soon as possible on WhatsApp or by phone so we can free the table.',
        },
      ],
    },
    {
      heading: { it: 'Ordini da asporto', en: 'Takeaway orders' },
      paragraphs: [
        {
          it: 'Anche l’ordine da asporto è una richiesta: lo prepariamo dopo averti confermato su WhatsApp l’orario di ritiro. Il pagamento avviene al ritiro, presso il ristorante. Il totale mostrato sul sito è una stima: fa fede il prezzo in vigore al momento del ritiro.',
          en: 'A takeaway order is also a request: we prepare it once we have confirmed the pickup time on WhatsApp. You pay when you collect it at the restaurant. The total shown on the site is an estimate; the price in force at pickup applies.',
        },
      ],
    },
    {
      heading: { it: 'Menu, prezzi e foto', en: 'Menu, prices and photos' },
      paragraphs: [
        {
          it: 'I prezzi sono in euro e includono l’IVA. Piatti, prezzi e disponibilità possono cambiare senza preavviso. Le foto servono a illustrare i piatti e possono differire da quanto servito.',
          en: 'Prices are in euros and include VAT. Dishes, prices and availability may change without notice. Photos illustrate the dishes and may differ from what is served.',
        },
      ],
    },
    {
      heading: { it: 'Allergeni', en: 'Allergens' },
      paragraphs: [
        {
          it: 'Le informazioni sugli allergeni presenti nei nostri piatti sono disponibili su richiesta, come previsto dal Regolamento (UE) 1169/2011. Segnalaci sempre allergie o intolleranze prima di ordinare: in una cucina condivisa non possiamo escludere la presenza di tracce di allergeni.',
          en: 'Information about the allergens in our dishes is available on request, as required by Regulation (EU) 1169/2011. Always tell us about allergies or intolerances before ordering: in a shared kitchen we cannot rule out traces of allergens.',
        },
      ],
    },
    {
      heading: { it: 'Eventi', en: 'Events' },
      paragraphs: [
        {
          it: 'Programma, orari e ospiti delle serate possono cambiare. In caso di cambiamenti importanti avviseremo chi ha prenotato.',
          en: 'Event programmes, times and guests may change. If something important changes, we will let those who booked know.',
        },
      ],
    },
    {
      heading: { it: 'Contenuti del sito', en: 'Site content' },
      paragraphs: [
        {
          it: `Logo, foto e testi del sito appartengono a ${RESTAURANT_CONFIG.name} o ai rispettivi autori. Non possono essere copiati o riutilizzati senza il nostro permesso.`,
          en: `The logo, photos and text on this site belong to ${RESTAURANT_CONFIG.name} or their respective authors. They may not be copied or reused without our permission.`,
        },
      ],
    },
    {
      heading: { it: 'Responsabilità', en: 'Liability' },
      paragraphs: [
        {
          it: 'Facciamo il possibile perché le informazioni sul sito siano corrette e aggiornate, ma non possiamo garantire che il sito sia sempre disponibile o privo di errori. Non siamo responsabili dei contenuti dei siti esterni a cui rimandano i link. Restano salvi i diritti che la legge riconosce ai consumatori.',
          en: 'We do our best to keep the information on this site correct and up to date, but we cannot guarantee that the site is always available or error-free. We are not responsible for the content of external sites we link to. This does not affect your statutory rights as a consumer.',
        },
      ],
    },
    {
      heading: { it: 'Legge applicabile', en: 'Governing law' },
      paragraphs: [
        {
          it: 'Questi termini sono regolati dalla legge italiana. Se sei un consumatore, per eventuali controversie è competente il foro del tuo luogo di residenza o domicilio.',
          en: 'These terms are governed by Italian law. If you are a consumer, any dispute falls under the courts of the place where you live.',
        },
      ],
    },
  ],
}
