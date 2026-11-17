import { link } from '../routes.mjs';
import { ui } from '../content/ui.mjs';
import { html, icon, animWords } from '../lib/html.mjs';
import { organizationSchema } from '../lib/layout.mjs';
import {
  heroMock, proofStrip, logoStrip, systemSection, situations, featuredCase, portfolioGrid, utilmoSpotlight,
  otherIndustries, processSteps, testimonials, latestResources, finalCta, sectionHead, arrowBtn,
} from '../lib/components.mjs';

const copy = {
  fr: {
    title: 'Marketing immobilier et sites web pour courtiers au Québec | Marketing Websites',
    description: 'Sites web bilingues avec intégration Centris, publicité et CRM Utilmo pour courtiers et agences immobilières du Québec. Agence montréalaise depuis 2015.',
    eyebrow: 'Marketing immobilier · Québec',
    h1: 'Le marketing qui fait grandir les <em>courtiers immobiliers</em> du Québec',
    sub: 'Site web bilingue relié à Centris, publicité Google et Meta, et CRM Utilmo pour suivre chaque prospect — un seul partenaire depuis 2015.',
  },
  en: {
    title: 'Real Estate Marketing & Broker Websites in Quebec | Marketing Websites',
    description: 'Bilingual websites with Centris integration, advertising and the Utilmo CRM for Quebec real estate brokers and agencies. Montreal agency since 2015.',
    eyebrow: 'Real estate marketing · Quebec',
    h1: 'Marketing that grows Quebec’s <em>real estate brokers</em>',
    sub: 'A bilingual website connected to Centris, Google and Meta ads, and the Utilmo CRM to follow every lead — one partner since 2015.',
  },
};

export const home = (lang) => {
  const c = copy[lang];
  const t = ui[lang];
  const fr = lang === 'fr';
  return {
    id: 'home', lang, title: c.title, description: c.description,
    schema: [organizationSchema(), { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Marketing Websites', url: 'https://marketingwebsites.ca/', inLanguage: `${lang}-CA` }],
    bodyClass: 'page-home',
    body: html`
    <section class="hero" aria-labelledby="hero-h">
      <div class="hero__glow" aria-hidden="true"></div>
      <div class="container hero__in">
        <div class="hero__copy">
          <p class="eyebrow">${c.eyebrow}</p>
          <h1 id="hero-h" class="h-anim">${animWords(c.h1)}</h1>
          <p class="lead hero__sub">${c.sub}</p>
          <div class="btn-row">
            ${arrowBtn('#consultation', t.cta.consult, { cls: 'btn--lg', cta: 'consultation' })}
            <a class="btn btn--ghost btn--lg" href="${link('work', lang)}">${t.cta.work}</a>
          </div>
          <p class="hero__alt"><a href="${link('services', lang)}">${t.notRe} ${icon('arrow')}</a></p>
        </div>
        <div class="hero__visual">${heroMock(lang)}</div>
      </div>
    </section>

    ${logoStrip(lang)}
    ${proofStrip(lang)}
    ${systemSection(lang)}
    ${situations(lang)}
    ${featuredCase(lang)}

    <section class="section" aria-labelledby="work-h">
      <div class="container">
        <div class="split-head">
          ${sectionHead({ eyebrow: fr ? 'Réalisations' : 'Our work', title: fr ? 'Des sites de courtiers qui travaillent' : 'Broker sites that do the work', id: 'work-h' })}
          <a class="link reveal" href="${link('work', lang)}">${fr ? 'Toutes les réalisations' : 'All projects'} ${icon('arrow')}</a>
        </div>
        ${portfolioGrid(lang, { limit: 6, realEstateOnly: true })}
      </div>
    </section>

    ${utilmoSpotlight(lang)}
    ${otherIndustries(lang)}

    <section class="section" aria-labelledby="process-h">
      <div class="container process-wrap">
        ${sectionHead({ eyebrow: fr ? 'Comment ça marche' : 'How it works', title: fr ? 'De la consultation à la croissance' : 'From consultation to growth', lead: fr ? 'Un processus clair, un interlocuteur, et un site en ligne en environ six semaines.' : 'A clear process, one point of contact, and a site live in about six weeks.', id: 'process-h' })}
        ${processSteps(lang)}
      </div>
    </section>

    <section class="section section--sand" aria-labelledby="quotes-h">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'Témoignages' : 'Testimonials', title: fr ? 'Ce que disent les courtiers' : 'What brokers say', id: 'quotes-h', center: true })}
        ${testimonials(lang, 3, { skip: ['melissa'] })}
      </div>
    </section>

    <section class="section" aria-labelledby="res-h">
      <div class="container">
        <div class="split-head">
          ${sectionHead({ eyebrow: fr ? 'Ressources' : 'Resources', title: fr ? 'Conseils concrets pour courtiers' : 'Practical advice for brokers', id: 'res-h' })}
          <a class="link reveal" href="${link('resources', lang)}">${fr ? 'Toutes les ressources' : 'All resources'} ${icon('arrow')}</a>
        </div>
        ${latestResources(lang)}
      </div>
    </section>

    ${finalCta(lang)}`,
  };
};
