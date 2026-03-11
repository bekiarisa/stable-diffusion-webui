import { OneOffListingOrderInput, OneOffListingOrderResult } from '@/core/types/domain';

const listingFees: Record<OneOffListingOrderInput['listingType'], number> = {
  long_term: 5.9,
  sale: 8.9,
};

const pinFees: Record<NonNullable<OneOffListingOrderInput['pinDays']>, number> = {
  3: 2.5,
  7: 4.9,
  14: 7.9,
};

export const paymentService = {
  async startOneOffListingPayment(input: OneOffListingOrderInput): Promise<OneOffListingOrderResult> {
    const listingFee = listingFees[input.listingType];
    const pinFee = input.pinDays ? pinFees[input.pinDays] : 0;
    const total = +(listingFee + pinFee).toFixed(2);

    return Promise.resolve({
      checkoutRef: `chk_${Date.now()}`,
      listingFee,
      pinFee,
      total,
      currency: 'EUR',
    });
  },
};
