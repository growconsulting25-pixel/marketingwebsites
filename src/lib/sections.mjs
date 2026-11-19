// New-gen sections for the full-service site (v4). See DESIGN.md.
import config from '../../site.config.mjs';
import { link } from '../routes.mjs';
import { ui } from '../content/ui.mjs';
import { services } from '../content/services.mjs';
import { industries } from '../content/industries.mjs';
import { portfolio, portfolioTypes } from '../content/portfolio.mjs';
import { testimonials as testimonialsData } from '../content/testimonials.mjs';
import { html, esc, icon } from './html.mjs';
import { sectionHead, arrowBtn } from './components.mjs';

const img = (path, alt, { w = 900, h = 600, sizes = '100vw', lazy = true, small = true } = {}) =>
  `<img src="/assets/img/${path}.webp"${small ? ` srcset="/assets/img/${path}-560.webp 560w, /assets/img/${path}.webp 900w" sizes="${sizes}"` : ''} alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">`;

// ── Hero: rotating word + 3D device scene ───────────────────────────────────
export const rotator = (words) => html`<span class="rotator" data-rotator aria-live="off"><span class="rotator__sizer" aria-hidden="true">${words.reduce((a, b) => (b.length > a.length ? b : a))}</span>${words.map((w, i) => html`<span class="rotator__w${i === 0 ? ' is-on' : ''}"${i ? ' aria-hidden="true"' : ''}>${w}</span>`)}</span>`;

export const heroScene = (lang) => {
  const fr = lang === 'fr';
  return html`
  <div class="scene" data-scene role="img" aria-label="${fr ? 'Exemple : site web d’entreprise sur ordinateur, formulaire de soumission sur mobile, résultat Google et tableau de bord des demandes' : 'Example: business website on a laptop, quote form on mobile, Google result and leads dashboard'}">
    <div class="scene__stage">
      <div class="scene__laptop layer" style="--z: 0px">
        <div class="lap">
          <div class="lap__screen">
            <div class="site">
              <div class="site__nav"><b>${fr ? 'Votre entreprise' : 'Your business'}</b><span>Services</span><span>${fr ? 'Projets' : 'Projects'}</span><span>${fr ? 'Avis' : 'Reviews'}</span><em>${fr ? 'Soumission' : 'Get a quote'}</em></div>
              <div class="site__hero">
                <img src="/assets/img/industries/construction-560.webp" alt="" width="560" height="371" fetchpriority="high">
                <div class="site__hero-txt"><small>${fr ? 'Rénovation · Montréal' : 'Renovation · Montreal'}</small><strong>${fr ? 'Votre projet, livré à temps.' : 'Your project, delivered on time.'}</strong><span class="site__cta">${fr ? 'Obtenir une soumission' : 'Get a free quote'}</span></div>
              </div>
              <div class="site__cards">
                <span><img src="/assets/img/industries/services-pro-560.webp" alt="" width="560" height="373" loading="lazy"><b>${fr ? 'Cuisines' : 'Kitchens'}</b></span>
                <span><img src="/assets/img/photos/convertir-560.webp" alt="" width="560" height="373" loading="lazy"><b>${fr ? 'Agrandissements' : 'Extensions'}</b></span>
                <span><img src="/assets/img/listings/salon.webp" alt="" width="900" height="612" loading="lazy"><b>${fr ? 'Sous-sols' : 'Basements'}</b></span>
              </div>
            </div>
          </div>
          <div class="lap__base"></div>
        </div>
      </div>

      <div class="scene__phone layer" style="--z: 90px">
        <div class="phone">
          <i class="phone__island"></i>
          <div class="phone__screen">
            <small>${fr ? 'Soumission gratuite' : 'Free quote'}</small>
            <strong>${fr ? 'Parlez-nous de votre projet' : 'Tell us about your project'}</strong>
            <span class="pf"><i>${fr ? 'Type de projet' : 'Project type'}</i><b>${fr ? 'Rénovation de cuisine' : 'Kitchen renovation'}</b></span>
            <span class="pf"><i>${fr ? 'Budget' : 'Budget'}</i><b>25 000 $ – 50 000 $</b></span>
            <span class="pf"><i>${fr ? 'Quand?' : 'When?'}</i><b>${fr ? 'D’ici 3 mois' : 'Within 3 months'}</b></span>
            <span class="pf pf--typed"><i>${fr ? 'Courriel' : 'Email'}</i><b data-type-text="${fr ? 'julie.martin@courriel.ca' : 'julie.martin@email.ca'}"></b></span>
            <span class="phone__btn">${fr ? 'Envoyer ma demande' : 'Send my request'}</span>
          </div>
        </div>
      </div>

      <div class="scene__serp layer card-glass" style="--z: 140px">
        <span class="serp__ad">${fr ? '1er résultat · Recherche locale' : 'Top result · Local search'}</span>
        <span class="serp__url">${icon('globe')} votreentreprise.ca</span>
        <b>${fr ? 'Rénovation Montréal — Soumission gratuite' : 'Renovation Montreal — Free quote'}</b>
        <span class="serp__stars" aria-hidden="true">${[1, 2, 3, 4, 5].map(() => icon('star'))}</span>
      </div>

      <div class="scene__chart layer card-glass" style="--z: 60px">
        <span class="chart__label">${fr ? 'Demandes reçues' : 'Inquiries received'}</span>
        <svg viewBox="0 0 160 60" aria-hidden="true"><defs><linearGradient id="cg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".35"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs><path class="chart__area" d="M0 52 L20 48 L40 50 L60 38 L80 40 L100 26 L120 28 L140 14 L160 8 V60 H0z" fill="url(#cg)"/><path class="chart__line" d="M0 52 L20 48 L40 50 L60 38 L80 40 L100 26 L120 28 L140 14 L160 8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>

      <div class="scene__toast layer" style="--z: 170px">${icon('inbox')}<span><b>${fr ? 'Nouvelle demande' : 'New inquiry'}</b>${fr ? 'Soumission · envoyée à Utilmo' : 'Quote · sent to Utilmo'}</span></div>
      <div class="scene__orb scene__orb--a" aria-hidden="true"></div>
      <div class="scene__orb scene__orb--b" aria-hidden="true"></div>
    </div>
  </div>`;
};

// ── Services bento with spotlight ───────────────────────────────────────────
export const servicesBento = (lang, { title, lead } = {}) => {
  const fr = lang === 'fr';
  const t = ui[lang];
  return html`
  <section class="section svc" aria-labelledby="svc-h">
    <div class="container">
      <div class="split-head">
        ${sectionHead({ eyebrow: fr ? 'Nos services' : 'Our services', title: title || (fr ? html`Tout votre marketing numérique, <em>une seule équipe</em>` : html`All your digital marketing, <em>one team</em>`), lead: lead || (fr ? 'Du site web au CRM, chaque service est relié aux autres pour que vos efforts se transforment en clients.' : 'From website to CRM, every service connects to the others so your efforts turn into customers.'), id: 'svc-h' })}
        <a class="link reveal" href="${link('services', lang)}">${t.nav.svcHub} ${icon('arrow')}</a>
      </div>
      <div class="bento2" data-spotlight>
        ${services.map((s, i) => html`
          <a class="tile tile--${i + 1}${s.featured ? ' tile--feat' : ''} reveal" data-delay="${(i % 4) + 1}" href="${link(s.id, lang)}" data-tilt-card>
            <span class="tile__glow" aria-hidden="true"></span>
            <span class="tile__ic">${icon(s.icon)}</span>
            <h3>${s[lang].nav}</h3>
            <p>${s[lang].short}</p>
            <span class="tile__more">${t.cta.learn} ${icon('arrow')}</span>
            ${i === 0 ? html`<span class="tile__art" aria-hidden="true"><i></i><i></i><i></i></span>` : ''}
          </a>`)}
      </div>
    </div>
  </section>`;
};

// ── Industries carousel ─────────────────────────────────────────────────────
export const industriesCarousel = (lang) => {
  const fr = lang === 'fr';
  return html`
  <section class="section inds" aria-labelledby="ind-h">
    <div class="container">
      <div class="split-head">
        ${sectionHead({ eyebrow: fr ? 'Industries' : 'Industries', title: fr ? html`Une expertise <em>pour chaque industrie</em>` : html`Expertise <em>for every industry</em>`, lead: fr ? 'Les mêmes services, adaptés aux réalités de votre secteur : réglementation, saisons, clientèle et façon d’acheter.' : 'The same services, adapted to your sector: regulations, seasons, customers and how they buy.', id: 'ind-h' })}
        <div class="carousel__nav reveal">
          <button class="carousel__btn carousel__btn--inline" type="button" data-carousel-prev aria-controls="ind-track" aria-label="${fr ? 'Précédent' : 'Previous'}">${icon('arrow')}</button>
          <button class="carousel__btn carousel__btn--inline" type="button" data-carousel-next aria-controls="ind-track" aria-label="${fr ? 'Suivant' : 'Next'}">${icon('arrow')}</button>
        </div>
      </div>
    </div>
    <div class="carousel carousel--bleed" data-carousel data-carousel-external>
      <ul class="carousel__track ind-track" id="ind-track" tabindex="0" aria-label="${fr ? 'Industries — faites défiler' : 'Industries — scroll'}" data-carousel-track>
        ${industries.map((d) => html`
          <li class="ind-card" data-slide>
            <a href="${link(d.id, lang)}">
              ${img(d.photo, d[lang].nav, { sizes: '(min-width: 1024px) 380px, 80vw' })}
              <span class="ind-card__body"><span class="ind-card__ic">${icon(d.icon)}</span><b>${d[lang].nav}</b><small>${d[lang].short}</small><span class="ind-card__more">${fr ? 'Découvrir' : 'Explore'} ${icon('arrow')}</span></span>
            </a>
          </li>`)}
        <li class="ind-card ind-card--other" data-slide>
          <a href="${link('quote', lang)}"><span class="ind-card__body"><span class="ind-card__ic">${icon('plus')}</span><b>${fr ? 'Votre industrie' : 'Your industry'}</b><small>${fr ? 'Commerce, manufacturier, OBNL, éducation… nous accompagnons toutes les PME.' : 'Retail, manufacturing, non-profits, education… we work with every kind of business.'}</small><span class="ind-card__more">${fr ? 'Parlons-en' : 'Let’s talk'} ${icon('arrow')}</span></span></a>
        </li>
      </ul>
    </div>
  </section>`;
};

// ── Stats band ──────────────────────────────────────────────────────────────
export const statsBand = (lang) => {
  const fr = lang === 'fr';
  const years = new Date().getFullYear() - config.foundingYear;
  const items = [
    [String(years), years, fr ? 'ans d’expérience à Montréal' : 'years in Montreal'],
    [`${portfolio.length}+`, portfolio.length, fr ? 'projets présentés au portfolio' : 'projects in our portfolio'],
    [String(services.length), services.length, fr ? 'services sous un même toit' : 'services under one roof'],
    ['FR · EN', null, fr ? 'bilingue par défaut' : 'bilingual by default'],
  ];
  return html`
  <section class="stats" aria-label="${fr ? 'En chiffres' : 'By the numbers'}">
    <div class="container stats__grid">
      ${items.map(([v, n, l], i) => html`<div class="stat reveal" data-delay="${i + 1}"><span class="stat__num tabnum"${n != null ? ` data-count="${n}"` : ''}>${v}</span><span class="stat__label">${l}</span></div>`)}
    </div>
  </section>`;
};

// ── Portfolio carousel (real projects) ──────────────────────────────────────
export const portfolioCarousel = (lang, { ids, title } = {}) => {
  const fr = lang === 'fr';
  const list = ids ? ids.map((id) => portfolio.find((p) => p.slug === id)).filter(Boolean) : portfolio.slice(0, 14);
  return html`
  <section class="section work-band" aria-labelledby="work-h">
    <div class="container">
      <div class="split-head">
        ${sectionHead({ eyebrow: fr ? 'Réalisations' : 'Our work', title: title || (fr ? html`Des sites qui travaillent <em>pour nos clients</em>` : html`Sites that work <em>for our clients</em>`), id: 'work-h' })}
        <a class="link reveal" href="${link('work', lang)}">${fr ? `Voir les ${portfolio.length} projets` : `See all ${portfolio.length} projects`} ${icon('arrow')}</a>
      </div>
    </div>
    <div class="marquee-work" aria-hidden="false">
      <ul class="marquee-work__track">
        ${[0, 1].map((dup) => list.map((w) => html`<li${dup ? ' aria-hidden="true"' : ''}><figure><img src="${w.image}" alt="${dup ? '' : `${fr ? 'Site web de' : 'Website for'} ${esc(w.name)}`}" width="${w.w}" height="${w.h}" loading="lazy" decoding="async"><figcaption><b>${w.name}</b><span>${portfolioTypes[lang][w.type]}</span></figcaption></figure></li>`))}
      </ul>
    </div>
  </section>`;
};

// ── Testimonials: two opposite marquees ─────────────────────────────────────
export const testimonialsMarquee = (lang) => {
  const fr = lang === 'fr';
  const rows = [testimonialsData.slice(0, 4), testimonialsData.slice(4)];
  const card = (t, dup) => html`<li${dup ? ' aria-hidden="true"' : ''}><figure class="tq"><div class="quote__stars" aria-label="5/5">${[1, 2, 3, 4, 5].map(() => icon('star'))}</div><blockquote lang="${lang}-CA">${t[lang]}</blockquote><figcaption><img class="avatar" src="${t.photo}" alt="" width="48" height="48" loading="lazy"><span><b>${t.name}</b><span class="muted">${t.role[lang]}</span></span></figcaption></figure></li>`;
  return html`
  <section class="section tqs" aria-labelledby="tq-h">
    <div class="container">${sectionHead({ eyebrow: fr ? 'Témoignages' : 'Testimonials', title: fr ? html`Ce que disent <em>nos clients</em>` : html`What <em>our clients</em> say`, id: 'tq-h', center: true })}</div>
    ${rows.map((r, k) => html`<div class="tq-row tq-row--${k ? 'rev' : 'fwd'}"><ul class="tq-row__track">${[0, 1].map((dup) => r.map((t) => card(t, dup)))}</ul></div>`)}
    ${fr ? html`<p class="quotes__note muted small center">Témoignages traduits de l’anglais.</p>` : ''}
  </section>`;
};
