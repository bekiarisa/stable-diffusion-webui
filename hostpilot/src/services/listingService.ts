import { Property } from '@/core/types/domain';
import { mockProperties } from '@/mocks/mockData';

export const listingService = {
  async getAll(): Promise<Property[]> {
    return Promise.resolve(mockProperties);
  },
  async getPublished(): Promise<Property[]> {
    return Promise.resolve(mockProperties.filter((p) => p.status === 'published'));
  },
  validateModeState(property: Property) {
    if (property.longTermRented && property.shortTermEnabled) {
      return { valid: false, reason: 'Το ακίνητο είναι long-term rented, short-term mode πρέπει να είναι disabled.' };
    }
    return { valid: true };
  },
};
