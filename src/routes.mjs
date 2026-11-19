// URL map. Every page has an English and a French twin.
//
// SEO: these paths are the ones already indexed on marketingwebsites.ca
// (English at the root, French under /fr/). Keep them: changing a path loses
// its rankings unless a 301 is added to migration/redirects.csv.
// Pages marked "new" did not exist on the old site.

export const routes = {
  home:          { en: '/',                                   fr: '/fr/' },

  // Services
  services:      { en: '/services/',                          fr: '/fr/services/' },                              // new hub
  'svc-web':     { en: '/web-design/',                        fr: '/fr/conception-web/' },
  'svc-ecom':    { en: '/e-commerce/',                        fr: '/fr/e-commerce/' },
  'svc-app':     { en: '/app-development/',                   fr: '/fr/developpement-dapplications-web/' },
  'svc-seo':     { en: '/seo/',                               fr: '/fr/referencement-naturel/' },
  'svc-ads':     { en: '/google-ads-management/',             fr: '/fr/gestion-de-google-ads/' },
  'svc-social':  { en: '/social-media-marketing/',            fr: '/fr/gestion-des-medias-sociaux/' },
  'svc-analytics': { en: '/website-analytics/',               fr: '/fr/analyse-de-site-web/' },
  'svc-crm':     { en: '/utilmo-crm/',                        fr: '/fr/crm-utilmo/' },                            // new

  // Industries
  industries:    { en: '/industries/',                        fr: '/fr/industries/' },                            // new hub
  'ind-realestate': { en: '/real-estate-website-design/',     fr: '/fr/site-web-pour-courtier-immobilier/' },
  'ind-restaurant': { en: '/restaurant-website-design/',      fr: '/fr/site-web-pour-restaurant/' },
  'ind-health':  { en: '/clinic-website-design/',             fr: '/fr/site-web-pour-clinique/' },                // new
  'ind-construction': { en: '/construction-website-design/',  fr: '/fr/site-web-pour-entrepreneur/' },            // new
  'ind-pro':     { en: '/professional-services-website-design/', fr: '/fr/site-web-services-professionnels/' },  // new

  // Company
  work:          { en: '/portfolio/',                         fr: '/fr/portfolio/' },
  about:         { en: '/about-us/',                          fr: '/fr/a-propos/' },
  blog:          { en: '/blog/',                              fr: '/fr/blogue/' },
  'art-pages':   { en: '/blog/essential-broker-website-pages/', fr: '/fr/blogue/pages-essentielles-site-courtier/' },  // new
  'art-response': { en: '/blog/lead-response-time/',          fr: '/fr/blogue/delai-de-reponse-prospects/' },          // new
  'art-budget':  { en: '/blog/ad-budget/',                    fr: '/fr/blogue/budget-publicitaire/' },                 // new

  // Conversion
  contact:       { en: '/contact/',                           fr: '/fr/contactez-nous/' },
  quote:         { en: '/quote/',                             fr: '/fr/soumission/' },                            // new
  demo:          { en: '/utilmo-demo/',                       fr: '/fr/demo-utilmo/' },                           // new
  thanks:        { en: '/thank-you/',                         fr: '/fr/merci/' },
  privacy:       { en: '/privacy-policy/',                    fr: '/fr/politique-de-confidentialite/' },
};

export const link = (id, lang) => {
  const r = routes[id];
  if (!r) throw new Error(`Unknown route id: ${id}`);
  return r[lang];
};
