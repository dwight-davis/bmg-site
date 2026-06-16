# WordPress source-of-truth backup

The original boisemarketingguy.com WordPress install was deleted from
SiteGround on 2026-06-15 after the Next.js cutover. The MySQL database
itself was retained, and this folder holds a SQL dump of it so the WP
content + pricing + meta history is recoverable forever.

## Files
- `dbzp4geumuh4la_2026-06-15.sql` (3.2 MB) — full dump
- `dbzp4geumuh4la_2026-06-15.sql.gz` (~1 MB) — gzipped copy

Both are gitignored; the SQL is sensitive (user emails, hashed passwords).
Keep these on disk + back them up off-machine.

## What the dump contains
All standard WP tables prefixed `iox_`:
- `iox_posts` — pages, posts, industries (32), locations (48), service_tiers (144)
- `iox_postmeta` — Stripe IDs, pricing (`_bmg_customer_price`,
  `_bmg_billing_cycle`, `_bmg_cost`, `_bmg_partner_price`), deliverables,
  FAQs
- `iox_options`, `iox_terms`, `iox_users`, etc.
- Plus VisibleFirst plugin tables: `iox_vf_audit`, `iox_vf_citations`,
  `iox_vf_issues`, `iox_vf_redirects`, `iox_vf_reports`, `iox_vf_snapshots`

## How prices were recovered (reproducible)
See `scripts/restore_service_tier_prices.py`. Parses `iox_postmeta` for
`_bmg_customer_price` + `_bmg_billing_cycle` against
`iox_posts.post_type='service_tier'`, writes
`data/service-tier-prices.json`.
