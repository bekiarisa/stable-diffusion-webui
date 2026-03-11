# HostPilot (hostpilot.gr)

Greek-first proptech SaaS + marketplace platform scaffold for:
- owners / hosts
- agents / property managers
- professionals
- buyers / investors
- admins

Launch markets: **Thessaloniki** and **Halkidiki**.

## Full phased implementation (single consistent codebase)
1. ✅ App architecture
2. ✅ Routes and role-based layouts
3. ✅ Reusable UI system and theme tokens
4. ✅ Production SQL schema + backend model docs
5. ✅ Auth structure (mock provider + multi-role switching)
6. ✅ Property listing flows and mode validation
7. ✅ Professional marketplace with free-preview behavior
8. ✅ AI dispatcher flow + AI tools placeholders
9. ✅ Short-term reservation flow states + commission logic (10/12/15)
10. ✅ Long-term/sale one-off paid listing checkout preview + pin durations (3/7/14)
11. ✅ Investment / ROI scenario assistant with editable assumptions + disclaimer
12. ✅ Admin panel (overview, toggles, pricing, reports placeholders)

## Tech Stack
- Vite + React + TypeScript
- React Router
- Tailwind CSS
- Strictly typed domain layer
- Service abstraction layer (ready for Supabase/Stripe adapters)

## Project Structure
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

docs/
  implementation-plan.md
  database/
    hostpilot_schema.sql
    hostpilot_schema_guide.md
```

## Key Routes
- `/` Home
- `/listings`
- `/marketplace`
- `/ai-assistant`
- `/reservations`
- `/one-off-listings`
- `/investment`
- `/pricing`
- `/dashboard/owner`
- `/dashboard/agent`
- `/dashboard/professional`
- `/dashboard/buyer`
- `/admin`, `/admin/toggles`, `/admin/pricing`, `/admin/reports`

## Database
See:
- `docs/database/hostpilot_schema.sql`
- `docs/database/hostpilot_schema_guide.md`

Includes complete relational design, enums, constraints, indexes, RLS strategy notes, MVP/phase-2 breakdown.

## Local Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Notes
- Greek-first UI, bilingual-ready model shape (`el`/`en`).
- Service layer is mock-based now and prepared for Supabase/Stripe integration.
- Reservation, one-off listing payments, and ROI analytics are built as modular services for clean backend swap later.
