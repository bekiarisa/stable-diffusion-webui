import { documents } from '../data/seed.js';
import { summarizePhases } from '../store/state.js';

const KNOWLEDGE = {
  mission:
    'B.O.G builds underwater, zero-energy data centers powered by ocean currents to deliver sustainable blockchain and AI compute.',
  tokenUtility:
    'BOG unlocks presale participation, staking rewards, DAO voting, and discounted access to ocean-powered compute lanes.',
  kyc:
    'Investors complete EU-compliant KYC/AML checks. Wallet signature confirms intent before ID upload through our onboarding partner.',
  oceanNodes:
    'Ocean Nodes are submersible pods cooled by deep-sea temperatures and powered by current-driven turbines. Each node carries GPU racks and blockchain validators with no surface footprint.',
  dao:
    'The B.O.G DAO governs new deployments, allocates staking rewards, and approves profit-sharing with regional research hubs.'
};

function formatPhases() {
  const { phases } = summarizePhases();
  return phases
    .map(
      (phase) =>
        `${phase.label}: ${phase.progress}% filled • ${Math.max(
          phase.allocationTokens - phase.soldTokens,
          0
        ).toLocaleString()} BOG remaining`
    )
    .join('\n');
}

function describeTokenomics() {
  return [
    'Total supply: 100,000,000 BOG with multi-year vesting.',
    '40% founders (locked 36 months), 25% ICO, 15% liquidity, 10% development, 5% partnerships, 5% community rewards.',
    'Staking rewards activate at public launch with Ocean Node profit share.'
  ].join('\n');
}

function answerFor(input) {
  const text = input.toLowerCase();

  if (text.includes('how') && text.includes('buy')) {
    return [
      'Here is how to join the B.O.G presale:',
      '1. Connect a BSC-compatible wallet (MetaMask, Trust Wallet, WalletConnect).',
      '2. Choose BNB, ETH, USDT, or USD payment – the dashboard converts to BOG at $0.12.',
      '3. Confirm the smart-contract transaction. Tokens auto-claim once the block finalizes.',
      '4. Complete KYC to unlock referral tiers and staking when the public launch opens.'
    ].join('\n');
  }

  if (text.includes('difference') && text.includes('presale')) {
    return [
      'Presale vs. Public Sale:',
      '- Presale offers 8% bonus tokens and access to the Ocean Node NFT drop.',
      '- Public launch activates staking rewards and DAO voting, but without the presale discount.',
      '- All presale buyers auto-migrate to staking pools when the DAO goes live.'
    ].join('\n');
  }

  if (text.includes('profit') || text.includes('roi')) {
    return [
      'Ocean Node profit potential comes from three streams:',
      '• 65% of net compute revenue flows to stakers as BOG rewards.',
      '• Validators earn cross-chain settlement fees for green compute corridors.',
      '• DAO-approved research leases add recurring USD-denominated income.',
      'Projected node payback: 22 months with conservative occupancy.'
    ].join('\n');
  }

  if (text.includes('environment') || text.includes('sustainable')) {
    return [
      'Environmental impact:',
      '• Zero external power draw – ocean currents feed turbine generators.',
      '• Passive seawater cooling eliminates chillers and slashes energy use by 98%.',
      '• Nodes operate within marine-protected guidelines with real-time biodiversity monitoring.'
    ].join('\n');
  }

  if (text.includes('where') && text.includes('data')) {
    return 'The first production data center launches off the coast of Cyprus with expansion to the Aegean Sea hub in Greece during 2026.';
  }

  if (text.includes('tokenomics')) {
    return describeTokenomics();
  }

  if (text.includes('kyc')) {
    return `${KNOWLEDGE.kyc}\nSubmit your ID through our secure portal once your wallet signature is confirmed.`;
  }

  if (text.includes('dao')) {
    return `${KNOWLEDGE.dao}\nPresale wallets receive founding voter badges during the public launch.`;
  }

  return [
    KNOWLEDGE.mission,
    `Current phase status:\n${formatPhases()}`,
    `Token utility: ${KNOWLEDGE.tokenUtility}`,
    'Ask for a document summary or guidance on staking, referrals, and DAO governance.'
  ].join('\n\n');
}

function resolveDocument(documentId) {
  if (!documentId) return documents.whitepaper;
  const id = documentId.toLowerCase();
  if (id.includes('investor')) return documents.investorPlan;
  if (id.includes('token')) return documents.tokenomics;
  if (id.includes('roadmap')) return documents.roadmap;
  return documents.whitepaper;
}

export async function runChatCompletion(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('Messages array is required.');
  }

  const latest = messages[messages.length - 1];
  const content = typeof latest?.content === 'string' ? latest.content : '';
  const answer = answerFor(content);

  return {
    role: 'assistant',
    content: answer
  };
}

export async function summarizeDoc(document) {
  const resolved = resolveDocument(document);
  return `${resolved.summary}\n\nKey highlights:\n- ${resolved.highlights.join('\n- ')}`;
}
