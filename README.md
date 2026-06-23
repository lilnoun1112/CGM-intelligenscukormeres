# Intelligens Cukormérés — Interactive Prototype

A responsive React prototype of the Accu-Chek SmartGuide CGM campaign landing
experience, rebuilt from the Figma design. This first build covers the **hero
carousel** and the **info page**, wired together with the transitions seen in
the reference video.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (default http://localhost:5173).

To build for production: `npm run build`, preview with `npm run preview`.

## What's included

- **Hero** — fullscreen 4-slide carousel (Intelligens cukormérés → Folyamatos
  cukorszintmérés → AI predikció → 14 napos szenzorélettartam). Crossfade
  transitions, autoplay with loop, pagination dots, prev/next arrows, white
  logo over the photo, and the curved divider signature shape.
- **Info page** — header, "Kinek ajánljuk?" tabbed checklist (Diabétesz /
  Teljesítmény / Életmód), "Applikáció és következtetések" prediction cards,
  "Miből áll a CGM-rendszer?" sensor + app explainer, "Felhasználók
  visszajelzései" testimonial cards, support CTA, and the full footer.
- **Navigation** — hero CTA / menu crossfades into the info page; slide-out
  hamburger menu.

## Project structure

```
src/
  App.jsx            view switching (hero ⇄ info) + slide-out menu
  index.css          design tokens (colors, type, buttons) + resets
  components/
    Hero.jsx/.css    hero carousel
    Info.jsx/.css    long info page
    Header.jsx/.css  logo + hamburger
    Footer.jsx/.css  footer
    Logo.jsx         dark/white logo variants
    Icons.jsx        inline SVG icon set
    infoData.js      tab + prediction card copy (Hungarian)
  assets/            images + logo SVGs
```

## Notes & known substitutions

- **Fonts**: the Figma uses *Roche Sans* (proprietary) and *Cronos Pro* for the
  logo. Those aren't freely available, so this prototype loads **Mulish** as a
  humanist-sans stand-in via Google Fonts in `src/index.css`. Swap the
  `@import` and the `--font-display` / `--font-body` tokens for the licensed
  webfonts in production.
- **Icons** (phone-graph, AI, calendar, stars, socials, etc.) are recreated as
  inline SVG to match the Figma vectors.
- The hero feature icons and curved divider are drawn in code, not exported
  images, so they scale crisply.
- Respects `prefers-reduced-motion`.

## Not yet built (next phases)

Testimonials page, shop-profiling entry, and the 7-step profiling wizard
(profiling_flow 1–7) — assets for these are already in `src/assets/`.
