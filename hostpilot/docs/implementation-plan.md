# HostPilot Full Implementation Plan (Execution-First)

This document is created **before coding** and acts as the contract for implementation phases.

## Product Goal
Build a production-minded, Greek-first (EL-first, EN-ready) SaaS + marketplace + booking platform for HostPilot with launch focus on Thessaloniki and Halkidiki.

## Scope Principles
- Keep business model complete (subscriptions + one-off listings + featured pins + short-term commissions).
- Keep architecture compatible with Supabase/PostgreSQL + Stripe integration.
- Keep role-flexibility (same user may hold multiple roles).
- Keep all flows modular so MVP features can scale without rewrites.

---

## Phase 1 — App Architecture
### Deliverables
- Layered structure: `app`, `core`, `design`, `features`, `layouts`, `services`, `mocks`, `docs`.
- Typed domain contracts in `core/types`.
- Shared constants + helper utilities.
- Provider composition entrypoint (`AppProviders`).

### Acceptance
- No feature imports bypassing `core/design/services` boundaries.
- `npm run build` passes.

---

## Phase 2 — Routes & Layouts
### Deliverables
- Public, role dashboard, and admin route groups.
- Role guard middleware/component.
- Navigation map constants for consistency.

### Acceptance
- Unauthorized role navigation redirects safely.
- Dashboard routes for owner, agent, professional, buyer, admin all render.

---

## Phase 3 — Reusable UI System
### Deliverables
- Primitive components (`Button`, `Card`, `Badge`, `PageHeader`, `StatTile`).
- Token-driven styling via Tailwind theme + CSS tokens.
- Consistent page composition patterns.

### Acceptance
- Feature pages use primitives, not ad-hoc duplicated styles.

---

## Phase 4 — Database Schema
### Deliverables
- SQL schema with enums, PK/FK, indexes, status fields, audit timestamps.
- Guide with ERD narrative, constraints, impossible-state prevention, RLS strategy.

### Acceptance
- Schema covers all requested table groups A–W.

---

## Phase 5 — Auth Structure
### Deliverables
- Auth context abstraction (mock for now, adapter-ready for Supabase).
- Multi-role user session support.
- Active role switching UI for role-context testing.

### Acceptance
- Role switching updates dashboard target and route permissions.

---

## Phase 6 — Property Listings
### Deliverables
- Listing catalogue with multi-mode support:
  - long-term
  - short-term
  - flexible/mid-term
  - Erasmus/student
  - sale
- Validation rule: long-term rented cannot have short-term enabled.
- Bilingual-ready title/description model.

### Acceptance
- Mode conflict visibly flagged.

---

## Phase 7 — Professional Marketplace
### Deliverables
- Professional cards with category, area, availability flags.
- Free preview vs paid visibility behavior.
- Internal lead/contact workflow entry.

### Acceptance
- Free preview blocks direct contact visibility in UI logic.

---

## Phase 8 — AI Assistant Flows
### Deliverables
- Dispatcher input with intent parsing (category, urgency, area, Erasmus/investment hints).
- AI tools suite placeholders (listing copy, guest messages, captions/reels, house manual).
- Structured output panel for match-ready payload.

### Acceptance
- Dispatcher produces deterministic parsed object from prompt input.

---

## Phase 9 — Short-Term Reservation & Commission
### Deliverables
- Reservation request step map (inquiry → request → status → payment placeholder).
- Commission tiers:
  - launch 10%
  - standard 12%
  - premium managed 15%
- Quote engine with payout calculation.

### Acceptance
- Tier switch updates quote and payout correctly.

---

## Phase 10 — Long-Term One-Off Paid Listings
### Deliverables
- One-off listing purchase workflow (long-term + sale).
- Featured pin durations: 3/7/14 days.
- Placeholder checkout references for Stripe bridge.

### Acceptance
- User can preview cost and receive mock checkout ref.

---

## Phase 11 — Investment / ROI Assistant
### Deliverables
- Inputs for assumptions (price/rent/renovation/seasonality).
- Indicative outputs (gross income, payback, score, scenario compare).
- Clear disclaimer (non-regulated advisory).

### Acceptance
- UI allows editable assumptions and scenario-style output.

---

## Phase 12 — Admin Panel
### Deliverables
- Admin overview KPIs.
- System toggles page for registrations/listing modes/AI/areas.
- Pricing control placeholders.
- Reporting placeholders.

### Acceptance
- Admin pages render from one coherent admin layout.

---

## Folder Structure Target
```
src/
  app/
    providers/
    router/
  core/
    constants/
    types/
    utils/
  design/
    ui/
  features/
    admin/
    ai/
    auth/
    dashboard/
    home/
    investment/
    listings/
    marketplace/
    payments/
    reservations/
  layouts/
  mocks/
  services/
  styles/
```

## Build/Validation Checklist
- `npm install`
- `npm run build`
- `npm run dev -- --host 0.0.0.0 --port 4173`
- Visual screenshot for updated UI proof
