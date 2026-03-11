export type Locale = 'el' | 'en';
export type UserRole = 'owner_host' | 'agent_property_manager' | 'professional' | 'buyer_investor' | 'admin';

export type PropertyMode = 'long_term' | 'short_term' | 'flexible_mid_term' | 'erasmus' | 'sale' | 'buy_request';
export type ListingStatus = 'draft' | 'pending_review' | 'published' | 'paused' | 'archived';
export type ReservationFlowStatus = 'inquiry' | 'reservation_request' | 'accepted' | 'booking_status' | 'payment_placeholder' | 'confirmed';

export interface BilingualText {
  el: string;
  en: string;
}

export interface AppUser {
  id: string;
  email: string;
  fullName: string;
  displayName: string;
  preferredLanguage: Locale;
  roles: UserRole[];
  accountStatus: 'active' | 'pending_verification' | 'suspended';
}

export interface Property {
  id: string;
  ownerUserId: string;
  managedByUserId?: string;
  title: BilingualText;
  description: BilingualText;
  mode: PropertyMode;
  city: 'Thessaloniki' | 'Halkidiki';
  areaName: string;
  sqm: number;
  bedrooms: number;
  bathrooms: number;
  studentFriendly: boolean;
  erasmusFriendly: boolean;
  availableFrom: string;
  availableTo?: string;
  price: number;
  longTermRented: boolean;
  shortTermEnabled: boolean;
  media: { cover: string; gallery: string[]; videoUrl?: string };
  status: ListingStatus;
}

export interface ReservationQuote {
  nights: number;
  baseAmount: number;
  cleaningFee: number;
  commissionRate: number;
  commissionAmount: number;
  totalAmount: number;
  payoutAmount: number;
}

export interface Professional {
  id: string;
  userId: string;
  category: string;
  city: string;
  serviceAreas: string[];
  freePreview: boolean;
  paidVisibility: boolean;
  emergencyAvailable: boolean;
  sameDayJobs: boolean;
}

export interface OneOffListingOrderInput {
  listingType: 'long_term' | 'sale';
  pinDays?: 3 | 7 | 14;
}

export interface OneOffListingOrderResult {
  checkoutRef: string;
  listingFee: number;
  pinFee: number;
  total: number;
  currency: 'EUR';
}

export interface RoiAssumptions {
  askingPrice: number;
  renovationBudget: number;
  expectedLongTermMonthlyRent: number;
  expectedShortTermNightlyRate: number;
  expectedOccupancyRatePct: number;
  annualCosts: number;
}

export interface RoiScenarioOutput {
  grossAnnualLongTermIncome: number;
  grossAnnualShortTermIncome: number;
  indicativeYieldLongTermPct: number;
  indicativeYieldShortTermPct: number;
  simplePaybackYearsLongTerm: number;
  simplePaybackYearsShortTerm: number;
  investmentScore: number;
}
