import config from '../../site.config.mjs';
import { link } from '../routes.mjs';
import { ui } from '../content/ui.mjs';
import { reServices, systemSteps } from '../content/realestate.mjs';
import { articles } from '../content/articles.mjs';
import { portfolio, portfolioTypes } from '../content/portfolio.mjs';
import { testimonials as testimonialsData, clientLogos } from '../content/testimonials.mjs';
import { html, esc, icon, todo } from './html.mjs';

const T = (lang) => ui[lang];
export const arrowBtn = (href, label, { cls = '', cta = '' } = {}) =>
  html`<a class="btn ${cls}" href="${href}"${cta ? ` data-cta="${cta}"` : ''}>${label} ${icon('arrow')}</a>`;

// ── Illustrations (drawn in SVG — no stock imagery) ─────────────────────────
// Colours come from --art-* variables (see site.css), 6 palettes.
export const houseArt = (n = 0, label = '') => `<svg class="house-art house-art--${(n % 6) + 1}" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" ${label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"'}>
<rect class="ha-sky" width="160" height="100"/><circle class="ha-sun" cx="128" cy="22" r="10"/>
<rect class="ha-ground" y="78" width="160" height="22"/>
<path class="ha-wall" d="M30 78V48l28-20 28 20v30z"/><path class="ha-roof-line" d="M24 50 58 25l34 25"/>
<rect class="ha-roof" x="50" y="58" width="14" height="20"/><rect class="ha-win" x="38" y="50" width="9" height="9"/><rect class="ha-win" x="69" y="50" width="9" height="9"/>
<path class="ha-wall ha-far" d="M96 78V56h40v22z"/><path class="ha-roof-line ha-far" d="M92 58l24-14 24 14"/>
<circle class="ha-tree" cx="14" cy="70" r="10"/><circle class="ha-tree" cx="148" cy="72" r="9"/></svg>`;

const listingCard = (lang, i, price, area, specs) => html`
  <div class="listing" style="--i:${i}">
    ${houseArt(i)}
    <div class="listing__body">
      <span class="listing__price">${price}</span>
      <span class="listing__area">${area}</span>
      <span class="listing__specs">${specs}</span>
    </div>
  </div>`;

export const heroMock = (lang) => {
  const fr = lang === 'fr';
  const L = [
    { img: 'outremont', price: fr ? '1 150 000 $' : '$1,150,000', area: 'Outremont', specs: fr ? '4 ch. · 3 sdb · 2 450 pi²' : '4 bd · 3 ba · 2,450 sq ft', tag: fr ? 'Nouveau' : 'New' },
    { img: 'laval', price: fr ? '689 000 $' : '$689,000', area: 'Laval (Sainte-Dorothée)', specs: fr ? '3 ch. · 2 sdb · garage double' : '3 bd · 2 ba · double garage', tag: fr ? 'Visite libre' : 'Open house' },
    { img: 'rosemont', price: fr ? '849 000 $' : '$849,000', area: 'Rosemont', specs: fr ? '3 ch. · 2 sdb · terrasse' : '3 bd · 2 ba · terrace', tag: fr ? 'Vendu' : 'Sold' },
  ];
  return html`
  <div class="hero-mock" role="img" aria-label="${fr ? 'Exemple : site de courtier avec inscriptions Centris synchronisées et formulaire d’évaluation sur mobile' : 'Example: broker website with synced Centris listings and a mobile valuation form'}" data-tilt>
    <div class="device device--desktop">
      <div class="device__bar"><i></i><i></i><i></i><span>${fr ? 'votrenom.ca/proprietes' : 'yourname.ca/listings'}</span></div>
      <div class="device__screen">
        <div class="ms-nav"><b>${fr ? 'Votre Nom' : 'Your Name'}</b><span>${fr ? 'Propriétés' : 'Listings'}</span><span>${fr ? 'Vendre' : 'Sell'}</span><span>${fr ? 'Acheter' : 'Buy'}</span><em>${fr ? 'Évaluation' : 'Valuation'}</em></div>
        <div class="ms-banner">
          <img src="/assets/img/listings/salon.webp" alt="" width="900" height="612" fetchpriority="high">
          <div class="ms-banner__txt"><small>${fr ? 'Courtier immobilier résidentiel' : 'Residential real estate broker'}</small><strong>${fr ? 'Vendre au bon prix, sans stress.' : 'Sell at the right price, stress-free.'}</strong>
            <span class="ms-search">${icon('search')} ${fr ? 'Ville, quartier ou n° Centris' : 'City, area or Centris #'}</span></div>
        </div>
        <div class="ms-sync"><span class="pulse"></span>${fr ? 'Synchronisé avec Centris' : 'Synced with Centris'} · <span class="tabnum">${fr ? 'il y a 2 min' : '2 min ago'}</span></div>
        <div class="ms-listings">
          ${L.map((l, i) => html`
          <div class="listing" style="--i:${i}">
            <div class="listing__img"><img src="/assets/img/listings/${l.img}.webp" alt="" width="560" height="373" loading="eager"><span class="listing__tag${l.tag === 'Vendu' || l.tag === 'Sold' ? ' is-sold' : ''}">${l.tag}</span></div>
            <div class="listing__body"><span class="listing__price tabnum">${l.price}</span><span class="listing__area">${l.area}</span><span class="listing__specs">${l.specs}</span></div>
          </div>`)}
        </div>
      </div>
    </div>
    <div class="device device--phone">
      <div class="device__notch"></div>
      <div class="device__screen ph-form">
        <div class="ph-steps" aria-hidden="true"><i class="is-done"></i><i class="is-on"></i><i></i></div>
        <small>${fr ? 'Évaluation gratuite · Étape 2 de 3' : 'Free valuation · Step 2 of 3'}</small>
        <strong>${fr ? 'Combien vaut ma propriété?' : 'What’s my home worth?'}</strong>
        <label>${fr ? 'Adresse' : 'Address'}<span class="ph-field ph-field--typed"><span data-type-text="${fr ? '4820, rue Saint-Denis, Montréal' : '4820 Saint-Denis St, Montreal'}"></span><i class="caret"></i></span></label>
        <label>${fr ? 'Type de propriété' : 'Property type'}</label>
        <span class="ph-chips"><b class="is-on">${fr ? 'Maison' : 'House'}</b><b>Condo</b><b>Plex</b></span>
        <span class="ph-row"><label>${fr ? 'Chambres' : 'Bedrooms'}<span class="ph-field">3</span></label><label>${fr ? 'Salles de bain' : 'Bathrooms'}<span class="ph-field">2</span></label></span>
        <label>${fr ? 'Quand pensez-vous vendre?' : 'When do you plan to sell?'}<span class="ph-field ph-select">${fr ? 'D’ici 3 à 6 mois' : 'Within 3–6 months'}</span></label>
        <label class="ph-email">${fr ? 'Courriel' : 'Email'}<span class="ph-field">marie.l@courriel.ca</span></label>
        <span class="ph-btn">${fr ? 'Recevoir mon évaluation' : 'Get my valuation'}</span>
        <span class="ph-note">${icon('shield')} ${fr ? 'Gratuit · sans engagement' : 'Free · no commitment'}</span>
      </div>
    </div>
    <div class="toast-mock">${icon('inbox')}<span><b>${fr ? 'Nouvelle demande d’évaluation' : 'New valuation request'}</b>${fr ? 'Rosemont · envoyée à Utilmo' : 'Rosemont · sent to Utilmo'}</span></div>
  </div>`;
};

// Utilmo dashboard (recreated from the real UI, fictional contacts — no client data)
export const utilmoMock = (lang) => {
  const fr = lang === 'fr';
  const side = fr
    ? [['layout', 'Dashboard'], ['building', 'Propriétés'], ['users', 'Contacts/CRM'], ['globe', 'Site Web'], ['megaphone', 'Pages de publicité'], ['calendar', 'Calendrier'], ['cart', 'Marketplace']]
    : [['layout', 'Dashboard'], ['building', 'Properties'], ['users', 'Contacts/CRM'], ['globe', 'Website'], ['megaphone', 'Ad pages'], ['calendar', 'Calendar'], ['cart', 'Marketplace']];
  const feed = fr
    ? [['new', 'inbox', 'Nouvelle demande d’évaluation de Marie Lavoie (Rosemont)', 'mer. 18 novembre 2026'], ['mail', 'mail', 'Courriel reçu de Jean Tremblay.', ''], ['bday', 'user', 'C’est l’anniversaire de Sophie Gagnon!', ''], ['late', 'user', 'Luc Bergeron : n’a pas été contacté depuis 7 jours', 'mar. 17 novembre 2026'], ['task', 'calendar', 'Suivi à faire aujourd’hui avec Nadia Roy : « vente de propriété »', ''], ['late', 'user', 'Karim Haddad : n’a pas été contacté depuis 8 jours', 'lun. 16 novembre 2026']]
    : [['new', 'inbox', 'New valuation request from Marie Lavoie (Rosemont)', 'Wed. November 18, 2026'], ['mail', 'mail', 'Email received from Jean Tremblay.', ''], ['bday', 'user', 'It’s Sophie Gagnon’s birthday!', ''], ['late', 'user', 'Luc Bergeron: not contacted for 7 days', 'Tue. November 17, 2026'], ['task', 'calendar', 'Follow-up due today with Nadia Roy: “property sale”', ''], ['late', 'user', 'Karim Haddad: not contacted for 8 days', 'Mon. November 16, 2026']];
  const days = fr ? ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return html`
  <div class="laptop" role="img" aria-label="${fr ? 'Tableau de bord Utilmo sur un ordinateur portable : calendrier des suivis et assistant virtuel (contacts fictifs)' : 'Utilmo dashboard on a laptop: follow-up calendar and virtual assistant (fictional contacts)'}" data-crm>
    <div class="laptop__screen">
      <div class="um">
        <div class="um__top">
          <span class="um__logo" aria-hidden="true"><svg viewBox="0 0 40 40" width="26" height="26"><rect x="2" y="2" width="36" height="36" rx="8" fill="none" stroke="currentColor" stroke-width="2.5"/><text x="20" y="30" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="26" fill="currentColor">u</text></svg></span>
          <span class="um__search">${fr ? 'Essayez la recherche « Application mobile »' : 'Try searching “Mobile app”'} ${icon('search')}</span>
          <span class="um__icons">${icon('calendar')}${icon('users')}${icon('phone')}${icon('mail')}<span class="um__bell">${icon('inbox')}<i></i></span><span class="um__avatar"></span></span>
        </div>
        <div class="um__body">
          <nav class="um__side">${side.map(([ic, t], i) => html`<span class="${i === 0 ? 'is-on' : ''}">${icon(ic)}<b>${t}</b></span>`)}</nav>
          <div class="um__main">
            <div class="um__tabs"><b class="is-on">${fr ? 'Assistant virtuel' : 'Virtual assistant'}</b><b>${fr ? 'Statistiques sur les prospects' : 'Lead statistics'}</b><b>${fr ? 'Statistiques du site web' : 'Website statistics'}</b></div>
            <div class="um__grid">
              <div class="um__panel um__cal">
                <div class="um__month"><span>‹</span><b>${fr ? 'Novembre 2026' : 'November 2026'}</b><span>›</span></div>
                <div class="um__days">${days.map((d) => html`<i>${d}</i>`)}${Array.from({ length: 35 }, (_, k) => { const n = k + 1; const d = n <= 30 ? n : n - 30; return html`<span class="${n === 18 ? 'is-today' : ''}${n > 30 ? ' is-out' : ''}${[19, 24, 26].includes(n) ? ' has-ev' : ''}">${d}</span>`; })}</div>
                <p class="um__follow"><b>${fr ? 'Suivis' : 'Follow-ups'}</b> · ${fr ? '18 novembre 2026' : 'November 18, 2026'}</p>
                <div class="um__event">${fr ? '14 h — Appel avec Marie Lavoie (évaluation)' : '2 pm — Call with Marie Lavoie (valuation)'}</div>
                <span class="um__btn">${fr ? 'Ajouter un suivi' : 'Add a follow-up'}</span>
              </div>
              <div class="um__panel um__feed">
                <div class="um__feedhead"><b>${fr ? 'ASSISTANT VIRTUEL' : 'VIRTUAL ASSISTANT'}</b><span>Options ▾</span></div>
                ${feed.map(([k, ic, t, d], i) => html`${d ? html`<p class="um__date">${d}</p>` : ''}<div class="um__item um__item--${k}" style="--i:${i}">${icon(ic)}<span>${t}</span><em>Actions ▾</em></div>`)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="laptop__base" aria-hidden="true"></div>
    <div class="crm__toast" aria-hidden="true">+1 ${fr ? 'prospect' : 'lead'}</div>
  </div>`;
};

// ── Sections ────────────────────────────────────────────────────────────────
export const sectionHead = ({ eyebrow, title, lead, center = false, id = '' }) => html`
  <header class="section-head${center ? ' section-head--center' : ''} reveal">
    ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
    <h2${id ? ` id="${id}"` : ''}>${title}</h2>
    ${lead ? html`<p class="lead">${lead}</p>` : ''}
  </header>`;

export const proofStrip = (lang) => {
  const fr = lang === 'fr';
  const years = new Date().getFullYear() - config.foundingYear;
  const p = config.proof;
  const stat = (value, label, count) => html`<div class="proof__item reveal"><span class="proof__num tabnum"${count != null ? ` data-count="${count}"` : ''}>${value}</span><span class="proof__label">${label}</span></div>`;
  return html`
  <section class="proof" aria-label="${fr ? 'En chiffres' : 'By the numbers'}">
    <div class="container proof__grid">
      ${stat(String(years), fr ? `ans à bâtir des sites (depuis ${config.foundingYear})` : `years building sites (since ${config.foundingYear})`, years)}
      ${p.brokerSites ? stat(`${p.brokerSites}+`, fr ? 'sites de courtiers lancés' : 'broker sites launched', p.brokerSites) : stat('Centris', fr ? 'inscriptions synchronisées automatiquement' : 'listings synced automatically')}
      ${p.googleRating ? stat(`${String(p.googleRating).replace('.', fr ? ',' : '.')}★`, fr ? `note Google (${p.googleReviewCount} avis)` : `Google rating (${p.googleReviewCount} reviews)`) : stat('Utilmo', fr ? 'notre propre CRM, conçu à Montréal' : 'our own CRM, built in Montreal')}
      ${stat('FR · EN', fr ? 'bilingue par défaut, pas en option' : 'bilingual by default, not an add-on')}
    </div>
    <div class="marquee" aria-hidden="true"><div class="marquee__track">
      ${[0, 1].map(() => html`<span>Montréal</span><span>Laval</span><span>Longueuil</span><span>Québec</span><span>Gatineau</span><span>Sherbrooke</span><span>Trois-Rivières</span><span>Rive-Nord</span><span>Rive-Sud</span><span>Laurentides</span><span>Lanaudière</span><span>Montérégie</span>`)}
    </div></div>
  </section>`;
};

// ── Logo strip (logos shown on the current site) ────────────────────────────
export const logoStrip = (lang) => html`
  <section class="logos" aria-label="${lang === 'fr' ? 'Ils nous font confiance' : 'They trust us'}">
    <div class="container logos__in">
      <p class="logos__label">${lang === 'fr' ? 'Des courtiers et entreprises affiliés à' : 'Brokers and businesses affiliated with'}</p>
      <ul class="logos__list">
        ${[0, 1].map((dup) => clientLogos.map((l) => html`<li${dup ? ' aria-hidden="true"' : ''}><img src="/assets/img/logos/${l.file}.webp" alt="${dup ? '' : esc(l.name)}" width="${l.w}" height="120" loading="lazy" decoding="async"></li>`))}
      </ul>
    </div>
  </section>`;

// ── How it works: 4 image cards (REW "boxed steps" pattern) ─────────────────
export const systemSection = (lang, { eyebrow, title, lead } = {}) => {
  const fr = lang === 'fr';
  const steps = systemSteps[lang];
  const svcName = (id) => reServices.find((s) => s.id === id)?.[lang].nav;
  const photo = { attract: 'attirer', convert: 'convertir', follow: 'suivre', measure: 'mesurer' };
  const head = fr
    ? { attract: 'Soyez trouvé en premier, sur Google, Maps et les réseaux', convert: 'Un site qui transforme les visites en demandes', follow: 'Chaque prospect relancé, automatiquement', measure: 'Sachez exactement ce qui rapporte' }
    : { attract: 'Be found first, on Google, Maps and social', convert: 'A site that turns visits into inquiries', follow: 'Every lead followed up, automatically', measure: 'Know exactly what pays off' };
  const alt = fr
    ? { attract: 'Téléphone affichant des applications de recherche et de réseaux sociaux', convert: 'Maison moderne éclairée au crépuscule', follow: 'Équipe en réunion autour d’un bureau', measure: 'Ordinateur portable affichant un tableau de bord de statistiques' }
    : { attract: 'Phone showing search and social apps', convert: 'Modern house lit at dusk', follow: 'Team meeting around a desk', measure: 'Laptop showing an analytics dashboard' };
  return html`
  <section class="section how" aria-labelledby="system-h">
    <div class="container">
      <header class="how__head reveal">
        <p class="eyebrow eyebrow--on-deep">${eyebrow || (fr ? 'Comment ça marche' : 'How it works')}</p>
        <h2 id="system-h">${title || (fr ? html`Attirer. Convertir. <em>Suivre.</em> Mesurer.` : html`Attract. Convert. <em>Follow up.</em> Measure.`)}</h2>
        <p class="lead">${lead || (fr ? 'Quatre étapes, un seul pipeline : du premier clic d’un vendeur jusqu’au mandat signé. Votre site, vos publicités et votre CRM partagent les mêmes données.' : 'Four steps, one pipeline: from a seller’s first click to the signed listing. Your site, ads and CRM share the same data.')}</p>
      </header>
      <div class="carousel" data-carousel>
        <button class="carousel__btn carousel__btn--prev" type="button" data-carousel-prev aria-label="${fr ? 'Étape précédente' : 'Previous step'}">${icon('arrow')}</button>
        <button class="carousel__btn carousel__btn--next" type="button" data-carousel-next aria-label="${fr ? 'Étape suivante' : 'Next step'}">${icon('arrow')}</button>
      <ol class="how__grid carousel__track" tabindex="0" aria-label="${fr ? 'Les quatre étapes — faites défiler' : 'The four steps — scroll'}" data-carousel-track>
        ${steps.map((s, i) => html`
          <li class="how__card" data-slide>
            <figure class="how__media">
              <img src="/assets/img/photos/${photo[s.key]}-720.webp" srcset="/assets/img/photos/${photo[s.key]}-720.webp 720w, /assets/img/photos/${photo[s.key]}.webp 1200w" sizes="(min-width: 1024px) 560px, 100vw" alt="${alt[s.key]}" width="720" height="480" loading="lazy" decoding="async">
              <span class="how__step"><b class="tabnum">${s.n}</b> ${s.title}</span>
            </figure>
            <div class="how__body">
              <h3>${head[s.key]}</h3>
              <p>${s.text}</p>
              <ul class="how__links">${[...new Set(s.links)].map((id) => html`<li><a href="${link(id, lang)}">${svcName(id)} ${icon('arrow')}</a></li>`)}</ul>
            </div>
          </li>`)}
      </ol>
      </div>
    </div>
  </section>`;
};

export const situations = (lang) => {
  const fr = lang === 'fr';
  const items = fr
    ? [
        { icon: 'user', title: 'Courtier solo', text: 'Une marque personnelle qui attire des vendeurs et met vos inscriptions en valeur.', id: 're-websites', cta: 'Site web de courtier' },
        { icon: 'users', title: 'Équipe', text: 'Des prospects distribués à la bonne personne, et un suivi que personne n’oublie.', id: 're-teams', cta: 'Sites d’équipes' },
        { icon: 'building', title: 'Agence ou bannière', text: 'Une image cohérente, des pages courtiers et du recrutement.', id: 're-teams', cta: 'Sites d’agences' },
      ]
    : [
        { icon: 'user', title: 'Solo broker', text: 'A personal brand that attracts sellers and showcases your listings.', id: 're-websites', cta: 'Broker websites' },
        { icon: 'users', title: 'Team', text: 'Leads routed to the right person, and follow-up nobody forgets.', id: 're-teams', cta: 'Team websites' },
        { icon: 'building', title: 'Agency or banner', text: 'A consistent brand, broker pages and recruiting.', id: 're-teams', cta: 'Agency websites' },
      ];
  return html`
  <section class="section situations" aria-labelledby="sit-h">
    <div class="container situations__in">
      ${sectionHead({ eyebrow: fr ? 'Votre situation' : 'Your situation', title: fr ? 'Par où commencer?' : 'Where should you start?', lead: fr ? 'Choisissez ce qui vous ressemble : nous vous montrons ce qui fonctionne pour des courtiers comme vous.' : 'Pick what fits you: we’ll show you what works for brokers like you.', id: 'sit-h' })}
      <div class="situations__cards">
        ${items.map((it, i) => html`
          <a class="card card--link situation reveal" data-delay="${i + 1}" href="${link(it.id, lang)}">
            <span class="situation__icon">${icon(it.icon)}</span>
            <h3>${it.title}</h3>
            <p>${it.text}</p>
            <span class="card__more">${it.cta} ${icon('arrow')}</span>
          </a>`)}
      </div>
    </div>
  </section>`;
};

// ── Featured client story (REW case-study pattern, real testimonial) ────────
export const featuredCase = (lang) => {
  const fr = lang === 'fr';
  const t = testimonialsData.find((x) => x.id === 'melissa');
  const tiles = fr
    ? [['Plus de mandats', '« J’ai obtenu plus de mandats »'], ['Plus de prospects', '« il m’a aidée à générer plus de prospects »'], ['Plus de visibilité', 'Pour elle, ses inscriptions et sa marque']]
    : [['More listings', '“I definitely got more listings”'], ['More leads', '“it helped me generate more leads”'], ['More visibility', 'For her, her listings and her brand']];
  return html`
  <section class="section story" aria-labelledby="case-h">
    <div class="container story__in">
      <figure class="story__media reveal">
        <img src="/assets/img/photos/maison-soir.webp" srcset="/assets/img/photos/maison-soir-720.webp 720w, /assets/img/photos/maison-soir.webp 1200w" sizes="(min-width: 1024px) 600px, 100vw" alt="${fr ? 'Maison illuminée en soirée' : 'House lit up in the evening'}" width="1200" height="800" loading="lazy" decoding="async">
        <figcaption class="story__person">
          <img src="${t.photo}" alt="" width="64" height="64" loading="lazy">
          <span><b>${t.name}</b>${t.role[lang]}</span>
        </figcaption>
      </figure>
      <div class="story__copy reveal" data-delay="2">
        <p class="eyebrow">${fr ? 'Histoire de client · Courtière résidentielle' : 'Client story · Residential broker'}</p>
        <h2 id="case-h">${fr ? html`Un site à son image, <em>plus de mandats</em>` : html`A site that reflects her, <em>more listings</em>`}</h2>
        <ul class="story__tiles">
          ${tiles.map(([h, p]) => html`<li><b>${h}</b><span>${p}</span></li>`)}
        </ul>
        <blockquote class="story__quote">
          <p>${t[lang]}</p>
          ${fr ? html`<footer>${t.name} · <span class="muted">traduit de l’anglais</span></footer>` : html`<footer>${t.name}</footer>`}
        </blockquote>
        <div class="btn-row">${arrowBtn(link('work', lang), fr ? 'Voir nos réalisations' : 'See our work')}<a class="link" href="${link('re-websites', lang)}">${fr ? 'Site web de courtier' : 'Broker websites'} ${icon('arrow')}</a></div>
      </div>
    </div>
  </section>`;
};

const workCard = (lang, w, i) => {
  const fr = lang === 'fr';
  return html`
  <article class="work reveal" data-type="${w.type}" data-delay="${(i % 3) + 1}">
    <div class="work__shot">
      <img src="${w.image}" alt="${fr ? 'Site web de' : 'Website for'} ${esc(w.name)}" width="${w.w}" height="${w.h}" loading="lazy" decoding="async">
      ${w.metric ? html`<span class="badge work__badge">${w.metric}</span>` : ''}
    </div>
    <div class="work__meta">
      <h3>${w.name}</h3>
      <p><span class="tag">${portfolioTypes[lang][w.type]}</span></p>
      ${w.url ? html`<a class="link" href="${w.url}" rel="noopener" target="_blank">${fr ? 'Voir le site' : 'Visit site'} ${icon('arrow')}</a>` : ''}
    </div>
  </article>`;
};

export const portfolioGrid = (lang, { filters = false, limit = 6, realEstateOnly = false } = {}) => {
  const sorted = [...portfolio].sort((a, b) => (a.type === 'autre') - (b.type === 'autre'));
  const items = (realEstateOnly ? sorted.filter((w) => w.type !== 'autre') : sorted).slice(0, limit);
  const types = portfolioTypes[lang];
  return html`
  ${filters ? html`<div class="filters" role="group" aria-label="${lang === 'fr' ? 'Filtrer les réalisations' : 'Filter work'}" data-filters>
    ${Object.entries(types).map(([k, v], i) => html`<button type="button" class="tag tag--btn" aria-pressed="${i === 0}" data-filter="${k}">${v}</button>`)}
  </div>` : ''}
  <div class="work-grid" data-work-grid>${items.map((w, i) => workCard(lang, w, i))}</div>`;
};

export const utilmoSpotlight = (lang) => {
  const fr = lang === 'fr';
  return html`
  <section class="section utilmo" aria-labelledby="utilmo-h">
    <div class="container utilmo__in">
      <div class="utilmo__copy">
        ${sectionHead({ eyebrow: fr ? 'Notre CRM' : 'Our CRM', title: fr ? 'Utilmo : chaque prospect, suivi jusqu’au mandat' : 'Utilmo: every lead, followed to the listing', id: 'utilmo-h' })}
        <ul class="ticks reveal">
          ${(fr ? ['Pages d’atterrissage reliées au CRM', 'Pipeline de prospects avec leur source', 'Campagnes courriel et relances automatiques', 'Statistiques : ce qui rapporte vraiment'] : ['Landing pages connected to the CRM', 'Lead pipeline with each source', 'Email campaigns and automatic follow-ups', 'Analytics: what actually pays off']).map((x) => html`<li>${icon('check')}${x}</li>`)}
        </ul>
        <p class="reveal small muted">${fr ? 'Utilmo est développé et opéré par Marketing Websites Inc. — peu d’agences d’ici possèdent leur propre CRM.' : 'Utilmo is built and operated by Marketing Websites Inc. — few local agencies own their CRM.'}</p>
        <div class="btn-row reveal">${arrowBtn(link('demo', lang), T(lang).cta.demo, { cta: 'demo' })}<a class="link" href="${link('re-utilmo', lang)}">${fr ? 'Découvrir Utilmo' : 'Discover Utilmo'} ${icon('arrow')}</a></div>
      </div>
      <div class="utilmo__visual reveal" data-delay="2">${utilmoMock(lang)}</div>
    </div>
  </section>`;
};

export const otherIndustries = (lang) => {
  const fr = lang === 'fr';
  const items = fr ? ['Conception web', 'SEO', 'Google Ads', 'Médias sociaux', 'Commerce électronique', 'Développement sur mesure'] : ['Web design', 'SEO', 'Google Ads', 'Social media', 'Ecommerce', 'Custom development'];
  return html`
  <section class="section-tight other" aria-labelledby="other-h">
    <div class="container other__in reveal">
      <div>
        <p class="eyebrow">${fr ? 'Pas en immobilier?' : 'Not in real estate?'}</p>
        <h2 id="other-h" class="h3">${fr ? 'Nous accompagnons aussi les PME d’ici depuis 2015.' : 'We’ve also been helping local SMEs since 2015.'}</h2>
      </div>
      <ul class="chips">${items.map((x) => html`<li class="tag">${x}</li>`)}</ul>
      ${arrowBtn(link('services', lang), T(lang).cta.allServices, { cls: 'btn--ghost' })}
    </div>
  </section>`;
};

export const processSteps = (lang, steps) => {
  const fr = lang === 'fr';
  const s = steps || (fr
    ? [['Consultation', '30 minutes pour comprendre vos objectifs et votre marché.', 'Semaine 0'], ['Stratégie', 'Plan, pages, campagnes et indicateurs à suivre.', 'Semaine 1'], ['Conception', 'Design, rédaction FR/EN, intégrations Centris et Utilmo.', 'Semaines 2–5'], ['Lancement', 'Tests, mise en ligne, formation.', 'Semaine 6'], ['Croissance', 'Publicité, contenu et rapport mensuel.', 'En continu']]
    : [['Consultation', '30 minutes to understand your goals and market.', 'Week 0'], ['Strategy', 'Plan, pages, campaigns and KPIs to track.', 'Week 1'], ['Design', 'Design, FR/EN copy, Centris and Utilmo integrations.', 'Weeks 2–5'], ['Launch', 'Testing, go-live, training.', 'Week 6'], ['Growth', 'Ads, content and monthly reporting.', 'Ongoing']]);
  return html`
  <ol class="process">
    ${s.map(([t, d, w], i) => html`<li class="process__step reveal" data-delay="${Math.min(i + 1, 4)}"><span class="process__n tabnum">${String(i + 1).padStart(2, '0')}</span><div><h3>${t}</h3><p>${d}</p>${w ? html`<span class="process__when">${w}</span>` : ''}</div></li>`)}
  </ol>`;
};

export const testimonials = (lang, n = 3, { skip = [] } = {}) => {
  const fr = lang === 'fr';
  const list = testimonialsData.filter((t) => !skip.includes(t.id)).slice(0, n);
  return html`
  <div class="quotes">
    ${list.map((t, i) => html`
      <figure class="quote card reveal" data-delay="${(i % 3) + 1}">
        <div class="quote__stars" aria-label="5/5">${[1, 2, 3, 4, 5].map(() => icon('star'))}</div>
        <blockquote lang="${lang}-CA">${t[lang]}</blockquote>
        <figcaption><img class="avatar" src="${t.photo}" alt="" width="48" height="48" loading="lazy"><span><b>${t.name}</b><span class="muted">${t.role[lang]}</span></span></figcaption>
      </figure>`)}
  </div>
  ${fr ? html`<p class="quotes__note muted small center">Témoignages traduits de l’anglais.</p>` : ''}
  ${config.googleReviewsUrl ? html`<p class="center"><a class="link" href="${config.googleReviewsUrl}" rel="noopener" target="_blank">${icon('star')} ${fr ? 'Lire nos avis Google' : 'Read our Google reviews'}</a></p>` : ''}`;
};

export const articleCard = (lang, a, i = 0) => {
  const c = a[lang];
  const fr = lang === 'fr';
  return html`
  <a class="card card--link article-card reveal" data-delay="${(i % 3) + 1}" href="${link(a.id, lang)}">
    ${a.image ? html`<figure class="article-card__img"><img src="${a.image.src}" alt="${esc(a.image[lang])}" width="${a.image.w}" height="${a.image.h}" loading="lazy" decoding="async"></figure>` : ''}
    <span class="tag">${({ 'sites-web': fr ? 'Sites web' : 'Websites', publicite: fr ? 'Publicité' : 'Advertising', leads: fr ? 'Génération de leads' : 'Lead generation', crm: fr ? 'Suivi et CRM' : 'Follow-up & CRM' })[a.hub]}</span>
    <h3>${c.title}</h3>
    <p>${c.description}</p>
    <span class="card__more">${T(lang).cta.read} · ${a.minutes} min ${icon('arrow')}</span>
  </a>`;
};

export const latestResources = (lang, ids) => {
  const list = ids ? articles.filter((a) => ids.includes(a.id)) : articles.slice(0, 3);
  return html`<div class="cards-3">${list.map((a, i) => articleCard(lang, a, i))}</div>`;
};

export const faqBlock = (lang, faq, { id = 'faq' } = {}) => html`
  <div class="faq" id="${id}">
    ${faq.map(([q, a]) => html`<details class="faq__item"><summary><span>${q}</span><span class="faq__icon" aria-hidden="true">${icon('plus')}</span></summary><div class="faq__a"><p>${a}</p></div></details>`)}
  </div>`;

export const faqSchema = (faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

// ── Forms (strategy §6: three conversion paths) ─────────────────────────────
const field = (id, label, input, { required = false, hint = '', full = false, lang } = {}) => html`
  <div class="field${full ? ' field--full' : ''}">
    <label for="${id}">${label}${required ? html` <span class="req" aria-hidden="true">*</span><span class="sr-only"> (${T(lang).form.required})</span>` : ''}</label>
    ${input}
    ${hint ? html`<p class="field__hint" id="${id}-hint">${hint}</p>` : ''}
    <p class="field__error" id="${id}-err" aria-live="polite"></p>
  </div>`;
const select = (id, name, opts, lang, required) => html`<select id="${id}" name="${name}"${required ? ' required' : ''} aria-describedby="${id}-err"><option value="">${T(lang).form.choose}</option>${opts.map((o) => html`<option>${o}</option>`)}</select>`;

export const leadForm = (lang, type = 'consultation', { idPrefix = 'f' } = {}) => {
  const f = T(lang).form;
  const p = (s) => `${idPrefix}-${s}`;
  const submit = { consultation: T(lang).cta.consult, quote: T(lang).cta.quote, demo: T(lang).cta.demo }[type];
  const fields = [
    field(p('name'), f.name, html`<input id="${p('name')}" name="name" type="text" autocomplete="name" required aria-describedby="${p('name')}-err">`, { required: true, lang }),
    field(p('email'), f.email, html`<input id="${p('email')}" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="${p('email')}-err">`, { required: true, lang }),
    field(p('phone'), f.phone, html`<input id="${p('phone')}" name="phone" type="tel" autocomplete="tel" inputmode="tel" aria-describedby="${p('phone')}-err">`, { lang }),
  ];
  if (type === 'demo') {
    fields.push(field(p('team'), f.teamSize, select(p('team'), 'team_size', f.teamSizes, lang, true), { required: true, lang }));
    fields.push(field(p('crm'), f.currentCrm, html`<input id="${p('crm')}" name="current_crm" type="text" aria-describedby="${p('crm')}-err">`, { lang }));
  } else {
    fields.push(field(p('role'), f.role, select(p('role'), 'role', f.roles, lang, true), { required: true, lang }));
  }
  if (type === 'quote') {
    const svcOpts = lang === 'fr'
      ? ['Site web de courtier', 'Intégration Centris', 'Site d’équipe ou d’agence', 'Publicité Google / Meta', 'SEO', 'CRM Utilmo', 'Site web PME', 'Commerce électronique', 'Développement sur mesure']
      : ['Broker website', 'Centris integration', 'Team or agency site', 'Google / Meta ads', 'SEO', 'Utilmo CRM', 'SME website', 'Ecommerce', 'Custom development'];
    fields.push(html`<fieldset class="field field--full"><legend>${f.services}</legend><div class="checks">${svcOpts.map((o, i) => html`<label class="check"><input type="checkbox" name="services" value="${o}"><span>${o}</span></label>`)}</div></fieldset>`);
    fields.push(field(p('budget'), f.budget, select(p('budget'), 'budget', f.budgets, lang, true), { required: true, lang }));
    fields.push(field(p('timeline'), f.timeline, select(p('timeline'), 'timeline', f.timelines, lang, true), { required: true, lang }));
    fields.push(field(p('site'), f.site, html`<input id="${p('site')}" name="current_site" type="url" inputmode="url" placeholder="https://" aria-describedby="${p('site')}-err">`, { lang, full: true }));
  }
  if (type !== 'demo') {
    fields.push(field(p('goal'), f.goal, html`<textarea id="${p('goal')}" name="goal" rows="3" placeholder="${esc(f.goalPh)}" aria-describedby="${p('goal')}-err"></textarea>`, { lang, full: true }));
  }
  return html`
  <form class="lead-form" method="post" action="${config.formEndpoint || link('thanks', lang)}" data-lead-form="${type}" novalidate>
    <input type="hidden" name="form_type" value="${type}">
    <input type="hidden" name="language" value="${lang}">
    <input type="hidden" name="page_url" value="">
    <input type="hidden" name="referrer" value="">
    ${['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].map((n) => `<input type="hidden" name="${n}" value="">`)}
    <div class="hp" aria-hidden="true"><label>Website <input type="text" name="company_website" tabindex="-1" autocomplete="off"></label></div>
    <div class="form-grid">${fields}</div>
    <label class="check check--consent"><input type="checkbox" name="marketing_consent" value="yes"><span>${f.consent}</span></label>
    <p class="form-note">${f.privacyNote} <a href="${link('privacy', lang)}">${f.privacyLink}</a>.</p>
    <p class="form-status" role="status" aria-live="polite" data-form-status></p>
    <button class="btn btn--lg" type="submit">${submit} ${icon('arrow')}</button>
  </form>`;
};

export const finalCta = (lang, { title, lead, type = 'consultation' } = {}) => {
  const fr = lang === 'fr';
  return html`
  <section class="section final-cta" id="consultation" aria-labelledby="final-h" data-final-cta>
    <div class="container final-cta__in">
      <div class="final-cta__copy reveal">
        <p class="eyebrow eyebrow--on-deep">${fr ? 'Prochaine étape' : 'Next step'}</p>
        <h2 id="final-h">${title || (fr ? 'Parlons de vos 12 prochains mois' : 'Let’s talk about your next 12 months')}</h2>
        <p class="lead">${lead || (fr ? 'Une consultation de 30 minutes, gratuite et sans engagement : nous regardons votre présence actuelle et vous repartez avec un plan concret.' : 'A free, no-commitment 30-minute consultation: we review your current presence and you leave with a concrete plan.')}</p>
        <ul class="ticks ticks--on-deep">
          ${(fr ? ['Réponse en 1 jour ouvrable', 'En français ou en anglais', 'Aucune obligation'] : ['Reply within 1 business day', 'In French or English', 'No obligation']).map((x) => html`<li>${icon('check')}${x}</li>`)}
        </ul>
        ${config.phone ? html`<p class="final-cta__phone">${fr ? 'Vous préférez parler maintenant?' : 'Prefer to talk now?'} <a href="tel:${config.phone.replace(/[^\d+]/g, '')}" data-track="click_phone">${icon('phone')} ${config.phone}</a></p>` : ''}
      </div>
      <div class="final-cta__form card reveal" data-delay="2">${leadForm(lang, type, { idPrefix: 'cta' })}</div>
    </div>
  </section>`;
};

export const relatedServices = (lang, ids) => html`
  <div class="cards-related">
    ${ids.map((id, i) => {
      const s = reServices.find((x) => x.id === id);
      return html`<a class="card card--link related reveal" data-delay="${i + 1}" href="${link(id, lang)}"><span class="situation__icon">${icon(s.icon)}</span><div><h3>${s[lang].nav}</h3><p>${s[lang].description}</p></div>${icon('arrow', 'related__arrow')}</a>`;
    })}
  </div>`;
