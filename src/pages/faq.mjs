// One FAQ page for the whole site (questions moved off the long service,
// industry and home pages). Keeps the FAQPage rich-result markup.
import { link } from '../routes.mjs';
import { services } from '../content/services.mjs';
import { industries } from '../content/industries.mjs';
import { html, icon } from '../lib/html.mjs';
import { faqBlock, faqSchema, finalCta } from '../lib/components.mjs';
import { copy as homeCopy } from './home.mjs';
import { simpleHero } from './misc.mjs';

export const faqPage = (lang) => {
  const fr = lang === 'fr';
  const groups = [
    { key: 'general', title: fr ? 'Général' : 'General', faq: homeCopy[lang].faq },
    ...services.map((s) => ({ key: s.id, title: s[lang].nav, faq: s[lang].faq || [], href: link(s.id, lang) })),
    ...industries.map((d) => ({ key: d.id, title: d[lang].nav, faq: d[lang].faq || [], href: link(d.id, lang) })),
  ].filter((g) => g.faq.length);
  const all = groups.flatMap((g) => g.faq);
  const crumbs = [{ id: 'faq', label: fr ? 'Questions fréquentes' : 'FAQ' }];
  return {
    id: 'faq', lang, breadcrumbs: crumbs,
    title: fr ? 'Questions fréquentes | Agence Marketing Web | Marketing Websites' : 'FAQ | Web Design & Online Marketing | Marketing Websites',
    description: fr ? 'Réponses aux questions fréquentes sur la conception web, le SEO, Google Ads, les médias sociaux, le e-commerce et le CRM Utilmo.' : 'Answers to common questions about web design, SEO, Google Ads, social media, e-commerce and the Utilmo CRM.',
    schema: [faqSchema(all)],
    body: html`
    ${simpleHero(lang, 'faq', crumbs, fr ? 'FAQ' : 'FAQ', fr ? 'Questions fréquentes' : 'Frequently asked questions', fr ? 'Tout ce que nos clients nous demandent avant de commencer, par service et par industrie.' : 'Everything our clients ask before getting started, by service and by industry.')}
    <section class="section faqp">
      <div class="container faqp__in">
        <nav class="faqp__nav" aria-label="${fr ? 'Catégories' : 'Categories'}">
          <ul>${groups.map((g) => html`<li><a href="#q-${g.key}">${g.title}</a></li>`)}</ul>
        </nav>
        <div class="faqp__groups">
          ${groups.map((g) => html`
          <div class="faqp__group" id="q-${g.key}">
            <div class="faqp__h"><h2>${g.title}</h2>${g.href ? html`<a class="link" href="${g.href}">${fr ? 'Voir le service' : 'View page'} ${icon('arrow')}</a>` : ''}</div>
            ${faqBlock(lang, g.faq, { id: `faq-${g.key}` })}
          </div>`)}
        </div>
      </div>
    </section>
    ${finalCta(lang, { type: 'quote', title: fr ? html`Une autre question? <em>Parlons-en</em>` : html`Another question? <em>Let’s talk</em>` })}`,
  };
};
