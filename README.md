# Handoff: Morning Glory Investments — Lead-Gen Landing Page

## Overview
A single-page, high-conversion marketing site for a commercial construction & consulting company that funds tenant improvements at **0% interest**, repaid over **24–60 months**. The sole goal is lead generation: getting cash-strapped commercial landlords to submit a "Qualify Your Property" form.

Two complete full-page **directions** are included for the team to choose between (they share identical content and structure; only the visual treatment differs):
- **Direction A — "Institutional"**: refined, editorial, financial-institution feel. Serif headlines, calm navy/blue palette, thin rules.
- **Direction B — "Architectural Bold"**: punchier developer/architectural feel. Dark hero, oversized uppercase display type, blocky stat bands and cards.

**Pick ONE direction to build.** They are not meant to coexist in production — they are side-by-side options.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the intended look and behavior. They are **not** production code to copy directly. The task is to **recreate these designs in the target codebase's existing environment** (React/Next, Vue, WordPress, Webflow, Squarespace, etc.) using that environment's established patterns, components, and conventions. If no codebase exists yet, choose the most appropriate stack for a fast, SEO-friendly, mobile-first marketing page (e.g. Next.js + Tailwind, or a no-code platform like Webflow per the original brief).

Performance targets from the brief: **100% mobile-friendly**, **load under 3 seconds**, minimal animation — prioritize speed and clarity.

### How to view the prototype
Open `Morning Glory Landing.dc.html` in a browser. It renders both directions side by side on a pan/zoom canvas. `support.js` is the prototype runtime and `image-slot.js` powers the drag-and-drop photo placeholders — neither is needed in production.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interaction states are specified below. Recreate the chosen direction pixel-accurately using the codebase's libraries. All hex values, font families, and sizes in this README are authoritative.

---

## Page Structure (identical for both directions)
Single vertical scroll, max content width 1240px, horizontal padding 52px on desktop. Section order:

1. **Header** (sticky in production) — logo + nav + primary CTA
2. **Hero** — headline, sub-headline, CTAs, hero photo
3. **Stat band** — 4 stats: `0%` / `24–60` / `$0` / `Turnkey` (A) or `100%` (B)
4. **How Our Financing Works** — giant `0%`, three term cards (24/36/60), disclaimer callout
5. **The 3-Step Process** — Consult / Build / Repay
6. **Results / Trust** — Before & After photo pair + two testimonial placeholders
7. **Contact** — "Qualify Your Property" lead form with confirmation state
8. **Footer** — wordmark + tagline + copyright

Anchor IDs: nav and hero CTAs jump to `#how`, `#process`, `#results`, `#contact`.

---

## Copy (exact — use verbatim)

**Hero headline:** `0% Interest Commercial Tenant Improvements.`
(In Direction B, "0% Interest" is colored with the blue accent.)

**Hero sub-headline:** `We handle the consulting and the construction. We finance the entire build-out over 24 to 60 months with zero interest. Fill your vacancies without draining your capital.`

**Primary CTA (everywhere):** `Qualify Your Property`

**Stat band:** `0% — Interest, always` · `24–60 — Month terms` · `$0 — Upfront capital` · `Turnkey — Consult + build-out` (A) / `100% — Turnkey build-out` (B)

**How it works heading:** `Zero interest. Every dollar of the build-out, financed.` (A) / `Zero interest. The whole build-out, financed.` (B)
**Body:** `You repay in equal monthly installments using your new tenant's rental income. No rate, no fees buried in the spread — just the cost of the work, split into predictable payments.`

**Term cards:**
- `24 equal monthly payments` — `Fastest payoff — ideal for high-rent, quick-turn spaces.`
- `36 equal monthly payments` — `A balanced term that keeps payments comfortably below rent.`
- `60 equal monthly payments` — `Lowest monthly outlay — maximum breathing room on cash flow.`

**Disclaimer (mandatory, verbatim):** `Balance is due in full upon sale or refinance of the property. Terms subject to qualification and a signed construction agreement.`

**3-Step Process:**
- `01 Consult` — `We assess your vacant space and design a turnkey build-out tailored to attract the right tenant.`
- `02 Build` — `Our crews execute the construction rapidly — on schedule, to spec, with no surprises.`
- `03 Repay` — `You pay us back monthly at 0% interest, funded directly by your new tenant's rental income.`

**Results heading:** `White-box shells, turned into premium leased spaces.`
**Testimonials:** two placeholder quote cards — replace with real client quotes; fields: quote, `Name, Title — Property / Portfolio`.

**Contact heading:** `Tell us about your space.`
**Contact body:** `Send a few details and we'll come back with whether your property qualifies for a 0%, fully-financed build-out.`
**Form footnote:** `Balance due in full upon sale or refinance. No obligation.`
**Confirmation:** heading `Request received.` body `Thank you. A member of our team will review your property and reach out within one business day.`

**Contact info (placeholders — replace with real):** `(555) 010–0100` · `invest@morningglory.com`
**Footer tagline:** `Commercial construction & tenant-improvement financing · © 2026`

---

## Lead Form (the conversion goal)
Anchored at `#contact`. All fields **required**.

| Field | Type | Notes |
|---|---|---|
| Name | text | |
| Phone | tel | |
| Email | email | |
| Property Address | text | full width |
| Est. Square Footage | text | |
| Current Property Status | select | options: `Vacant`, `Partially Leased`, `Needs Remodel` (+ empty "Select…" default) |

Layout: 2-column grid; Email and Property Address span both columns. Labels are uppercase, 12px, weight 600, letter-spacing .04em.

**Submit behavior:** On submit, prevent default, validate required fields, then **replace the form in place** with the confirmation panel (checkmark circle + "Request received." + thank-you copy). In production, also POST the submission to your CRM/email endpoint before showing confirmation.

---

## Design Tokens

### Direction A — Institutional
- **Fonts:** Display/headings `Newsreader` (serif, weights 400/500/600, italic for testimonials). Body/UI `Libre Franklin` (400/500/600/700).
- **Colors:**
  - Navy / ink: `#0a2540`
  - Footer navy: `#06192e`
  - Accent blue: `#1c6dd0`
  - Light section bg: `#f4f7fb`
  - Page white: `#ffffff`
  - Body text: `#475569`; secondary `#64748b`; muted-on-navy `#9db4cc` / `#cdddec`
  - Borders: `#e2e8f0`; input border `#cfd9e4`
- **Hero H1:** Newsreader 500, 55px, line-height 1.04, letter-spacing -.015em.
- **Buttons:** filled `#1c6dd0`, white text, radius 6px, padding 16px 30px, weight 600.
- **Cards:** white, 1px `#e2e8f0`, radius 10px, padding ~28px.
- **Eyebrows:** 12px, weight 600, letter-spacing .17em, uppercase, color `#1c6dd0`.

### Direction B — Architectural Bold
- **Fonts:** Display/headings `Archivo` (800/900, UPPERCASE, letter-spacing -.01 to -.025em). Body/UI `IBM Plex Sans` (400/500/600/700).
- **Colors:**
  - Hero/dark navy: `#081225`; panel `#0e1d33`
  - Accent blue: `#2563eb` (lighter accent `#3b82f6`, light-on-dark `#5b9bf5`)
  - Light section bg: `#f3f6fb`
  - Page white: `#ffffff`
  - Body text: `#475569`; secondary `#64748b`; muted-on-dark `#9fb2c9` / `#aebfd3`; on-blue `#cfe0ff`
  - Borders: `#d8e0ea`; input border `#cfd9e4`
- **Hero H1:** Archivo 900, 62px, line-height .98, letter-spacing -.025em, UPPERCASE; "0% Interest" in `#3b82f6`.
- **Hero bg:** `#081225` with radial-gradient glow `radial-gradient(circle at 80% -10%, rgba(37,99,235,.32), transparent 55%)`.
- **Buttons:** filled `#2563eb`, white text, radius **4px** (squarer than A), padding 17px 32px.
- **Term cards:** light `#f3f6fb` with 4px left border `#2563eb`. Giant numerals Archivo 900 ~46px.
- **Process cards:** dark `#0e1d33` with 3px top border `#2563eb`.

### Shared scale
- Section vertical padding: ~78–80px. Horizontal: 52px desktop.
- Grid gaps: 22–56px depending on section.
- Stat band: 4-up equal columns with 1px dividers.
- Border radius: 6–12px (A), 4px (B).

---

## Interactions & Behavior
- **Nav + hero CTAs:** smooth in-page anchor scroll to the relevant section (`#contact` for "Qualify Your Property").
- **Form submit:** client-side required validation → swap to confirmation panel; wire to CRM/email in production.
- **Hover states:** darken button backgrounds ~8–10% on hover; nav links can shift to accent color. Keep transitions ≤200ms.
- **Animation:** minimal per brief — a single subtle fade/slide on hero load is acceptable; avoid heavy scroll animation to protect the <3s load target.
- **Responsive:** all 2-column grids collapse to single column below ~768px; header nav becomes a hamburger or stacks; hero image moves below text; reduce hero H1 to ~34–40px on mobile. Tap targets ≥44px.

## State Management
- `submitted` boolean per page (form vs. confirmation). In the prototype this is component state keyed `a`/`b`; in production it's one boolean for the chosen direction.
- Form field values → collect into a payload object for the POST.
- Optional: loading + error states around the network submit (not designed here — add a spinner on the button and an inline error message on failure).

## Assets
- **Photos:** none shipped. The prototype uses `<image-slot>` drag-and-drop placeholders for: **hero** (commercial building / finished tenant space), **Before** (white-box shell), **After** (finished premium space). Replace with real high-quality commercial photography. The before/after pair is central to the Results section.
- **Logo:** text wordmark only — "Morning Glory Investments" with a small `M` mark (circle outline in A, blue square in B). Swap in a real logo when available.
- **Icons:** minimal; checkmark in confirmation, `!` in disclaimer. Use the codebase's icon set.
- **Fonts:** Google Fonts — Newsreader, Libre Franklin (A); Archivo, IBM Plex Sans (B). Self-host for the load-speed target.

## Files
- `Morning Glory Landing.dc.html` — both design directions (the source of truth for layout/copy/styles).
- `image-slot.js`, `support.js` — prototype runtime only; **do not ship**.
