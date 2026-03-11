# HostPilot Database Schema Guide (Production-ready)

## 1) ERD-style explanation

**Identity & Access**
- `users` 1—N `user_roles` N—1 `roles`
- Flexible multi-role model (owner + professional etc.) via `user_roles`.

**Geography**
- `areas` is a hierarchical table (`parent_area_id`) to represent Greece → region → city → neighborhood.
- `properties`, `service_requests`, `buyer_requests`, and `professional_service_areas` can point to `areas`.

**Property Core**
- `properties` 1—1 `property_mode_settings`
- `properties` 1—N `property_media`
- `properties` 1—N listing tables (`long_term_listings`, `short_term_listings`, `flexible_listings`, `sale_listings`)

**Marketplace & Professional Ops**
- `professional_profiles` 1—N `professional_profile_categories` N—1 `professional_categories`
- `professional_profiles` 1—N `professional_service_areas`
- `professional_profiles` 1—N availability tables (`professional_availability_rules`, `professional_availability_blocks`, `professional_special_dates`)

**Demand/Matching**
- `service_requests` 1—N `service_request_matches`
- `service_requests` 1—N `service_request_messages`

**Booking & Monetization**
- `short_term_reservation_requests` 1—1 `bookings` 1—1 `commissions`
- `subscription_plans` 1—N `user_subscriptions`
- `payments` links to any paid entity by (`related_entity_type`, `related_entity_id`)
- `featured_packages` 1—N `featured_activations`

**AI + Analytics + Admin**
- `ai_outputs` stores generated output and prompts payload.
- `admin_system_settings` stores toggles and runtime config JSON.
- `analytics_snapshots` stores periodic aggregates.

**Legal/Transaction Support**
- `transaction_support_requests` can attach to `property`, `sale_listing`, or `buyer_request`.

---

## 2) Table-by-table schema

Full SQL DDL is in `hostpilot_schema.sql`. Key groups:

- A/B Auth & roles: `users`, `roles`, `user_roles`
- C/D/E Property core: `properties`, `property_media`, `property_mode_settings`
- F/G/H/I/J Listings & buyer requests: `long_term_listings`, `short_term_listings`, `flexible_listings`, `sale_listings`, `buyer_requests`
- K/L/M/N Professionals: `professional_profiles`, `professional_categories`, `professional_profile_categories`, `professional_service_areas`, `professional_availability_rules`, `professional_availability_blocks`, `professional_special_dates`
- O Matching layer: `service_requests`, `service_request_matches`, `service_request_messages`
- P Booking flow: `short_term_reservation_requests`, `bookings`
- Q/R Monetization: `subscription_plans`, `user_subscriptions`, `payments`, `commissions`, `featured_packages`, `featured_activations`
- S/T AI + tracker: `ai_outputs`, `property_expenses`, `property_notes`, `occupancy_notes`
- U/V/W Admin + analytics + legal support: `admin_system_settings`, `analytics_snapshots`, `transaction_support_requests`
- Shared geography: `areas`

---

## 3) Recommended enums

Defined in SQL as strong DB enums:
- languages, statuses, listing statuses, booking statuses, payment statuses
- role codes, property modes, occupancy states
- professional visibility, urgency, transaction support category

This prevents invalid values and reduces app-side branching complexity.

---

## 4) Key indexes

High-value indexes included:
- Property search: `(area_id, city)`, geo lat/lng, listing status/date
- Matching: `service_requests(request_status, urgency_level, requested_date)`, `service_request_matches(service_request_id, match_score desc)`
- Reservations: listing/date indexes + booking date indexes
- Revenue: `payments(user_id, payment_status, created_at desc)`
- Admin analytics: `admin_system_settings(setting_key)`, `analytics_snapshots(metric_key, snapshot_date)`

For phase 2: add PostGIS and full-text indexes (`to_tsvector`) on descriptions and service messages.

---

## 5) Important constraints

Critical constraints already in SQL:
- Multi-role uniqueness: `unique(user_id, role_id)`
- Media ordering uniqueness per property
- Date-range sanity checks for availability and bookings
- Budget/sqm min/max consistency
- One booking per reservation request (`unique reservation_request_id`)
- Non-overlapping confirmed/completed bookings via `exclude gist` on daterange
- **Impossible state prevention:** `property_mode_settings` check preventing `long_term_rented=true` while `short_term_enabled=true`

---

## 6) Preventing impossible states (recommended policy)

Beyond table checks, add transactional service-layer guards:
1. Before publishing short-term listing: verify `property_mode_settings.long_term_rented=false`.
2. On long-term contract activation:
   - set `long_term_rented=true`
   - set `short_term_enabled=false`
   - pause active short-term listings in same transaction.
3. On booking confirmation: rely on `exclude gist` to reject overlaps.
4. On free-preview professionals:
   - force `public_phone/public_email/public_website` hidden in API response policy unless `paid_visibility=true`.

---

## 7) Future scaling notes

- Partition very large tables monthly/quarterly later:
  - `service_request_messages`, `ai_outputs`, `payments`, `analytics_snapshots`.
- Move AI raw payloads to object storage if large; keep only compact metadata + pointer in DB.
- Introduce `property_units` if multi-unit buildings become primary.
- Replace polymorphic payment linkage with dedicated junction tables when finance audit requirements increase.
- Add event sourcing table (`domain_events`) for robust audit/replay.

---

## 8) Suggested Supabase RLS strategy (later)

- `users`: self-read/update by `auth.uid() == auth_user_id`; admins full access.
- `user_roles`: self-read; admin write.
- `properties/listings/media`: owner/manager write; public read only `published` rows.
- `professional_profiles`: owner write, public read with column masking function for free preview contacts.
- `service_requests/messages/matches`: participants-only read/write + admin oversight.
- `bookings/reservation_requests/payments`: host/guest/admin scoped policies.
- `admin_system_settings`: admin-only.
- `analytics_snapshots`: admin + internal service role.

Use **security definer** RPC functions for complex transitions (publish listing, confirm booking, activate featured).

---

## MVP critical vs Phase 2

### MVP Critical
- `users`, `roles`, `user_roles`
- `areas`
- `properties`, `property_media`, `property_mode_settings`
- listing tables (`long_term`, `short_term`, `flexible`, `sale`)
- `buyer_requests`
- `professional_profiles`, `professional_categories`, `professional_profile_categories`, `professional_service_areas`
- availability tables
- `service_requests`, `service_request_matches`, `service_request_messages`
- `short_term_reservation_requests`, `bookings`
- `subscription_plans`, `user_subscriptions`, `payments`, `commissions`
- `featured_packages`, `featured_activations`
- `admin_system_settings`

### Phase 2
- `analytics_snapshots`
- advanced valuation fields and investment model tables
- richer legal/transaction workflow states and document vault
- high-volume optimization tables/materialized views

---

## Nullable fields in v1 (recommended)

Keep nullable initially:
- `users.phone`, `users.city`
- `properties.managed_by_user_id`, `year_built`, `description_en`
- `property_media.thumbnail_url`
- listing `pin_expires_at`
- `buyer_requests.expected_roi_preference`, sqms, budgets
- `professional_profiles.business_name`, `long_description`, contact fields
- `service_requests.property_id`, `requested_time_window`, `ai_structured_data`
- `short_term_reservation_requests.guest_user_id`
- `payments.external_reference`, `metadata`

---

## JSON now vs normalize later

**Store as JSON now**
- `service_requests.ai_structured_data`
- `service_request_matches.match_reason`
- `subscription_plans.feature_flags`
- `payments.metadata`
- `admin_system_settings.setting_value`
- `analytics_snapshots.scope`

**Normalize later if needed**
- Detailed AI parser entities and confidence scores
- Fine-grained subscription entitlements
- Payment provider event logs
- Complex admin toggle history/versioning

