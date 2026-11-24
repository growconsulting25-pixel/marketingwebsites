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
    <div class="carousel carousel--bleed" data-carousel data-carousel-external data-wheel>
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
    <div class="container">${sectionHead({ eyebrow: fr ? 'Témoignages' : 'Testimonials', title: fr ? html`Ce que disent <em>nos clients</em>` : html`What <em>our clients</em> say`, id: 'tq-h', center: true })}
      <p class="tq-rating reveal"><span class="tq-rating__n">${fr ? String(config.reviews.rating).replace('.', ',') : config.reviews.rating}</span><span class="quote__stars" aria-hidden="true">${[1, 2, 3, 4, 5].map(() => icon('star'))}</span><span>${fr ? `${config.reviews.count} avis sur Google` : `${config.reviews.count} Google reviews`}</span></p></div>
    ${rows.map((r, k) => html`<div class="tq-row tq-row--${k ? 'rev' : 'fwd'}"><ul class="tq-row__track">${[0, 1].map((dup) => r.map((t) => card(t, dup)))}</ul></div>`)}
    ${fr ? html`<p class="quotes__note muted small center">Témoignages traduits de l’anglais.</p>` : ''}
  </section>`;
};

// ── v8 (agency look) ────────────────────────────────────────────────────────
// Hero: a website being designed in an editor on a laptop, with the mobile
// version on a phone. Built in HTML so it stays sharp at every size.
export const heroStudio = (lang) => {
  const fr = lang === 'fr';
  const L = fr
    ? { brand: 'Rénovation Laurier', nav: ['Services', 'Projets', 'Avis', 'Contact'], cta: 'Soumission gratuite', kick: 'Rénovation · Montréal', h: 'Votre maison, rénovée sans surprise.', cards: ['Cuisines', 'Salles de bain', 'Sous-sols'], layers: ['En-tête', 'Bannière', 'Services', 'Avis', 'Formulaire'], pages: 'Pages', page: ['Accueil', 'Services', 'Projets'], publish: 'Publier', colors: 'Couleurs', type: 'Typographie', seo: 'SEO et vitesse', checks: ['Titre et méta', 'H1 unique', 'Bilingue FR/EN'], tag: 'Bannière · 1440 × 720' }
    : { brand: 'Laurier Renovation', nav: ['Services', 'Projects', 'Reviews', 'Contact'], cta: 'Free quote', kick: 'Renovation · Montreal', h: 'Your home, renovated with no surprises.', cards: ['Kitchens', 'Bathrooms', 'Basements'], layers: ['Header', 'Hero', 'Services', 'Reviews', 'Form'], pages: 'Pages', page: ['Home', 'Services', 'Projects'], publish: 'Publish', colors: 'Colours', type: 'Typography', seo: 'SEO & speed', checks: ['Title & meta', 'Single H1', 'Bilingual FR/EN'], tag: 'Hero · 1440 × 720' };
  const cardImgs = ['industries/services-pro-560', 'photos/convertir-560', 'industries/construction-560'];
  return html`
  <div class="scene studio" data-scene role="img" aria-label="${fr ? 'Création d’un site web : la maquette d’un site de rénovation est conçue dans un éditeur sur ordinateur, avec sa version mobile sur un téléphone' : 'Website creation: a renovation company site being designed in an editor on a laptop, with its mobile version on a phone'}">
    <div class="scene__stage">
      <div class="scene__laptop layer" style="--z: 0px">
        <div class="lap">
          <div class="lap__screen">
            <div class="ed">
              <div class="ed__bar"><span class="ed__dots"><i></i><i></i><i></i></span><span class="ed__file">${L.brand} — ${L.page[0]}</span><span class="ed__who"><i>MW</i><i>JD</i></span><span class="ed__pub">${L.publish}</span></div>
              <div class="ed__body">
                <div class="ed__side">
                  <small>${L.pages}</small>
                  ${L.page.map((p, i) => html`<span class="ed__row${i === 0 ? ' is-on' : ''}">${p}</span>`)}
                  <small>Layers</small>
                  ${L.layers.map((p, i) => html`<span class="ed__row${i < 3 ? ` ed__layer ed__layer--${i + 1}` : ''}">▢ ${p}</span>`)}
                </div>
                <div class="ed__canvas">
                  <div class="site site--build">
                    <div class="site__nav bl bl--1"><b>${L.brand}</b>${L.nav.map((n) => html`<span>${n}</span>`)}<em>${L.cta}</em></div>
                    <div class="site__hero bl bl--2">
                      <img src="/assets/img/industries/construction-560.webp" alt="" width="560" height="371" fetchpriority="high">
                      <div class="site__hero-txt"><small>${L.kick}</small><strong>${L.h}</strong><span class="site__cta">${L.cta}</span></div>
                    </div>
                    <div class="site__cards bl bl--3">${L.cards.map((c, i) => html`<span><img src="/assets/img/${cardImgs[i]}.webp" alt="" width="560" height="373" loading="lazy"><b>${c}</b></span>`)}</div>
                  </div>
                  <span class="ed__sel" aria-hidden="true"><i></i><i></i><i></i><i></i><b>${L.tag}</b></span>
                  <span class="ed__cursor" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 2l16 9-7 2-3 7z" fill="currentColor" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg><b>Marketing Websites</b></span>
                </div>
                <div class="ed__props">
                  <small>${L.colors}</small>
                  <span class="ed__sw"><i style="background:#191B28"></i><i style="background:#C02942"></i><i style="background:#FFFFFF"></i><i style="background:#222222"></i></span>
                  <small>${L.type}</small>
                  <span class="ed__font">Montserrat <b>800</b></span>
                  <small>${L.seo}</small>
                  ${L.checks.map((c) => html`<span class="ed__ok">${icon('check')}${c}</span>`)}
                  <span class="ed__score"><svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" stroke-opacity=".18" stroke-width="3"/><circle class="ed__ring" cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" pathLength="100" stroke-dasharray="98 100" transform="rotate(-90 18 18)"/></svg><b>98</b><span>PageSpeed</span></span>
                </div>
              </div>
            </div>
          </div>
          <div class="lap__base"></div>
        </div>
      </div>
      <div class="scene__phone layer" style="--z: 90px">
        <div class="phone">
          <i class="phone__island"></i>
          <div class="phone__screen phone__screen--site">
            <span class="ms__nav"><b>${L.brand}</b><i></i></span>
            <span class="ms__hero"><img src="/assets/img/industries/construction-560.webp" alt="" width="560" height="371" loading="lazy"><b>${L.h}</b></span>
            <span class="ms__btn">${L.cta}</span>
            <span class="ms__cards">${L.cards.slice(0, 2).map((c, i) => html`<span><img src="/assets/img/${cardImgs[i]}.webp" alt="" width="560" height="373" loading="lazy"><b>${c}</b></span>`)}</span>
          </div>
        </div>
      </div>
      <div class="scene__toast layer" style="--z: 150px">${icon('globe')}<span><b>${fr ? 'Site en ligne' : 'Site is live'}</b>renovationlaurier.ca</span></div>
    </div>
  </div>`;
};

// Services as an agency-style index: big numbered rows, a preview that shows
// the actual deliverable (Google results, an ad, a post, a dashboard…) on hover.
const svcOrder = ['svc-web', 'svc-seo', 'svc-ads', 'svc-social', 'svc-ecom', 'svc-app', 'svc-analytics', 'svc-crm'];
const serp = (fr, ad) => {
  const q = ad ? (fr ? 'rénovation cuisine montréal' : 'kitchen renovation montreal') : (fr ? 'conception site web montréal' : 'web design montreal');
  const top = ad
    ? html`<span class="pv-res pv-res--top"><i class="pv-tag">${fr ? 'Commandité' : 'Sponsored'}</i><small>renovationlaurier.ca</small><b>${fr ? 'Rénovation de cuisine — Soumission gratuite en 24 h' : 'Kitchen Renovation — Free Quote in 24 h'}</b><span>${fr ? 'Plus de 300 projets à Montréal. Garantie 5 ans.' : '300+ projects in Montreal. 5-year warranty.'}</span><span class="pv-ext"><em>${icon('phone')} ${fr ? 'Appeler' : 'Call'}</em><em>${fr ? 'Soumission' : 'Get a quote'}</em></span></span>`
    : html`<span class="pv-res pv-res--top"><i class="pv-rank">#1</i><small>votreentreprise.ca › services</small><b>${fr ? 'Conception de sites web à Montréal | Votre Entreprise' : 'Web Design Montreal | Your Business'}</b><span class="pv-stars">${[1, 2, 3, 4, 5].map(() => icon('star'))}<u>4,9 (127)</u></span></span>`;
  return html`<span class="pv pv-serp"><span class="pv-q">${icon('search')}<span>${q}</span></span>${top}<span class="pv-res pv-res--dim"><small>concurrent.ca</small><b>&nbsp;</b><span>&nbsp;</span></span><span class="pv-res pv-res--dim"><small>annuaire.com</small><b>&nbsp;</b></span></span>`;
};
const preview = (id, fr) => {
  switch (id) {
    case 'svc-web': return html`<span class="pv pv-img"><img src="/assets/img/work/renovationaf-com.webp" alt="" width="800" height="498" loading="lazy"></span>`;
    case 'svc-ecom': return html`<span class="pv pv-img"><img src="/assets/img/work/daboomdesserts-com.webp" alt="" width="800" height="498" loading="lazy"></span>`;
    case 'svc-app': return html`<span class="pv pv-img"><img src="/assets/img/work/powerupleads-com-2.webp" alt="" width="800" height="498" loading="lazy"></span>`;
    case 'svc-seo': return serp(fr, false);
    case 'svc-ads': return serp(fr, true);
    case 'svc-social': return html`<span class="pv pv-social"><span class="pv-post"><span class="pv-post__head"><i>P</i><b>portovino.mtl</b><small>${fr ? 'Commandité' : 'Sponsored'}</small></span><img src="/assets/img/industries/restaurant-560.webp" alt="" width="560" height="373" loading="lazy"><span class="pv-post__cta">${fr ? 'Réserver une table' : 'Book a table'} ${icon('arrow')}</span><span class="pv-post__foot">♥ 1 284 · 96 ${fr ? 'commentaires' : 'comments'}</span></span><span class="pv-social__side"><b>+38 %</b><small>${fr ? 'réservations en ligne' : 'online bookings'}</small><b>4,2 k</b><small>${fr ? 'abonnés gagnés' : 'new followers'}</small></span></span>`;
    case 'svc-analytics': return html`<span class="pv pv-an"><span class="pv-an__top"><span><small>${fr ? 'Visiteurs (30 j)' : 'Visitors (30 d)'}</small><b>12 480</b><em>+18 %</em></span><span><small>${fr ? 'Demandes' : 'Leads'}</small><b>214</b><em>+27 %</em></span></span><svg viewBox="0 0 200 60" aria-hidden="true"><path d="M0 50 L20 44 L40 46 L60 34 L80 38 L100 26 L120 30 L140 18 L160 20 L180 10 L200 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="pv-an__bars">${[['Google', 46], ['Google Ads', 28], ['Social', 16], ['Direct', 10]].map(([n, v]) => html`<span><i>${n}</i><u style="--v:${v}%"></u><b>${v} %</b></span>`)}</span></span>`;
    case 'svc-crm': return html`<span class="pv pv-crm"><span class="pv-crm__head"><b>Utilmo</b><small>${fr ? 'Nouveaux prospects' : 'New leads'}</small></span>${[[fr ? 'Julie M.' : 'Julie M.', 'Google Ads', fr ? 'Nouveau' : 'New', 'is-new'], ['Marc T.', fr ? 'Site web' : 'Website', fr ? 'Relance aujourd’hui' : 'Follow up today', 'is-due'], ['Sofia R.', 'Facebook', fr ? 'Rendez-vous' : 'Meeting booked', 'is-ok']].map(([n, src, st, c]) => html`<span class="pv-lead"><i>${n[0]}</i><span><b>${n}</b><small>${src}</small></span><em class="${c}">${st}</em></span>`)}</span>`;
    default: return '';
  }
};
export const servicesIndex = (lang) => {
  const fr = lang === 'fr';
  const t = ui[lang];
  const list = svcOrder.map((id) => services.find((s) => s.id === id)).filter(Boolean);
  return html`
  <section class="section sx" aria-labelledby="svc-h" data-sx>
    <div class="container">
      <div class="sx__head">
        ${sectionHead({ eyebrow: fr ? 'Nos services' : 'Our services', title: fr ? html`Agence marketing web : <em>tout sous un même toit</em>` : html`Website marketing services, <em>all under one roof</em>`, lead: fr ? 'Conception de sites web, référencement, publicité et suivi des clients : une seule équipe à Montréal, en français et en anglais.' : 'Website design, SEO, advertising and lead follow-up: one Montreal team, in English and French.', id: 'svc-h' })}
        <a class="btn btn--ghost reveal" href="${link('services', lang)}">${t.nav.svcHub} ${icon('arrow')}</a>
      </div>
      <ol class="sx__list">
        ${list.map((s, i) => html`
          <li class="sx__item reveal" data-delay="${(i % 4) + 1}">
            <a href="${link(s.id, lang)}" data-sx-img>
              <span class="sx__n tabnum">${String(i + 1).padStart(2, '0')}</span>
              <span class="sx__t">${s[lang].nav}</span>
              <span class="sx__d">${s[lang].short}</span>
              <span class="sx__go">${icon('arrow')}</span>
              <span class="sx__thumb" aria-hidden="true">${icon(s.icon)}</span>
              <span class="sx__prev" aria-hidden="true">${preview(s.id, fr)}</span>
            </a>
          </li>`)}
      </ol>
    </div>
    <div class="sx__float" aria-hidden="true"></div>
  </section>`;
};

// Selected work: large real project mockups on the brand blue.
export const workShowcase = (lang) => {
  const fr = lang === 'fr';
  const picks = [
    ['renovationaf-com', fr ? 'Construction et rénovation' : 'Construction & renovation'],
    ['daboomdesserts-com', fr ? 'Restauration · E-commerce' : 'Food · E-commerce'],
    ['irsa-laser', fr ? 'Clinique esthétique' : 'Aesthetic clinic'],
    ['eliterealestategroup', fr ? 'Immobilier' : 'Real estate'],
    ['thermoshades-com', fr ? 'Commerce de détail' : 'Retail'],
    ['mynotaire-ca', fr ? 'Services professionnels' : 'Professional services'],
  ].map(([slug, cat]) => ({ ...portfolio.find((p) => p.slug === slug), cat })).filter((p) => p.slug);
  return html`
  <section class="section sec-blue wk" aria-labelledby="wk-h">
    <div class="container">
      <div class="split-head">
        ${sectionHead({ eyebrow: fr ? 'Réalisations' : 'Selected work', title: fr ? html`Des sites conçus <em>pour vendre</em>` : html`Websites designed <em>to sell</em>`, lead: fr ? `Plus de ${portfolio.length} sites livrés à Montréal, pour des entreprises de toutes les industries.` : `More than ${portfolio.length} websites delivered in Montreal, for businesses in every industry.`, id: 'wk-h' })}
        <a class="btn btn--light reveal" href="${link('work', lang)}">${fr ? `Voir les ${portfolio.length} projets` : `See all ${portfolio.length} projects`} ${icon('arrow')}</a>
      </div>
      <ul class="wk__grid">
        ${picks.map((p, i) => html`
          <li class="wk__item reveal" data-delay="${(i % 2) + 1}">
            <a href="${link('work', lang)}" data-tilt-card>
              <span class="wk__media"><img src="${p.image}" alt="${fr ? 'Site web de' : 'Website for'} ${esc(p.name)}" width="${p.w}" height="${p.h}" loading="lazy" decoding="async"></span>
              <span class="wk__cap"><b>${p.name}</b><small>${p.cat}</small><span class="wk__go">${icon('arrow')}</span></span>
            </a>
          </li>`)}
      </ul>
    </div>
  </section>`;
};

// Team / studio section (replaces the repeated "how it works" carousel)
export const teamSection = (lang) => {
  const fr = lang === 'fr';
  const pts = fr
    ? [['user', 'Un seul interlocuteur', 'Une personne qui connaît votre entreprise et vous répond rapidement, du premier appel au rapport mensuel.'], ['globe', 'Bilingue par défaut', 'Chaque page, annonce et courriel est rédigé en français et en anglais.'], ['inbox', 'Notre propre technologie', 'Nous avons créé Utilmo, notre CRM, pour qu’aucun prospect ne vous échappe.']]
    : [['user', 'One point of contact', 'Someone who knows your business and answers fast, from the first call to the monthly report.'], ['globe', 'Bilingual by default', 'Every page, ad and email is written in English and French.'], ['inbox', 'Our own technology', 'We built Utilmo, our CRM, so no lead ever slips through the cracks.']];
  const ring = fr ? 'MARKETING WEBSITES · MONTRÉAL · DEPUIS 2015 · ' : 'MARKETING WEBSITES · MONTREAL · SINCE 2015 · ';
  return html`
  <section class="section team2" aria-labelledby="team-h">
    <div class="container team2__in">
      <div class="team2__media reveal" data-todo="${fr ? 'Remplacer par une vraie photo de l’équipe' : 'Replace with a real team photo'}">
        <figure class="team2__main" data-tilt-card><img src="/assets/img/photos/equipe.webp" alt="${fr ? 'L’équipe de Marketing Websites au travail' : 'The Marketing Websites team at work'}" width="1600" height="625" loading="lazy" decoding="async"></figure>
        <figure class="team2__sub"><img src="/assets/img/industries/equipe-travail-560.webp" alt="" width="560" height="373" loading="lazy" decoding="async"></figure>
        <div class="team2__ring" aria-hidden="true"><svg viewBox="0 0 120 120"><defs><path id="ringp" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0"/></defs><text><textPath href="#ringp" textLength="286" lengthAdjust="spacing">${ring}</textPath></text></svg><img src="/assets/img/logo-mark-white.png" alt="" width="256" height="256"></div>
        <div class="team2__card"><span class="team2__faces">${testimonialsData.slice(0, 4).map((t) => html`<img src="${t.photo}" alt="" width="40" height="40" loading="lazy">`)}</span><span><span class="quote__stars" aria-hidden="true">${[1, 2, 3, 4, 5].map(() => icon('star'))}</span><b>${fr ? `${String(config.reviews.rating).replace('.', ',')} · ${config.reviews.count} avis Google` : `${config.reviews.rating} · ${config.reviews.count} Google reviews`}</b></span></div>
      </div>
      <div class="team2__copy">
        ${sectionHead({ eyebrow: fr ? 'L’équipe' : 'The team', title: fr ? html`Une équipe montréalaise <em>à qui vous parlez vraiment</em>` : html`A Montreal team <em>you actually talk to</em>`, lead: fr ? `Depuis 2015, Nizaar et l’équipe de Marketing Websites ont livré plus de ${portfolio.length} sites web pour des entreprises d’ici. Vous travaillez avec les mêmes personnes du début à la fin.` : `Since 2015, Nizaar and the Marketing Websites team have delivered more than ${portfolio.length} websites for local businesses. You work with the same people from start to finish.`, id: 'team-h' })}
        <ul class="team2__pts">${pts.map(([ic, t, d], i) => html`<li class="reveal" data-delay="${i + 1}"><span class="team2__ic">${icon(ic)}</span><span><b>${t}</b><span>${d}</span></span></li>`)}</ul>
        <div class="btn-row reveal">${arrowBtn(link('about', lang), fr ? 'Découvrir l’équipe' : 'Meet the team', { cls: '' })}<a class="link" href="${link('contact', lang)}">${fr ? 'Prendre un café avec nous' : 'Grab a coffee with us'} ${icon('arrow')}</a></div>
      </div>
    </div>
  </section>`;
};
