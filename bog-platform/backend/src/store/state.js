import crypto from 'crypto';
import { seedState } from '../data/seed.js';

let state = JSON.parse(JSON.stringify(seedState));

function findActivePhase(phases = state.phases) {
  return phases.find((phase) => phase.soldTokens < phase.allocationTokens) ?? phases[phases.length - 1];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function resetState() {
  state = JSON.parse(JSON.stringify(seedState));
}

export function getState() {
  return state;
}

export function summarizePhases() {
  const active = findActivePhase();
  const progress = clamp(Math.round((active.soldTokens / active.allocationTokens) * 100), 0, 100);

  return {
    activePhase: active,
    progress,
    phases: state.phases.map((phase) => ({
      ...phase,
      progress: clamp(Math.round((phase.soldTokens / phase.allocationTokens) * 100), 0, 100)
    }))
  };
}

export function allocateTokens(tokenAmount) {
  let remaining = tokenAmount;
  const phases = state.phases;
  for (const phase of phases) {
    if (remaining <= 0) break;
    const capacity = Math.max(phase.allocationTokens - phase.soldTokens, 0);
    if (capacity <= 0) continue;
    const applied = Math.min(capacity, remaining);
    phase.soldTokens += applied;
    remaining -= applied;
  }
}

export function recordPurchaseEntry({ wallet, amount, currency, usdValue, tokenAmount }) {
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  const { activePhase } = summarizePhases();

  allocateTokens(tokenAmount);

  const entry = {
    id,
    wallet: wallet?.toLowerCase(),
    amount,
    currency,
    usdValue,
    tokenAmount,
    phaseId: activePhase.id,
    timestamp
  };

  state.purchases.unshift(entry);
  state.totals.soldTokens += tokenAmount;
  state.totals.raisedUSD += usdValue;

  const investorKey = entry.wallet;
  if (investorKey) {
    const existing = state.investors[investorKey] ?? {
      wallet: investorKey,
      referrals: 0,
      referralVolumeUSD: 0,
      claimedRewardsTokens: 0,
      notifications: [
        'Welcome to Blue Ocean Grid! Your referral deck is unlocked in the dashboard.',
        'Complete KYC to activate staking tiers and governance rights.'
      ],
      staking: {
        annualYield: '16%',
        oceanNodeShare: '0.75%'
      },
      vestingEnd: '2027-06-01'
    };

    existing.totalUsdInvested = (existing.totalUsdInvested ?? 0) + usdValue;
    existing.claimedRewardsTokens = (existing.claimedRewardsTokens ?? 0) + tokenAmount * 0.05;
    existing.referralVolumeUSD = existing.referralVolumeUSD ?? 0;
    state.investors[investorKey] = existing;
  }

  return entry;
}

export function listPurchasesForWallet(wallet) {
  if (!wallet) return [];
  const normalized = wallet.toLowerCase();
  return state.purchases.filter((purchase) => purchase.wallet === normalized);
}
