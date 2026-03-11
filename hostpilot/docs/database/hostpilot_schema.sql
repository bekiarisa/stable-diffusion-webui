-- HostPilot production schema (PostgreSQL / Supabase friendly)
-- Greek-first marketplace + AI + bookings + investment decision support

create extension if not exists pgcrypto;

-- ===============
-- Enums
-- ===============
create type preferred_language as enum ('el', 'en');
create type account_status as enum ('pending_verification', 'active', 'suspended', 'deleted');
create type role_code as enum ('owner_host', 'agent_property_manager', 'professional', 'buyer_investor', 'admin');
create type property_type as enum ('apartment', 'house', 'villa', 'studio', 'maisonette', 'office', 'land', 'other');
create type property_condition as enum ('new', 'renovated', 'good', 'needs_renovation');
create type renovation_status as enum ('none', 'planned', 'in_progress', 'completed');
create type listing_status as enum ('draft', 'pending_review', 'published', 'paused', 'archived');
create type featured_status as enum ('none', 'featured');
create type payment_type as enum ('subscription', 'one_off', 'featured_pin', 'booking_payment', 'commission_charge');
create type commission_mode as enum ('launch_offer', 'standard', 'premium_managed');
create type media_type as enum ('photo', 'video', 'video_url');
create type property_mode as enum ('long_term', 'short_term', 'flexible_mid_term', 'erasmus', 'sale');
create type occupancy_state as enum ('vacant', 'long_term_rented', 'short_term_booked', 'owner_use', 'blocked');
create type flexible_listing_subtype as enum ('flexible', 'mid_term', 'erasmus', 'student');
create type buyer_request_type as enum ('buy', 'invest', 'erasmus_rental_search', 'long_term_rental_search');
create type professional_visibility_status as enum ('free_preview', 'paid_visible', 'hidden', 'suspended');
create type category_status as enum ('active', 'inactive');
create type area_status as enum ('active', 'inactive');
create type urgency_level as enum ('low', 'normal', 'high', 'urgent', 'emergency');
create type request_status as enum ('open', 'matched', 'in_progress', 'completed', 'cancelled');
create type match_status as enum ('suggested', 'accepted', 'rejected', 'expired');
create type message_sender_type as enum ('user', 'professional', 'system', 'ai');
create type reservation_request_status as enum ('inquiry', 'reservation_request', 'accepted', 'declined', 'expired', 'cancelled');
create type booking_status as enum ('pending_payment', 'confirmed', 'completed', 'cancelled', 'refunded');
create type subscription_status as enum ('trialing', 'active', 'past_due', 'cancelled', 'expired');
create type payment_status as enum ('pending', 'authorized', 'paid', 'failed', 'refunded');
create type commission_status as enum ('pending', 'accrued', 'settled', 'reversed');
create type target_type as enum ('property', 'professional');
create type ai_output_type as enum ('listing', 'guest_message', 'caption', 'reel_script', 'house_manual', 'investment_analysis', 'service_request_draft');
create type transaction_support_category as enum ('engineer', 'notary', 'lawyer', 'bank_mortgage_partner', 'accountant', 'valuer');

-- ===============
-- Core auth/users
-- ===============
create table users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique, -- supabase auth.users.id (optional in local testing)
  email citext not null unique,
  phone text,
  full_name text not null,
  display_name text,
  preferred_language preferred_language not null default 'el',
  country text not null default 'GR',
  city text,
  account_status account_status not null default 'pending_verification',
  email_verified boolean not null default false,
  phone_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table roles (
  id smallserial primary key,
  code role_code not null unique,
  title_gr text not null,
  title_en text not null,
  is_assignable boolean not null default true
);

create table user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  role_id smallint not null references roles(id),
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  unique (user_id, role_id)
);

-- ===============
-- Geography / areas
-- ===============
create table areas (
  id uuid primary key default gen_random_uuid(),
  name_gr text not null,
  name_en text not null,
  slug text not null unique,
  city text not null,
  region text not null,
  parent_area_id uuid references areas(id),
  latitude numeric(9,6),
  longitude numeric(9,6),
  area_status area_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ===============
-- Properties and mode controls
-- ===============
create table properties (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references users(id),
  managed_by_user_id uuid references users(id),
  title text not null,
  slug text not null unique,
  property_type property_type not null,
  address text not null,
  area_id uuid references areas(id),
  area_name text,
  city text not null,
  region text not null,
  latitude numeric(9,6),
  longitude numeric(9,6),
  sqm numeric(8,2) not null check (sqm > 0),
  bedrooms smallint not null default 0,
  bathrooms smallint not null default 1,
  floor text,
  furnished boolean not null default false,
  condition property_condition not null default 'good',
  year_built smallint,
  renovation_status renovation_status not null default 'none',
  description_gr text,
  description_en text,
  target_audience text,
  erasmus_friendly boolean not null default false,
  student_friendly boolean not null default false,
  active_status boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table property_media (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  media_type media_type not null,
  file_url text not null,
  thumbnail_url text,
  sort_order int not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default now(),
  unique (property_id, sort_order)
);

create table property_mode_settings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null unique references properties(id) on delete cascade,
  current_mode property_mode,
  current_occupancy_state occupancy_state not null default 'vacant',
  available_from date,
  available_to date,
  long_term_rented boolean not null default false,
  short_term_enabled boolean not null default true,
  flexible_enabled boolean not null default true,
  erasmus_enabled boolean not null default true,
  sale_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (available_to is null or available_from is null or available_to >= available_from),
  check (
    not (long_term_rented = true and short_term_enabled = true)
  )
);

-- ===============
-- Listing tables
-- ===============
create table long_term_listings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  published_by_user_id uuid not null references users(id),
  monthly_rent numeric(12,2) not null check (monthly_rent > 0),
  deposit numeric(12,2),
  minimum_duration_months smallint not null default 12,
  available_from date not null,
  listing_status listing_status not null default 'draft',
  payment_type payment_type not null,
  featured_status featured_status not null default 'none',
  pin_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table short_term_listings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  published_by_user_id uuid not null references users(id),
  nightly_price_base numeric(12,2) not null check (nightly_price_base > 0),
  cleaning_fee numeric(12,2),
  max_guests smallint not null check (max_guests > 0),
  min_nights smallint not null default 1,
  max_nights smallint,
  check_in_time time not null,
  check_out_time time not null,
  listing_status listing_status not null default 'draft',
  commission_mode commission_mode not null default 'standard',
  commission_rate numeric(5,2) not null check (commission_rate between 0 and 100),
  featured_status featured_status not null default 'none',
  pin_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (max_nights is null or max_nights >= min_nights)
);

create table flexible_listings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  published_by_user_id uuid not null references users(id),
  listing_subtype flexible_listing_subtype not null,
  monthly_price numeric(12,2) not null check (monthly_price > 0),
  minimum_duration_months smallint,
  maximum_duration_months smallint,
  available_from date not null,
  available_to date,
  utilities_included boolean not null default false,
  target_group_notes text,
  listing_status listing_status not null default 'draft',
  featured_status featured_status not null default 'none',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (available_to is null or available_to >= available_from)
);

create table sale_listings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  published_by_user_id uuid not null references users(id),
  asking_price numeric(14,2) not null check (asking_price > 0),
  negotiable boolean not null default true,
  estimated_value numeric(14,2),
  valuation_notes text,
  investment_highlight text,
  listing_status listing_status not null default 'draft',
  featured_status featured_status not null default 'none',
  pin_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table buyer_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  request_type buyer_request_type not null,
  target_area_id uuid references areas(id),
  target_area text,
  budget_min numeric(14,2),
  budget_max numeric(14,2),
  desired_sqm_min numeric(8,2),
  desired_sqm_max numeric(8,2),
  property_goal text,
  financing_needed boolean not null default false,
  expected_roi_preference numeric(5,2),
  status request_status not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (budget_max is null or budget_min is null or budget_max >= budget_min),
  check (desired_sqm_max is null or desired_sqm_min is null or desired_sqm_max >= desired_sqm_min)
);

-- ===============
-- Professionals
-- ===============
create table professional_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  business_name text,
  public_display_name text not null,
  short_bio text,
  long_description text,
  languages text[] not null default array['el'],
  visibility_status professional_visibility_status not null default 'free_preview',
  paid_visibility boolean not null default false,
  featured_status featured_status not null default 'none',
  profile_completion_score numeric(5,2) not null default 0,
  emergency_available boolean not null default false,
  same_day_jobs boolean not null default false,
  public_phone text,
  public_email text,
  public_website text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (profile_completion_score between 0 and 100)
);

create table professional_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_gr text not null,
  name_en text not null,
  category_status category_status not null default 'active',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table professional_profile_categories (
  id uuid primary key default gen_random_uuid(),
  professional_profile_id uuid not null references professional_profiles(id) on delete cascade,
  category_id uuid not null references professional_categories(id),
  created_at timestamptz not null default now(),
  unique (professional_profile_id, category_id)
);

create table professional_service_areas (
  id uuid primary key default gen_random_uuid(),
  professional_profile_id uuid not null references professional_profiles(id) on delete cascade,
  area_id uuid references areas(id),
  city text not null,
  area_name text,
  region text,
  radius_km numeric(6,2),
  area_status area_status not null default 'active',
  created_at timestamptz not null default now()
);

create table professional_availability_rules (
  id uuid primary key default gen_random_uuid(),
  professional_profile_id uuid not null references professional_profiles(id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  unique (professional_profile_id, weekday, start_time, end_time),
  check (end_time > start_time)
);

create table professional_availability_blocks (
  id uuid primary key default gen_random_uuid(),
  professional_profile_id uuid not null references professional_profiles(id) on delete cascade,
  blocked_from timestamptz not null,
  blocked_to timestamptz not null,
  block_reason text,
  created_at timestamptz not null default now(),
  check (blocked_to > blocked_from)
);

create table professional_special_dates (
  id uuid primary key default gen_random_uuid(),
  professional_profile_id uuid not null references professional_profiles(id) on delete cascade,
  date date not null,
  status text not null check (status in ('available', 'busy', 'emergency_only', 'vacation')),
  notes text,
  unique (professional_profile_id, date)
);

-- ===============
-- Service requests and AI matching
-- ===============
create table service_requests (
  id uuid primary key default gen_random_uuid(),
  created_by_user_id uuid not null references users(id),
  property_id uuid references properties(id),
  category_id uuid references professional_categories(id),
  requested_area_id uuid references areas(id),
  requested_area text,
  urgency_level urgency_level not null default 'normal',
  requested_date date,
  requested_time_window tstzrange,
  request_text text not null,
  ai_structured_data jsonb,
  request_status request_status not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table service_request_matches (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid not null references service_requests(id) on delete cascade,
  professional_profile_id uuid not null references professional_profiles(id) on delete cascade,
  match_score numeric(5,2) not null,
  match_reason jsonb,
  selected_by_ai boolean not null default true,
  selected_by_user boolean not null default false,
  match_status match_status not null default 'suggested',
  created_at timestamptz not null default now(),
  unique (service_request_id, professional_profile_id)
);

create table service_request_messages (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid not null references service_requests(id) on delete cascade,
  sender_user_id uuid references users(id),
  sender_professional_profile_id uuid references professional_profiles(id),
  sender_type message_sender_type not null,
  message_text text not null,
  attachments jsonb,
  created_at timestamptz not null default now()
);

-- ===============
-- Short-term booking flow
-- ===============
create table short_term_reservation_requests (
  id uuid primary key default gen_random_uuid(),
  short_term_listing_id uuid not null references short_term_listings(id) on delete cascade,
  guest_user_id uuid references users(id),
  check_in_date date not null,
  check_out_date date not null,
  guest_count smallint not null check (guest_count > 0),
  message text,
  request_status reservation_request_status not null default 'inquiry',
  total_price_estimate numeric(12,2),
  commission_rate numeric(5,2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (check_out_date > check_in_date)
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  reservation_request_id uuid unique not null references short_term_reservation_requests(id),
  property_id uuid not null references properties(id),
  host_user_id uuid not null references users(id),
  guest_user_id uuid references users(id),
  check_in_date date not null,
  check_out_date date not null,
  booking_status booking_status not null default 'pending_payment',
  base_amount numeric(12,2) not null,
  cleaning_fee numeric(12,2) not null default 0,
  commission_amount numeric(12,2) not null,
  total_amount numeric(12,2) not null,
  payout_amount numeric(12,2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (check_out_date > check_in_date)
);

-- optional: prevent overlapping confirmed bookings per property
create extension if not exists btree_gist;
alter table bookings add constraint booking_no_overlap
exclude using gist (
  property_id with =,
  daterange(check_in_date, check_out_date, '[]') with &&
) where (booking_status in ('confirmed', 'completed'));

-- ===============
-- Payments, commission, subscriptions, featured packages
-- ===============
create table subscription_plans (
  id uuid primary key default gen_random_uuid(),
  role_type role_code not null,
  plan_name text not null,
  monthly_price numeric(12,2) not null,
  yearly_price numeric(12,2),
  active boolean not null default true,
  feature_flags jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (role_type, plan_name)
);

create table user_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  plan_id uuid not null references subscription_plans(id),
  status subscription_status not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  auto_renew boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  payment_type payment_type not null,
  related_entity_type text not null,
  related_entity_id uuid,
  amount numeric(12,2) not null,
  currency char(3) not null default 'EUR',
  payment_status payment_status not null default 'pending',
  external_provider text,
  external_reference text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table commissions (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references bookings(id) on delete cascade,
  commission_rate numeric(5,2) not null,
  commission_amount numeric(12,2) not null,
  payout_amount numeric(12,2) not null,
  status commission_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table featured_packages (
  id uuid primary key default gen_random_uuid(),
  package_name text not null,
  target_type target_type not null,
  duration_days int not null check (duration_days > 0),
  price numeric(12,2) not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table featured_activations (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references featured_packages(id),
  target_type target_type not null,
  target_id uuid not null,
  activated_by_user_id uuid not null references users(id),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null check (status in ('active', 'expired', 'cancelled')),
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

-- ===============
-- AI outputs + tracker + notes
-- ===============
create table ai_outputs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  property_id uuid references properties(id),
  output_type ai_output_type not null,
  language preferred_language not null,
  input_payload jsonb,
  output_text text not null,
  created_at timestamptz not null default now()
);

create table property_expenses (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  created_by_user_id uuid not null references users(id),
  category text not null,
  amount numeric(12,2) not null,
  expense_date date not null,
  notes text,
  created_at timestamptz not null default now()
);

create table property_notes (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  created_by_user_id uuid not null references users(id),
  note_type text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create table occupancy_notes (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  occupancy_state occupancy_state not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  check (ends_at is null or ends_at > starts_at)
);

-- ===============
-- Admin + analytics + legal support
-- ===============
create table admin_system_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text not null unique,
  setting_value jsonb not null,
  updated_by_user_id uuid references users(id),
  updated_at timestamptz not null default now()
);

create table analytics_snapshots (
  id uuid primary key default gen_random_uuid(),
  snapshot_date date not null,
  metric_key text not null,
  metric_value numeric(18,4) not null,
  scope jsonb,
  created_at timestamptz not null default now(),
  unique (snapshot_date, metric_key, scope)
);

create table transaction_support_requests (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id),
  sale_listing_id uuid references sale_listings(id),
  buyer_request_id uuid references buyer_requests(id),
  support_category transaction_support_category not null,
  assigned_professional_profile_id uuid references professional_profiles(id),
  status request_status not null default 'open',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ===============
-- Indexing
-- ===============
create index idx_users_account_status on users(account_status);
create index idx_user_roles_user on user_roles(user_id);
create index idx_properties_owner on properties(owner_user_id);
create index idx_properties_area_city on properties(area_id, city);
create index idx_properties_geo on properties(latitude, longitude);
create index idx_property_mode_settings_flags on property_mode_settings(long_term_rented, short_term_enabled, flexible_enabled, erasmus_enabled, sale_enabled);
create index idx_long_term_status on long_term_listings(listing_status, available_from);
create index idx_short_term_status on short_term_listings(listing_status, commission_mode);
create index idx_flexible_status on flexible_listings(listing_status, listing_subtype);
create index idx_sale_status on sale_listings(listing_status);
create index idx_buyer_requests_status on buyer_requests(status, request_type);
create index idx_prof_profiles_visibility on professional_profiles(visibility_status, paid_visibility, featured_status);
create index idx_prof_service_areas_prof on professional_service_areas(professional_profile_id, city, area_name);
create index idx_service_requests_status on service_requests(request_status, urgency_level, requested_date);
create index idx_matches_request_score on service_request_matches(service_request_id, match_score desc);
create index idx_reservation_listing_dates on short_term_reservation_requests(short_term_listing_id, check_in_date, check_out_date);
create index idx_bookings_property_dates on bookings(property_id, check_in_date, check_out_date);
create index idx_payments_user_status on payments(user_id, payment_status, created_at desc);
create index idx_featured_activations_target on featured_activations(target_type, target_id, status, ends_at);
create index idx_ai_outputs_user_type on ai_outputs(user_id, output_type, created_at desc);
create index idx_expenses_property_date on property_expenses(property_id, expense_date desc);
create index idx_admin_setting_key on admin_system_settings(setting_key);
create index idx_analytics_metric_date on analytics_snapshots(metric_key, snapshot_date);
create index idx_tx_support_status on transaction_support_requests(status, support_category);

-- ===============
-- Seed baseline roles and categories
-- ===============
insert into roles(code, title_gr, title_en) values
('owner_host','Ιδιοκτήτης/Host','Owner/Host'),
('agent_property_manager','Μεσίτης/Property Manager','Agent/Property Manager'),
('professional','Επαγγελματίας','Professional'),
('buyer_investor','Αγοραστής/Επενδυτής','Buyer/Investor'),
('admin','Διαχειριστής','Admin')
on conflict do nothing;

insert into professional_categories(slug, name_gr, name_en, sort_order) values
('airbnb-cleaners','Καθαριστές Airbnb','Airbnb cleaners',1),
('electricians','Ηλεκτρολόγοι','Electricians',2),
('plumbers','Υδραυλικοί','Plumbers',3),
('engineers','Μηχανικοί','Engineers',4),
('real-estate-agents','Μεσίτες Ακινήτων','Real-estate agents',5),
('renovation-crews','Συνεργεία Ανακαίνισης','Renovation crews',6),
('painters','Ελαιοχρωματιστές','Painters',7),
('pest-control','Απεντομώσεις','Pest control',8),
('ac-maintenance','Συντήρηση Κλιματιστικών','Air-condition maintenance',9),
('airport-transfers','Μεταφορές Αεροδρομίου','Airport transfers',10),
('taxi-services','Υπηρεσίες Taxi','Taxi services',11),
('tourist-transfers','Τουριστικές Μεταφορές','Tourist transfers',12),
('property-managers','Διαχειριστές Ακινήτων','Property managers',13),
('property-photographers','Φωτογράφοι Ακινήτων','Property photographers',14),
('lawyers','Δικηγόροι','Lawyers',15),
('notaries','Συμβολαιογράφοι','Notaries',16),
('mortgage-bank-partners','Συνεργάτες Στεγαστικών/Τράπεζες','Mortgage / bank partners',17),
('accountants','Λογιστές','Accountants',18),
('valuers','Εκτιμητές','Valuers',19),
('energy-inspectors','Ενεργειακοί Επιθεωρητές','Energy inspectors',20),
('insurance-professionals','Ασφαλιστικοί Σύμβουλοι Ακινήτων','Insurance professionals',21)
on conflict do nothing;
