# Ankara Table Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle every section of the Mama Africa site in the approved Ankara Table direction, without changing any behaviour.

**Architecture:** Restyle in place. Replace the design tokens and display font, add three small brand-motif components and one shared button stylesheet, then restyle each section component on top of them. Logic (cart, forms, validation, events, slideshow) is untouched; tests that query by role and text keep passing.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind v4 (`var(--token)` arbitrary classes), lucide-react, Vitest + Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-26-ankara-table-redesign-design.md`

## Global Constraints

- Solid colours only: no `linear-gradient`, `radial-gradient` or gradient utilities anywhere.
- No emoji in code, copy or assets. Icons only from lucide-react and only when functional.
- No new runtime dependencies. Fonts from Google Fonts in `index.html`: Alfa Slab One 400, Kaushan Script 400, Karla 400/600/700/800. Remove Playfair Display.
- Gold (`--color-gold`) and orange (`--color-orange`) are never text on cream; `--color-green` is decorative only. Green text uses `--color-emerald-ink`.
- Script font (`--font-script`) only for kickers of 2 to 4 words.
- All copy in `src/i18n/translations.ts`, Italian and English.
- Touch targets stay at least 44px; visible keyboard focus; `prefers-reduced-motion` respected.
- Commits: no AI attribution lines. Commit messages in the repo's style (`design: ...`, `feat: ...`, `test: ...`).
- Branch: `design/ankara-table`.

## Review Focus

1. A dish with no `image` in the full menu list: its text must line up with rows that have a round photo (no empty circle, no shifted price). Test in Task 6.
2. Long Italian dish names at 375px (for example "Spiedini & Carne Speziata alla Brace"): name wraps, dotted leader shrinks, price never wraps or overflows. Browser check in Task 6, and in Task 10's 375px pass.
3. The hero caption frame on a phone must not cover the slide dots or the pause button, and must switch language with the toggle mid-slideshow. Test in Task 5.
4. If Kaushan Script or Alfa Slab One fails to load, fallbacks (`cursive`, `Georgia, serif`) must still render readable text. Covered by the font-stack values in Task 1.
5. Reduced motion: no new animation runs when `prefers-reduced-motion: reduce`. Covered by the existing global rule in `src/index.css`; Task 2 adds no animation.

---

### Task 1: Logo-derived tokens and fonts

**Files:**
- Modify: `src/styles/tokens.css` (replace palette and font tokens)
- Modify: `index.html:12-16` (Google Fonts link)
- Modify: every file under `src/components/` and `src/App.tsx` (token renames)

**Interfaces:**
- Produces tokens (used by every later task): `--color-bg #fbf5ea`, `--color-surface #f6ecd9`, `--color-surface-card #ffffff`, `--color-ink #2a1d14`, `--color-muted #5b4c40`, `--color-black #0b0907`, `--color-black-soft #1a1511`, `--color-gold #f2a918`, `--color-red #c8281e`, `--color-red-hover #a62019`, `--color-orange #e8671a`, `--color-green #128a3e`, `--color-brown #7a3e1a`, `--color-border #e3d3b8`, `--color-border-on-black #2b231c`, `--color-white #ffffff`; keep `--color-emerald`, `--color-emerald-hover`, `--color-emerald-ink`, `--color-emerald-tint`, `--color-error`, `--color-error-bg`, shadows and radii. Fonts: `--font-display: 'Alfa Slab One', Georgia, serif`, `--font-script: 'Kaushan Script', cursive`, `--font-body: 'Karla', system-ui, -apple-system, sans-serif`. Radius: `--radius-md: 6px`, `--radius-lg: 10px`.

- [ ] **Step 1:** Rewrite `tokens.css` with the tokens above.
- [ ] **Step 2:** Rename tokens across `src/` in one pass: `--color-espresso-soft` to `--color-black-soft` (rename this first), `--color-espresso` to `--color-black` for backgrounds/borders and to `--color-ink` where it is a text colour on cream (`text-[var(--color-espresso)]` becomes `text-[var(--color-ink)]`), `--color-terracotta-hover` to `--color-red-hover`, `--color-terracotta` to `--color-red`, `--color-border-dark` to `--color-border-on-black`, `--color-gold-text` to `--color-emerald-ink` (the one badge using it).
- [ ] **Step 3:** In `index.html` load Alfa Slab One, Kaushan Script and Karla 400;600;700;800, and drop Playfair Display.
- [ ] **Step 4: Verify no old names remain**

Run: `grep -rnE "color-(espresso|terracotta|border-dark|gold-text)" src index.html`
Expected: no output.

- [ ] **Step 5: Run checks**

Run: `npx tsc -b && npm run lint && npm test`
Expected: type-check clean, lint 0 warnings, all 41 tests pass.

- [ ] **Step 6: Commit** `design: replace tokens and display font with logo-derived system`

### Task 2: Brand motif components and shared buttons

**Files:**
- Create: `src/components/brand/StripeBand.tsx`, `src/components/brand/ZigzagDivider.tsx`, `src/components/brand/ScriptKicker.tsx`
- Create: `src/components/brand/brand.test.tsx`
- Create: `src/styles/buttons.css`, import it in `src/index.css` after `tokens.css`

**Interfaces:**
- Produces: `StripeBand(): JSX.Element` (5 equal stripes red, orange, gold, green, brown; 8px; `aria-hidden="true"`); `ZigzagDivider(): JSX.Element` (14px tall inline-SVG background of solid triangles in red, orange, green, gold, brown, orange; `aria-hidden="true"`); `ScriptKicker({ children: ReactNode, tone: 'red' | 'orange' | 'emerald' | 'gold' }): JSX.Element` (renders a `<p>` in `--font-script`; `gold` only allowed on black backgrounds).
- Produces CSS classes in `buttons.css` (`@layer components`): `.btn` (base: inline-flex, min-height 48px, gap, radius-md, Karla 800, 13px uppercase, tracking .07em, focus ring), `.btn-primary` (black fill, gold text, hover `--color-black-soft`), `.btn-accent` (red fill, white text, hover `--color-red-hover`), `.btn-whatsapp` (emerald fill, white text, hover `--color-emerald-hover`), `.btn-ghost` (no fill, ink text, 3px orange bottom border, radius 0), `.btn-outline` (2px ink border, ink text, hover black fill with white text).

- [ ] **Step 1: Write the failing tests** in `brand.test.tsx`:

```tsx
it('hides the stripe band and zigzag from assistive technology', () => {
  const { container } = render(<><StripeBand /><ZigzagDivider /></>)
  const decorative = container.querySelectorAll('[aria-hidden="true"]')
  expect(decorative).toHaveLength(2)
})

it('renders the stripe band with the five logo colours in order', () => {
  const { container } = render(<StripeBand />)
  const stripes = [...container.firstElementChild!.children].map((el) => el.getAttribute('data-colour'))
  expect(stripes).toEqual(['red', 'orange', 'gold', 'green', 'brown'])
})

it('renders the script kicker as readable text', () => {
  render(<ScriptKicker tone="red">benvenuti a casa</ScriptKicker>)
  expect(screen.getByText('benvenuti a casa')).toBeVisible()
})
```

- [ ] **Step 2:** Run `npx vitest run src/components/brand`. Expected: FAIL, modules not found.
- [ ] **Step 3:** Implement the three components and `buttons.css` per the Interfaces block.
- [ ] **Step 4:** Run `npx vitest run src/components/brand`. Expected: 3 passed.
- [ ] **Step 5: Commit** `design: add stripe band, zigzag divider, script kicker and button styles`

### Task 3: Kicker copy

**Files:**
- Modify: `src/i18n/translations.ts` (type and both languages)

**Interfaces:**
- Produces: `t.hero.kicker`, `t.menu.kicker`, `t.whatsapp.kicker`, `t.events.kicker`, `t.location.kicker` (strings). Values, it / en: hero "benvenuti a casa" / "welcome home"; menu "cosa bolle in pentola" / "what's cooking"; whatsapp "un tavolo per te" / "a table for you"; events "la sera da mama" / "nights at mama's"; location "vieni a trovarci" / "come and see us". The existing `eyebrow` keys are removed where the kicker replaces them (Tasks 5 to 9 stop rendering them); remove each `eyebrow` key in the task that stops using it so the type-check never breaks.

- [ ] **Step 1:** Add the five `kicker` keys to the type and to both languages.
- [ ] **Step 2:** Run `npx tsc -b`. Expected: clean.
- [ ] **Step 3: Commit** `feat: add Nigerian-voice section kickers`

### Task 4: Header, mobile order bar and footer

**Files:**
- Modify: `src/components/Header.tsx`, `src/components/MobileOrderBar.tsx`, `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `StripeBand`, `.btn-accent` (Task 2).

- [ ] **Step 1:** Header: black bar, cream nav links with gold hover underline (keep `nav-link-underline`), reserve button uses `.btn-accent`; render `<StripeBand />` as the last child inside the sticky `<header>` so it sticks with it. Keep every role, label and breakpoint (`lg`) unchanged.
- [ ] **Step 2:** MobileOrderBar: black bar, button `.btn-accent` full width, count chip gold fill with black text.
- [ ] **Step 3:** Footer: `<StripeBand />` above a black footer; labels gold, body cream (`--color-surface`), names white; headings in `--font-display`.
- [ ] **Step 4:** Run `npm test`. Expected: all pass.
- [ ] **Step 5:** Browser check at 375px and 1024px: header on one line at 1024px, no horizontal scroll at 375px.
- [ ] **Step 6: Commit** `design: restyle header, order bar and footer`

### Task 5: Hero with caption frame

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/i18n/translations.ts` (hero title, subtitle; remove `hero.eyebrow`)
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `ScriptKicker`, `.btn-primary`, `.btn-ghost`.
- Produces: each entry of `HERO_IMAGES` becomes `{ src: string; alt: LocalizedText; caption: { title: LocalizedText; line: LocalizedText } }` (replacing `altIt`/`altEn`). Captions (it / en):
  1. hero-feast: "La tavola di Mama" / "Mama's table"; "Jollof, fataya e pesce alla brace" / "Jollof, fataya and grilled fish"
  2. fb-cover: "Il nostro locale" / "Our place"; "A due passi da Corso Mazzini" / "Just off Corso Mazzini"
  3. dish-jollof: "Party Jollof"; "Riso affumicato con platano dolce" / "Smoky rice with sweet plantain"
  4. dish-grill: "Dalla brace" / "Off the grill"; "Tilapia e suya con platano e lime" / "Tilapia and suya with plantain and lime"
  5. dish-suya-real: "Suya"; "Carne speziata alla brace" / "Spiced meat off the charcoal"
  6. dj-sky-face: "DJ Sky face"; "Afrobeats e Amapiano il venerdì" / "Afrobeats and Amapiano on Fridays"
  7. dorime-chief-priest: "Ospiti speciali" / "Special guests"; "Dorime Chief Priest da Mama Africa" / "Dorime Chief Priest at Mama Africa"
  8. nightlife-crowd: "Venerdì in pista" / "Friday on the dancefloor"; "Musica e drink fino a tardi" / "Music and drinks till late"
- Hero copy: title it "Vera cucina nigeriana, fatta al momento a Cosenza" / en "Real Nigerian cooking, made fresh in Cosenza"; the words "fatta al momento" / "made fresh" render in `--color-emerald-ink`. Store the title as three keys `titleStart`, `titleHighlight`, `titleEnd` so the highlight is markup, not string parsing. Subtitle it "Dal party jollof alla suya, ogni piatto è cucinato al momento, come lo fa mama." / en "From party jollof to suya, every plate is cooked to order, the way mama makes it."

- [ ] **Step 1: Update and add tests** in `App.test.tsx`. Change the two h1 assertions in "opens in Italian by default and toggles to English" to `/Vera cucina nigeriana/i` and `/Real Nigerian cooking/i`. Add:

```tsx
it('shows the caption of the active hero slide and follows the slideshow', () => {
  vi.useFakeTimers()
  vi.setSystemTime(WEDNESDAY_EVENING)
  render(<App />)
  const caption = screen.getByTestId('hero-caption')
  expect(caption).toHaveTextContent('La tavola di Mama')
  act(() => { vi.advanceTimersByTime(3000) })
  expect(caption).toHaveTextContent('Il nostro locale')
})

it('switches the hero caption language with the toggle', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /Passa a Inglese/i }))
  expect(screen.getByTestId('hero-caption')).toHaveTextContent("Mama's table")
})
```

- [ ] **Step 2:** Run `npx vitest run src/App.test.tsx`. Expected: the 2 new tests and the language test FAIL.
- [ ] **Step 3:** Implement: cream hero, two-column grid from `lg` (text left with 10px gold spine on the right edge; on mobile the spine is the bottom edge), `ScriptKicker tone="red"`, h1 in `--font-display` black with the highlighted span, `.btn-primary` WhatsApp button and `.btn-ghost` menu link. Right column: photo panel fills the column; slides, pause button and dots keep their current roles and labels; dots and pause sit in a bar below the photo (not over it); the caption frame (`data-testid="hero-caption"`, cream, red 6px left border, `--shadow-card`) sits on the photo's bottom-left with 16px inset, `aria-live="polite"`.
- [ ] **Step 4:** Run `npm test`. Expected: all pass.
- [ ] **Step 5: Commit** `design: restyle hero with gold spine and slide captions`

### Task 6: Menu

**Files:**
- Modify: `src/components/MenuSection.tsx`, `src/components/DishCard.tsx`, `src/i18n/translations.ts` (remove `menu.eyebrow`)
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `ZigzagDivider`, `ScriptKicker`, `.btn-*`.

- [ ] **Step 1: Write the failing test:**

```tsx
it('aligns menu rows without a photo with rows that have one', () => {
  render(<App />)
  const withPhoto = screen.getByTestId('menu-row-jollof-rice')
  const withoutPhoto = screen.getByTestId('menu-row-alloco-plantain')
  expect(withPhoto.querySelector('img')).not.toBeNull()
  expect(withoutPhoto.querySelector('img')).toBeNull()
  expect(withoutPhoto.querySelector('[data-slot="photo"]')).not.toBeNull()
})
```

- [ ] **Step 2:** Run `npx vitest run src/App.test.tsx -t "aligns menu rows"`. Expected: FAIL.
- [ ] **Step 3:** Implement. Section: `<ZigzagDivider />` on top, centered `ScriptKicker tone="orange"` and h2 "Il Menu"/"Menu" (reuse `t.menu.title`). Signature: same swipe row and grid, items become photo on top (gold 3px ring, radius-lg) with slab name, red price, two-line description and `AddToOrderButton`, no card border or shadow. Category filter: pills, radius full, active black with gold text, inactive outline. Full menu: drop the boxed "Carta Completa" frame; rows are `data-testid="menu-row-<id>"`, a fixed 64px `data-slot="photo"` column (round photo with 3px gold ring when `dish.image` exists, empty otherwise), then slab name, dotted leader (`--color-border`), red price, description, badges, add button; rows separated by 2px dotted `--color-border`. One column below `md`, two from `md`.
- [ ] **Step 4:** Run `npm test`. Expected: all pass.
- [ ] **Step 5:** Browser check at 375px: "Spiedini & Carne Speziata alla Brace" wraps, price stays on one line, no horizontal scroll.
- [ ] **Step 6: Commit** `design: restyle menu as an Ankara menu card`

### Task 7: Booking and takeaway

**Files:**
- Modify: `src/components/WhatsAppBuilder.tsx`, `src/i18n/translations.ts` (remove `whatsapp.eyebrow`)

- [ ] **Step 1:** Cream band, `ScriptKicker tone="red"`, slab h2. Form panel stays the one white card (`--shadow-card`, radius-lg). Tablist: active tab black with gold text, inactive ink on `--color-surface`. Inputs `--color-surface` fill, `--color-border` border. Submit buttons `.btn-whatsapp` full width. No change to ids, labels, roles, validation or handlers.
- [ ] **Step 2:** Run `npm test`. Expected: all pass.
- [ ] **Step 3: Commit** `design: restyle booking and takeaway form`

### Task 8: Events

**Files:**
- Modify: `src/components/EventsSection.tsx`, `src/i18n/translations.ts` (remove `events.eyebrow`)

- [ ] **Step 1:** Header row: `ScriptKicker tone="orange"`, slab h2, subtitle; header photo with 3px gold border. Featured event: full-width black band (breaks out of the container), 6px top border built from `StripeBand`, gold slab title, gold day badge with black text, cream text, the two photos with gold rings, `.btn-accent` reserve button. Weekly events: three columns on cream separated by 2px dotted vertical rules on `md+`, stacked with dotted horizontal rules on mobile, no cards. Gallery: three photos with 2px gold border, captions in ink.
- [ ] **Step 2:** Run `npm test`. Expected: all pass (the All White Night test still finds its texts).
- [ ] **Step 3: Commit** `design: restyle events with featured night band`

### Task 9: Location

**Files:**
- Modify: `src/components/LocationSection.tsx`, `src/i18n/translations.ts` (remove `location.eyebrow`)

- [ ] **Step 1:** `ScriptKicker tone="emerald"`, slab h2. Address and hours block without card chrome, slab subheadings. Maps link `.btn-primary`, WhatsApp `.btn-whatsapp`, Chiamaci `.btn-outline`. Map placeholder: `ZigzagDivider` as its top edge, cream fill, `.btn-outline` "Mostra la mappa".
- [ ] **Step 2:** Run `npm test`. Expected: all pass.
- [ ] **Step 3: Commit** `design: restyle location section`

### Task 10: Verification and evidence

**Files:**
- Create: `docs/superpowers/reports/2026-11-26-ankara-table-verification.md`

- [ ] **Step 1:** Run `npx tsc -b && npm run lint && npm test && npm run build`. Expected: all clean, all tests pass.
- [ ] **Step 2:** Run `grep -rnE "gradient|Playfair" src index.html`. Expected: no output.
- [ ] **Step 3:** Contrast table: list every text/background pair used and its ratio (script in the session computed: ink 15.1, muted 7.6, red 5.1, emerald-ink on cream, gold on black 9.9, cream on black 17.0, white on red, white on emerald). Expected: every pair at or above 4.5:1, or 3:1 for text 24px and larger.
- [ ] **Step 4:** Screenshots at 375px, 800px, 1024px and 1440px of each section; check no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth`) at each width.
- [ ] **Step 5:** End-to-end in the browser: add 2 dishes, order bar shows count and total, takeaway submit opens a `wa.me` URL with the order; reservation with a valid time opens a `wa.me` URL; 17:00 shows the opening-hours error.
- [ ] **Step 6:** Write the report with results, screenshots list and open items (real photos, real hours, Nigerian menu content).
- [ ] **Step 7: Commit** `docs: add Ankara Table verification report`
