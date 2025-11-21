import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { getIcoMetrics, recordPurchase } from '../src/services/icoService.js';
import { getState, resetState } from '../src/store/state.js';

describe('icoService', () => {
  beforeEach(() => {
    resetState();
  });

  afterEach(() => {
    resetState();
  });

  it('returns metrics with phase details and documents', async () => {
    const metrics = await getIcoMetrics();
    expect(metrics).toHaveProperty('totalTokensSold');
    expect(metrics).toHaveProperty('documents.whitepaper.title');
    expect(metrics.tokenAddress).toBe('0x3bb95b521AF86e01C1A50578875ADbb1222b6e4b');
    expect(metrics.phases.length).toBeGreaterThan(0);
  });

  it('records a purchase and updates totals', async () => {
    const startingTokens = getState().totals.soldTokens;
    const result = await recordPurchase({ amount: 1000, currency: 'USD', wallet: '0x1234567890abcdef' });

    expect(result.purchase).toMatchObject({ currency: 'USD', usdValue: 1000 });
    expect(getState().totals.soldTokens).toBeGreaterThan(startingTokens);
    expect(result.phase).toHaveProperty('label');
  });
});
