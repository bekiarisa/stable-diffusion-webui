import { describe, expect, it } from '@jest/globals';
import { runChatCompletion, summarizeDoc } from '../src/services/aiService.js';

describe('aiService', () => {
  it('responds with actionable guidance when asked how to buy tokens', async () => {
    const reply = await runChatCompletion([{ role: 'user', content: 'How do I buy BOG during presale?' }]);
    expect(reply.content).toContain('Connect a BSC-compatible wallet');
  });

  it('summarizes documents with highlights', async () => {
    const summary = await summarizeDoc('/docs/whitepaper.pdf');
    expect(summary).toContain('Key highlights');
  });
});
