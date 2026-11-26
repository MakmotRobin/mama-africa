# Ankara Table: Mama Africa visual redesign

Date: 2026-11-26
Status: approved by Robin on 2026-11-26
Approved direction: **B, Ankara Table** (chosen by the client from the brand proposal at
https://makmotrobin.github.io/mama-africa-brand-proposal/)

## 1. Intent

Mama Africa is a West African restaurant and bar in Cosenza, mainly Nigerian. Robin found the
current site technically sound but generic: same card layout in every section, no brand
character, too much uppercase. The client wants the site branded from the logo.

Ankara Table turns the site into something that feels like a printed family menu: warm cream
pages, black and gold structure, the headwrap stripes and the zigzag triangle row from the logo
as borders and dividers, a brush-script voice for short kickers, heavy slab headings, and food
photos framed in gold. Success: the client recognises their logo in every section, the site no
longer looks like a template, and every existing flow (menu, cart, booking, takeaway, events,
map) still works exactly as today.

## 2. Goals, non-goals, anti-goals

**Goals**
- Apply the Ankara Table look to every section: header, hero, menu, booking/takeaway, events,
  location, footer, mobile order bar.
- Replace the current design tokens with logo-derived ones (section 4) and switch the display
  typeface.
- Introduce three reusable brand motifs as components: stripe band, zigzag divider, script kicker.
- Rewrite section kickers and the hero headline in a Nigerian voice, in Italian and English.
- Keep or improve accessibility: WCAG AA contrast, 44px touch targets, keyboard focus, reduced
  motion.

**Non-goals**
- No new features or flows. No backend.
- No menu content changes. Several dishes are Senegalese or Ivorian (Fataya, Mafé, Attiéké,
  Bissap); changing the menu needs the owner's list. The design must work with today's 12 items.
- No new photography. Real dish photos and real opening hours come from the owner later; the
  design must look right with the current images and with dishes that have no photo.
- No dark theme. The site is single-theme by choice (cream pages, black bands).

**Anti-goals** (failure even if it "works")
- Gradients of any kind, emoji, or decorative icons without a function (Robin's hard rules).
- Every block wrapped in the same rounded, shadowed card. Cards only where an element must stand
  apart.
- Script font used for anything longer than a few words or for anything a guest must read to act.
- Any regression in the existing tests or in the booking, takeaway, or WhatsApp flows.
- Gold or orange text on cream (fails contrast).

## 3. Constraints

- Stack stays: React 19, TypeScript, Vite, Tailwind v4, lucide-react icons, Vitest. No new
  runtime dependencies. Fonts load from Google Fonts in `index.html`, as today.
- Design tokens live in `src/styles/tokens.css`; components use `var(--token)` classes as today.
  Tailwind v4 reads `--radius-*` from the same file.
- All copy lives in `src/i18n/translations.ts` (Italian default, English toggle).
- Robin's standards: solid colours only, no emoji, subtle shadows, short purposeful animation,
  plan approved before building, evidence-based verification, no AI attribution in commits.
- Work starts on a new branch `design/ankara-table`, cut from `design/ui-polish` after the
  pending UI-polish changes are committed (needs Robin's approval to commit).

## 4. Design system

### Colour tokens (replace the current palette in `tokens.css`)

| Token | Value | Role | Contrast notes |
|---|---|---|---|
| `--color-bg` | `#fbf5ea` | page background (cream) | |
| `--color-surface` | `#f6ecd9` | alternate section band, input fill | |
| `--color-surface-card` | `#ffffff` | the few true cards (form panel, featured dish) | |
| `--color-ink` | `#2a1d14` | body text | 15.1:1 on cream |
| `--color-muted` | `#5b4c40` | secondary text | 7.6:1 on cream |
| `--color-black` | `#0b0907` | header, footer, primary buttons, featured event band | |
| `--color-gold` | `#f2a918` | rings, spines, fills, text **on black only** | 9.9:1 on black, 1.85:1 on cream: never text on cream |
| `--color-red` | `#c8281e` | prices, nav CTA, accents | 5.1:1 on cream; cream on red 4.7:1 |
| `--color-red-hover` | `#a62019` | hover of red fills | |
| `--color-orange` | `#e8671a` | stripes, zigzag, underline of ghost buttons, script at 24px+ only | 3.0:1 on cream |
| `--color-green` | `#128a3e` | stripes and zigzag only (decorative) | 4.1:1 on cream: not for text |
| `--color-brown` | `#7a3e1a` | stripes, zigzag | |
| `--color-emerald` / `-hover` / `-ink` / `-tint` | keep current values | WhatsApp submit buttons, vegan badges, green text | existing tokens already pass AA |
| `--color-border` | `#e3d3b8` | hairlines, dotted menu leaders | |
| `--color-error`, `--color-error-bg` | keep | form errors | |

Names that components already use (`--color-espresso`, `--color-terracotta`, etc.) are renamed
to the new names across the codebase in one pass; no aliases are left behind.

### Typography

| Role | Face | Use |
|---|---|---|
| Display | **Alfa Slab One** (400) | h1, h2, h3, dish names, prices in the menu |
| Script kicker | **Kaushan Script** | one short line above a heading (2 to 4 words), never body text, never a label a guest must read to act |
| Body and UI | **Karla** 400/600/700/800 | everything else, as today |

Playfair Display is removed. Uppercase with wide tracking is kept only for small labels and
buttons; headings are not uppercase.

### Motifs (new components in `src/components/brand/`)

- `StripeBand`: a full-width row of five equal solid stripes, red, orange, gold, green, brown,
  8px tall. Used directly under the header and above the footer.
- `ZigzagDivider`: a repeating row of solid triangles in the logo colours (inline SVG
  background, 14px tall), `aria-hidden`. Used between major sections.
- `ScriptKicker`: renders the script line above a section heading; takes the text and a colour
  token (red, orange or emerald-ink, depending on background).

### Shape and depth

- Radius: controls `--radius-md` (6px), the few cards `--radius-lg` (10px), dish photos round
  (50%) in lists.
- Shadow: only on the booking panel and the hero photo caption frame (`--shadow-card`).
- Gold "spine": a 10px gold border on one edge of the hero text block (right on desktop, bottom
  on mobile).
- Round dish photos with a 3px gold ring.

## 5. Sections

Descriptions follow mockup B (see `.superpowers/brainstorm/.../brand-proposal.html` or the
published proposal). Where the mockup does not cover a section, the builder applies the same
language.

1. **Header:** black bar, logo, nav links in cream, language toggle, red "Prenota tavolo" button.
   A `StripeBand` sits directly under it. Breakpoint behaviour unchanged (full nav from 1024px,
   hamburger below).
2. **Hero:** split layout. Left: script kicker ("benvenuti a casa" / "welcome home"), slab
   headline with two words in emerald-ink (for example "Vera cucina nigeriana, *fatta al
   momento* a Cosenza"), subtitle, primary black button with gold text (Prenota su WhatsApp),
   ghost link with orange underline (Esplora il menu). Gold spine on the text block. Right: the
   photo panel fills the column edge to edge. The existing slideshow, its pause button and its
   dots stay; a cream caption frame with a red left border sits on the photo on every slide and
   shows the current slide's title and one line about it (new localized captions per slide).
   Only 3 of the 8 slides are single dishes; the others (feast, interior, DJ, guest, dancefloor)
   get a descriptive title such as "La tavola di Mama" or "Venerdì in pista", never an invented
   dish name. Caption data: `{ title: LocalizedText, line: LocalizedText }` per slide, kept beside
   the slide's image and alt text. (Builder's call, recorded here.)
3. **Menu:** `ZigzagDivider` above. Centered script kicker ("cosa bolle in pentola" / "what's
   cooking") and slab "Il Menu". Signature dishes: keep the swipe row on mobile and the grid on
   desktop, restyled as photo-on-top items without heavy card chrome. Category filter: pill
   buttons, active pill black with gold text. Full menu: two-column list (one column on
   mobile); each row has a round gold-ringed photo when the dish has one, the slab name, a
   dotted leader, the red price, the description, badges and the add button. Rows without a
   photo keep the text aligned with rows that have one (no placeholder image).
4. **Booking and takeaway:** cream band. Script kicker plus slab heading. The form panel is the
   one white card on the page. Tabs: black active tab with gold text. Inputs on `--color-surface`.
   WhatsApp submit buttons stay emerald. Behaviour and validation unchanged.
5. **Events:** featured event becomes a black band (like the footer) with gold slab title, the
   stripe colours as a thin top border, its two photos with gold rings. Weekly events become a
   three-column list on cream separated by dotted rules, not cards. Gallery: three photos with
   thin gold borders.
6. **Location:** address and hours on cream with slab headings; the map placeholder uses the
   zigzag as its top edge. Buttons follow the new button styles.
7. **Footer:** `StripeBand` on top, black background, logo, gold labels, cream text, links as
   today.
8. **Mobile order bar:** black bar, gold count chip, cream text, red total pill.

### Buttons (one set, reused everywhere)

- Primary: black fill, gold text, hover lifts to `--color-black` soft variant.
- Accent: red fill, cream text (nav CTA, order bar).
- WhatsApp: emerald fill, white text (form submits, WhatsApp contact).
- Ghost: no fill, ink text, 3px orange underline.
- Outline: 2px ink border on cream (secondary actions such as Chiamaci, Mostra la mappa).

## 6. Copy changes (Italian and English in `translations.ts`)

- Each section gets a `kicker` string. Proposed: hero "benvenuti a casa" / "welcome home";
  menu "cosa bolle in pentola" / "what's cooking"; booking "un tavolo per te" / "a table for
  you"; events "la sera da mama" / "nights at mama's"; location "vieni a trovarci" /
  "come and see us".
- Hero headline and subtitle rewritten around Nigerian cooking (wording in the plan, reviewed
  by Robin before merge).
- New hero slide captions (title and one line) for the 8 current slides.

## 6a. Token renames (builder's call, recorded here)

Current tokens without a direct match map as follows: `--color-espresso` to `--color-black`,
`--color-espresso-soft` to a new `--color-black-soft` (`#1a1511`, also the primary button hover),
`--color-border-dark` to `--color-border-on-black` (`#2b231c`), `--color-terracotta` and
`-hover` to `--color-red` and `--color-red-hover`, `--color-gold-text` is removed (no gold text
on cream), `--color-white` stays `#ffffff`.

## 7. Approaches considered

- **A. Night Kitchen** (dark, logo-native, nightlife). Not chosen by the client.
- **B. Ankara Table** (cream, food first, most readable). **Chosen by the client.**
- **C. Lagos Colour Block** (solid colour sections, boldest). Not chosen by the client.

Within B, two ways to build it were considered:
- **Restyle in place** (chosen): keep the existing components and logic, change tokens, fonts,
  markup and classes, add the three motif components. Keeps all tests and flows; smallest risk.
- Rebuild the page from new components: cleaner markup but re-creates working logic (cart,
  forms, validation) for no user-visible gain. Rejected.

## 8. Verification

- All existing tests keep passing; tests that assert removed text are updated only where the
  copy change is intended (hero headline).
- New tests: motif components render `aria-hidden`; hero caption follows the active slide.
- Contrast: every text/background pair used is listed with its ratio and passes AA.
- Browser evidence: screenshots at 375px, 800px, 1024px and 1440px for every section, before
  and after; booking and takeaway flows run end to end.
- Lint, type-check and build clean.

## 9. Left to the builder

- Exact spacing values, font sizes within the scale, and breakpoints beyond those named here.
- Exact SVG for the zigzag (must match the logo colours and stay solid).
- Final wording of headline and slide captions (Robin reviews before merge).
- How to restructure component markup, as long as behaviour and test-visible roles stay.
