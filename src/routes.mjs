// Every page has a French path (default language) and an English twin.
// Final slugs depend on the URL audit (strategy §10): where an existing URL
// already ranks, change the path here and add a redirect in migration/redirects.csv.

export const routes = {
  home:        { fr: '/',                                  en: '/en/' },

  // Real estate hub
  re:          { fr: '/immobilier/',                       en: '/en/real-estate/' },
  're-websites': { fr: '/immobilier/site-web-courtier/',   en: '/en/real-estate/broker-websites/' },
  're-centris':  { fr: '/immobilier/integration-centris/', en: '/en/real-estate/centris-integration/' },
  're-teams':    { fr: '/immobilier/sites-equipes-agences/', en: '/en/real-estate/team-agency-websites/' },
  're-ads':      { fr: '/immobilier/publicite-google-meta/', en: '/en/real-estate/google-meta-ads/' },
  're-seo':      { fr: '/immobilier/seo-local-courtier/',  en: '/en/real-estate/local-seo/' },
  're-landing':  { fr: '/immobilier/pages-atterrissage/',  en: '/en/real-estate/landing-pages/' },
  're-utilmo':   { fr: '/immobilier/crm-utilmo/',          en: '/en/real-estate/utilmo-crm/' },
  're-packages': { fr: '/immobilier/forfaits/',            en: '/en/real-estate/packages/' },

  // General services hub
  services:    { fr: '/services/',                         en: '/en/services/' },
  'svc-web':   { fr: '/services/conception-site-web/',     en: '/en/services/web-design/' },
  'svc-seo':   { fr: '/services/referencement-seo/',       en: '/en/services/seo/' },
  'svc-ads':   { fr: '/services/google-ads/',              en: '/en/services/google-ads/' },
  'svc-social':{ fr: '/services/medias-sociaux/',          en: '/en/services/social-media/' },
  'svc-ecom':  { fr: '/services/commerce-electronique/',   en: '/en/services/ecommerce/' },
  'svc-dev':   { fr: '/services/developpement-sur-mesure/', en: '/en/services/custom-development/' },

  work:        { fr: '/realisations/',                     en: '/en/work/' },
  resources:   { fr: '/ressources/',                       en: '/en/resources/' },
  'art-pages':    { fr: '/ressources/pages-essentielles-site-courtier/', en: '/en/resources/essential-broker-website-pages/' },
  'art-response': { fr: '/ressources/delai-de-reponse-prospects/',     en: '/en/resources/lead-response-time/' },
  'art-budget':   { fr: '/ressources/budget-publicite-courtier/',      en: '/en/resources/broker-ad-budget/' },

  about:       { fr: '/a-propos/',                         en: '/en/about/' },
  contact:     { fr: '/contact/',                          en: '/en/contact/' },
  quote:       { fr: '/soumission/',                       en: '/en/quote/' },
  demo:        { fr: '/demo-utilmo/',                      en: '/en/utilmo-demo/' },
  thanks:      { fr: '/merci/',                            en: '/en/thank-you/' },
  privacy:     { fr: '/confidentialite/',                  en: '/en/privacy/' },
};

export const link = (id, lang) => {
  const r = routes[id];
  if (!r) throw new Error(`Unknown route id: ${id}`);
  return r[lang];
};
