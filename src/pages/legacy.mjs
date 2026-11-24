// Blog posts and legal pages migrated from the WordPress site (Nov 2026).
// They keep their exact URLs so rankings and backlinks carry over.
// Source data: src/content/legacy/*.json (built by the migration scraper).
import { readFileSync } from 'node:fs';
import { routes, link } from '../routes.mjs';
import { html, icon, esc } from '../lib/html.mjs';
import { breadcrumbs, abs } from '../lib/layout.mjs';
import { finalCta, sectionHead } from '../lib/components.mjs';

const load = (f) => JSON.parse(readFileSync(new URL(`../content/legacy/${f}`, import.meta.url), 'utf8'));

// ── Topics (WordPress categories merged into a few clear groups) ────────────
const TOPIC_OF = {
  seo: 'seo', 'seo-fr': 'seo',
  'web-design': 'web', 'conception-web': 'web',
  'real-estate': 'realestate', immobilier: 'realestate',
  ecommerce: 'ecom', 'commerce-electronique': 'ecom',
  'web-application': 'apps', 'application-web': 'apps',
  restaurant: 'restaurant', 'restaurant-fr': 'restaurant',
  marketing: 'marketing', 'marketing-fr': 'marketing', 'marketing-2': 'marketing', 'marketing-numerique': 'marketing', 'digital-marketing': 'marketing',
};
export const TOPICS = {
  marketing: { en: 'Digital marketing', fr: 'Marketing numérique', cta: 'services' },
  seo: { en: 'SEO', fr: 'Référencement SEO', cta: 'svc-seo' },
  web: { en: 'Web design', fr: 'Conception web', cta: 'svc-web' },
  realestate: { en: 'Real estate', fr: 'Immobilier', cta: 'ind-realestate' },
  ecom: { en: 'E-commerce', fr: 'Commerce électronique', cta: 'svc-ecom' },
  apps: { en: 'Web apps', fr: 'Applications web', cta: 'svc-app' },
  restaurant: { en: 'Restaurants', fr: 'Restaurants', cta: 'ind-restaurant' },
};
const topicsOf = (p) => [...new Set(p.categories.map((c) => TOPIC_OF[c]).filter(Boolean))];

const words = (h) => h.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

export const legacyPosts = load('posts.json')
  .map((p) => ({ ...p, id: `post:${p.path}`, topics: topicsOf(p), minutes: Math.max(2, Math.round(words(p.html) / 220)) }))
  .sort((a, b) => (b.published || '').localeCompare(a.published || ''));

export const legacyLegal = load('legal.json');

// Register the routes. Posts exist in one language only.
for (const p of legacyPosts) routes[p.id] = { [p.lang]: p.path };
const legalGroups = {};
for (const l of legacyLegal) {
  const key = l.path.replace(/^\/fr\//, '/');
  (legalGroups[key] ||= {})[l.lang] = l;
}
for (const [key, g] of Object.entries(legalGroups)) routes[`legal:${key}`] = Object.fromEntries(Object.entries(g).map(([lang, l]) => [lang, l.path]));

const fmtDate = (d, lang) => (d ? new Date(d).toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA', { year: 'numeric', month: 'long', day: 'numeric' }) : '');
const pageTitle = (t) => (t.length > 48 ? t : `${t} | Marketing Websites`);

export const legacyCard = (p, i = 0, { hidden = false } = {}) => {
  const fr = p.lang === 'fr';
  const t = p.topics[0];
  return html`
  <a class="card card--link article-card lp-card reveal" data-delay="${(i % 3) + 1}" href="${p.path}" data-topics="${p.topics.join(' ')}"${hidden ? ' data-more' : ''}>
    ${p.image ? html`<figure class="article-card__img"><img src="${p.image}" alt="" width="${p.imageSize?.[0] || 1200}" height="${p.imageSize?.[1] || 675}" loading="lazy" decoding="async"></figure>` : ''}
    ${t ? html`<span class="tag">${TOPICS[t][p.lang]}</span>` : ''}
    <h3>${esc(p.h1)}</h3>
    <span class="card__more">${fmtDate(p.published, p.lang)} · ${p.minutes} min ${icon('arrow')}</span>
  </a>`;
};

// Archive block used on the blog index pages.
export const legacyArchive = (lang) => {
  const fr = lang === 'fr';
  const list = legacyPosts.filter((p) => p.lang === lang);
  const used = Object.keys(TOPICS).filter((k) => list.some((p) => p.topics.includes(k)));
  return html`
  <section class="section-tight lp-archive" aria-labelledby="archive-h" data-archive>
    <div class="container">
      <div class="split-head">
        ${sectionHead({ eyebrow: fr ? 'Archives' : 'Archive', title: fr ? html`Tous nos <em>articles</em>` : html`All our <em>articles</em>`, lead: fr ? `${list.length} articles sur le marketing web, le SEO et la conception de sites.` : `${list.length} articles on web marketing, SEO and website design.`, id: 'archive-h' })}
      </div>
      <div class="lp-filters" role="group" aria-label="${fr ? 'Filtrer par thème' : 'Filter by topic'}">
        <button type="button" class="tag tag--btn is-on" data-filter="all" aria-pressed="true">${fr ? 'Tous' : 'All'}</button>
        ${used.map((k) => html`<button type="button" class="tag tag--btn" data-filter="${k}" aria-pressed="false">${TOPICS[k][lang]}</button>`)}
      </div>
      <div class="cards-3 lp-grid">${list.map((p, i) => legacyCard(p, i, { hidden: i >= 12 }))}</div>
      <p class="center lp-more-wrap"><button type="button" class="btn btn--ghost" data-load-more>${fr ? 'Voir plus d’articles' : 'Load more articles'}</button></p>
    </div>
  </section>`;
};

// ── Post page ───────────────────────────────────────────────────────────────
export const postPage = (p) => {
  const fn = (lang) => {
    const fr = lang === 'fr';
    const crumbs = [{ id: 'blog', label: fr ? 'Blogue' : 'Blog' }, { id: p.id, label: p.h1 }];
    const topic = p.topics[0];
    const ctaId = topic ? TOPICS[topic].cta : 'services';
    const ctaLabel = fr ? 'Parler à un expert' : 'Talk to an expert';
    const related = legacyPosts.filter((x) => x.lang === lang && x.id !== p.id && (topic ? x.topics.includes(topic) : true)).slice(0, 3);
    return {
      id: p.id, lang, breadcrumbs: crumbs, ogType: 'article', ogImage: p.image ? abs(p.image) : undefined,
      title: pageTitle(p.title), description: p.description || p.h1,
      schema: [{
        '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.h1, description: p.description, inLanguage: `${lang}-CA`,
        datePublished: p.published, dateModified: p.modified || p.published, mainEntityOfPage: abs(p.path),
        ...(p.image ? { image: abs(p.image) } : {}),
        author: { '@type': 'Organization', name: 'Marketing Websites' }, publisher: { '@id': abs('/#organization') },
      }],
      body: html`
      <article class="article">
        <header class="page-hero">
          <div class="container narrow">
            ${breadcrumbs({ lang, id: p.id, breadcrumbs: crumbs })}
            ${topic ? html`<p class="eyebrow">${TOPICS[topic][lang]}</p>` : ''}
            <h1>${esc(p.h1)}</h1>
            <p class="muted small lp-meta">${fr ? 'Publié le' : 'Published'} <time datetime="${p.published}">${fmtDate(p.published, lang)}</time>${p.modified && p.modified.slice(0, 10) !== (p.published || '').slice(0, 10) ? html` · ${fr ? 'mis à jour le' : 'updated'} <time datetime="${p.modified}">${fmtDate(p.modified, lang)}</time>` : ''} · ${p.minutes} min</p>
          </div>
        </header>
        ${p.image ? html`<figure class="container narrow article__img"><img src="${p.image}" alt="${esc(p.h1)}" width="${p.imageSize?.[0] || 1200}" height="${p.imageSize?.[1] || 675}" fetchpriority="high"></figure>` : ''}
        <div class="container narrow prose lp-prose">
          ${p.html}
          <aside class="money card">
            <p>${fr ? 'Besoin d’aide pour passer à l’action?' : 'Want help putting this into practice?'}</p>
            <a class="btn" href="${link(ctaId, lang)}">${ctaLabel} ${icon('arrow')}</a>
          </aside>
        </div>
      </article>
      ${related.length ? html`
      <section class="section section--sand">
        <div class="container">
          ${sectionHead({ eyebrow: fr ? 'À lire aussi' : 'Read next', title: fr ? 'Articles liés' : 'Related articles' })}
          <div class="cards-3">${related.map((r, i) => legacyCard(r, i))}</div>
        </div>
      </section>` : ''}
      ${finalCta(lang, { type: 'quote' })}`,
    };
  };
  fn.langs = [p.lang];
  return fn;
};

// ── Legal pages (ported word for word) ──────────────────────────────────────
export const legalPage = (key) => {
  const g = legalGroups[key];
  const fn = (lang) => {
    const l = g[lang];
    const id = `legal:${key}`;
    const crumbs = [{ id, label: l.h1 }];
    return {
      id, lang, breadcrumbs: crumbs, title: pageTitle(l.title), description: l.description || l.h1,
      noindex: /noindex/.test(l.robots || ''),
      body: html`
      <section class="page-hero">
        <div class="container narrow">
          ${breadcrumbs({ lang, id, breadcrumbs: crumbs })}
          <h1>${esc(l.h1)}</h1>
        </div>
      </section>
      <div class="section-tight"><div class="container narrow prose lp-prose">${l.html}</div></div>`,
    };
  };
  fn.langs = Object.keys(g);
  return fn;
};

export const legacyBuilders = [...legacyPosts.map(postPage), ...Object.keys(legalGroups).map(legalPage)];
