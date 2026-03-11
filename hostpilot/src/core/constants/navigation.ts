import { UserRole } from '@/core/types/domain';

export const publicNav = [
  { to: '/', label: 'Αρχική' },
  { to: '/listings', label: 'Αγγελίες' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/ai-assistant', label: 'AI Assistant' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/one-off-listings', label: 'One-off Listings' },
  { to: '/investment', label: 'ROI Assistant' },
  { to: '/pricing', label: 'Πλάνα' },
];

export const roleHome: Record<UserRole, string> = {
  owner_host: '/dashboard/owner',
  agent_property_manager: '/dashboard/agent',
  professional: '/dashboard/professional',
  buyer_investor: '/dashboard/buyer',
  admin: '/admin',
};
