import { Navigate, RouteObject } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AppWorkspaceLayout } from '@/layouts/AppWorkspaceLayout';
import { HomePage } from '@/features/home/pages/HomePage';
import { FeaturesPage } from '@/features/public/pages/FeaturesPage';
import { PricingPage } from '@/features/payments/pages/PricingPage';
import { CategoriesPage } from '@/features/public/pages/CategoriesPage';
import { AreasPage } from '@/features/public/pages/AreasPage';
import { AccessPage } from '@/features/public/pages/AccessPage';
import { RoleEntryPage } from '@/features/role/pages/RoleEntryPage';
import { ListingsPage } from '@/features/listings/pages/ListingsPage';
import { AIAssistantPage } from '@/features/ai/pages/AIAssistantPage';
import { ReservationsPage } from '@/features/reservations/pages/ReservationsPage';
import { InvestmentPage } from '@/features/investment/pages/InvestmentPage';
import { OneOffListingsPage } from '@/features/payments/pages/OneOffListingsPage';
import { MarketplacePage } from '@/features/marketplace/pages/MarketplacePage';
import { RequireRole } from '@/app/router/RequireRole';
import { RoleSectionPage } from '@/features/role/pages/RoleSectionPage';
import { AdminOverviewPage } from '@/features/admin/pages/AdminOverviewPage';
import { AdminTogglesPage } from '@/features/admin/pages/AdminTogglesPage';
import { AdminPricingPage } from '@/features/admin/pages/AdminPricingPage';
import { AdminReportsPage } from '@/features/admin/pages/AdminReportsPage';
import { AdminSectionPage } from '@/features/admin/pages/AdminSectionPage';

const ownerNav = [
  { to: '/app/owner', label: 'dashboard' },
  { to: '/app/owner/properties', label: 'my properties' },
  { to: '/app/owner/listings', label: 'listings' },
  { to: '/app/owner/bookings', label: 'bookings / reservations' },
  { to: '/app/owner/ai-tools', label: 'ai property tools' },
  { to: '/app/owner/messages', label: 'guest messages' },
  { to: '/app/owner/tracker', label: 'property tracker' },
  { to: '/app/owner/professionals', label: 'find a professional' },
  { to: '/app/owner/billing', label: 'billing' },
];

const professionalNav = [
  { to: '/app/professional', label: 'dashboard' },
  { to: '/app/professional/profile', label: 'profile' },
  { to: '/app/professional/services', label: 'services' },
  { to: '/app/professional/areas', label: 'areas served' },
  { to: '/app/professional/availability', label: 'availability' },
  { to: '/app/professional/requests', label: 'requests' },
  { to: '/app/professional/subscription', label: 'subscription / visibility' },
  { to: '/app/professional/boosts', label: 'featured boosts' },
];

const agentNav = [
  { to: '/app/agent', label: 'dashboard' },
  { to: '/app/agent/portfolio', label: 'portfolio' },
  { to: '/app/agent/leads', label: 'leads' },
  { to: '/app/agent/listings', label: 'listings' },
];

const buyerNav = [
  { to: '/app/buyer', label: 'dashboard' },
  { to: '/app/buyer/search', label: 'property search' },
  { to: '/app/buyer/investment', label: 'investment goals' },
  { to: '/app/buyer/requests', label: 'buy requests' },
];

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'features', element: <FeaturesPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'areas', element: <AreasPage /> },
      { path: 'access', element: <AccessPage /> },
      { path: 'role-entry', element: <RoleEntryPage /> },
      { path: 'listings', element: <ListingsPage /> },
      { path: 'marketplace', element: <MarketplacePage /> },
      { path: 'ai-assistant', element: <AIAssistantPage /> },
      { path: 'reservations', element: <ReservationsPage /> },
      { path: 'one-off-listings', element: <OneOffListingsPage /> },
      { path: 'investment', element: <InvestmentPage /> },

      {
        path: 'app/owner',
        element: <RequireRole allow={['owner_host', 'admin']} />,
        children: [
          {
            element: <AppWorkspaceLayout title="owner / host" nav={ownerNav} />,
            children: [
              { index: true, element: <RoleSectionPage title="owner dashboard" subtitle="KPIs, listing status, bookings and billing at a glance." /> },
              { path: 'properties', element: <RoleSectionPage title="my properties" subtitle="Property portfolio with media, mode flags and availability." /> },
              { path: 'listings', element: <ListingsPage /> },
              { path: 'bookings', element: <ReservationsPage /> },
              { path: 'ai-tools', element: <AIAssistantPage /> },
              { path: 'messages', element: <RoleSectionPage title="guest messages" subtitle="Check-in/check-out and support templates." /> },
              { path: 'tracker', element: <RoleSectionPage title="property tracker" subtitle="Expenses, notes and occupancy logs." /> },
              { path: 'professionals', element: <MarketplacePage /> },
              { path: 'billing', element: <OneOffListingsPage /> },
            ],
          },
        ],
      },

      {
        path: 'app/professional',
        element: <RequireRole allow={['professional', 'admin']} />,
        children: [
          {
            element: <AppWorkspaceLayout title="professional" nav={professionalNav} />,
            children: [
              { index: true, element: <RoleSectionPage title="professional dashboard" subtitle="Leads, availability and visibility performance." /> },
              { path: 'profile', element: <RoleSectionPage title="profile" subtitle="Public profile, free preview rules and contact visibility." /> },
              { path: 'services', element: <RoleSectionPage title="services" subtitle="Service categories and pricing structure." /> },
              { path: 'areas', element: <RoleSectionPage title="areas served" subtitle="Thessaloniki / Halkidiki and radius coverage." /> },
              { path: 'availability', element: <RoleSectionPage title="availability" subtitle="Working days, blocked dates, vacation and emergency mode." /> },
              { path: 'requests', element: <RoleSectionPage title="requests" subtitle="Incoming requests and in-platform messaging." /> },
              { path: 'subscription', element: <RoleSectionPage title="subscription / visibility" subtitle="Plan and lead access status." /> },
              { path: 'boosts', element: <RoleSectionPage title="featured boosts" subtitle="Pin packages 3/7/14 days." /> },
            ],
          },
        ],
      },

      {
        path: 'app/agent',
        element: <RequireRole allow={['agent_property_manager', 'admin']} />,
        children: [
          {
            element: <AppWorkspaceLayout title="agent / property manager" nav={agentNav} />,
            children: [
              { index: true, element: <RoleSectionPage title="agent dashboard" subtitle="Portfolio operations and lead pipeline." /> },
              { path: 'portfolio', element: <RoleSectionPage title="portfolio" subtitle="Managed properties and publication readiness." /> },
              { path: 'leads', element: <RoleSectionPage title="leads" subtitle="Buyer/investor demand and owner matching." /> },
              { path: 'listings', element: <ListingsPage /> },
            ],
          },
        ],
      },

      {
        path: 'app/buyer',
        element: <RequireRole allow={['buyer_investor', 'admin']} />,
        children: [
          {
            element: <AppWorkspaceLayout title="buyer / investor" nav={buyerNav} />,
            children: [
              { index: true, element: <RoleSectionPage title="buyer dashboard" subtitle="Saved properties, buy requests and opportunity feed." /> },
              { path: 'search', element: <ListingsPage /> },
              { path: 'investment', element: <InvestmentPage /> },
              { path: 'requests', element: <RoleSectionPage title="buy requests" subtitle="Area, budget, size, ROI preference and matching." /> },
            ],
          },
        ],
      },

      {
        path: 'admin',
        element: <RequireRole allow={['admin']} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminOverviewPage /> },
              { path: 'users', element: <AdminSectionPage title="users" /> },
              { path: 'properties', element: <AdminSectionPage title="properties" /> },
              { path: 'professionals', element: <AdminSectionPage title="professionals" /> },
              { path: 'listings', element: <AdminSectionPage title="listings" /> },
              { path: 'requests', element: <AdminSectionPage title="requests" /> },
              { path: 'reservations', element: <AdminSectionPage title="reservations" /> },
              { path: 'plans', element: <AdminPricingPage /> },
              { path: 'featured', element: <AdminSectionPage title="featured pins" /> },
              { path: 'ai', element: <AdminSectionPage title="ai settings" /> },
              { path: 'toggles', element: <AdminTogglesPage /> },
              { path: 'reports', element: <AdminReportsPage /> },
              { path: 'pricing', element: <AdminPricingPage /> },
            ],
          },
        ],
      },

      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];
