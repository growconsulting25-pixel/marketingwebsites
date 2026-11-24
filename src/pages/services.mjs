import { link } from '../routes.mjs';
import { ui } from '../content/ui.mjs';
import { services, getService } from '../content/services.mjs';
import { industries } from '../content/industries.mjs';
import { html, icon, esc } from '../lib/html.mjs';
import { breadcrumbs, abs } from '../lib/layout.mjs';
import { sectionHead, arrowBtn, finalCta, utilmoMock, processSteps } from '../lib/components.mjs';
import { servicesBento, portfolioCarousel, testimonialsMarquee, industriesCarousel, heroStudio } from '../lib/sections.mjs';

const label = { fr: 'Services', en: 'Services' };

// Visual for a service hero: photo card with floating "included" chips (3D layers)
export const photoScene = (photo, chips, alt) => html`
  <div class="pscene" data-scene aria-hidden="false">
    <div class="scene__stage">
      <figure class="pscene__photo layer" style="--z: 0px"><img src="/assets/img/${photo}.webp" srcset="/assets/img/${photo}-560.webp 560w, /assets/img/${photo}.webp 900w" sizes="(min-width: 1024px) 520px, 100vw" alt="${esc(alt)}" width="900" height="600" fetchpriority="high"></figure>
      ${chips.slice(0, 3).map((c, i) => html`<span class="pscene__chip pscene__chip--${i + 1} layer card-glass" style="--z: ${80 + i * 40}px">${icon('check')}${c}</span>`)}
      <div class="scene__orb scene__orb--a" aria-hidden="true"></div>
    </div>
  </div>`;

export const servicesHub = (lang) => {
  const fr = lang === 'fr';
  const t = ui[lang];
  const crumbs = [{ id: 'services', label: label[lang] }];
  return {
    id: 'services', lang, breadcrumbs: crumbs,
    title: fr ? 'Services de marketing numérique à Montréal | Marketing Websites' : 'Digital Marketing Services in Montreal | Marketing Websites',
    description: fr ? 'Tous nos services : conception web, e-commerce, applications web, SEO, Google Ads, médias sociaux, analyse web et CRM Utilmo, pour les PME de toutes les industries.' : 'All our services: web design, e-commerce, web apps, SEO, Google Ads, social media, analytics and the Utilmo CRM, for businesses in every industry.',
    schema: [{ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s[lang].nav, url: abs(link(s.id, lang)) })) }],
    body: html`
    <section class="page-hero page-hero--v4">
      <div class="mesh" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="container narrow">
        ${breadcrumbs({ lang, id: 'services', breadcrumbs: crumbs })}
        <p class="eyebrow">${fr ? 'Services · Montréal' : 'Services · Montreal'}</p>
        <h1>${fr ? html`Tout ce qu’il faut pour <em>grandir en ligne</em>` : html`Everything you need to <em>grow online</em>`}</h1>
        <p class="lead">${fr ? 'Huit services reliés entre eux, une seule équipe et des rapports qui parlent de clients, pas seulement de clics.' : 'Eight connected services, one team and reports that talk about customers, not just clicks.'}</p>
        <div class="btn-row">${arrowBtn(link('quote', lang), t.cta.quote, { cls: 'btn--lg', cta: 'quote' })}<a class="btn btn--ghost btn--lg" href="${link('work', lang)}">${t.cta.work}</a></div>
      </div>
    </section>
    ${servicesBento(lang, { title: fr ? html`Nos <em>8 services</em>` : html`Our <em>8 services</em>`, lead: ' ' })}
    ${industriesCarousel(lang)}
    ${finalCta(lang, { type: 'quote' })}`,
  };
};

export const servicePage = (s, lang) => {
  const c = s[lang];
  const fr = lang === 'fr';
  const t = ui[lang];
  const isDemo = s.cta === 'demo';
  const crumbs = [{ id: 'services', label: label[lang] }, { id: s.id, label: c.nav }];
  const visual = s.id === 'svc-crm' ? utilmoMock(lang) : s.id === 'svc-web' ? heroStudio(lang) : photoScene(`industries/${s.photo}`, c.included, c.h1);
  const fitInd = industries.filter((d) => d.services.includes(s.id));
  return {
    id: s.id, lang, title: c.title, description: c.description, breadcrumbs: crumbs,
    stickyCta: isDemo ? { id: 'demo', label: fr ? 'Démo' : 'Demo', cta: 'demo' } : undefined,
    schema: [
      { '@context': 'https://schema.org', '@type': 'Service', name: c.h1, serviceType: c.nav, description: c.description, provider: { '@id': abs('/#organization') }, areaServed: [{ '@type': 'City', name: 'Montréal' }, { '@type': 'AdministrativeArea', name: 'Québec' }], url: abs(link(s.id, lang)) },
    ],
    body: html`
    <section class="page-hero page-hero--v4 page-hero--split">
      <div class="mesh" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="container page-hero__in">
        <div>
          ${breadcrumbs({ lang, id: s.id, breadcrumbs: crumbs })}
          <p class="eyebrow">${c.eyebrow}</p>
          <h1>${c.h1}</h1>
          <p class="lead">${c.promise}</p>
          <div class="btn-row">${isDemo ? arrowBtn(link('demo', lang), t.cta.demo, { cls: 'btn--lg', cta: 'demo' }) : arrowBtn(link('quote', lang), t.cta.quote, { cls: 'btn--lg', cta: 'quote' })}<a class="btn btn--ghost btn--lg" href="${link('work', lang)}">${t.cta.work}</a></div>
        </div>
        <div class="page-hero__visual">${visual}</div>
      </div>
    </section>

    <section class="section" aria-labelledby="ben-h">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'Pourquoi nous' : 'Why us', title: fr ? html`Ce que vous <em>obtenez</em>` : html`What you <em>get</em>`, id: 'ben-h' })}
        <div class="benefits" data-spotlight>${c.benefits.map(([h, p], i) => html`<article class="tile reveal" data-delay="${i + 1}" data-tilt-card><span class="tile__glow" aria-hidden="true"></span><span class="tile__n tabnum">0${i + 1}</span><h3>${h}</h3><p>${p}</p></article>`)}</div>
      </div>
    </section>

    <section class="section section--sand" aria-labelledby="inc-h">
      <div class="container inc-split">
        <div>
          ${sectionHead({ eyebrow: fr ? 'Inclus' : 'Included', title: fr ? 'Ce qui est inclus' : 'What’s included', id: 'inc-h' })}
          <ul class="checks-list reveal">${c.included.map((x) => html`<li>${icon('check')}${x}</li>`)}</ul>
        </div>
        <aside class="connect card reveal" data-delay="2">
          <p class="eyebrow">${fr ? 'Encore plus efficace avec' : 'Even better with'}</p>
          ${s.related.map((id) => { const r = getService(id); return html`<a class="connect__item" href="${link(id, lang)}"><span class="tile__ic">${icon(r.icon)}</span><span><b>${r[lang].nav}</b><small>${r[lang].short}</small></span>${icon('arrow')}</a>`; })}
          ${fitInd.length ? html`<p class="connect__ind">${fr ? 'Pour les' : 'For'} ${fitInd.map((d, i) => html`${i ? ', ' : ''}<a href="${link(d.id, lang)}">${d[lang].nav.toLowerCase()}</a>`)}.</p>` : ''}
        </aside>
      </div>
    </section>

    ${portfolioCarousel(lang)}

    <section class="section" aria-labelledby="process-h">
      <div class="container process-wrap">
        ${sectionHead({ eyebrow: fr ? 'Processus' : 'Process', title: fr ? 'Comment ça se passe' : 'How it works', id: 'process-h' })}
        ${processSteps(lang, fr ? [['Consultation', 'Vos objectifs, votre marché et vos concurrents.', ''], ['Stratégie', 'Un plan écrit avec les livrables et les indicateurs.', ''], ['Réalisation', 'Nous exécutons, vous validez à chaque étape.', ''], ['Suivi', 'Rapport clair et améliorations continues.', '']] : [['Consultation', 'Your goals, market and competitors.', ''], ['Strategy', 'A written plan with deliverables and KPIs.', ''], ['Delivery', 'We execute, you approve at each step.', ''], ['Follow-up', 'Clear reporting and continuous improvement.', '']])}
      </div>
    </section>

    ${testimonialsMarquee(lang)}


    ${isDemo ? finalCta(lang, { type: 'demo', title: fr ? 'Voyez Utilmo avec vos propres cas' : 'See Utilmo with your own cases', lead: fr ? 'Une démo de 30 minutes, en français ou en anglais.' : 'A 30-minute demo, in French or English.' }) : finalCta(lang, { type: 'quote', title: fr ? html`Prêt à démarrer votre projet de <em>${c.nav.toLowerCase()}</em>?` : html`Ready to start your <em>${c.nav.toLowerCase()}</em> project?` })}`,
  };
};
