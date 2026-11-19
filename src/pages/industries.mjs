import { link } from '../routes.mjs';
import { ui } from '../content/ui.mjs';
import { industries } from '../content/industries.mjs';
import { getService } from '../content/services.mjs';
import { html, icon } from '../lib/html.mjs';
import { breadcrumbs, abs } from '../lib/layout.mjs';
import { sectionHead, arrowBtn, faqBlock, faqSchema, finalCta, heroMock } from '../lib/components.mjs';
import { portfolioCarousel, testimonialsMarquee, servicesBento } from '../lib/sections.mjs';
import { photoScene } from './services.mjs';

const label = { fr: 'Industries', en: 'Industries' };

export const industriesHub = (lang) => {
  const fr = lang === 'fr';
  const t = ui[lang];
  const crumbs = [{ id: 'industries', label: label[lang] }];
  return {
    id: 'industries', lang, breadcrumbs: crumbs,
    title: fr ? 'Marketing numérique par industrie | Marketing Websites' : 'Digital Marketing by Industry | Marketing Websites',
    description: fr ? 'Sites web, SEO et publicité adaptés à votre industrie : immobilier, restaurants, cliniques, construction et services professionnels. Agence de Montréal depuis 2015.' : 'Websites, SEO and advertising adapted to your industry: real estate, restaurants, clinics, construction and professional services. Montreal agency since 2015.',
    body: html`
    <section class="page-hero page-hero--v4">
      <div class="mesh" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="container narrow">
        ${breadcrumbs({ lang, id: 'industries', breadcrumbs: crumbs })}
        <p class="eyebrow">${fr ? 'Industries' : 'Industries'}</p>
        <h1>${fr ? html`Une expertise <em>pour votre industrie</em>` : html`Expertise <em>for your industry</em>`}</h1>
        <p class="lead">${fr ? 'Chaque secteur a ses règles, ses saisons et sa façon d’acheter. Nous adaptons nos services à la vôtre.' : 'Every sector has its own rules, seasons and buying habits. We adapt our services to yours.'}</p>
        <div class="btn-row">${arrowBtn(link('quote', lang), t.cta.quote, { cls: 'btn--lg', cta: 'quote' })}</div>
      </div>
    </section>
    <section class="section">
      <div class="container ind-grid">
        ${industries.map((d, i) => html`
          <a class="ind-tile reveal" data-delay="${(i % 3) + 1}" href="${link(d.id, lang)}" data-tilt-card>
            <img src="/assets/img/${d.photo}.webp" srcset="/assets/img/${d.photo}-560.webp 560w, /assets/img/${d.photo}.webp 900w" sizes="(min-width: 1024px) 400px, 100vw" alt="" width="900" height="600" loading="lazy">
            <span class="ind-tile__body"><span class="ind-card__ic">${icon(d.icon)}</span><h2 class="h3">${d[lang].nav}</h2><p>${d[lang].short}</p><span class="ind-card__more">${fr ? 'Découvrir' : 'Explore'} ${icon('arrow')}</span></span>
          </a>`)}
        <a class="ind-tile ind-tile--other reveal" href="${link('quote', lang)}"><span class="ind-tile__body"><span class="ind-card__ic">${icon('plus')}</span><h2 class="h3">${fr ? 'Votre industrie' : 'Your industry'}</h2><p>${fr ? 'Commerce de détail, manufacturier, OBNL, éducation, tourisme… parlons de votre réalité.' : 'Retail, manufacturing, non-profits, education, tourism… let’s talk about your reality.'}</p><span class="ind-card__more">${fr ? 'Parlons-en' : 'Let’s talk'} ${icon('arrow')}</span></span></a>
      </div>
    </section>
    ${finalCta(lang, { type: 'quote' })}`,
  };
};

export const industryPage = (d, lang) => {
  const c = d[lang];
  const fr = lang === 'fr';
  const t = ui[lang];
  const crumbs = [{ id: 'industries', label: label[lang] }, { id: d.id, label: c.nav }];
  const visual = d.id === 'ind-realestate' ? heroMock(lang) : photoScene(d.photo, c.solutions.map((x) => x[0]), c.h1);
  return {
    id: d.id, lang, title: c.title, description: c.description, breadcrumbs: crumbs,
    schema: [
      { '@context': 'https://schema.org', '@type': 'Service', name: c.h1, serviceType: c.nav, description: c.description, provider: { '@id': abs('/#organization') }, audience: { '@type': 'BusinessAudience', name: c.nav }, areaServed: { '@type': 'AdministrativeArea', name: 'Québec' }, url: abs(link(d.id, lang)) },
      faqSchema(c.faq),
    ],
    body: html`
    <section class="page-hero page-hero--v4 page-hero--split">
      <div class="mesh" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="container page-hero__in">
        <div>
          ${breadcrumbs({ lang, id: d.id, breadcrumbs: crumbs })}
          <p class="eyebrow">${c.eyebrow}</p>
          <h1>${c.h1}</h1>
          <p class="lead">${c.promise}</p>
          <div class="btn-row">${arrowBtn(link('quote', lang), t.cta.quote, { cls: 'btn--lg', cta: 'quote' })}<a class="btn btn--ghost btn--lg" href="#work-h">${t.cta.work}</a></div>
        </div>
        <div class="page-hero__visual">${visual}</div>
      </div>
    </section>

    <section class="section-tight" aria-labelledby="pb-h">
      <div class="container problems">
        <h2 id="pb-h" class="h3 reveal">${fr ? 'Ça vous dit quelque chose?' : 'Sound familiar?'}</h2>
        <ul class="problems__list">${c.pains.map((p, i) => html`<li class="reveal" data-delay="${i + 1}">« ${p} »</li>`)}</ul>
      </div>
    </section>

    <section class="section section--sand" aria-labelledby="sol-h">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'Notre solution' : 'Our solution', title: fr ? html`Ce que nous faisons <em>pour vous</em>` : html`What we do <em>for you</em>`, id: 'sol-h' })}
        <div class="benefits" data-spotlight>
          ${c.solutions.map(([h, p, sid], i) => { const s = getService(sid); return html`<a class="tile reveal" data-delay="${i + 1}" href="${link(sid, lang)}" data-tilt-card><span class="tile__glow" aria-hidden="true"></span><span class="tile__ic">${icon(s.icon)}</span><h3>${h}</h3><p>${p}</p><span class="tile__more">${s[lang].nav} ${icon('arrow')}</span></a>`; })}
        </div>
      </div>
    </section>

    ${portfolioCarousel(lang, { ids: d.work, title: fr ? html`Projets <em>${c.nav.toLowerCase()}</em>` : html`${c.nav} <em>projects</em>` })}
    ${testimonialsMarquee(lang)}

    <section class="section section--sand" aria-labelledby="faq-h">
      <div class="container faq-wrap">
        ${sectionHead({ eyebrow: 'FAQ', title: fr ? 'Questions fréquentes' : 'Frequently asked questions', id: 'faq-h' })}
        ${faqBlock(lang, c.faq)}
      </div>
    </section>

    ${finalCta(lang, { type: 'quote', title: fr ? html`Parlons de votre <em>projet</em>` : html`Let’s talk about your <em>project</em>` })}`,
  };
};
