import config from '../../site.config.mjs';
import { link } from '../routes.mjs';
import { ui } from '../content/ui.mjs';
import { reServices, shortVideo } from '../content/realestate.mjs';
import { html, icon, animWords, todo } from '../lib/html.mjs';
import { breadcrumbs, abs } from '../lib/layout.mjs';
import {
  systemSection, situations, portfolioGrid, sectionHead, arrowBtn, faqBlock, faqSchema, finalCta,
  relatedServices, latestResources, processSteps, heroMock, utilmoMock, testimonials,
} from '../lib/components.mjs';

const reLabel = { fr: 'Immobilier', en: 'Real estate' };

// ── Hub ─────────────────────────────────────────────────────────────────────
export const reHub = (lang) => {
  const fr = lang === 'fr';
  const t = ui[lang];
  const services = reServices.filter((s) => !s.hidden);
  return {
    id: 're', lang,
    title: fr ? 'Marketing immobilier pour courtiers au Québec | Marketing Websites' : 'Real Estate Marketing for Quebec Brokers | Marketing Websites',
    description: fr ? 'Le système marketing des courtiers, équipes et agences du Québec : site bilingue, intégration Centris, publicité Google et Meta, SEO local et CRM Utilmo.' : 'The marketing system for Quebec brokers, teams and agencies: bilingual website, Centris integration, Google and Meta ads, local SEO and the Utilmo CRM.',
    breadcrumbs: [{ id: 're', label: reLabel[lang] }],
    body: html`
    <section class="page-hero page-hero--split">
      <div class="container page-hero__in">
        <div>
          ${breadcrumbs({ lang, id: 're', breadcrumbs: [{ id: 're', label: reLabel[lang] }] })}
          <p class="eyebrow">${fr ? 'Marketing immobilier' : 'Real estate marketing'}</p>
          <h1 class="h-anim">${animWords(fr ? 'Le marketing numérique des <em>courtiers immobiliers</em> du Québec' : 'Digital marketing for Quebec <em>real estate brokers</em>')}</h1>
          <p class="lead">${fr ? 'Site web, Centris, publicité et CRM dans un seul système. Conçu au Québec, en français d’abord, pour des courtiers qui veulent plus de mandats — pas seulement un beau site.' : 'Website, Centris, advertising and CRM in one system. Built in Quebec, French-first, for brokers who want more listings — not just a nice site.'}</p>
          <div class="btn-row">${arrowBtn('#consultation', t.cta.consult, { cls: 'btn--lg', cta: 'consultation' })}<a class="btn btn--ghost btn--lg" href="${link('re-packages', lang)}">${t.cta.packages}</a></div>
        </div>
        <div class="page-hero__visual">${heroMock(lang)}</div>
      </div>
    </section>

    <section class="section-tight diff" aria-label="${fr ? 'Pourquoi nous' : 'Why us'}">
      <div class="container diff__grid">
        ${(fr
          ? [['Conçu pour le Québec', 'Français d’abord, Centris natif, publicité conforme aux règles d’ici.'], ['Un système connecté', 'Le site, les publicités et le CRM partagent les mêmes données.'], ['Depuis 2015', 'Un vrai portfolio de sites de courtiers, et une équipe à Montréal.'], ['Bilingue par défaut', 'Chaque page existe en français et en anglais, rédigée par des humains.']]
          : [['Built for Quebec', 'French-first, Centris-native, advertising that respects local rules.'], ['One connected system', 'Site, ads and CRM share the same data.'], ['Since 2015', 'A real portfolio of broker sites, and a team in Montreal.'], ['Bilingual by default', 'Every page exists in French and English, written by people.']]
        ).map(([h, p], i) => html`<div class="diff__item reveal" data-delay="${i + 1}"><span class="diff__n tabnum">0${i + 1}</span><h2 class="h4">${h}</h2><p>${p}</p></div>`)}
      </div>
    </section>

    ${systemSection(lang)}

    <section class="section section--sand" aria-labelledby="svc-h">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'Services' : 'Services', title: fr ? 'Tout ce dont un courtier a besoin, au même endroit' : 'Everything a broker needs, in one place', id: 'svc-h' })}
        <div class="bento">
          ${services.map((s, i) => html`
            <a class="card card--link bento__item bento__item--${i + 1} reveal" data-delay="${(i % 4) + 1}" href="${link(s.id, lang)}">
              <span class="situation__icon">${icon(s.icon)}</span>
              <h3>${s[lang].nav}</h3>
              <p>${s[lang].promise.split('. ')[0].replace(/\.$/, '')}.</p>
              <span class="card__more">${t.cta.learn} ${icon('arrow')}</span>
            </a>`)}
          ${!config.offers.shortVideo ? html`
            <div class="card bento__item bento__item--soon reveal">
              <span class="situation__icon">${icon(shortVideo.icon)}</span>
              <h3>${shortVideo[lang].nav} <span class="tag tag--soon">${fr ? 'Bientôt' : 'Coming soon'}</span></h3>
              <p>${shortVideo[lang].text}</p>
            </div>` : ''}
          <a class="card card--link card--accent bento__item bento__item--pk reveal" href="${link('re-packages', lang)}">
            <h3>${fr ? 'Forfaits' : 'Packages'}</h3>
            <p>${fr ? 'Présence, Croissance ou Système complet : trois façons de commencer.' : 'Presence, Growth or Complete System: three ways to start.'}</p>
            <span class="card__more">${t.cta.packages} ${icon('arrow')}</span>
          </a>
        </div>
      </div>
    </section>

    ${situations(lang)}

    <section class="section" aria-labelledby="work-h">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'Réalisations' : 'Work', title: fr ? 'Sites de courtiers, d’équipes et d’agences' : 'Broker, team and agency sites', id: 'work-h' })}
        ${portfolioGrid(lang, { limit: 3, realEstateOnly: true })}
      </div>
    </section>

    <section class="section section--sand" aria-labelledby="quotes-h">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'Témoignages' : 'Testimonials', title: fr ? 'Ils nous font confiance' : 'They trust us', id: 'quotes-h', center: true })}
        ${testimonials(lang)}
      </div>
    </section>

    ${finalCta(lang)}`,
  };
};

// ── Service page template (strategy §5, 11 blocks) ──────────────────────────
export const reServicePage = (s, lang) => {
  const c = s[lang];
  const t = ui[lang];
  const fr = lang === 'fr';
  const isDemo = s.cta === 'demo';
  const ctaHref = isDemo ? link('demo', lang) : '#consultation';
  const ctaLabel = isDemo ? t.cta.demo : t.cta.consult;
  const crumbs = [{ id: 're', label: reLabel[lang] }, { id: s.id, label: c.nav }];
  return {
    id: s.id, lang, title: c.title, description: c.description,
    breadcrumbs: crumbs,
    stickyCta: isDemo ? { id: 'demo', label: fr ? 'Démo' : 'Demo', cta: 'demo' } : undefined,
    schema: [
      {
        '@context': 'https://schema.org', '@type': 'Service', name: c.h1, description: c.description, serviceType: c.nav,
        provider: { '@id': abs('/#organization') }, areaServed: { '@type': 'AdministrativeArea', name: 'Québec' },
        audience: { '@type': 'BusinessAudience', name: fr ? 'Courtiers immobiliers' : 'Real estate brokers' }, url: abs(link(s.id, lang)),
      },
      faqSchema(c.faq),
    ],
    body: html`
    <section class="page-hero page-hero--split">
      <div class="container page-hero__in">
        <div>
          ${breadcrumbs({ lang, id: s.id, breadcrumbs: crumbs })}
          <p class="eyebrow">${c.eyebrow}</p>
          <h1 class="h-anim">${animWords(c.h1)}</h1>
          <p class="lead">${c.promise}</p>
          <div class="btn-row">${arrowBtn(ctaHref, ctaLabel, { cls: 'btn--lg', cta: isDemo ? 'demo' : 'consultation' })}<a class="btn btn--ghost btn--lg" href="${link('re-packages', lang)}">${t.cta.packages}</a></div>
        </div>
        <div class="page-hero__visual">${s.id === 're-utilmo' ? utilmoMock(lang) : heroMock(lang)}</div>
      </div>
    </section>

    <section class="section-tight" aria-labelledby="pb-h">
      <div class="container problems">
        <h2 id="pb-h" class="h3 reveal">${fr ? 'Ça vous dit quelque chose?' : 'Sound familiar?'}</h2>
        <ul class="problems__list">${c.problems.map((p, i) => html`<li class="reveal" data-delay="${(i % 4) + 1}">${p}</li>`)}</ul>
      </div>
    </section>

    <section class="section section--sand" aria-labelledby="inc-h">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'Ce qui est inclus' : 'What’s included', title: fr ? 'Des livrables concrets, pas des adjectifs' : 'Concrete deliverables, not adjectives', id: 'inc-h' })}
        <ul class="included">${c.included.map(([h, p], i) => html`<li class="included__item reveal" data-delay="${(i % 4) + 1}">${icon('check')}<div><h3>${h}</h3><p>${p}</p></div></li>`)}</ul>
      </div>
    </section>

    <section class="section" aria-labelledby="flow-h">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'Relié au reste du système' : 'Connected to the system', title: fr ? 'Comment ça s’enchaîne' : 'How it all connects', id: 'flow-h' })}
        <ol class="flow reveal">${c.connects.map((x, i) => html`<li class="flow__step"><span class="flow__n tabnum">${i + 1}</span><span>${x}</span></li>`)}</ol>
      </div>
    </section>

    <section class="section-tight" aria-labelledby="ex-h">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'Exemples' : 'Examples', title: fr ? 'Réalisations et résultat' : 'Work and results', id: 'ex-h' })}
        ${portfolioGrid(lang, { limit: 3, realEstateOnly: true })}
        <div class="mini-case card reveal">
          <span class="badge">${fr ? 'Résultat' : 'Result'}</span>
          <p>${todo(fr ? 'Mini étude de cas : un résultat vérifié pour ce service (métrique, période, source)' : 'Mini case study: one verified result for this service (metric, period, source)', { block: true })}</p>
        </div>
      </div>
    </section>

    <section class="section section--sand" aria-labelledby="tl-h">
      <div class="container process-wrap">
        ${sectionHead({ eyebrow: fr ? 'Processus' : 'Process', title: fr ? 'Échéancier typique' : 'Typical timeline', id: 'tl-h' })}
        ${processSteps(lang, c.timeline.map(([w, d]) => [w, d, '']))}
      </div>
    </section>

    <section class="section-tight" aria-labelledby="price-h">
      <div class="container price-note reveal">
        <div>
          <p class="eyebrow">${fr ? 'Investissement' : 'Investment'}</p>
          <h2 id="price-h" class="h3">${fr ? 'Combien ça coûte?' : 'What does it cost?'}</h2>
          <p>${fr ? 'Ce service est inclus dans nos forfaits Présence, Croissance et Système complet, ou offert séparément. Nous vous donnons un prix clair après la consultation.' : 'This service is part of our Presence, Growth and Complete System packages, or available on its own. You get a clear price after the consultation.'}</p>
        </div>
        ${arrowBtn(link('re-packages', lang), t.cta.packages, { cls: 'btn--ghost' })}
      </div>
    </section>

    <section class="section" aria-labelledby="faq-h">
      <div class="container faq-wrap">
        ${sectionHead({ eyebrow: 'FAQ', title: fr ? 'Questions fréquentes' : 'Frequently asked questions', id: 'faq-h' })}
        ${faqBlock(lang, c.faq)}
      </div>
    </section>

    <section class="section section--sand" aria-labelledby="rel-h">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'Pour aller plus loin' : 'Go further', title: fr ? 'Services complémentaires' : 'Related services', id: 'rel-h' })}
        ${relatedServices(lang, s.related)}
        <h3 class="h4 res-title reveal">${fr ? 'À lire' : 'Further reading'}</h3>
        ${latestResources(lang, s.resources)}
        <p class="reveal hub-back"><a class="link" href="${link('re', lang)}">${fr ? 'Retour au marketing immobilier' : 'Back to real estate marketing'} ${icon('arrow')}</a></p>
      </div>
    </section>

    ${isDemo ? finalCta(lang, { type: 'demo', title: fr ? 'Voyez Utilmo avec vos propres cas' : 'See Utilmo with your own cases', lead: fr ? 'Une démo de 30 minutes, en français ou en anglais : nous configurons un exemple à partir de votre façon de travailler.' : 'A 30-minute demo, in French or English: we set up an example based on how you work.' }) : finalCta(lang)}`,
  };
};

// ── Packages ────────────────────────────────────────────────────────────────
export const rePackages = (lang) => {
  const fr = lang === 'fr';
  const t = ui[lang];
  const price = (v) => (v ? (fr ? `À partir de ${v.toLocaleString('fr-CA')} $` : `From $${v.toLocaleString('en-CA')}`) : (fr ? 'Sur soumission' : 'Custom quote'));
  const soon = fr ? 'Bientôt' : 'Soon';
  const rows = fr
    ? [['Site web de courtier bilingue', 1, 1, 1], ['Intégration Centris automatique', 1, 1, 1], ['Formulaire d’évaluation et alertes acheteurs', 1, 1, 1], ['SEO de base et fiche Google', 1, 1, 1], ['CRM Utilmo', 0, 1, 1], ['Pages d’atterrissage', 0, 1, 1], ['SEO local (pages de quartiers, avis)', 0, 1, 1], ['Publicité Google et Meta gérée', 0, 0, 1], ['Séquences de suivi automatisées', 0, 0, 1], ['Rapport mensuel coût par prospect', 0, 0, 1], ['Vidéo courte', 0, 0, 'soon']]
    : [['Bilingual broker website', 1, 1, 1], ['Automatic Centris integration', 1, 1, 1], ['Valuation form and buyer alerts', 1, 1, 1], ['SEO foundations and Google profile', 1, 1, 1], ['Utilmo CRM', 0, 1, 1], ['Landing pages', 0, 1, 1], ['Local SEO (neighbourhood pages, reviews)', 0, 1, 1], ['Managed Google and Meta ads', 0, 0, 1], ['Automated follow-up sequences', 0, 0, 1], ['Monthly cost-per-lead report', 0, 0, 1], ['Short-form video', 0, 0, 'soon']];
  const tiers = [
    { key: 'presence', name: fr ? 'Présence' : 'Presence', for: fr ? 'Pour le courtier qui veut un site à son image, relié à Centris.' : 'For the broker who wants a site that reflects them, connected to Centris.', price: config.pricing.presence },
    { key: 'croissance', name: fr ? 'Croissance' : 'Growth', for: fr ? 'Pour transformer vos visiteurs en prospects suivis.' : 'To turn your visitors into tracked leads.', price: config.pricing.croissance, featured: true },
    { key: 'systeme', name: fr ? 'Système complet' : 'Complete System', for: fr ? 'Pour attirer, convertir, suivre et mesurer — sans y penser.' : 'To attract, convert, follow up and measure — on autopilot.', price: config.pricing.systeme },
  ];
  const cell = (v) => (v === 'soon' ? html`<span class="tag tag--soon">${soon}</span>` : v ? html`${icon('check', 'yes')}<span class="sr-only">${fr ? 'Inclus' : 'Included'}</span>` : html`<span class="no" aria-hidden="true">—</span><span class="sr-only">${fr ? 'Non inclus' : 'Not included'}</span>`);
  const crumbs = [{ id: 're', label: reLabel[lang] }, { id: 're-packages', label: fr ? 'Forfaits' : 'Packages' }];
  return {
    id: 're-packages', lang,
    title: fr ? 'Forfaits marketing pour courtiers immobiliers | Marketing Websites' : 'Marketing Packages for Real Estate Brokers | Marketing Websites',
    description: fr ? 'Trois forfaits pour courtiers immobiliers : Présence, Croissance et Système complet. Site web, Centris, CRM Utilmo, SEO local et publicité.' : 'Three packages for real estate brokers: Presence, Growth and Complete System. Website, Centris, Utilmo CRM, local SEO and advertising.',
    breadcrumbs: crumbs,
    body: html`
    <section class="page-hero">
      <div class="container narrow">
        ${breadcrumbs({ lang, id: 're-packages', breadcrumbs: crumbs })}
        <p class="eyebrow">${fr ? 'Forfaits' : 'Packages'}</p>
        <h1 class="h-anim">${animWords(fr ? 'Trois façons de <em>commencer</em>' : 'Three ways to <em>get started</em>')}</h1>
        <p class="lead">${fr ? 'Commencez par ce dont vous avez besoin aujourd’hui; chaque forfait évolue vers le suivant sans rien refaire.' : 'Start with what you need today; each package grows into the next without starting over.'}</p>
      </div>
    </section>
    <section class="section-tight">
      <div class="container tiers">
        ${tiers.map((tier, i) => html`
          <article class="tier card${tier.featured ? ' tier--featured' : ''} reveal" data-delay="${i + 1}">
            ${tier.featured ? html`<span class="badge tier__flag">${fr ? 'Le plus choisi' : 'Most popular'}</span>` : ''}
            <h2 class="h3">${tier.name}</h2>
            <p class="tier__for">${tier.for}</p>
            <p class="tier__price tabnum">${price(tier.price)}</p>
            <ul class="tier__list">${rows.filter((r) => r[i + 1]).map((r) => html`<li>${r[i + 1] === 'soon' ? html`<span class="tag tag--soon">${soon}</span>` : icon('check')}${r[0]}</li>`)}</ul>
            ${arrowBtn(link('quote', lang) + `?forfait=${tier.key}`, t.cta.quote, { cls: tier.featured ? '' : 'btn--ghost', cta: 'quote' })}
          </article>`)}
      </div>
    </section>
    <section class="section section--sand" aria-labelledby="cmp-h">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'Comparer' : 'Compare', title: fr ? 'Ce que comprend chaque forfait' : 'What each package includes', id: 'cmp-h' })}
        <div class="table-wrap reveal">
          <table class="compare">
            <thead><tr><th scope="col">${fr ? 'Composante' : 'Component'}</th>${tiers.map((x) => html`<th scope="col">${x.name}</th>`)}</tr></thead>
            <tbody>${rows.map((r) => html`<tr><th scope="row">${r[0]}</th>${[1, 2, 3].map((k) => html`<td data-label="${tiers[k - 1].name}">${cell(r[k])}</td>`)}</tr>`)}</tbody>
          </table>
        </div>
      </div>
    </section>
    ${finalCta(lang, { type: 'quote', title: fr ? 'Obtenez une soumission claire' : 'Get a clear quote', lead: fr ? 'Dites-nous où vous en êtes; nous vous répondons avec un forfait recommandé et un prix, en un jour ouvrable.' : 'Tell us where you are; we reply with a recommended package and a price within one business day.' })}`,
  };
};
