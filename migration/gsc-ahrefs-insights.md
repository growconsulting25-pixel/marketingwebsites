# Search Console + Ahrefs insights (Nov 23, 2026)

Source: Ahrefs project "Marketingwebsites" (GSC data, Aug 23 – Nov 22, 2026) and Ahrefs Site Explorer (Canada).

## What brings traffic today
- **The EN homepage brings almost all clicks** (294 of ~360). Ahrefs shows it at #1 in Canada for
  "marketing web" (800/mo), "website marketing services" (300), "web marketing agency" (350),
  "online marketing services" (400), "web design and marketing", "digital marketing website",
  "marketing website design". → Title kept ("Web Design & Online Marketing Services"); H1 and intro
  now say "web design & digital marketing agency" and "website marketing services".
- **The FR homepage gets 25k impressions but only 40 clicks** (avg. position 35). Best FR queries:
  "agence marketing web" (3,085 impr., pos. 37), "web marketing" (1,858, pos. 7.5, 0 clicks),
  "agence marketing digital" (1,451, pos. 28), "marketing web montréal" (838, pos. 16),
  "agence web", "agence site web". → FR title is now "Agence Marketing Web à Montréal",
  FR H1 "Agence de marketing web et de sites web pour les…".
- **/fr/conception-web/** shows for "agence marketing web", "agence sites web", "conception site web"
  (positions 37–70). → Title "Conception de Sites Web Montréal | Agence Marketing Web", H1 now says
  "Conception de sites web à Montréal".
- **Service pages are weak** (avg. positions 40–70): /google-ads-management/ (5,305 impr., pos. 70),
  /seo/ ("seo agency montreal", pos. 35), /web-design/ ("web design montreal", pos. 29–58).
  → H1s now carry the main query (e.g. "Google Ads management services…", "SEO agency in Montreal…").
- **Blog posts earn real impressions** (e.g. /learn-how-to-build-a-website/ 4,303 impr., pos. 18;
  /top-real-estate-agent-websites/ 1,951; /branding-strategy…/ 3,183). Confirms: the 186 posts must
  keep their URLs at launch.
- Portfolio items (/portfolio-archive/vito-vassallo/, /fr/portfolio-archive/exp-quebec/) rank for
  client names → keep or 301 one by one.
- `realestate.marketingwebsites.ca` (Centris listings) gets clicks → separate subdomain, not touched.
- Junk URLs indexed: /kc-section/home-team-fr/ → 301 to /about-us/ at launch.

## Montreal keyword targets (Ahrefs Keywords Explorer, Canada, Nov 24, 2026)
| Keyword | Volume | KD | Page |
|---|---|---|---|
| agence web | 1,300 | 68 | /fr/ (title "Agence Web Montréal") |
| seo montreal | 800 | 2 | /seo/ |
| digital marketing agency montreal | 600 | 21 | / (title + H1) |
| agence marketing web | 600 | 66 | /fr/ and /fr/conception-web/ |
| agence seo montréal | 450 | 0 | /fr/referencement-naturel/ |
| seo agency montreal | 350 | 4 | /seo/ |
| référencement montréal | 350 | 9 | /fr/referencement-naturel/ |
| web marketing agency | 350 | 9 | / |
| marketing agency montreal | 300 | 40 | / |
| website marketing services | 300 | 35 | / (H1 area + intro) |
| web design montreal | 250 | 67 | /web-design/ |
| agence web montréal | 200 | 0 | /fr/ (title) |
| conception site web montréal | 150 | 32 | /fr/conception-web/ |
| création site web montréal | 100 | 1 | /fr/conception-web/ |

Home titles changed to put the biggest local terms first:
- EN: "Web Design & Digital Marketing Agency Montreal | Marketing Websites"
- FR: "Agence Web Montréal | Agence Marketing Web | Marketing Websites"

## Backlinks (Ahrefs, live): DR 72
- / 977 referring domains · /fr/ 142 · /fr/politique-de-confidentialite/ 121 · /privacy-policy/ 57 — all kept at the same URL.
- /fr/exp-marketplace-privacy-policy/ 68 · /exp-marketplace-privacy-policy/ 12 — NOT rebuilt yet: must be ported verbatim.
- /real-estate-website-design/ 9 · /web-design/ 5 · /google-ads-management/ 3 · /social-media-marketing/ 3 — kept.
- ~30 blog posts have 2–3 referring domains each — keep their URLs (blog migration).
- /custom-website/ (4) → /web-design/ 301 · /fr → /fr/ 301 (in redirects.csv).
- www → apex must stay 301 at the host (domain setting).

## URLs on the live site not in the new build (333 in sitemaps)
- 184 blog posts → migrate with the same URLs (or keep WordPress serving them).
- 110 /portfolio-archive/ pages → 301 to /portfolio/ (added).
- 9 legal/app pages (Utilmo + eXp marketplace terms/privacy, /facebook-signup/) → port verbatim.
- 38 /kc-section/ fragments and 20 /category/ pages → 301 (added).
