import config from '../../site.config.mjs';
import { routes, link } from '../routes.mjs';
import { ui } from '../content/ui.mjs';
import { reServices } from '../content/realestate.mjs';
import { generalServices } from '../content/general.mjs';
import { html, esc, icon } from './html.mjs';

export const abs = (path) => config.siteUrl.replace(/\/$/, '') + path;
const telHref = (p) => 'tel:' + p.replace(/[^\d+]/g, '');

const logo = (lang, variant = '') => html`
  <a class="logo" href="${link('home', lang)}" aria-label="Agence Marketing Websites — ${lang === 'fr' ? 'accueil' : 'home'}">
    <img src="/assets/img/logo${variant}.svg" alt="Agence Marketing Websites" width="1573" height="1574">
  </a>`;

const subList = (items, lang, hubId, hubLabel) => html`
  <ul class="sub__list">
    ${items.map((s) => html`<li><a href="${link(s.id, lang)}">${icon(s.icon)}<span>${s[lang].nav}${s.soon ? ` <em class="soon">${lang === 'fr' ? 'Bientôt' : 'Soon'}</em>` : ''}</span></a></li>`)}
  </ul>
  <a class="sub__hub" href="${link(hubId, lang)}">${hubLabel} ${icon('arrow')}</a>`;

const header = (page) => {
  const { lang, id } = page;
  const t = ui[lang];
  const other = lang === 'fr' ? 'en' : 'fr';
  const section = (k) => (id === k || id.startsWith(k + '-') || (k === 'resources' && id.startsWith('art-')) ? ' aria-current="page"' : '');
  const reSection = id === 're' || id.startsWith('re-') ? ' aria-current="page"' : '';
  const svcSection = id === 'services' || id.startsWith('svc-') ? ' aria-current="page"' : '';
  return html`
  <header class="site-header" data-header>
    <div class="container site-header__in">
      ${logo(lang)}
      <nav class="nav" id="site-nav" aria-label="${lang === 'fr' ? 'Navigation principale' : 'Main navigation'}" data-nav>
        <ul class="nav__list">
          <li class="nav__item has-sub">
            <a class="nav__link" href="${link('re', lang)}"${reSection}>${t.nav.re}</a>
            <button class="sub-toggle" type="button" aria-expanded="false" aria-controls="sub-re" data-sub-toggle>
              <span class="sr-only">${t.nav.re} — ${lang === 'fr' ? 'sous-menu' : 'submenu'}</span>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2"/></svg>
            </button>
            <div class="sub" id="sub-re">${subList(reServices.filter((s) => !s.hidden), lang, 're', t.nav.reHub)}</div>
          </li>
          <li class="nav__item has-sub">
            <a class="nav__link" href="${link('services', lang)}"${svcSection}>${t.nav.services}</a>
            <button class="sub-toggle" type="button" aria-expanded="false" aria-controls="sub-svc" data-sub-toggle>
              <span class="sr-only">${t.nav.services} — ${lang === 'fr' ? 'sous-menu' : 'submenu'}</span>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2"/></svg>
            </button>
            <div class="sub" id="sub-svc">${subList(generalServices, lang, 'services', t.nav.svcHub)}</div>
          </li>
          <li class="nav__item"><a class="nav__link" href="${link('work', lang)}"${section('work')}>${t.nav.work}</a></li>
          <li class="nav__item"><a class="nav__link" href="${link('resources', lang)}"${section('resources')}>${t.nav.resources}</a></li>
          <li class="nav__item"><a class="nav__link" href="${link('about', lang)}"${section('about')}>${t.nav.about}</a></li>
        </ul>
        <a class="btn nav__cta" href="${link('contact', lang)}" data-cta="consultation">${t.cta.consult} ${icon('arrow')}</a>
      </nav>
      <div class="site-header__tools">
        <a class="lang" href="${routes[id][other]}" hreflang="${other}-CA" lang="${other}" aria-label="${t.langSwitch.aria}"><span aria-hidden="true">${t.langSwitch.short}</span></a>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav" data-menu>
          <span class="menu-btn__open">${icon('menu')}<span class="sr-only">${t.nav.menu}</span></span>
          <span class="menu-btn__close">${icon('close')}<span class="sr-only">${t.nav.close}</span></span>
        </button>
      </div>
    </div>
  </header>`;
};

const footer = (page) => {
  const { lang, id } = page;
  const t = ui[lang];
  const other = lang === 'fr' ? 'en' : 'fr';
  const a = config.address;
  const year = new Date().getFullYear();
  return html`
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__top">
        <div class="site-footer__brand">
          ${logo(lang, '-white')}
          <p>${t.footer.tagline}</p>
          <p class="muted-on-deep">${t.footer.since}</p>
          <a class="btn btn--light" href="${link('contact', lang)}" data-cta="consultation">${t.cta.consult} ${icon('arrow')}</a>
        </div>
        <div class="site-footer__cols">
          <div>
            <h2 class="site-footer__h">${t.footer.reCol}</h2>
            <ul>
              <li><a href="${link('re', lang)}">${t.nav.reHub}</a></li>
              ${reServices.filter((s) => !s.hidden).map((s) => html`<li><a href="${link(s.id, lang)}">${s[lang].nav}</a></li>`)}
            </ul>
          </div>
          <div>
            <h2 class="site-footer__h">${t.footer.svcCol}</h2>
            <ul>
              <li><a href="${link('services', lang)}">${t.nav.svcHub}</a></li>
              ${generalServices.map((s) => html`<li><a href="${link(s.id, lang)}">${s[lang].nav}</a></li>`)}
            </ul>
          </div>
          <div>
            <h2 class="site-footer__h">${t.footer.coCol}</h2>
            <ul>
              <li><a href="${link('work', lang)}">${t.nav.work}</a></li>
              <li><a href="${link('resources', lang)}">${t.nav.resources}</a></li>
              <li><a href="${link('about', lang)}">${t.nav.about}</a></li>
              <li><a href="${link('quote', lang)}">${t.cta.quote}</a></li>
              <li><a href="${link('demo', lang)}">${t.cta.demo}</a></li>
            </ul>
          </div>
          <div itemscope itemtype="https://schema.org/LocalBusiness">
            <h2 class="site-footer__h">${t.footer.contactCol}</h2>
            <meta itemprop="name" content="${config.name}">
            <address>
              <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
                ${a.street ? html`<span itemprop="streetAddress">${a.street}</span><br>` : ''}
                <span itemprop="addressLocality">${a.city}</span> (<span itemprop="addressRegion">${a.region}</span>)${a.postalCode ? html` <span itemprop="postalCode">${a.postalCode}</span>` : ''}
              </span>
              ${config.phone ? html`<br><a href="${telHref(config.phone)}" itemprop="telephone" data-track="click_phone">${config.phone}</a>` : ''}
              ${config.email ? html`<br><a href="mailto:${config.email}" itemprop="email" data-track="click_email">${config.email}</a>` : ''}
            </address>
            <a class="lang-footer" href="${routes[id][other]}" hreflang="${other}-CA" lang="${other}">${icon('globe')} ${t.langSwitch.label}</a>
          </div>
        </div>
      </div>
      <div class="site-footer__bottom">
        <p>© ${year} ${config.legalName}. ${t.footer.rights} ${t.footer.utilmo}</p>
        <p><a href="${link('privacy', lang)}">${t.footer.privacy}</a> · <button type="button" class="linklike" data-consent-open>${t.footer.cookies}</button></p>
      </div>
    </div>
  </footer>`;
};

const stickyBar = (page) => {
  const t = ui[page.lang];
  const target = page.stickyCta || { id: 'contact', label: t.cta.consultShort, cta: 'consultation' };
  return html`
  <div class="sticky-cta" data-sticky>
    <a class="btn" href="${link(target.id, page.lang)}" data-cta="${target.cta}">${icon('calendar')} ${target.label}</a>
    ${config.phone ? html`<a class="btn btn--ghost" href="${telHref(config.phone)}" data-track="click_phone">${icon('phone')} ${t.cta.call}</a>` : ''}
  </div>`;
};

const consentBanner = (lang) => {
  const t = ui[lang].consent;
  return html`
  <div class="consent" role="dialog" aria-labelledby="consent-title" aria-describedby="consent-text" data-consent hidden>
    <h2 id="consent-title" class="consent__title">${t.title}</h2>
    <p id="consent-text">${t.text} <a href="${link('privacy', lang)}">${t.more}</a></p>
    <div class="consent__actions">
      <button type="button" class="btn btn--ghost btn--sm" data-consent-choice="denied">${t.refuse}</button>
      <button type="button" class="btn btn--sm" data-consent-choice="granted">${t.accept}</button>
    </div>
  </div>`;
};

export const breadcrumbSchema = (page) => {
  if (!page.breadcrumbs?.length) return null;
  const items = [{ name: ui[page.lang].breadcrumbHome, path: link('home', page.lang) }, ...page.breadcrumbs.map((b) => ({ name: b.label, path: b.id ? link(b.id, page.lang) : routes[page.id][page.lang] }))];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
};

export const breadcrumbs = (page) => {
  if (!page.breadcrumbs?.length) return '';
  const t = ui[page.lang];
  const items = page.breadcrumbs;
  return html`
  <nav class="crumbs" aria-label="${page.lang === 'fr' ? 'Fil d’Ariane' : 'Breadcrumb'}">
    <ol>
      <li><a href="${link('home', page.lang)}">${t.breadcrumbHome}</a></li>
      ${items.map((b, i) => (i === items.length - 1 ? html`<li><span aria-current="page">${b.label}</span></li>` : html`<li><a href="${link(b.id, page.lang)}">${b.label}</a></li>`))}
    </ol>
  </nav>`;
};

export const organizationSchema = () => {
  const a = config.address;
  const org = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': abs('/#organization'),
    name: config.name,
    legalName: config.legalName,
    url: abs('/'),
    logo: abs('/assets/img/logo.svg'),
    foundingDate: String(config.foundingYear),
    areaServed: { '@type': 'AdministrativeArea', name: 'Québec' },
    knowsLanguage: ['fr-CA', 'en-CA'],
    address: { '@type': 'PostalAddress', addressLocality: a.city, addressRegion: a.region, addressCountry: a.country, ...(a.street && { streetAddress: a.street }), ...(a.postalCode && { postalCode: a.postalCode }) },
  };
  if (config.phone) org.telephone = config.phone;
  if (config.email) org.email = config.email;
  const sameAs = Object.values(config.social).filter(Boolean);
  if (sameAs.length) org.sameAs = sameAs;
  return org;
};

export const layout = (page, assets) => {
  const { lang, id } = page;
  const t = ui[lang];
  const other = lang === 'fr' ? 'en' : 'fr';
  const url = abs(routes[id][lang]);
  const schema = [breadcrumbSchema(page), ...(page.schema || [])].filter(Boolean);
  const clientConfig = {
    lang,
    formEndpoint: config.formEndpoint,
    ga4: config.analytics.ga4,
    thanks: link('thanks', lang),
    strings: { sending: t.form.sending, error: t.form.error, invalid: t.form.invalid },
  };
  return `<!doctype html>
<html lang="${lang}-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex, follow">' : ''}
<link rel="canonical" href="${url}">
${page.noindex ? '' : `<link rel="alternate" hreflang="fr-CA" href="${abs(routes[id].fr)}">
<link rel="alternate" hreflang="en-CA" href="${abs(routes[id].en)}">
<link rel="alternate" hreflang="x-default" href="${abs(routes[id].fr)}">`}
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="${config.name}">
<meta property="og:locale" content="${lang}_CA">
<meta property="og:locale:alternate" content="${other}_CA">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${abs('/assets/img/og.png')}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0B1F3A">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/montserrat-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/instrument-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${assets.css}">
<script defer src="${assets.js}"></script>
<script type="application/json" id="mw-config">${JSON.stringify(clientConfig)}</script>
${schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head>
<body class="${page.bodyClass || ''}">
<a class="skip" href="#main">${t.skip}</a>
${header(page)}
<main id="main" tabindex="-1">
${page.body}
</main>
${footer(page)}
${page.noSticky ? '' : stickyBar(page)}
${consentBanner(lang)}
</body>
</html>`;
};
