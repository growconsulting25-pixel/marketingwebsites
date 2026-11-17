# DESIGN.md — marketingwebsites.ca

Source brief: *Marketing Websites — Website Rebuild Strategy* (Nov 17, 2026), §2, §4, §6, §7, §7a.

**Direction in one sentence:** *warm-editorial* — a premium Quebec real-estate magazine, not a tech startup: off-white paper, deep ink, one confident terracotta accent, an expressive serif for headlines, with the broker's work (homes, listings, faces) framed as the hero.

**Interaction tier: L2 — fluid.** Scroll reveals, nav scroll state, count-up proof numbers, an animated hero mock (Centris listings syncing), a CRM mock that receives a lead. CSS-first + ~5 KB vanilla JS. No GSAP/Lenis/WebGL (not needed for this tier, and it protects Core Web Vitals: LCP < 2.5 s, INP < 200 ms, CLS < 0.1).

---

## 1. Visual Theme & Atmosphere

- **Mood:** confident, editorial, warm, local. Closer to a premium real-estate brand than an agency template. Lighter and warmer than the dark "luxury-only" look used by US players (most Quebec brokers are mid-market).
- **Texture:** paper-coloured backgrounds with a very faint SVG grain layer; hairline borders; device frames with layered soft shadows.
- **Imagery:** authentic only — real client sites in device frames, real broker portraits (with permission), Montreal/Quebec neighbourhoods. Until those exist, product UI is drawn in HTML/CSS (broker site + Centris listings, Utilmo pipeline) — never stock photos of handshakes, never solid-colour boxes pretending to be images.
- **Signature elements:**
  1. Hero: a desktop + phone mock of a broker site whose listing cards slide in one by one under a "Synchronisé avec Centris" status pill (wow #1).
  2. First scroll: proof numbers counting up + a slow marquee of Quebec neighbourhoods/cities (wow #2).
  3. "Le système" as a bento grid (Attirer → Convertir → Suivre → Mesurer) with an animated connecting line, not a plain 3-card row (wow #3).
  4. Clever detail: in the Utilmo mock, a new lead card ("Évaluation — Rosemont") drops into the pipeline when the section enters view, and a small "+1 prospect" toast appears.

## 2. Color Palette & Roles

```css
:root {
  /* surfaces */
  --bg:            #F7F3EC;  --bg-rgb: 247 243 236;      /* paper */
  --surface:       #FFFFFF;  --surface-rgb: 255 255 255;
  --surface-2:     #EFE8DC;  --surface-2-rgb: 239 232 220; /* sand band */
  --deep:          #13302B;  --deep-rgb: 19 48 43;        /* deep pine — dark bands, footer */
  --deep-2:        #1C423B;  --deep-2-rgb: 28 66 59;

  /* text */
  --text:          #17212B;  --text-rgb: 23 33 43;        /* deep ink — 15.2:1 on --bg */
  --muted:         #55606B;  --muted-rgb: 85 96 107;      /* 6.0:1 on --bg */
  --on-deep:       #F7F3EC;                               /* 12.9:1 on --deep */
  --on-deep-muted: #B9C7C2;                               /* 7.6:1 on --deep */

  /* accent (CTAs only + key highlights) */
  --accent:        #B4432D;  --accent-rgb: 180 67 45;     /* terracotta — white text 5.3:1 */
  --accent-hover:  #983723;  --accent-hover-rgb: 152 55 35;
  --accent-soft:   #F4DFD7;  --accent-soft-rgb: 244 223 215;
  --accent-contrast: #FFFFFF;
  --accent-on-deep: #F0A48F;                              /* accent text on --deep — 6.9:1 */

  /* lines & states */
  --border:        #E2D9CB;  --border-rgb: 226 217 203;
  --border-strong: #C9BCA8;
  --focus:         #1D5FD1;  --focus-rgb: 29 95 209;      /* focus ring — 3:1+ on all surfaces */
  --success:       #2F6B4F;  --success-rgb: 47 107 79;
  --warn:          #8A5A00;  --warn-rgb: 138 90 0;
  --error:         #B3261E;  --error-rgb: 179 38 30;
}
```

Roles: accent is reserved for primary CTAs, the active nav marker, metric badges and one highlighted word per headline. Never use accent for body text links on `--bg` (links use `--text` + accent underline). No "agency blue", no purple gradients.

## 3. Typography

- **Display / headings:** **Fraunces** (variable, opsz 9–144, wght 300–800, full Latin-Extended → French accents render well). Used at high optical size, weight 500–600, slight negative tracking.
- **Body / UI:** **Instrument Sans** (variable, wght 400–700) — legible, slightly characterful grotesk, not Inter.
- **Import:** self-hosted via `@fontsource-variable/fraunces` and `@fontsource-variable/instrument-sans` (woff2, latin + latin-ext subsets, `font-display: swap`), preloaded. Fallback: Google Fonts link if self-hosting is unavailable.
- **Fallback stacks:**
  - `--font-display: "Fraunces Variable", "Fraunces", Georgia, "Times New Roman", serif;`
  - `--font-body: "Instrument Sans Variable", "Instrument Sans", ui-sans-serif, "Segoe UI", Arial, sans-serif;`
- **Scale (fluid, ~1.25 ratio):**
  - `--fs-hero: clamp(2.5rem, 1.6rem + 4.2vw, 5rem)` — H1, line-height 1.02, tracking −0.02em
  - `--fs-h2: clamp(2rem, 1.5rem + 2.2vw, 3.25rem)` — line-height 1.08
  - `--fs-h3: clamp(1.3rem, 1.15rem + 0.6vw, 1.6rem)` — line-height 1.2
  - `--fs-lead: clamp(1.125rem, 1.05rem + 0.35vw, 1.3rem)`
  - `--fs-body: 1.0625rem` (17px), line-height 1.6, max 68ch
  - `--fs-small: 0.9375rem`; `--fs-eyebrow: 0.8125rem` uppercase, tracking 0.12em, body font 600
- Headings use `text-wrap: balance`; numbers use `font-variant-numeric: tabular-nums`.
- **Banned:** Inter, Roboto, Arial, Helvetica, Open Sans or system-ui as the visible personality; more than 2 families; italic body paragraphs; all-caps headings.

## 4. Component Stylings

All interactive elements: min 44×44 px hit area, `:focus-visible` = `outline: 3px solid var(--focus); outline-offset: 3px`.

| Component | Default | Hover | Active | Focus | Disabled |
|---|---|---|---|---|---|
| **Primary button** (`.btn`) | `--accent` bg, `--accent-contrast` text, radius 999px, 14/24 px padding, 600 weight, shadow-1 | `--accent-hover`, translateY(−1px), shadow-2, arrow icon nudges 3px right | translateY(0), shadow-1 | focus ring | 45% opacity, `cursor: not-allowed`, no transform |
| **Secondary button** (`.btn--ghost`) | transparent, 1.5px `--text` border, `--text` text | `--text` bg, `--bg` text | scale(.98) | focus ring | 45% opacity |
| **Button on dark** (`.btn--light`) | `--bg` bg, `--deep` text | `--surface` bg, translateY(−1px) | translateY(0) | focus ring (offset on dark) | 45% opacity |
| **Text link** | `--text`, underline 1px `--accent` offset 3px | underline 2px, `--accent-hover` text | `--accent-hover` | focus ring | — |
| **Nav link** | `--text`, 500 weight | accent underline grows from left (scaleX) | — | focus ring | — ; current page: `aria-current` + accent dot |
| **Card** (`.card`) | `--surface`, 1px `--border`, radius 20px, shadow-1 | translateY(−4px), shadow-3, border `--border-strong` | translateY(−2px) | focus ring around the whole card link | 60% opacity, no lift |
| **Tag / chip** (`.tag`) | `--surface-2` bg, `--text`, radius 999px, 13px 600 | `--accent-soft` bg | — | focus ring (if filter button) | — ; selected filter: `--text` bg, `--bg` text, `aria-pressed="true"` |
| **Metric badge** | `--accent-soft` bg, `--accent-hover` text, tabular nums | — | — | — | — |
| **Input / select / textarea** | `--surface`, 1.5px `--border-strong`, radius 12px, 48px min height | border `--muted` | — | border `--focus` + focus ring | `--surface-2` bg, 60% opacity; **error**: `--error` border + message with icon (not colour-only), `aria-invalid` |
| **Accordion (FAQ)** | `<details>`, hairline separators | question text gets accent underline | — | focus ring on `<summary>` | — ; open: `+` rotates to `×` |
| **Header** | transparent on top, height 76px | — | — | — | scrolled state: `--bg` at 92% + 12px backdrop blur + hairline bottom border, height 64px |

## 5. Layout Principles

- **Container:** `--container: 1240px`; narrow text column `--measure: 68ch`; gutters `clamp(16px, 4vw, 40px)`.
- **Grid:** 12-column CSS grid on ≥1024px; bento grids for services/system; asymmetric 7/5 splits for hero and feature sections.
- **Spacing scale (4px base):** `--s-1: 4px · --s-2: 8px · --s-3: 12px · --s-4: 16px · --s-5: 24px · --s-6: 32px · --s-7: 48px · --s-8: 64px · --s-9: 96px · --s-10: 128px`. Section padding `clamp(64px, 9vw, 128px)`.
- **Breaking the grid:** the hero phone overlaps the desktop frame and bleeds below the hero edge; the featured case-study card overlaps the deep-pine band; section eyebrows hang in the left margin on desktop.
- Rhythm: alternate `--bg` → `--surface-2` → `--deep` bands so long pages never feel flat.

## 6. Depth & Elevation

```css
--shadow-1: 0 1px 2px rgb(var(--text-rgb) / .06), 0 1px 1px rgb(var(--text-rgb) / .04);
--shadow-2: 0 4px 12px rgb(var(--text-rgb) / .08), 0 2px 4px rgb(var(--text-rgb) / .05);
--shadow-3: 0 18px 40px -12px rgb(var(--text-rgb) / .18), 0 4px 10px rgb(var(--text-rgb) / .06);
--shadow-device: 0 40px 80px -24px rgb(var(--deep-rgb) / .35), 0 12px 24px -8px rgb(var(--deep-rgb) / .18);
--radius-s: 12px; --radius-m: 20px; --radius-l: 28px;
```
Grain: fixed pseudo-element with an inline SVG `feTurbulence` noise at 4% opacity, `pointer-events: none` (static — never animated).

## 7. Animation & Interaction (L2)

Only `transform` and `opacity` animate. Durations 180–700 ms, easing `cubic-bezier(.2,.7,.2,1)`.

```css
/* scroll reveal (JS adds .is-in via IntersectionObserver) */
.reveal { opacity: 0; transform: translateY(18px); transition: opacity .7s var(--ease), transform .7s var(--ease); }
.reveal.is-in { opacity: 1; transform: none; }
.reveal[data-delay="1"] { transition-delay: .08s; } /* … up to 4 */

/* hero H1: words rise in, staggered (spans injected at build time) */
.h-anim .w { display: inline-block; opacity: 0; transform: translateY(.4em); animation: rise .8s var(--ease) forwards; animation-delay: calc(var(--i) * 60ms); }
@keyframes rise { to { opacity: 1; transform: none; } }

/* listing cards syncing into the hero mock */
.listing { animation: sync .6s var(--ease) both; animation-delay: calc(.9s + var(--i) * .35s); }
@keyframes sync { from { opacity: 0; transform: translateY(12px) scale(.98); } }

/* neighbourhood marquee */
.marquee__track { animation: marquee 40s linear infinite; }
@keyframes marquee { to { transform: translateX(-50%); } }

/* system line draws when in view */
.system__line { transform: scaleX(0); transform-origin: left; transition: transform 1.2s var(--ease); }
.is-in .system__line { transform: scaleX(1); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
  .reveal, .h-anim .w { opacity: 1; transform: none; }
  .marquee__track { animation: none; }
}
```
JS (vanilla, deferred): IntersectionObserver reveals, count-up (`requestAnimationFrame`, skipped under reduced motion), header scroll state (passive listener, rAF-throttled), Utilmo lead drop-in, portfolio filter, mobile menu, forms.

Signature motion count on the homepage: hero H1 words · H2 reveals · listing sync · count-up · marquee · system line · card hover lift · CTA arrow nudge · lead drop-in = 9 (≤10).

## 8. Do's and Don'ts

**Do**
1. Lead every page with the broker's outcome (listings, valuations, leads), not with the agency.
2. Put hard proof in the first two screens — and only proof that can be verified.
3. Offer self-selection early: *Courtier solo · Équipe · Agence*.
4. Place a CTA after every major section; sticky "Réserver" bar + tap-to-call on mobile.
5. Write French natively first; English is adapted, never machine-translated.
6. Show real client sites in device frames with a metric badge.
7. Keep body copy ≤ 68ch, 17px+, AA contrast.
8. Label unconfirmed offers *Bientôt / Coming soon* (or omit them).

**Don't**
1. Don't use stock handshakes, generic skyline photos or solid-colour image boxes.
2. Don't use "agency blue", purple gradients or more than one accent colour.
3. Don't invent numbers, testimonials or client logos — placeholders stay visibly marked until verified.
4. Don't use sliders/carousels that autoplay content the user must read (Slider Revolution is being removed).
5. Don't animate `filter`, `width`, `top/left`, or blur moving elements.
6. Don't centre long paragraphs or build plain equal 3-card rows for everything.
7. Don't send the language switch to the homepage — it goes to the equivalent page.
8. Don't load analytics before consent (Quebec Law 25).

## 9. Responsive Behavior

- **Mobile-first**, `min-width` breakpoints: 640 / 768 / 1024 / 1280 px. Tested at 360, 375, 768, 1024, 1440.
- **Header:** < 1024px → logo + language + menu button; menu is a full-height sheet (`aria-expanded`, focus trapped, Esc closes). ≥ 1024px → inline nav + CTA.
- **Sticky mobile CTA bar** (< 768px): "Réserver" (primary) + "Appeler" (if phone configured), 64px tall, respects `env(safe-area-inset-bottom)`; hidden while the final form is in view.
- **Hero:** single column on mobile, mock below copy (phone mock only < 640px); 7/5 split ≥ 1024px.
- **Bento / grids:** 1 col < 640 → 2 cols ≥ 640 → 4/12-col layouts ≥ 1024.
- **Touch targets** ≥ 44×44px; form fields 48px tall; no horizontal overflow at 320px (marquee is clipped by `overflow: hidden` on its wrapper).
- **Type** fluid via `clamp()`; tables become stacked cards < 768px.
