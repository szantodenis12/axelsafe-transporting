# Mobile layout system (phones, < 768 px)

One set of rules for the whole site, defined once in `src/app/globals.css` (block "MOBILE LAYOUT SYSTEM (m5)", end of the file).
Desktop and tablet-landscape (>= 768 px) are untouched: every rule sits inside `@media (max-width: 767px)`.

The mobile rules are **unlayered on purpose**: unlayered CSS beats Tailwind's layered utilities, so at < 768 px a token wins over a
desktop utility on the same element (`mt-16`, `gap-y-10`, `min-h-[260px]` ...) without `!important` or per-component `max-md:` variants.

## Tokens (retune the whole site here)

| token | value | used by |
|---|---|---|
| `--m-sec` / `--m-sec-sm` | 56 / 44 px | `.section-y` / `.section-y-sm` vertical padding |
| `--m-stack` | 20 px | every `.grid-12` row gap (heading, lead and content stack tight) |
| `--m-block` | 24 px | `.m-block` = gap between a section head and its body |
| `--m-card-gap` / `--m-card-pad` | 12 / 20 px | rails, `.m-card` |
| `--m-rail-w` | 80 % | width of a rail card (the next card peeks in) |
| `--hero1` | 58 svh | first (logo + page name) screen of an inner-page hero |

Type: the same utilities as desktop, smaller (`t-h1` 32-40, `t-h2` 28-34, `t-h3` 20, `t-lead` 17, `t-body` 16, `t-small` 14).

## Rules and the building blocks that carry them

1. **Orientation.** Every section opens with an eyebrow over its heading ("02 / WHAT WE DO") and sections are separated by one hairline
   (automatic on `.section-y` / `.section-y-sm`). Use `<SectionHead eyebrow=...>` on inner pages or `<MobileEyebrow>` on home sections. The
   eyebrow is the section's existing dictionary text and is not rendered on desktop. `plainEyebrow` drops the "NN / " index where a page
   has no single running numbering (services).
2. **Repeated cards (3+) are a swipe rail**, not a tall stack: `<Rail className="...desktop grid classes...">` (`components/ui/Rail.tsx`)
   becomes a scroll-snap carousel with a peeking next card and 44 px dots (`aria-current`, real buttons). Progress is tracked with one
   IntersectionObserver (no scroll listeners). Rows of text stay vertical but compact (`.m-row`, `HairlineList`). Cards: `.m-card`.
3. **Decoration is off** when it only adds height or noise: `.watermark`, `.depth-ring`, text/card parallax (`ParallaxController` skips
   `data-speed` below 768 px), oversized `svh` min-heights (use `max-md:min-h-0`).
4. **Heroes.** Inner pages: `.page-hero-stage` is `--hero1` tall (logo + page name), the scrim scales with it. Home scene: `420svh`
   (`.hero-stage[data-motion="mobile"]`; the scrubbed timeline simply plays over 320svh of scroll).
5. **Targets and motion.** Interactive targets >= 44 px, transform/opacity animation only, no new scroll listeners.

## Footer (`components/layout/SiteFooter.tsx`)

Two markups: the desktop footer (`max-md:hidden`, unchanged) and a mobile one (`md:hidden`): statement + CTA, two contact rows
(office / transport, mail + phone links), Explore | Services in two columns, legal links in one row, a small company block (name,
registered office, J, CUI/VAT, CAEN), social + back to top, one-line copyright, credit. Placeholders (`<Ph>`) are kept. Target: <= 1.6
screens at 390x844.

## Adding a section

Use `section-y` + `wrap`, a `SectionHead` / `MobileEyebrow`, `m-block` between head and body, `Rail` for 3+ cards, `HairlineList`
for lists. Do not add `min-h-[..svh]`, big paddings or decorative layers without a `max-md:` reset. Check 320, 360, 390 px and `/ro`.
