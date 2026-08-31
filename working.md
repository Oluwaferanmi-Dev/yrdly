# Yrdly Redesign Integration Plan

Source: `Redesign Neighborhood Website/` (Figma Make export — React 19 + Vite + Tailwind v4, hash router, 100% static/mock content, Unsplash hotlinked images).
Target: main Next.js 16 App Router site in this repo. Work happens on a new branch only.

## What the redesign contains

- **Design system** (`src/index.css`): Fonts **Fraunces** (display) + **Work Sans** (body); brand green `#82DB7E` + `green-light`/`green-deep`; full CSS-variable theme with `theme-dark` (default) / `theme-light`; custom classes `.pill`, `.card`, `.btn-cta`, `.btn-outline`, `.nav-glass`, `.faq-item`, `.toggle-track`; `fadeUp` animations; emojis as icons (no icon lib).
- **8 pages**: Home, Events, About, Learn More, Marketplace (new), Contact, Privacy, Terms.
- **Shell**: glass Navbar (theme toggle, "Open App" CTA → app.yrdly.ng, mobile menu) + new Footer (social pills, Product/Company columns).

## Route mapping (redesign → current app)

| Redesign page | Current route | Action |
|---|---|---|
| Home | `/` | Restyle with new design; **keep functional HeroLoginForm** (Supabase auth) — redesign drops it |
| Events | `/events` | New design, but **wire to real `/api/events`** instead of hardcoded events; keep tag filters |
| About | `/about` | Port as-is (static) |
| Learn More | `/learn-more` | Port as-is (static; redesign has 6 features vs current 5) |
| Marketplace | *(none)* | **New route `/marketplace`** — static preview content from redesign |
| Contact | `/contact` | New design, **wire form to real `/api/contact`** (redesign form is fake) |
| Privacy | `/privacy-policy` | New styling; **keep current legal text** (redesign text differs — legal copy stays authoritative) |
| Terms | `/terms` | Same approach as Privacy |
| — | `/events/[id]`, `/scanner`, `/auth/callback`, `/coming-soon` | **Untouched** — functional, omitted from redesign |

Navbar + Footer: replace `components/header.tsx` / `components/footer.tsx` with redesigned versions (Next `Link`, theme toggle, mobile menu).

## Implementation phases

**Phase 0 — Branch + prep**
- Create branch `redesign-integration` from `main`.
- Remove the redesign folder's Figma/Vite-internal plugins concern: we only port source, never run Vite.

**Phase 1 — Design system into `app/globals.css`**
- Load **Fraunces + Work Sans via `next/font`** (replace Jersey 25 / Raleway usage; keep Geist Mono where used).
- Port color/spacing CSS variables: map redesign `theme-dark`/`theme-light` onto the existing shadcn token structure (`:root` / `.dark`) so functional pages (scanner, modals) stay consistent; add `.pill`, `.card`, `.btn-cta`, `.btn-outline`, `.nav-glass`, `.faq-item` utilities + `fadeUp` keyframes.
- Keep brand green `#82DB7E` tokens.

**Phase 2 — Shell**
- New `components/header.tsx` (glass nav, theme toggle via `next-themes`, mobile menu, "Open App" CTA) and `components/footer.tsx` (new columns, social pills).
- Theme: default **dark**, with toggle (redesign default).

**Phase 3 — Pages** (each: port JSX/design → adapt to RSC, replace hash links with `next/link`, swap emojis only where lucide equivalents already exist in the project)
1. Home — hero, Discovery Hub, How It Works, events preview, newsletter (**wire to `/api/newsletter`**), FAQ.
2. Events — new design + real API data, client-side tag filter.
3. About, Learn More — static ports.
4. Marketplace — new static page.
5. Contact — form wired to `/api/contact` (reuse existing hook pattern).
6. Privacy/Terms — current legal copy in new styling.

**Phase 4 — Assets + SEO**
- Download the ~6 Unsplash images into `public/`, serve via `next/image` (removes hotlinking; better LCP).
- Update per-page metadata; add `/marketplace` to `sitemap.ts`.

**Phase 5 — Cleanup + verify**
- Delete old unused components made redundant by the redesign (header/footer old markup, stale `styles/globals.css` duplicate) — **with your sign-off before deletions**.
- `pnpm lint` + `pnpm build` green; manual smoke: auth form, events fetch, contact, newsletter, scanner flow, cookie consent.

## Decisions (approved by user)

1. **Homepage hero**: keep the working Supabase login form, integrated into the new hero design.
2. **Marketplace**: new static preview page (redesign intent).
3. **Legal copy**: keep current text, apply new styling only.
4. **Theme**: dark default with toggle.

Status: **APPROVED — implementation started on branch `redesign-integration`.**
