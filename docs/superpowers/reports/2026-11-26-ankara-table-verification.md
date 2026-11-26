# Ankara Table Redesign — Verification Report

**Date:** 2026-11-26
**Branch:** `design/ankara-table`
**Plan:** [2026-11-26-ankara-table-redesign.md](../plans/2026-11-26-ankara-table-redesign.md)
**Spec:** [2026-11-26-ankara-table-redesign-design.md](../specs/2026-11-26-ankara-table-redesign-design.md)

## 1. Static Checks, Build & Automated Tests

| Check | Command | Result |
| --- | --- | --- |
| TypeScript | `npx tsc -b` | Passed (0 errors) |
| Linter | `npm run lint` (`oxlint`) | Passed (0 warnings, 0 errors across 35 files) |
| Unit & Integration Tests | `npm test` (`vitest run`) | Passed (6 test files, 47 tests passed) |
| Production Build | `npm run build` (`vite build`) | Passed (`dist/` built in 1.94s; CSS 32.59 kB, JS 294.95 kB) |
| Forbidden Tokens / Fonts | `Select-String -Pattern 'gradient\|Playfair'` on `src/`, `index.html` | Passed (0 matches) |

## 2. WCAG 2.1 Contrast Verification

All text/background colour pairs used in the Ankara Table palette meet WCAG AA (4.5:1 for normal text, 3.0:1 for large text 24px+):

| Foreground | Background | Ratio | Requirement | Status |
| --- | --- | --- | --- | --- |
| `--color-ink` (`#2a1d14`) | `--color-bg` (`#fbf5ea`) | 15.07:1 | 4.5:1 | Pass |
| `--color-muted` (`#5b4c40`) | `--color-bg` (`#fbf5ea`) | 7.58:1 | 4.5:1 | Pass |
| `--color-red` (`#c8281e`) | `--color-bg` (`#fbf5ea`) | 5.12:1 | 4.5:1 | Pass |
| `--color-emerald-ink` (`#0a5230`) | `--color-bg` (`#fbf5ea`) | 8.55:1 | 4.5:1 | Pass |
| `--color-orange` (`#e8671a`, ≥24px script kicker) | `--color-bg` (`#fbf5ea`) | 3.03:1 | 3.0:1 (large text) | Pass |
| `--color-ink` (`#2a1d14`) | `--color-surface` (`#f6ecd9`) | 13.95:1 | 4.5:1 | Pass |
| `--color-muted` (`#5b4c40`) | `--color-surface` (`#f6ecd9`) | 7.02:1 | 4.5:1 | Pass |
| `--color-emerald-ink` (`#0a5230`) | `--color-surface` (`#f6ecd9`) | 7.92:1 | 4.5:1 | Pass |
| `--color-gold` (`#f2a918`) | `--color-black` (`#0b0907`) | 9.91:1 | 4.5:1 | Pass |
| `--color-surface` (`#f6ecd9`) | `--color-black` (`#0b0907`) | 16.96:1 | 4.5:1 | Pass |
| `--color-white` (`#ffffff`) | `--color-black` (`#0b0907`) | 19.88:1 | 4.5:1 | Pass |
| `--color-white` (`#ffffff`) | `--color-red` (`#c8281e`) | 5.56:1 | 4.5:1 | Pass |
| `--color-white` (`#ffffff`) | `--color-emerald` (`#0f7a47`) | 5.39:1 | 4.5:1 | Pass |
| `--color-black` (`#0b0907`) | `--color-gold` (`#f2a918`) | 9.91:1 | 4.5:1 | Pass |
| `--color-error` (`#b42318`) | `--color-error-bg` (`#fef3f2`) | 6.05:1 | 4.5:1 | Pass |

## 3. Responsive Layout & Review Focus Checks (Playwright / Chrome on `vite preview`)

| Viewport Width | `scrollWidth` | `innerWidth` | Horizontal Overflow | Status |
| --- | --- | --- | --- | --- |
| `375px` | `375` | `375` | None | Pass |
| `800px` | `800` | `800` | None | Pass |
| `1024px` | `1024` | `1024` | None | Pass |
| `1440px` | `1440` | `1440` | None | Pass |

Specific review-focus verifications at `375px`:
- **Hero caption vs controls:** `[data-testid="hero-caption"]` bottom edge at `852.44px`, pause button top edge at `872.44px` (`overlaps: false`).
- **Long Italian dish name wrapping:** `menu-row-suya-skewers` ("Spiedini & Carne Speziata alla Brace") wraps cleanly (`titleHeight: 67.5px`), while price `€14,50` remains on a single line (`priceHeight: 28px`).
- **Photo-less menu row alignment:** `menu-row-alloco-plantain` and `menu-row-bissap-hibiscus` preserve the `64px` `data-slot="photo"` column without rendering an empty circle or shifting the price.

## 4. End-to-End Browser Flow (375px)

1. Added 2 dishes from the menu; mobile order bar appeared with updated count.
2. Switched to **Asporto** (`#tab-takeaway`), entered name and pickup time `20:30`, submitted: opened `https://wa.me/393495655600?text=Ciao%20Mama%20Africa%20Cosenza!%20Vorrei%20ordinare%20da%20asporto...`.
3. Switched to **Prenota un Tavolo** (`#tab-reservation`), entered name, Wednesday `2026-12-02`, and invalid time `17:00`, submitted: `#res-time-error` displayed `"Orario fuori dagli orari di apertura. Controlla gli orari qui sotto."`.
4. Updated time to `20:30` and submitted: opened `https://wa.me/393495655600?text=Ciao%20Mama%20Africa%20Cosenza!%20Vorrei%20prenotare%20un%20tavolo%3A...`.

## 5. Captured Screenshots

Screenshots saved in the session scratch directory (`scratch/screenshots/`):
- `top-375.png`, `top-800.png`, `top-1024.png`, `top-1440.png`
- `menu-375.png`, `menu-1440.png`
- `whatsapp-builder-1440.png`
- `events-1440.png`
- `location-1440.png`
- `footer-1440.png`

## 6. Open Items (Out of Redesign Scope)

- **Real restaurant photography:** Replace remaining placeholder/AI-generated food and interior photos with final photography from Mama Africa Cosenza when available.
- **Confirmed opening hours:** Replace demo opening hours (`Orari di Apertura (Demo)`) with final verified hours.
- **Final Nigerian menu content:** Confirm final dish names, descriptions, and prices with the restaurant before launch.
