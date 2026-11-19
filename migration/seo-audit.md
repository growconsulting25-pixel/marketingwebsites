# SEO audit and migration notes (Nov 19, 2026)

Source: live sitemaps of marketingwebsites.ca (Yoast) — `page-sitemap.xml` (37 pages) and `post-sitemap.xml` (186 posts). Raw titles/H1/H2 per page: `seo-audit-raw.txt`.

## Decisions
- **Keep the live URL structure**: English at the root, French under `/fr/`. All indexed service, industry and company page URLs are reused as-is in `src/routes.mjs`.
- **Keep the keyword focus of each page's title** (e.g. "Web Design Montreal", "SEO Services Montreal", "Google Ads Management Services"), fix the weak ones, and add a proper single H1 to every page (most live pages have none or a generic one).
- **Add** hreflang (en-CA / fr-CA / x-default), canonical, Organization/LocalBusiness, Service, BreadcrumbList, FAQPage and Article schema — none of which are on the live site.
- **New pages** to rank on more searches: services hub, industries hub, clinics, construction & trades, professional services, Utilmo CRM.

## Must be preserved at launch (not rebuilt here)
1. **186 blog posts** (`blog-urls-to-preserve.txt`) — they sit at the root (e.g. `/what-is-seo/`). Migrate them with the same URLs (or keep WordPress serving them) before switching DNS. Never redirect them all to the homepage.
2. **Utilmo / eXp marketplace legal pages** (`/utilmo-marketplace-terms-of-service/`, `/utilmo-marketplace-privacy-policy/`, `/exp-marketplace-…`, FR twins, `/facebook-signup/`) — likely used by apps and app stores; port them verbatim.
3. Portfolio items under `/portfolio-archive/<slug>/` — either keep them or 301 each to `/portfolio/`.

## Claims not carried over without confirmation
- "Guaranteed ranking in 90 days or we work for free" (live `/seo/` page).
