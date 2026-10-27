# Asset manifest — AXEL SAFE TRANSPORTING website

Generated 22.10.2026. Sources and prompts: `../ASSETS_HIGGSFIELD/` (`prompts.tsv`, `raw/*.json` = full Higgsfield job records incl. prompt, model and result URL).
All vehicles are unbranded (no logos, no lettering, blank plates). No asset implies AXEL SAFE owns trucks, terminals or yards — they illustrate the road-freight sector.

| File (`public/media/`) | Dimensions | Size | Source / model | Placement |
|---|---|---|---|---|
| `earth-hero.jpg` | 2560×1440 | 0.47 MB | Own ray-traced render of NASA Black Marble 2016 (public domain) → Higgsfield **GPT Image 2.5** photographic finish (geography locked to the render) | Home hero poster / LCP image, video fallback |
| `earth-loop-1080.mp4` | 1920×1080, 33 s, H.264, no audio | 2.9 MB | Higgsfield **Kling 3.0 Pro** image-to-video from `earth-hero`, slowed 0.6× + ping-pong loop | Home hero ambient video, screens ≥1600 px |
| `earth-loop-720.mp4` | 1280×720 | 1.5 MB | same | Home hero, 768–1599 px |
| `earth-loop-mobile.mp4` | 640×800 (cropped on Europe) | 1.1 MB | same | Home hero, <768 px |
| `europe-dots.svg` | 1600×1000 viewBox | 60 KB (gzips ~10 KB) | Code-generated from **Natural Earth 50m** land (`scripts/build-europe-map.ts`) — geographically accurate | Home network visual base layer. Routes/nodes are a separate SVG layer, illustrative only |
| `motorway-blue-hour.jpg` | 2560×1440 | 0.40 MB | Higgsfield GPT Image 2.5 | Home services card 01 (Road Freight Coordination) |
| `terminal-docks.jpg` | 2560×1440 | 0.47 MB | Higgsfield GPT Image 2.5 | Home services card 02 (Transport Planning) · How We Work hero |
| `yard-overhead.jpg` | 2560×1440 | 0.47 MB | Higgsfield GPT Image 2.5 | Home services card 03 (Carrier Network) · About hero |
| `viaduct-dawn.jpg` | 2560×1440 | 0.29 MB | Higgsfield GPT Image 2.5 (v2 — v1 rejected: trucks had a cab at both ends) | Home carrier-partnership band |
| `interchange-night.jpg` | 2560×1440 | 0.58 MB | Higgsfield GPT Image 2.5 | Services hero |
| `trailer-detail.jpg` | 2560×1440 | 0.56 MB | Higgsfield GPT Image 2.5 | For Carriers hero |
| `earth-curvature.jpg` | 2560×1440 | 0.15 MB | Higgsfield GPT Image 2.5 | Final CTA background (all pages) |
| `og-default.jpg` | 1200×630 | 0.13 MB | Crop of `earth-hero` | Open Graph / social share default |

Responsive variants (AVIF/WebP, 640–2560 px) are produced on demand by `next/image`. Only the hero image is `priority`; everything else lazy-loads. The hero video loads after hydration, never on `prefers-reduced-motion` or Save-Data.

## Rejected / superseded (kept in `ASSETS_HIGGSFIELD/raw/_rejected_*`)
- `_rejected_01_earth_hero_soft.png` — first text-to-image Earth: soft at 100 %, fake "starburst" city lights, wrong Adriatic/Balkan coastlines.
- `_rejected_02_earth_motion_old.mp4` — video made from the rejected still.
- `_rejected_04d_viaduct_two_cabs.png` — trucks with a cab at both ends.

## Higgsfield spend (22.10.2026)
8 images × ~4.25 + 1 re-generated viaduct + 2 finish passes (GPT Image 2.5, Nano Banana Pro) + 2 Kling 3.0 Pro clips × 17.5 ≈ 85 credits.
