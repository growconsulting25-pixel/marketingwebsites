import config from '../../site.config.mjs';
import { link } from '../routes.mjs';
import { ui } from '../content/ui.mjs';
import { articles, hubs } from '../content/articles.mjs';
import { portfolio } from '../content/portfolio.mjs';
import { html, icon, animWords, todo } from '../lib/html.mjs';
import { breadcrumbs, abs, organizationSchema } from '../lib/layout.mjs';
import { teamSection } from '../lib/sections.mjs';
import { legacyArchive } from './legacy.mjs';
import { sectionHead, arrowBtn, faqBlock, faqSchema, finalCta, portfolioGrid, articleCard, leadForm, processSteps, testimonials } from '../lib/components.mjs';

export const simpleHero = (lang, id, crumbs, eyebrow, h1, lead, extra = '') => html`
  <section class="page-hero">
    <div class="container narrow">
      ${crumbs ? breadcrumbs({ lang, id, breadcrumbs: crumbs }) : ''}
      ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
      <h1 class="h-anim">${animWords(h1)}</h1>
      ${lead ? html`<p class="lead">${lead}</p>` : ''}
      ${extra}
    </div>
  </section>`;

// ── Work ────────────────────────────────────────────────────────────────────
export const work = (lang) => {
  const fr = lang === 'fr';
  const crumbs = [{ id: 'work', label: fr ? 'Réalisations' : 'Work' }];
  return {
    id: 'work', lang, breadcrumbs: crumbs,
    title: fr ? 'Portfolio | Agence de marketing numérique Montréal | Marketing Websites' : 'Portfolio | Digital Marketing Agency Montreal | Marketing Websites',
    description: fr ? 'Portfolio de sites web réalisés par Marketing Websites pour des PME, restaurants, cliniques, entrepreneurs, professionnels et courtiers immobiliers.' : 'Portfolio of websites built by Marketing Websites for small businesses, restaurants, clinics, contractors, professionals and real estate brokers.',
    body: html`
    ${simpleHero(lang, 'work', crumbs, fr ? 'Réalisations' : 'Our work', fr ? 'Des sites réels, des <em>résultats</em> mesurés' : 'Real sites, <em>measured</em> results', fr ? `${portfolio.length} projets réalisés pour des courtiers, des équipes, des agences et des entreprises d’ici. Filtrez par type de client.` : `${portfolio.length} projects for brokers, teams, agencies and local businesses. Filter by client type.`)}
    <section class="section-tight"><div class="container">${portfolioGrid(lang, { filters: true, limit: 50 })}</div></section>
    ${finalCta(lang, { title: fr ? 'Votre site pourrait être le prochain' : 'Your site could be next' })}`,
  };
};

// ── Resources ───────────────────────────────────────────────────────────────
export const resources = (lang) => {
  const fr = lang === 'fr';
  const crumbs = [{ id: 'blog', label: fr ? 'Blogue' : 'Blog' }];
  const pillars = fr
    ? { 'sites-web': 'Le guide de la conception de site web au Québec', publicite: 'Google Ads et Meta pour les PME', leads: 'Générer des prospects en ligne : le système complet', crm: 'Ne plus perdre un prospect : le guide du suivi' }
    : { 'sites-web': 'The Quebec website design guide', publicite: 'Google Ads and Meta for small businesses', leads: 'Generating leads online: the complete system', crm: 'Never lose a lead: the follow-up guide' };
  return {
    id: 'blog', lang, breadcrumbs: crumbs,
    title: fr ? 'Blogue marketing numérique | Marketing Websites' : 'Digital Marketing Blog | Marketing Websites',
    description: fr ? 'Guides et articles sur la conception web, le SEO, Google Ads, les médias sociaux et le suivi des prospects pour les PME du Québec.' : 'Guides and articles on web design, SEO, Google Ads, social media and lead follow-up for Quebec businesses.',
    body: html`
    ${simpleHero(lang, 'blog', crumbs, fr ? 'Blogue' : 'Blog', fr ? 'Conseils concrets en <em>marketing numérique</em>' : 'Practical <em>digital marketing</em> advice', fr ? 'Sites web, SEO, publicité et suivi des prospects : ce que nous apprenons en accompagnant des entreprises d’ici depuis 2015.' : 'Websites, SEO, advertising and lead follow-up: what we learn working with local businesses since 2015.')}
    <section class="section-tight">
      <div class="container">
        <nav class="hub-nav reveal" aria-label="${fr ? 'Thèmes' : 'Topics'}">${hubs[lang].map((h) => html`<a class="tag tag--btn" href="#${h.key}">${h.label}</a>`)}</nav>
        ${hubs[lang].map((h) => {
          const list = articles.filter((a) => a.hub === h.key);
          return html`
          <section class="hub" id="${h.key}" aria-labelledby="hub-${h.key}">
            <div class="hub__head reveal"><h2 id="hub-${h.key}">${h.label}</h2><p class="muted">${fr ? 'Guide de référence :' : 'Pillar guide:'} <em>${pillars[h.key]}</em> — <span class="tag tag--soon">${fr ? 'Bientôt' : 'Coming soon'}</span></p></div>
            ${list.length ? html`<div class="cards-3">${list.map((a, i) => articleCard(lang, a, i))}</div>` : html`<p class="muted reveal">${fr ? 'Premiers articles en préparation.' : 'First articles in progress.'}</p>`}
          </section>`;
        })}
      </div>
    </section>
    ${legacyArchive(lang)}
    ${finalCta(lang)}`,
  };
};

export const articlePage = (a, lang) => {
  const c = a[lang];
  const fr = lang === 'fr';
  const resolve = (s) => s.replace(/\{\{([\w-]+)\}\}/g, (_, id) => link(id, lang));
  const crumbs = [{ id: 'blog', label: fr ? 'Blogue' : 'Blog' }, { id: a.id, label: c.title }];
  const date = (d) => new Date(d + 'T12:00:00').toLocaleDateString(fr ? 'fr-CA' : 'en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  const related = articles.filter((x) => x.id !== a.id).slice(0, 2);
  return {
    id: a.id, lang, title: c.title.length > 52 ? c.title : `${c.title} | Marketing Websites`, description: c.description, breadcrumbs: crumbs, ogType: 'article',
    schema: [
      {
        '@context': 'https://schema.org', '@type': 'Article', headline: c.title, description: c.description, inLanguage: `${lang}-CA`,
        datePublished: a.published, dateModified: a.updated, mainEntityOfPage: abs(link(a.id, lang)),
        author: { '@type': 'Organization', name: 'Marketing Websites' }, publisher: { '@id': abs('/#organization') },
      },
      faqSchema(c.faq),
    ],
    body: html`
    <article class="article">
      <header class="page-hero">
        <div class="container narrow">
          ${breadcrumbs({ lang, id: a.id, breadcrumbs: crumbs })}
          <h1>${c.title}</h1>
          <div class="byline">
            <span class="avatar" aria-hidden="true">${icon('user')}</span>
            <span>${todo(fr ? 'Auteur nommé + titre (ex. « Prénom Nom, stratège marketing immobilier »)' : 'Named author + title (e.g. “First Last, real estate marketing strategist”)')}<br><span class="muted small">${fr ? 'Mis à jour le' : 'Updated'} <time datetime="${a.updated}">${date(a.updated)}</time> · ${a.minutes} min</span></span>
          </div>
        </div>
      </header>
      ${a.image ? html`<figure class="container narrow article__img"><img src="${a.image.src}" alt="${a.image[lang]}" width="${a.image.w}" height="${a.image.h}" fetchpriority="high"></figure>` : ''}
      <div class="container narrow prose">
        <p class="lead answer">${c.intro}</p>
        ${c.sections.map(([h, body]) => html`<h2>${h}</h2>${resolve(body)}`)}
        <aside class="money card">
          <p>${fr ? 'Pour aller plus loin' : 'Take the next step'}</p>
          <a class="btn" href="${link(a.money, lang)}">${c.money} ${icon('arrow')}</a>
        </aside>
        <h2>${fr ? 'Questions fréquentes' : 'Frequently asked questions'}</h2>
        ${faqBlock(lang, c.faq)}
      </div>
    </article>
    <section class="section section--sand">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'À lire aussi' : 'Read next', title: fr ? 'Articles liés' : 'Related articles' })}
        <div class="cards-3">${related.map((r, i) => articleCard(lang, r, i))}</div>
      </div>
    </section>
    ${finalCta(lang)}`,
  };
};

// ── About ───────────────────────────────────────────────────────────────────
export const about = (lang) => {
  const fr = lang === 'fr';
  const crumbs = [{ id: 'about', label: fr ? 'À propos' : 'About' }];
  return {
    id: 'about', lang, breadcrumbs: crumbs,
    title: fr ? 'À propos | Agence web à Montréal depuis 2015 | Marketing Websites' : 'About Us | Montreal Web Agency Since 2015 | Marketing Websites',
    description: fr ? 'Agence web et marketing numérique fondée à Montréal en 2015 : sites web, SEO, Google Ads, médias sociaux et CRM Utilmo pour les PME.' : 'Montreal web and digital marketing agency founded in 2015: websites, SEO, Google Ads, social media and the Utilmo CRM for businesses.',
    schema: [organizationSchema()],
    body: html`
    ${simpleHero(lang, 'about', crumbs, fr ? 'À propos' : 'About', fr ? 'Une équipe montréalaise au service des <em>PME</em> depuis 2015' : 'A Montreal team growing <em>businesses</em> since 2015', fr ? 'Nous avons commencé par bâtir des sites web. Nous avons vite compris qu’une entreprise n’a pas besoin d’un site : elle a besoin de clients. D’où notre approche à service complet — site, visibilité, publicité — et Utilmo, notre propre CRM.' : 'We started by building websites. We quickly learned that businesses don’t need a website: they need customers. Hence our full-service approach — site, visibility, advertising — and Utilmo, our own CRM.')}
    <section class="section-tight">
      <div class="container about-grid">
        <figure class="team-photo reveal"><img src="/assets/img/photos/equipe.webp" alt="${fr ? 'L’équipe de Marketing Websites' : 'The Marketing Websites team'}" width="1600" height="625" loading="lazy" decoding="async"></figure>
        <div class="reveal" data-delay="2">
          <h2 class="h3">${fr ? 'Ce qui nous distingue' : 'What sets us apart'}</h2>
          <ul class="ticks">
            ${(fr ? ['Service complet : site, SEO, publicité, médias sociaux et CRM sous un même toit.', 'Un système connecté : site, publicité et CRM partagent les mêmes données.', 'Notre propre CRM, Utilmo, développé et soutenu à Montréal.', 'Bilingue par défaut, rédigé par des humains.'] : ['Full service: site, SEO, ads, social media and CRM under one roof.', 'One connected system: site, ads and CRM share the same data.', 'Our own CRM, Utilmo, built and supported in Montreal.', 'Bilingual by default, written by people.']).map((x) => html`<li>${icon('check')}${x}</li>`)}
          </ul>
        </div>
      </div>
    </section>
    ${teamSection(lang)}
    <section class="section">
      <div class="container process-wrap">
        ${sectionHead({ eyebrow: fr ? 'Processus' : 'Process', title: fr ? 'Comment nous travaillons' : 'How we work' })}
        ${processSteps(lang)}
      </div>
    </section>
    <section class="section section--sand">
      <div class="container">${sectionHead({ eyebrow: fr ? 'Témoignages' : 'Testimonials', title: fr ? 'Ils nous font confiance' : 'They trust us', center: true })}${testimonials(lang, 8)}</div>
    </section>
    ${finalCta(lang)}`,
  };
};

// ── Conversion pages ────────────────────────────────────────────────────────
const formPage = (lang, id, type, { eyebrow, h1, lead, aside }) => {
  const crumbs = [{ id, label: eyebrow }];
  return {
    id, lang, breadcrumbs: crumbs, noSticky: true,
    body: html`
    <section class="page-hero page-hero--form">
      <div class="container form-page">
        <div class="form-page__copy">
          ${breadcrumbs({ lang, id, breadcrumbs: crumbs })}
          <p class="eyebrow">${eyebrow}</p>
          <h1 class="h-anim">${animWords(h1)}</h1>
          <p class="lead">${lead}</p>
          ${aside}
        </div>
        <div class="form-page__form card">${leadForm(lang, type, { idPrefix: type })}</div>
      </div>
    </section>`,
  };
};

const contactAside = (lang) => {
  const fr = lang === 'fr';
  const a = config.address;
  return html`
  <ul class="ticks">${(fr ? ['Réponse en 1 jour ouvrable', 'Consultation gratuite de 30 minutes', 'En français ou en anglais'] : ['Reply within 1 business day', 'Free 30-minute consultation', 'In French or English']).map((x) => html`<li>${icon('check')}${x}</li>`)}</ul>
  <div class="contact-alt">
    ${config.calendar.consultation ? html`<a class="btn btn--ghost" href="${config.calendar.consultation}" target="_blank" rel="noopener" data-cta="book_consultation">${icon('calendar')} ${fr ? 'Choisir une plage horaire' : 'Pick a time slot'}</a>` : ''}
    ${config.phone ? html`<p><a href="tel:${config.phone.replace(/[^\d+]/g, '')}" data-track="click_phone">${icon('phone')} ${config.phone}</a></p>` : ''}
    ${config.email ? html`<p><a href="mailto:${config.email}" data-track="click_email">${icon('mail')} ${config.email}</a></p>` : ''}
    <p class="muted">${icon('map')} ${a.street ? `${a.street}, ` : ''}${a.city} (${a.region})</p>
    <p class="small"><a class="link" href="${link('quote', lang)}">${fr ? 'Besoin d’un prix? Obtenez une soumission' : 'Need a price? Get a quote'}</a> · <a class="link" href="${link('demo', lang)}">${fr ? 'Démo Utilmo' : 'Utilmo demo'}</a></p>
  </div>`;
};

export const contact = (lang) => {
  const fr = lang === 'fr';
  return {
    ...formPage(lang, 'contact', 'consultation', {
      eyebrow: 'Contact',
      h1: fr ? 'Réservez votre <em>consultation</em>' : 'Book your <em>consultation</em>',
      lead: fr ? '30 minutes, gratuites et sans engagement. Nous regardons votre présence actuelle et vous repartez avec un plan concret.' : '30 free minutes, no commitment. We review your current presence and you leave with a concrete plan.',
      aside: contactAside(lang),
    }),
    title: fr ? 'Contact — réserver une consultation | Marketing Websites' : 'Contact — Book a Consultation | Marketing Websites',
    description: fr ? 'Réservez une consultation gratuite de 30 minutes avec Marketing Websites, agence de marketing immobilier et web à Montréal.' : 'Book a free 30-minute consultation with Marketing Websites, a real estate and web marketing agency in Montreal.',
    schema: [organizationSchema()],
  };
};

export const quote = (lang) => {
  const fr = lang === 'fr';
  return {
    ...formPage(lang, 'quote', 'quote', {
      eyebrow: fr ? 'Soumission' : 'Quote',
      h1: fr ? 'Obtenez une <em>soumission</em> claire' : 'Get a clear <em>quote</em>',
      lead: fr ? 'Deux minutes pour décrire votre projet. Vous recevez une recommandation et une fourchette de prix en un jour ouvrable.' : 'Two minutes to describe your project. You get a recommendation and a price range within one business day.',
      aside: contactAside(lang),
    }),
    title: fr ? 'Obtenir une soumission | Marketing Websites' : 'Get a Quote | Marketing Websites',
    description: fr ? 'Demandez une soumission pour un site web de courtier, l’intégration Centris, de la publicité, du SEO ou un site de PME.' : 'Request a quote for a broker website, Centris integration, advertising, SEO or an SME website.',
  };
};

export const demo = (lang) => {
  const fr = lang === 'fr';
  return {
    ...formPage(lang, 'demo', 'demo', {
      eyebrow: fr ? 'Démo Utilmo' : 'Utilmo demo',
      h1: fr ? 'Voyez <em>Utilmo</em> en 30 minutes' : 'See <em>Utilmo</em> in 30 minutes',
      lead: fr ? 'Une démo en direct avec vos propres cas : pages d’atterrissage, pipeline de prospects, relances et statistiques.' : 'A live demo with your own cases: landing pages, lead pipeline, follow-ups and analytics.',
      aside: html`<ul class="ticks">${(fr ? ['Démo personnalisée, pas une vidéo', 'Questions sur l’import de vos contacts', 'Aucune carte de crédit'] : ['A tailored demo, not a video', 'Questions about importing your contacts', 'No credit card']).map((x) => html`<li>${icon('check')}${x}</li>`)}</ul>
      ${config.calendar.demo ? html`<a class="btn btn--ghost" href="${config.calendar.demo}" target="_blank" rel="noopener" data-cta="book_demo">${icon('calendar')} ${fr ? 'Choisir une plage horaire' : 'Pick a time slot'}</a>` : ''}
      <p class="small"><a class="link" href="${link('svc-crm', lang)}">${fr ? 'En savoir plus sur Utilmo' : 'Learn more about Utilmo'} ${icon('arrow')}</a></p>`,
    }),
    title: fr ? 'Réserver une démo d’Utilmo, le CRM pour courtiers | Marketing Websites' : 'Book a Demo of Utilmo, the Broker CRM | Marketing Websites',
    description: fr ? 'Réservez une démo de 30 minutes d’Utilmo : CRM, pages d’atterrissage, campagnes courriel et statistiques pour courtiers immobiliers.' : 'Book a 30-minute demo of Utilmo: CRM, landing pages, email campaigns and analytics for real estate brokers.',
  };
};

export const thanks = (lang) => {
  const fr = lang === 'fr';
  const cal = (url, label, cta) => (url ? html`<a class="btn btn--lg" href="${url}" target="_blank" rel="noopener" data-cta="${cta}">${icon('calendar')} ${label}</a>` : '');
  return {
    id: 'thanks', lang, noindex: true, noSticky: true,
    title: fr ? 'Merci! | Marketing Websites' : 'Thank you! | Marketing Websites',
    description: fr ? 'Votre demande a bien été reçue. Nous vous répondons en un jour ouvrable avec les prochaines étapes pour votre projet.' : 'Your request has been received. We will reply within one business day with the next steps for your project.',
    body: html`
    <section class="page-hero thanks">
      <div class="container narrow center">
        <span class="thanks__check" aria-hidden="true">${icon('check')}</span>
        <h1>${fr ? 'Merci, c’est reçu!' : 'Thank you — it’s in!'}</h1>
        <div data-thanks="consultation">
          <p class="lead">${fr ? 'Nous vous répondons en un jour ouvrable. Pour aller plus vite, choisissez dès maintenant votre plage de consultation.' : 'We’ll reply within one business day. To go faster, pick your consultation slot now.'}</p>
          ${cal(config.calendar.consultation, fr ? 'Choisir ma plage horaire' : 'Pick my time slot', 'book_consultation')}
        </div>
        <div data-thanks="quote" hidden>
          <p class="lead">${fr ? 'Votre demande de soumission est entre bonnes mains. Vous recevrez une recommandation et une fourchette de prix en un jour ouvrable.' : 'Your quote request is in good hands. You’ll get a recommendation and a price range within one business day.'}</p>
        </div>
        <div data-thanks="demo" hidden>
          <p class="lead">${fr ? 'Choisissez maintenant le moment de votre démo Utilmo.' : 'Pick the time for your Utilmo demo now.'}</p>
          ${cal(config.calendar.demo, fr ? 'Choisir ma plage de démo' : 'Pick my demo slot', 'book_demo')}
        </div>
        <p class="muted">${fr ? 'Un courriel de confirmation vient de vous être envoyé.' : 'A confirmation email is on its way.'}</p>
        <div class="btn-row btn-row--center">
          <a class="btn btn--ghost" href="${link('blog', lang)}">${fr ? 'Lire le blogue' : 'Read the blog'}</a>
          <a class="btn btn--ghost" href="${link('work', lang)}">${ui[lang].cta.work}</a>
        </div>
      </div>
    </section>`,
  };
};

export const privacy = (lang) => {
  const fr = lang === 'fr';
  const crumbs = [{ id: 'privacy', label: fr ? 'Confidentialité' : 'Privacy' }];
  return {
    id: 'privacy', lang, breadcrumbs: crumbs,
    title: fr ? 'Politique de confidentialité | Marketing Websites' : 'Privacy Policy | Marketing Websites',
    description: fr ? 'Comment Marketing Websites recueille, utilise et protège vos renseignements personnels, conformément à la Loi 25.' : 'How Marketing Websites collects, uses and protects your personal information, in line with Quebec’s Law 25.',
    body: html`
    ${simpleHero(lang, 'privacy', crumbs, '', fr ? 'Politique de confidentialité' : 'Privacy policy', '')}
    <div class="container narrow prose">
      <p class="todo-note">${todo(fr ? 'Ébauche à faire valider par un conseiller juridique avant publication.' : 'Draft — have it reviewed by legal counsel before publishing.', { block: true })}</p>
      ${fr ? html`
      <h2>Responsable de la protection des renseignements personnels</h2>
      <p>${todo('Nom, titre et coordonnées du responsable (Loi 25, art. 3.1)')}</p>
      <h2>Renseignements recueillis</h2>
      <p>Lorsque vous remplissez un formulaire : nom, courriel, téléphone, rôle, objectifs et, le cas échéant, budget et site actuel. Nous enregistrons aussi la page d’origine, la langue et les paramètres de campagne (UTM) pour savoir quelle source a mené à votre demande.</p>
      <h2>Utilisation</h2>
      <p>Ces renseignements servent uniquement à répondre à votre demande et à assurer le suivi commercial. Ils sont conservés dans notre CRM, Utilmo, opéré par Marketing Websites Inc. Nous vous envoyons des courriels promotionnels seulement si vous y avez consenti, et vous pouvez vous désabonner en tout temps (LCAP).</p>
      <h2>Témoins (cookies)</h2>
      <p>Les témoins de mesure d’audience (Google Analytics 4) ne sont activés que si vous les acceptez dans la bannière. Vous pouvez modifier votre choix en tout temps avec le lien « Gérer les témoins » au bas de chaque page.</p>
      <h2>Conservation et droits</h2>
      <p>Vous pouvez demander l’accès, la rectification ou la suppression de vos renseignements en écrivant au responsable ci-dessus. ${todo('Durée de conservation et lieu d’hébergement des données')}</p>` : html`
      <h2>Person in charge of the protection of personal information</h2>
      <p>${todo('Name, title and contact details of the person in charge (Law 25, s. 3.1)')}</p>
      <h2>Information we collect</h2>
      <p>When you fill in a form: name, email, phone, role, goals and, where relevant, budget and current website. We also record the source page, language and campaign parameters (UTM) to know which source led to your request.</p>
      <h2>How we use it</h2>
      <p>This information is only used to answer your request and for sales follow-up. It is stored in our CRM, Utilmo, operated by Marketing Websites Inc. We only send promotional emails if you consent, and you can unsubscribe at any time (CASL).</p>
      <h2>Cookies</h2>
      <p>Audience-measurement cookies (Google Analytics 4) are only enabled if you accept them in the banner. You can change your choice at any time with the “Cookie settings” link at the bottom of every page.</p>
      <h2>Retention and your rights</h2>
      <p>You can request access to, correction of or deletion of your information by writing to the person in charge above. ${todo('Retention period and data hosting location')}</p>`}
    </div>`,
  };
};

export const notFound = (lang) => {
  const fr = lang === 'fr';
  return {
    id: 'home', lang, noindex: true,
    title: fr ? 'Page introuvable | Marketing Websites' : 'Page not found | Marketing Websites',
    description: '',
    body: html`
    <section class="page-hero">
      <div class="container narrow center">
        <p class="eyebrow">404</p>
        <h1>${fr ? 'Cette page a déménagé' : 'This page has moved'}</h1>
        <p class="lead">${fr ? 'Le site a fait peau neuve. Voici les pages les plus consultées :' : 'Our site has been rebuilt. Here are the most visited pages:'}</p>
        <div class="btn-row btn-row--center">
          <a class="btn" href="${link('home', lang)}">${fr ? 'Accueil' : 'Home'}</a>
          <a class="btn btn--ghost" href="${link('industries', lang)}">Industries</a>
          <a class="btn btn--ghost" href="${link('services', lang)}">Services</a>
          <a class="btn btn--ghost" href="${link('contact', lang)}">Contact</a>
        </div>
      </div>
    </section>`,
  };
};
