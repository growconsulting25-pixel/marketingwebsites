// Portfolio (strategy §6: 12–20 real broker/team/agency sites).
// These entries are PLACEHOLDERS: replace each with a real client (written
// permission), a screenshot in /src/assets/img/work/ (desktop + mobile, WebP/AVIF),
// the live URL and ONE verified metric. Leave `metric` empty if none is verified.
//
// type: 'courtier' | 'equipe' | 'agence' | 'autre'

export const portfolio = [
  { slug: 'exemple-courtier-1', type: 'courtier', region: 'Montréal', name: 'Courtier résidentiel', palette: 1, placeholder: true, url: '', image: '', metric: null },
  { slug: 'exemple-equipe-1', type: 'equipe', region: 'Laval', name: 'Équipe de courtiers', palette: 2, placeholder: true, url: '', image: '', metric: null },
  { slug: 'exemple-agence-1', type: 'agence', region: 'Rive-Sud', name: 'Agence immobilière', palette: 3, placeholder: true, url: '', image: '', metric: null },
  { slug: 'exemple-courtier-2', type: 'courtier', region: 'Québec', name: 'Courtier de prestige', palette: 4, placeholder: true, url: '', image: '', metric: null },
  { slug: 'exemple-equipe-2', type: 'equipe', region: 'Laurentides', name: 'Équipe familiale', palette: 5, placeholder: true, url: '', image: '', metric: null },
  { slug: 'exemple-pme-1', type: 'autre', region: 'Montréal', name: 'PME — services', palette: 6, placeholder: true, url: '', image: '', metric: null },
];

export const portfolioTypes = {
  fr: { all: 'Tous', courtier: 'Courtiers', equipe: 'Équipes', agence: 'Agences', autre: 'Autres entreprises' },
  en: { all: 'All', courtier: 'Brokers', equipe: 'Teams', agence: 'Agencies', autre: 'Other businesses' },
};
