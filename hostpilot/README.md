# HostPilot (hostpilot.gr)

Greek-first proptech SaaS + marketplace web app scaffold with a coherent product structure:
- Public marketing shell
- Role-based applications (Owner, Agent, Professional, Buyer)
- Admin control center
- Centralized i18n (Greek default, English toggle)

## What was refactored
- Introduced centralized dictionaries under `src/i18n/` and language context/provider.
- Reorganized route architecture around real product areas instead of disconnected demo pages.
- Rebuilt homepage and public pages (features, pricing, categories, areas, access).
- Added role-entry onboarding and structured role workspaces.
- Strengthened admin center with actionable navigation, status blocks, and toggle controls.
- Reworked listings, AI assistant, and investment assistant into clearer workflows.

## Architecture
```
src/
  app/
    providers/
    router/
  core/
    constants/
    types/
    utils/
  i18n/
  design/
    ui/
  features/
    admin/
    ai/
    auth/
    home/
    investment/
    listings/
    marketplace/
    payments/
    public/
    reservations/
    role/
  layouts/
  mocks/
  services/
  styles/
```

## Key routes
### Public
- `/`
- `/features`
- `/pricing`
- `/categories`
- `/areas`
- `/access`
- `/role-entry`

### Role apps
- `/app/owner/*`
- `/app/agent/*`
- `/app/professional/*`
- `/app/buyer/*`

### Admin
- `/admin/*`

## Database
- `docs/database/hostpilot_schema.sql`
- `docs/database/hostpilot_schema_guide.md`

## Local run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```
