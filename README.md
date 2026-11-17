# marketingwebsites.ca — new site

French-first, bilingual rebuild of marketingwebsites.ca, built from the
*Website Rebuild Strategy* (Nov 17, 2026) and the approved [DESIGN.md](DESIGN.md).

**Positioning:** *Le marketing numérique des courtiers immobiliers du Québec — site web, Centris, publicité et CRM dans un seul système*, with a clearly signposted path to the general services (web design, SEO, Google Ads, social, ecommerce, custom dev).

## What's in it

- **56 pages** (28 FR + 28 EN twins, `hreflang` fr-CA / en-CA / x-default, language switch goes to the equivalent page).
- **Homepage** with the 12 sections from strategy §4 (hero, proof strip, the 4-step system, "choose your situation", case study, portfolio, Utilmo spotlight, other industries, process, testimonials, resources, consultation form).
- **Real estate hub** + 7 service pages (broker websites, Centris, teams/agencies, Google & Meta ads, local SEO, landing pages, Utilmo CRM) on the 11-block template from §5, plus **packages** (Présence / Croissance / Système complet). Short-form video is shown as *Bientôt* (toggle in `site.config.mjs`).
- **General services hub** + 6 service pages.
- **Portfolio** with filters, **resource hub** (4 topic hubs) with 3 starter articles, **about**, **privacy (Law 25 draft)**.
- **Three conversion paths** (§6): consultation (`/contact/`), quote (`/soumission/`), Utilmo demo (`/demo-utilmo/`) + thank-you pages (noindex).
- Forms post to Utilmo with `form_type`, `page_url`, `language`, `referrer`, `utm_*`, `gclid`, `fbclid`; honeypot spam trap; accessible inline validation.
- **GA4 only after consent** (Law 25). Events: `generate_lead` (with `form_type`), `book_consultation`, `book_demo`, `click_phone`, `click_email`, `form_start`, `cta_click`.
- **SEO:** canonical, hreflang, Organization/LocalBusiness, Service, Article, BreadcrumbList, FAQPage (only where the FAQ is visible), per-language XML sitemaps, robots.txt, `_redirects` generated from the migration map.
- **Performance:** static HTML, no frameworks, ~10 KB JS, self-hosted variable fonts, illustrations drawn in SVG/CSS (no slider plugins, no stock photos).

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
