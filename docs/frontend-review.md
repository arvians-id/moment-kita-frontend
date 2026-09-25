# Frontend Manual Review

## Status

Manual review in progress.

## Legend

Status:
- OPEN
- READY TO FIX
- FIXED
- VERIFIED
- WON'T FIX

Priority:
- Critical
- High
- Medium
- Minor

Type:
- UI
- Interaction
- Bug
- Responsive
- Content
- Product Rule
- Navigation

---

# Public Website

Public Website Review:
Implementation: FIXED
Manual Verification: PENDING

## General

### PUB-001 — Localize public website copy to Indonesian

Status: FIXED
Type: Content
Priority: Medium

Current:
A large portion of marketing copy still uses English.

Expected:
Translate public marketing content into natural Bahasa Indonesia because the primary target market is Indonesian users.

Exceptions:
- Short global navigation labels/buttons may remain in English where intentional.
- Brand/product names should remain unchanged.

Guidelines:
- Do not translate literally if the result sounds unnatural.
- Prefer premium but understandable Indonesian marketing language.
- Keep Moment Kita's editorial/premium tone.

---

### PUB-002 — Replace “Atelier” branding with Moment Kita

Status: FIXED
Type: Content
Priority: Medium

Current:
Several sections use terminology such as “atelier” as if it were the product/company identity.

Expected:
Replace brand-positioning terminology that implies another brand/atelier with Moment Kita.

Examples:
- “The Atelier”
- “Atelier Protocol”
- similar branding references

Moment Kita should remain the primary brand identity.

---

### PUB-003 — Add subtle section reveal animations

Status: FIXED
Type: UI
Priority: Minor

Expected:
Where appropriate, add subtle scroll/reveal animation between sections.

Guidelines:
- Keep animations elegant and restrained.
- Avoid excessive animation on every small element.
- Prefer fade / translate / staggered reveal.
- Avoid layout shift.
- Respect prefers-reduced-motion.
- Do not negatively affect mobile performance.

---

# Home

### PUB-010 — Simplify Home content

Status: FIXED
Route: /
Type: Content
Priority: Medium

Remove:
- “medium synthesis”
- “The methodology”
- “ARTISAN LETTERPRESS & STATIONERY SUITES”

Do not leave awkward empty spacing after removing the sections.

---

### PUB-011 — Add Pricing CTA to Transparent Investment

Status: FIXED
Route: /
Type: Interaction
Priority: Medium

Current:
“Transparent Investment” does not provide a clear route toward the full Pricing page.

Expected:
Add a CTA linking to the canonical Pricing page.

Recommended label:
“Lihat Semua Paket”

Alternative:
“Lihat Detail Harga”

Avoid:
“Advanced Pricing”

because the public website is being localized primarily into Indonesian.

---

### PUB-012 — Add social proof / trusted-by section

Status: FIXED
Route: /
Type: UI
Priority: Medium

Expected:
Add a section titled:

“Dipercaya oleh”

Visual concept:
- company/client logos
- horizontal marquee/carousel
- automatic right-to-left loop
- seamless continuous movement
- pause or remain usable on interaction if appropriate

Important:
Only use real customer/partner/company logos when there is a legitimate relationship.

Until real data exists:
- use clearly identifiable development placeholder data
- do not imply endorsement from real brands

Keep the visual subtle and premium.

---

### PUB-013 — Add large template catalog showcase

Status: FIXED
Route: /
Type: UI
Priority: Medium

Expected:
Add a section communicating that Moment Kita provides a large template collection.

Concept:
- headline such as “500+ Template untuk Setiap Cerita”
- supporting copy
- several template previews around / beside the headline
- strong CTA toward Templates page

The exact number should remain data/content-driven.

Do not hardcode a misleading number if the actual catalog size is not yet defined.

---

# Products — Digital Invitations

### PUB-020 — Remove redundant sections

Status: FIXED
Type: Content
Priority: Minor

Remove:
- “03 - suite capabilities”
- “streamlined journey”

Reason:
“streamlined journey” overlaps conceptually with:
“02 - The architecture”

After removal:
- preserve smooth page storytelling
- check section numbering/order
- remove numbering gaps if applicable

---

# Products — Printed & Fine Stationery

### PUB-030 — Simplify Printed product page

Status: FIXED
Type: Content
Priority: Minor

Remove:
- “Tailored to your celebration”
- “The atelier process”
- “Archival provenance”

After removal:
- verify remaining sections still form a coherent narrative
- remove excessive vertical gaps

---

# Templates

### PUB-040 — Fix four-column grid toggle

Status: FIXED
Route: /templates
Type: Interaction
Priority: Medium

Current:
The Templates page has two layout buttons.

One layout works.

The four-column/grid layout button does not currently produce the expected result.

Expected:
Make the four-column grid button functional.

Reuse the existing templates currently rendered inside:
“Explore More Designs”

Do not create a duplicate dataset or duplicate template implementation.

---

### PUB-041 — Merge Explore More Designs into grid view

Status: FIXED
Route: /templates
Type: UI
Priority: Medium

Current:
Additional templates are rendered separately under:
“Explore More Designs”

Expected:
Move/reuse those template items as part of the four-column grid mode.

Behavior concept:

Layout A
→ existing primary template layout

Layout B
→ expanded four-column catalog/grid
→ includes the additional templates currently rendered by “Explore More Designs”

After this change:
Remove the standalone “Explore More Designs” section.

Important:
- preserve one shared template source
- avoid duplicate cards
- avoid layout jumping
- maintain responsive behavior

---

### PUB-042 — Remove unnecessary Templates sections

Status: FIXED
Route: /templates
Type: Content
Priority: Minor

Remove:
- “architectural curation”
- “extend catalog”
- standalone “Explore More Designs” section after its content is merged into grid view

---

### PUB-043 — Remove unused template category block

Status: FIXED
Route: /templates
Type: UI
Priority: Minor

Location:
Below:
“Find a design that feels like you”

Current:
There is a block containing items similar to:

- All Editions
- Digital Invitations
- etc.

It visually resembles interactive buttons but does not provide meaningful functionality.

Expected:
Remove the block entirely.

Do not leave an empty container or excess spacing.

---

# Features

### PUB-050 — Remove Logistics without friction

Status: FIXED
Route: /features
Type: Content
Priority: Minor

Remove:
- “Logistics without friction”

Re-check surrounding spacing and content flow.

---

# Pricing

### PUB-060 — Remove Harmonized Atelier Protocol

Status: FIXED
Route: /pricing
Type: Content
Priority: Minor

Remove:
- “The Harmonized Atelier Protocol”

Remove related empty spacing or navigation anchors if any.

---

# How It Works

### PUB-070 — Simplify How It Works page

Status: FIXED
Route: /how-it-works
Type: Content
Priority: Minor

Remove:
- “clarity & transparency”
- “Moment Kita synergy”
- “View Harmonized” button
- content associated with “View Harmonized”

After removal:
Ensure the remaining journey explains the Moment Kita process clearly without broken section transitions.

---

# About

### PUB-080 — Remove Harmonized Protocol content

Status: FIXED
Route: /about
Type: Content
Priority: Minor

Remove:
- all “Harmonized Protocol” sections
- “Learn about hybrid suites” link

---

### PUB-081 — Simplify About page

Status: FIXED
Route: /about
Type: Content
Priority: Minor

Remove:
- “the atelier collective”
- “Methodology”
- “The dual discipline”

Expected:
The remaining About page should focus more clearly on:
- Moment Kita
- what Moment Kita provides
- the philosophy behind the product
- digital and printed wedding experiences

Do not introduce another brand identity.
