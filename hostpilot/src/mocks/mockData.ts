import { AppUser, Professional, Property } from '@/core/types/domain';

export const mockUsers: AppUser[] = [
  {
    id: 'u1',
    email: 'demo@hostpilot.gr',
    fullName: 'Demo Operator',
    displayName: 'HostPilot Demo',
    preferredLanguage: 'el',
    roles: ['owner_host', 'professional', 'buyer_investor', 'admin'],
    accountStatus: 'active',
  },
];

export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    ownerUserId: 'u1',
    title: { el: 'Erasmus Studio στη Ροτόντα', en: 'Erasmus studio near Rotonda' },
    description: { el: 'Πλήρως ανακαινισμένο, φοιτητικό προφίλ.', en: 'Fully renovated, student-first profile.' },
    mode: 'erasmus',
    city: 'Thessaloniki',
    areaName: 'Ροτόντα',
    sqm: 42,
    bedrooms: 1,
    bathrooms: 1,
    studentFriendly: true,
    erasmusFriendly: true,
    availableFrom: '2026-01-10',
    price: 610,
    longTermRented: false,
    shortTermEnabled: true,
    media: {
      cover: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop',
      gallery: [],
    },
    status: 'published',
  },
  {
    id: 'prop-2',
    ownerUserId: 'u1',
    managedByUserId: 'u1',
    title: { el: 'Βίλα προς Πώληση στη Χαλκιδική', en: 'Villa for sale in Halkidiki' },
    description: { el: 'Επενδυτικό προφίλ με δυνατότητα short-term.', en: 'Investment profile with short-term potential.' },
    mode: 'sale',
    city: 'Halkidiki',
    areaName: 'Νέα Ποτίδαια',
    sqm: 190,
    bedrooms: 4,
    bathrooms: 3,
    studentFriendly: false,
    erasmusFriendly: false,
    availableFrom: '2026-03-01',
    price: 430000,
    longTermRented: false,
    shortTermEnabled: true,
    media: {
      cover: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
      gallery: [],
      videoUrl: 'https://example.com/video-tour',
    },
    status: 'published',
  },
];

export const mockProfessionals: Professional[] = [
  {
    id: 'pro-1',
    userId: 'u1',
    category: 'Ηλεκτρολόγοι',
    city: 'Thessaloniki',
    serviceAreas: ['Κέντρο', 'Καλαμαριά'],
    freePreview: false,
    paidVisibility: true,
    emergencyAvailable: true,
    sameDayJobs: true,
  },
  {
    id: 'pro-2',
    userId: 'u1',
    category: 'Καθαριστές Airbnb',
    city: 'Halkidiki',
    serviceAreas: ['Κασσάνδρα', 'Σιθωνία'],
    freePreview: true,
    paidVisibility: false,
    emergencyAvailable: false,
    sameDayJobs: false,
  },
];

export const commissionTiers = [
  { mode: 'launch_offer', rate: 10 },
  { mode: 'standard', rate: 12 },
  { mode: 'premium_managed', rate: 15 },
] as const;

export const adminToggles = [
  'owner_registrations',
  'professional_registrations',
  'investor_registrations',
  'long_term_listings',
  'short_term_listings',
  'flexible_listings',
  'erasmus_listings',
  'sale_listings',
  'buy_requests',
  'marketplace_visibility',
  'ai_listing_tools',
  'ai_assistant_dispatcher',
  'ai_investment_assistant',
  'featured_pins',
  'thessaloniki_area',
  'halkidiki_area',
].map((key) => ({ key, enabled: true }));
