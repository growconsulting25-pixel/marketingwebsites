# marketingwebsites.ca — new site

French-first, bilingual rebuild of marketingwebsites.ca, built from the
*Website Rebuild Strategy* (Nov 17, 2026) and the approved [DESIGN.md](DESIGN.md).

**Positioning:** *Le marketing numérique des courtiers immobiliers du Québec — site web, Centris, publicité et CRM dans un seul système*, with a clearly signposted path to the general services (web design, SEO, Google Ads, social, ecommerce, custom dev).

## What's in it (v4 — full-service redesign)

- **Positioning:** full-service web & digital marketing agency in Montreal for businesses in every industry; services are the spine, industries are proof. Brand colours #191B28 / #C02942, Montserrat, 3D device scenes and continuous motion (see `DESIGN.md` §v4).
- **54 pages** (27 EN + 27 FR). **English at the root, French under `/fr/`, exactly like the live site** — all indexed page URLs are kept (see `migration/seo-audit.md`).
- **8 services:** web design, e-commerce, web apps, SEO (incl. AI search), Google Ads, social media, website analytics, Utilmo CRM — plus a services hub.
- **5 industries:** real estate (Centris), restaurants, clinics & health, construction & trades, professional services — plus an industries hub.
- Portfolio (53 real projects), 8 real testimonials, blog hub with 3 starter articles, about, contact, quote, Utilmo demo, thank-you, privacy.
- SEO: canonical, hreflang (en-CA / fr-CA / x-default = EN), Organization/ProfessionalService, Service, FAQPage, Article, BreadcrumbList, ItemList, sitemaps per language.

**Before launch:** migrate or keep serving the 186 blog posts and the marketplace legal pages at their current URLs (`migration/blog-urls-to-preserve.txt`).

## Run it

```bash
npm install
npm run dev          # build + serve on http://localhost:4321
npm run check        # build + link/H1/meta/twin checks (placeholders = warnings)
npm run check:launch # same, but placeholders and missing config FAIL
```

Deploy: any static host. Netlify / Cloudflare Pages: build command `npm run build`, publish directory `dist` (`netlify.toml` included; `_redirects` and `_headers` are generated).

## Before launch — what you need to fill in

1. **`site.config.mjs`**: Utilmo form endpoint, GA4 ID, phone, email, street address (must match Google Business Profile), calendar links, proof numbers, package prices (or leave "Sur soumission").
2. **Proof placeholders** (yellow dashed boxes on the site — `dist/placeholders.json` lists every one): broker-site count, Google rating, 3 case studies, testimonials with permission, portfolio screenshots (`src/content/portfolio.mjs`), team photo and names, article author.
3. **Privacy policy**: name of the person in charge of personal information (Law 25), retention and hosting — have it reviewed by counsel.
4. **Confirm offers** (strategy §5): Meta ads, CRM automation playbooks, short-form video. Review service copy and timelines (all copy is a draft).
5. **SEO migration** (§10): crawl the current site, fill `migration/redirects.csv`, then after launch run `npm run test:redirects -- https://marketingwebsites.ca`. If an old URL already ranks, change the path in `src/routes.mjs` to keep it.

## Where things live

| What | File |
|---|---|
| Business info, endpoints, toggles | `site.config.mjs` |
| URLs (FR/EN) | `src/routes.mjs` |
| Real estate service copy | `src/content/realestate.mjs` |
| General services copy | `src/content/general.mjs` |
| Articles | `src/content/articles.mjs` |
| Portfolio | `src/content/portfolio.mjs` |
| Shared UI strings | `src/content/ui.mjs` |
| Page templates | `src/pages/*.mjs` |
| Header/footer/SEO head | `src/lib/layout.mjs` |
| Sections & forms | `src/lib/components.mjs` |
| Styles / design tokens | `src/assets/css/site.css` (see `DESIGN.md`) |
| Behaviour (menu, forms, consent, analytics) | `src/assets/js/site.js` |
