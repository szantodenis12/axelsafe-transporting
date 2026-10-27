# AXEL SAFE TRANSPORTING — website + CRM

Marketing site and lead CRM for AXEL SAFE TRANSPORTING S.R.L. (Reghin, RO) — a B2B road-freight **coordination** company (no own fleet; transport is performed by independent carriers).
Creative direction: *Precision in Motion*. Built by Epic Digital Hub, 10/2026.

## Stack

Next.js 16.4 (App Router, `cacheComponents`, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · GSAP ScrollTrigger (homepage stage only) · Supabase (leads) · Lucide icons. No Three.js — the Earth is prerecorded video + still, the network is SVG.

## Run

```bash
pnpm install
cp .env.example .env.local        # see docs/CRM.md for every variable
pnpm dev                          # http://127.0.0.1:3000 → redirects to /en
pnpm typecheck && pnpm lint
pnpm build                        # runs the placeholder guard first (prebuild)
```

## Structure

```
src/
  app/
    [locale]/            public site — its own root layout (html lang per locale)
      page.tsx           Home (benchmark page)
      services/ how-we-work/ about/ for-carriers/ contact/
      privacy-policy/ cookie-policy/ terms-of-use/   ← drafts for legal review
    admin/               CRM — separate root layout, noindex, session-protected
    api/                 enquiry endpoint(s) → lead repository
    sitemap.ts robots.ts
  components/
    home/                HeroStage (cinematic scroll scene), NetworkMap, sections
    pages/               inner-page building blocks
    sections/ ui/ layout/ forms/ admin/ dev/
  content/
    companyData.ts       ★ every business fact — verified vs [PLACEHOLDER]
    copy/en.ts           ★ approved English copy (verbatim). RO/ES dictionaries go next to it
    legal/en.ts          legal page drafts
    mapCities.ts         network nodes (illustrative)
    generated/           build artefacts (map projection)
  lib/
    i18n.ts routes.ts seo.tsx site.ts
    leads/               repository (Supabase driver + local dev driver)
    admin/               session auth
  proxy.ts               optimistic /admin guard (Next 16 "proxy" = old middleware)
supabase/migrations/     CRM schema
scripts/                 build-europe-map.ts, check-placeholders.ts
docs/                    CRM.md, ASSET_MANIFEST.md, LAUNCH_CHECKLIST.md
```

## Content rules

- **Never hardcode a business fact in a component.** Read it from `companyData.ts` via `fact()`; wrap rendered placeholder facts in `<Ph k="…">`.
- `verified(value, source)` = confirmed (ORC certificate / ANAF / client). `placeholder(value, note)` = realistic prototype data, marked `[PLACEHOLDER]`.
- Preview builds show a **PREVIEW · n placeholders** badge (bottom-right) that lists them and can outline them on the page. It is not rendered when `NEXT_PUBLIC_SITE_ENV=production`.
- `pnpm build` with `NEXT_PUBLIC_SITE_ENV=production` **fails** while any placeholder remains (`scripts/check-placeholders.ts`).
- Copy in `copy/en.ts` is approved text — integrate, don't rewrite.

## Environments

| | `NEXT_PUBLIC_SITE_ENV` | indexing | placeholder badge | build with placeholders |
|---|---|---|---|---|
| local / Vercel preview | `preview` (default) | `noindex` + robots disallow | shown | allowed (warning) |
| production | `production` | index, AI crawlers allowed | hidden | **blocked** |

## i18n (planned RO + ES — contract scope)

Route-based: `/en/…` now. To add Romanian: create `src/content/copy/ro.ts` with the same shape as `en.ts` (type `Dictionary`), add `"ro"` to `locales` + `hreflang` + `dictionaries` in `src/lib/i18n.ts`. Sitemap, hreflang alternates and `generateStaticParams` pick it up automatically. Localised slugs (e.g. `/ro/servicii`): turn each entry in `src/lib/routes.ts` into a per-locale record.

## Homepage motion

`HeroStage` ships a plain stacked layout by default (phones, reduced motion, no JS). On ≥768 px wide / ≥620 px tall screens without reduced motion it switches to a sticky scene scrubbed by one ScrollTrigger timeline: Earth push-in → editorial intro → Earth hands over to the network map, routes draw from Reghin. Everything after that uses light IntersectionObserver reveals only.

## Deploy (Vercel recommended)

1. New Vercel project from this folder; framework auto-detected.
2. Env vars from `.env.example` (Supabase service key, admin secrets, `NEXT_PUBLIC_SITE_URL`). Keep `NEXT_PUBLIC_SITE_ENV=preview` until the launch checklist is complete.
3. Run `supabase/migrations/*.sql` on the Supabase project.
4. Domain `axelsafe-transporting.com` (currently Squarespace-registered, parking page) → point DNS to Vercel; apex = primary, `www` → 308.
5. See `docs/LAUNCH_CHECKLIST.md`.
