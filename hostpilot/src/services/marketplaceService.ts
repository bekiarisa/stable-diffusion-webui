import { mockProfessionals } from '@/mocks/mockData';

export const marketplaceService = {
  async getProfessionals() {
    return Promise.resolve(mockProfessionals);
  },
};
