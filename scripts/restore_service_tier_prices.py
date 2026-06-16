"""Final pass: emit data/service-tier-prices.json from the SQL dump.
Reuses the parser logic from extract_prices2.py."""
import json
import re
from pathlib import Path
from collections import defaultdict

DUMP = Path("/Users/dwightdavis/Downloads/dbzp4geumuh4la.sql")
OUT = Path("/Users/dwightdavis/bmg-site/data/service-tier-prices.json")

text = DUMP.read_text(encoding="utf-8", errors="replace")


def find_inserts(table: str):
    pat = (
        rf"INSERT INTO `{table}`"
        r"(?:\s*\(([^)]+)\))?"
        r"\s*VALUES\s+"
        r"(.+?);\s*\n"
    )
    for m in re.finditer(pat, text, re.DOTALL):
        cols = m.group(1)
        col_names = [c.strip().strip("`") for c in cols.split(",")] if cols else None
        yield col_names, m.group(2)


def split_tuples(blob: str):
    depth = 0
    in_str = False
    start = None
    i = 0
    while i < len(blob):
        c = blob[i]
        if in_str:
            if c == "\\":
                i += 2
                continue
            if c == "'":
                in_str = False
        else:
            if c == "'":
                in_str = True
            elif c == "(":
                if depth == 0:
                    start = i + 1
                depth += 1
            elif c == ")":
                depth -= 1
                if depth == 0 and start is not None:
                    yield blob[start:i]
                    start = None
        i += 1


def parse_fields(s: str):
    fields = []
    i, n = 0, len(s)
    while i < n:
        while i < n and s[i] in " ,\n\t\r":
            i += 1
        if i >= n:
            break
        c = s[i]
        if c == "N" and s[i:i+4] == "NULL":
            fields.append(None)
            i += 4
        elif c == "'":
            i += 1
            buf = []
            while i < n:
                if s[i] == "\\" and i + 1 < n:
                    buf.append(s[i+1])
                    i += 2
                elif s[i] == "'":
                    i += 1
                    break
                else:
                    buf.append(s[i])
                    i += 1
            fields.append("".join(buf))
        else:
            j = i
            while j < n and s[j] not in ",":
                j += 1
            fields.append(s[i:j].strip())
            i = j
    return fields


# Build slug map
slug_for_post: dict[int, str] = {}
title_for_post: dict[int, str] = {}
for col_names, body in find_inserts("iox_posts"):
    if not col_names:
        continue
    idx = {c: i for i, c in enumerate(col_names)}
    for tup in split_tuples(body):
        row = parse_fields(tup)
        if len(row) < len(col_names):
            continue
        try:
            pid = int(row[idx["ID"]])
        except (TypeError, ValueError):
            continue
        if row[idx["post_type"]] == "service_tier":
            slug_for_post[pid] = row[idx["post_name"]]
            title_for_post[pid] = row[idx["post_title"]]

# Build meta map
meta_for_post: dict[int, dict[str, str]] = {}
for col_names, body in find_inserts("iox_postmeta"):
    if not col_names:
        continue
    idx = {c: i for i, c in enumerate(col_names)}
    for tup in split_tuples(body):
        row = parse_fields(tup)
        if len(row) < len(col_names):
            continue
        try:
            post_id = int(row[idx["post_id"]])
        except (TypeError, ValueError):
            continue
        if post_id not in slug_for_post:
            continue
        meta_for_post.setdefault(post_id, {})[row[idx["meta_key"]]] = row[idx["meta_value"]]


# Map _bmg_billing_cycle to our interval enum.
CYCLE_MAP = {
    "one time": "one-time",
    "one-time": "one-time",
    "monthly": "monthly",
    "month": "monthly",
    "quarterly": "quarterly",
    "yearly": "yearly",
    "annual": "yearly",
    "annually": "yearly",
    "project": "project",
}


def normalize_cycle(raw: str | None) -> str:
    if not raw:
        return "one-time"
    return CYCLE_MAP.get(raw.strip().lower(), "one-time")


prices: dict[str, dict] = {}
seen_cycles: dict[str, int] = defaultdict(int)
missing_price = []
for pid, slug in sorted(slug_for_post.items()):
    m = meta_for_post.get(pid, {})
    raw_amount = m.get("_bmg_customer_price")
    raw_cycle = m.get("_bmg_billing_cycle")
    seen_cycles[raw_cycle or "(empty)"] += 1
    if not raw_amount:
        missing_price.append((slug, title_for_post[pid]))
        continue
    try:
        amount = int(float(raw_amount))
    except (TypeError, ValueError):
        missing_price.append((slug, title_for_post[pid], f"unparseable: {raw_amount!r}"))
        continue
    prices[slug] = {
        "amount": amount,
        "interval": normalize_cycle(raw_cycle),
        "starting_at": False,
        "setup_fee": None,
        "note": None,
    }

# Stable insertion order so the diff reads cleanly.
out_body = {
    "_note": (
        "Per-tier pricing keyed by service_tier slug. Schema:\n"
        "  amount: number (USD whole dollars)\n"
        "  interval: 'one-time' | 'monthly' | 'quarterly' | 'yearly' | 'project'\n"
        "  starting_at: boolean\n"
        "  setup_fee: number | null\n"
        "  note: string | null\n"
        "Generated from the WP MySQL dump (dbzp4geumuh4la) on 2026-06-15. Source meta keys: "
        "_bmg_customer_price + _bmg_billing_cycle on the service_tier post type."
    ),
}
for slug in sorted(prices.keys()):
    out_body[slug] = prices[slug]

OUT.write_text(json.dumps(out_body, indent=2) + "\n")

print(f"wrote {OUT}")
print(f"priced tiers: {len(prices)}")
print(f"missing/unparseable: {len(missing_price)}")
if missing_price:
    for x in missing_price[:5]:
        print(f"  - {x}")
print()
print("Billing cycles observed:")
for k, v in sorted(seen_cycles.items(), key=lambda x: -x[1]):
    print(f"  {v:4d}  {k}")
print()
print("Sample priced entries:")
for slug in list(prices.keys())[:6]:
    print(f"  {slug}: {prices[slug]}")
