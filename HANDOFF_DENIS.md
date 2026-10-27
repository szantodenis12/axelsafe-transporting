# AXEL SAFE TRANSPORTING: site + CRM, handoff pentru Denis

**22.10.2026 · Epic Digital Hub**

## Pe scurt

Site complet (EN / RO / ES) + CRM simplu în `/admin`, Next.js 16.4 App Router. Build-ul de producție trece (50 de pagini statice). Clientul NU are flotă proprie: organizează transport prin transportatori independenți. Nu adăugați texte care sugerează camioane proprii, tracking propriu sau certificări.

Statusul actual este **PREVIEW**: datele neconfirmate de client sunt marcate `[PLACEHOLDER]` și blochează build-ul de producție până sunt rezolvate (detalii mai jos).

## Rulare locală

```bash
pnpm install
cp .env.example .env.local      # completați: LEADS_DRIVER=local, ADMIN_PASSWORD, ADMIN_SESSION_SECRET
pnpm dev                        # http://127.0.0.1:3000 → redirect /en
pnpm typecheck && pnpm lint
pnpm build                      # rulează întâi verificarea de placeholdere
```

Notă: pe setup-ul nostru, modificările de CSS (globals.css) au cerut restart la `pnpm dev` (HMR-ul pentru CSS nu le prelua).

## Structură (detalii în README.md)

- `src/app/[locale]/…`: paginile publice (en, ro, es), root layout propriu.
- `src/app/admin/…`: CRM (root layout separat, noindex, sesiune semnată HMAC).
- `src/app/api/enquiries`: endpoint unic pentru formulare (ofertă transport + parteneriat transportator).
- `src/content/companyData.ts`: **toate datele firmei**, fiecare marcată `verified` sau `placeholder`.
- `src/content/facts.ts`: aceleași date, scrise în RO/ES.
- `src/content/copy/{en,ro,es}.ts`: textele aprobate (EN) + traducerile.
- `supabase/migrations/0001_crm.sql`: schema CRM.
- `docs/`: CRM.md, LAUNCH_CHECKLIST.md, ASSET_MANIFEST.md.

## Ce face Denis

1. **Supabase** (regiune UE): rulați `supabase/migrations/0001_crm.sql`. RLS este activ, fără politici publice; aplicația folosește doar service role key pe server.
2. **Vercel**: proiect nou din acest folder. Variabile (vezi `.env.example`):
   - `NEXT_PUBLIC_SITE_ENV=preview` (rămâne preview până la lansare)
   - `NEXT_PUBLIC_SITE_URL=https://axelsafe-transporting.com`
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD` (puternică), `ADMIN_SESSION_SECRET` (min. 32 caractere random)
   - opțional notificări email: `RESEND_API_KEY`, `LEADS_NOTIFY_TO`, `LEADS_NOTIFY_FROM`
3. **Domeniu**: `axelsafe-transporting.com` (înregistrat la Squarespace, momentan parcare). DNS către Vercel; apex = primar, `www` → 308.
4. **Test după deploy**: o cerere de ofertă + o cerere de parteneriat pe URL-ul de producție → apar în `/admin` → marcați-le spam.

## Ce NU se lansează încă (blocat automat)

`pnpm build` cu `NEXT_PUBLIC_SITE_ENV=production` eșuează cât timp există placeholdere. Lista completă: `pnpm check:placeholders`. Pe scurt, de la client:

- program de lucru, timp de răspuns, cifra „150+ transportatori"
- linkurile reale de social media (paginile nu există încă)
- dimensiunile tipice ale semiremorcilor din exploratorul de echipamente
- procedura de verificare a transportatorilor + termenele de plată
- aprobarea FAQ-urilor (scrise de noi doar din fapte confirmate)
- paginile legale sunt **draft pentru avocat**, cu „[de confirmat]” vizibil

Confirmate deja (nu le modificați): denumire, J, CUI, sediu, CAEN, office@ + 0759 419 010, transport@ + 0728 743 509, toată Europa, prelată / frigorific / mega.

## Tracking (încă nu este în cod)

Când trecem la ads: GTM + Consent Mode v2 default denied + banner cookie, conform playbook-ului nostru (fără gtag/fbq hardcodate). Formularele trimit deja `lead_submit` în `dataLayer` doar după salvarea cu succes, cu `event_id` = requestId și fără date personale.

## Verificare rapidă

```bash
curl -s https://axelsafe-transporting.com/ro | grep -c "<h1"            # ≥ 1
curl -s https://axelsafe-transporting.com/ro/services | grep -io 'hreflang="[a-z-]*"'
curl -s https://axelsafe-transporting.com/sitemap.xml | grep -c "<loc>"  # 27
curl -s https://axelsafe-transporting.com/robots.txt                     # preview = Disallow /
curl -s -o /dev/null -w "%{http_code}\n" https://axelsafe-transporting.com/admin   # 307 → login
```
