import { link } from '../routes.mjs';
import { ui } from '../content/ui.mjs';
import { generalServices } from '../content/general.mjs';
import { html, icon, animWords, todo } from '../lib/html.mjs';
import { breadcrumbs, abs } from '../lib/layout.mjs';
import { sectionHead, arrowBtn, faqBlock, faqSchema, finalCta, processSteps } from '../lib/components.mjs';

const svcLabel = { fr: 'Services', en: 'Services' };

export const servicesHub = (lang) => {
  const fr = lang === 'fr';
  const t = ui[lang];
  const crumbs = [{ id: 'services', label: svcLabel[lang] }];
  return {
    id: 'services', lang,
    title: fr ? 'Agence web et marketing à Montréal | Marketing Websites' : 'Web & Marketing Agency in Montreal | Marketing Websites',
    description: fr ? 'Agence web et marketing à Montréal depuis 2015 : conception de sites web, SEO, Google Ads, médias sociaux, commerce électronique et développement sur mesure pour PME.' : 'Montreal web and marketing agency since 2015: web design, SEO, Google Ads, social media, ecommerce and custom development for SMEs.',
    breadcrumbs: crumbs,
    body: html`
    <section class="page-hero">
      <div class="container narrow">
        ${breadcrumbs({ lang, id: 'services', breadcrumbs: crumbs })}
        <p class="eyebrow">${fr ? 'Agence web et marketing · Montréal' : 'Web & marketing agency · Montreal'}</p>
        <h1 class="h-anim">${animWords(fr ? 'Sites web, SEO et publicité pour les <em>PME</em> d’ici' : 'Websites, SEO and advertising for local <em>SMEs</em>')}</h1>
        <p class="lead">${fr ? 'Depuis 2015, nous construisons des sites bilingues qui génèrent des demandes — et nous mesurons ce qu’ils rapportent.' : 'Since 2015, we’ve built bilingual sites that generate inquiries — and we measure what they bring in.'}</p>
        <div class="btn-row">${arrowBtn(link('quote', lang), t.cta.quote, { cls: 'btn--lg', cta: 'quote' })}<a class="btn btn--ghost btn--lg" href="${link('work', lang)}">${t.cta.work}</a></div>
      </div>
    </section>
    <section class="section-tight">
      <div class="container bento bento--svc">
        ${generalServices.map((s, i) => html`
          <a class="card card--link bento__item reveal" data-delay="${(i % 3) + 1}" href="${link(s.id, lang)}">
            <span class="situation__icon">${icon(s.icon)}</span>
            <h2 class="h3">${s[lang].nav}</h2>
            <p>${s[lang].promise}</p>
            <span class="card__more">${t.cta.learn} ${icon('arrow')}</span>
          </a>`)}
      </div>
    </section>
    <section class="section-tight">
      <div class="container also reveal">
        <p>${fr ? 'Vous êtes courtier immobilier?' : 'Are you a real estate broker?'} <a class="link" href="${link('re', lang)}">${fr ? 'Découvrez notre système marketing immobilier' : 'Discover our real estate marketing system'} ${icon('arrow')}</a></p>
      </div>
    </section>
    <section class="section section--sand" aria-labelledby="process-h">
      <div class="container process-wrap">
        ${sectionHead({ eyebrow: fr ? 'Processus' : 'Process', title: fr ? 'Comment nous travaillons' : 'How we work', id: 'process-h' })}
        ${processSteps(lang, fr ? [['Découverte', 'Vos objectifs, vos clients, vos concurrents.'], ['Stratégie', 'Pages, mots-clés, campagnes et indicateurs.'], ['Réalisation', 'Design, rédaction FR/EN, développement.'], ['Lancement', 'Tests, redirections, mise en ligne.'], ['Amélioration', 'Rapport mensuel et optimisation.']] : [['Discovery', 'Your goals, customers and competitors.'], ['Strategy', 'Pages, keywords, campaigns and KPIs.'], ['Build', 'Design, FR/EN copy, development.'], ['Launch', 'Testing, redirects, go-live.'], ['Improve', 'Monthly reporting and optimization.']])}
      </div>
    </section>
    ${finalCta(lang, { type: 'quote', title: fr ? 'Parlez-nous de votre projet' : 'Tell us about your project', lead: fr ? 'Nous vous répondons en un jour ouvrable avec une approche et une fourchette de prix.' : 'We reply within one business day with an approach and a price range.' })}`,
  };
};

export const generalServicePage = (s, lang) => {
  const c = s[lang];
  const fr = lang === 'fr';
  const t = ui[lang];
  const crumbs = [{ id: 'services', label: svcLabel[lang] }, { id: s.id, label: c.nav }];
  const others = generalServices.filter((x) => x.id !== s.id).slice(0, 3);
  return {
    id: s.id, lang, title: c.title, description: c.description, breadcrumbs: crumbs,
    stickyCta: { id: 'quote', label: fr ? 'Soumission' : 'Quote', cta: 'quote' },
    schema: [
      { '@context': 'https://schema.org', '@type': 'Service', name: c.h1, description: c.description, serviceType: c.nav, provider: { '@id': abs('/#organization') }, areaServed: { '@type': 'AdministrativeArea', name: 'Québec' }, url: abs(link(s.id, lang)) },
      faqSchema(c.faq),
    ],
    body: html`
    <section class="page-hero">
      <div class="container narrow">
        ${breadcrumbs({ lang, id: s.id, breadcrumbs: crumbs })}
        <p class="eyebrow">${c.nav}</p>
        <h1 class="h-anim">${animWords(c.h1)}</h1>
        <p class="lead">${c.promise}</p>
        <div class="btn-row">${arrowBtn('#consultation', t.cta.quote, { cls: 'btn--lg', cta: 'quote' })}<a class="btn btn--ghost btn--lg" href="${link('work', lang)}">${t.cta.work}</a></div>
      </div>
    </section>
    <section class="section section--sand" aria-labelledby="inc-h">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'Ce qui est inclus' : 'What’s included', title: fr ? 'Ce que vous obtenez' : 'What you get', id: 'inc-h' })}
        <ul class="included">${c.included.map(([h, p], i) => html`<li class="included__item reveal" data-delay="${(i % 4) + 1}">${icon('check')}<div><h3>${h}</h3><p>${p}</p></div></li>`)}</ul>
      </div>
    </section>
    <section class="section-tight">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'Preuve' : 'Proof', title: fr ? 'Projets dans d’autres industries' : 'Projects in other industries' })}
        <div class="mini-case card reveal"><span class="badge">${fr ? 'Étude de cas' : 'Case study'}</span><p>${todo(fr ? 'Étude de cas hors immobilier pour ce service (client, résultat vérifié)' : 'Non-real-estate case study for this service (client, verified result)', { block: true })}</p></div>
      </div>
    </section>
    <section class="section" aria-labelledby="faq-h">
      <div class="container faq-wrap">
        ${sectionHead({ eyebrow: 'FAQ', title: fr ? 'Questions fréquentes' : 'Frequently asked questions', id: 'faq-h' })}
        ${faqBlock(lang, c.faq)}
      </div>
    </section>
    <section class="section-tight section--sand">
      <div class="container">
        <h2 class="h4 reveal">${fr ? 'Autres services' : 'Other services'}</h2>
        <ul class="chips chips--links reveal">${others.map((o) => html`<li><a class="tag tag--btn" href="${link(o.id, lang)}">${o[lang].nav}</a></li>`)}</ul>
        <p class="also reveal">${fr ? 'Aussi :' : 'Also:'} <a class="link" href="${link('re', lang)}">${fr ? 'marketing pour courtiers immobiliers' : 'marketing for real estate brokers'}</a></p>
      </div>
    </section>
    ${finalCta(lang, { type: 'quote', title: fr ? 'Obtenez une soumission' : 'Get a quote', lead: fr ? 'Décrivez votre projet en deux minutes; nous vous répondons en un jour ouvrable.' : 'Describe your project in two minutes; we reply within one business day.' })}`,
  };
};
