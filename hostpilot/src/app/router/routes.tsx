import { Navigate, RouteObject } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { HomePage } from '@/features/home/pages/HomePage';
import { ListingsPage } from '@/features/listings/pages/ListingsPage';
import { MarketplacePage } from '@/features/marketplace/pages/MarketplacePage';
import { AIAssistantPage } from '@/features/ai/pages/AIAssistantPage';
import { ReservationsPage } from '@/features/reservations/pages/ReservationsPage';
import { InvestmentPage } from '@/features/investment/pages/InvestmentPage';
import { PricingPage } from '@/features/payments/pages/PricingPage';
import { OneOffListingsPage } from '@/features/payments/pages/OneOffListingsPage';
import { RequireRole } from '@/app/router/RequireRole';
import { OwnerDashboardPage } from '@/features/dashboard/pages/OwnerDashboardPage';
import { ProfessionalDashboardPage } from '@/features/dashboard/pages/ProfessionalDashboardPage';
import { BuyerDashboardPage } from '@/features/dashboard/pages/BuyerDashboardPage';
import { AgentDashboardPage } from '@/features/dashboard/pages/AgentDashboardPage';
import { AdminOverviewPage } from '@/features/admin/pages/AdminOverviewPage';
import { AdminTogglesPage } from '@/features/admin/pages/AdminTogglesPage';
import { AdminPricingPage } from '@/features/admin/pages/AdminPricingPage';
import { AdminReportsPage } from '@/features/admin/pages/AdminReportsPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'listings', element: <ListingsPage /> },
      { path: 'marketplace', element: <MarketplacePage /> },
      { path: 'ai-assistant', element: <AIAssistantPage /> },
      { path: 'reservations', element: <ReservationsPage /> },
      { path: 'investment', element: <InvestmentPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'one-off-listings', element: <OneOffListingsPage /> },
      {
        path: 'dashboard',
        children: [
          {
            path: 'owner',
            element: <RequireRole allow={['owner_host', 'admin']} />,
            children: [{ element: <DashboardLayout title="Owner Space" />, children: [{ index: true, element: <OwnerDashboardPage /> }] }],
          },
          {
            path: 'professional',
            element: <RequireRole allow={['professional', 'admin']} />,
            children: [{ element: <DashboardLayout title="Professional Space" />, children: [{ index: true, element: <ProfessionalDashboardPage /> }] }],
          },
          {
            path: 'buyer',
            element: <RequireRole allow={['buyer_investor', 'admin']} />,
            children: [{ element: <DashboardLayout title="Buyer/Investor Space" />, children: [{ index: true, element: <BuyerDashboardPage /> }] }],
          },
          {
            path: 'agent',
            element: <RequireRole allow={['agent_property_manager', 'admin']} />,
            children: [{ element: <DashboardLayout title="Agent/Manager Space" />, children: [{ index: true, element: <AgentDashboardPage /> }] }],
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
              { path: 'toggles', element: <AdminTogglesPage /> },
              { path: 'pricing', element: <AdminPricingPage /> },
              { path: 'reports', element: <AdminReportsPage /> },
            ],
          },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];
