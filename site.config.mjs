// ─────────────────────────────────────────────────────────────────────────────
// Site configuration — edit this file first.
//
// Anything left as '' or null is either hidden on the site (phone, address…)
// or rendered as a visible "À compléter" placeholder (proof numbers).
// `npm run check:launch` fails while placeholders remain.
// ─────────────────────────────────────────────────────────────────────────────

export default {
  siteUrl: 'https://marketingwebsites.ca',
  name: 'Marketing Websites',
  legalName: 'Marketing Websites Inc.',
  foundingYear: 2015,

  // NAP — must match the Google Business Profile exactly.
  phone: '',            // e.g. '+1 514 000-0000'  (empty = phone buttons hidden)
  email: '',            // e.g. 'info@marketingwebsites.ca' (empty = hidden)
  address: {
    street: '',         // e.g. '1234 rue Exemple, bureau 200'
    city: 'Montréal',
    region: 'QC',
    postalCode: '',
    country: 'CA',
  },
  googleReviewsUrl: '', // link to the Google Business Profile reviews
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
  },

  // Utilmo form endpoint. Every form POSTs here (multipart form data) with
  // form_type, page_url, language, utm_* and referrer fields.
  // Empty = demo mode: the form validates and redirects to the thank-you page.
  formEndpoint: '',

  // Calendar booking links (Utilmo, Calendly, Google Calendar appointment…).
  // Shown on the thank-you page and as a direct "book" option.
  calendar: {
    consultation: '',
    demo: '',
  },

  analytics: {
    ga4: '', // 'G-XXXXXXX' — only loaded after the visitor accepts cookies (Law 25)
  },

  // Proof strip. null = shown as a placeholder until verified.
  // Only publish numbers you can back up (see strategy §6).
  proof: {
    brokerSites: null,   // number of broker sites launched, e.g. 350
    googleRating: null,  // e.g. 4.9
    googleReviewCount: null,
  },

  // Package pricing ("à partir de"). null = "Sur soumission".
  pricing: {
    presence: null,      // e.g. 2500
    croissance: null,
    systeme: null,
  },

  // Offers that are not yet confirmed (strategy §5). false = labelled
  // "Bientôt / Coming soon" and no page is generated.
  offers: {
    shortVideo: false,
  },
};
