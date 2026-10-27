# Launch checklist — AXEL SAFE TRANSPORTING

Nothing goes live with `NEXT_PUBLIC_SITE_ENV=production` until every box is ticked. The build enforces the first section.

## 1. Data verification (build-blocking)
- [ ] `pnpm check:placeholders` → "No placeholders". Every `[PLACEHOLDER]` in `companyData.ts` replaced with client-confirmed data **or removed** (with the section that renders it):
  - [ ] public email, carrier email, phone, business hours
  - [ ] response time (or remove)
  - [ ] countries / corridors (also replace the illustrative map nodes in `mapCities.ts`)
  - [ ] transport types, customer sectors
  - [ ] statistics (13 countries / 150+ carriers / 2 h) — verified numbers or delete the stats row
  - [ ] insurance claim — insurer + cover confirmed, otherwise delete
  - [ ] carrier vetting procedure + cooperation/payment conditions
- [ ] Published company details re-checked against current ORC registration (copy note: "to be checked against current registration documents before launch").
- [ ] Logo: provisional wordmark replaced with the client's official mark (or approved as is).

## 2. Legal
- [ ] Privacy, Cookie and Terms drafts reviewed by a lawyer; all "[to be confirmed]" items resolved; review callout removed.
- [ ] Processors named (hosting, Supabase region, email provider) and DPA in place.
- [ ] If analytics/ads are added: GTM + Consent Mode v2 default denied + cookie banner before any tag fires.

## 3. Forms & CRM
- [ ] Supabase project created (EU region), migration applied, RLS on, service key only in Vercel env.
- [ ] Test quote + carrier enquiry on production URL → row in Supabase → visible in `/admin` → notification email received. Mark test rows as spam/delete.
- [ ] `ADMIN_PASSWORD` strong and shared only with the client admin; `ADMIN_SESSION_SECRET` random 32+ bytes.
- [ ] Error path checked: with the store disconnected the form shows the honest "not connected" message (never a fake success).

## 4. Technical SEO / GEO
- [ ] Domain resolves; apex primary; `www` + `*.vercel.app` redirect/noindex.
- [ ] `curl` each page: one H1, unique title + description, self-canonical, hreflang, JSON-LD (Organization on home, BreadcrumbList inside).
- [ ] `/robots.txt` allows crawlers (production), `/sitemap.xml` lists only 200 URLs, `/llms.txt` matches real routes.
- [ ] Organization schema gets `contactPoint` automatically once phone + email are verified — confirm in Rich Results Test.
- [ ] GSC + Bing verified, sitemap submitted. Google Business Profile created with the same NAP.

## 5. Performance / QA
- [ ] Mobile Lighthouse: LCP < 2.5–4 s, CLS < 0.1, page weight < 3 MB (hero video loads after hydration; never on reduced-motion / Save-Data).
- [ ] Visual pass at 1440 / 1280 / 768 / 390 / 360 on every page; menu, all CTAs and anchors click-tested (no 404).
- [ ] Keyboard + screen-reader pass on forms and the mobile menu.
EOF
echo ok