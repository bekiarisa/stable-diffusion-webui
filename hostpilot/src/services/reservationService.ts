import { ReservationFlowStatus, ReservationQuote } from '@/core/types/domain';

const flow: ReservationFlowStatus[] = ['inquiry', 'reservation_request', 'accepted', 'booking_status', 'payment_placeholder', 'confirmed'];

export const reservationService = {
  quote(input: { nights: number; nightlyPrice: number; cleaningFee?: number; commissionRate: number }): ReservationQuote {
    const cleaningFee = input.cleaningFee ?? 0;
    const baseAmount = input.nights * input.nightlyPrice;
    const commissionAmount = +(baseAmount * (input.commissionRate / 100)).toFixed(2);
    const totalAmount = +(baseAmount + cleaningFee).toFixed(2);
    const payoutAmount = +(totalAmount - commissionAmount).toFixed(2);

    return {
      nights: input.nights,
      baseAmount,
      cleaningFee,
      commissionRate: input.commissionRate,
      commissionAmount,
      totalAmount,
      payoutAmount,
    };
  },
  getFlow() {
    return flow;
  },
};
