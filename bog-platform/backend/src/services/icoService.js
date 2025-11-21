import axios from 'axios';
import { documents } from '../data/seed.js';
import { getState, recordPurchaseEntry, summarizePhases } from '../store/state.js';

const FALLBACK_CONTRACT = '0x3bb95b521AF86e01C1A50578875ADbb1222b6e4b';

function resolveConversionRate(currency, conversions) {
  const key = currency?.toUpperCase?.();
  if (!key) return 1;
  return conversions[key] ?? 1;
}

async function fetchIndiegogoSnapshot(campaignId, fallback) {
  if (!campaignId) {
    return {
      ...fallback,
      source: 'static'
    };
  }

  try {
    const { data } = await axios.get(`https://api.indiegogo.com/1/campaigns/${campaignId}.json`);
    return {
      goalUSD: data?.funding_goal ?? fallback.goalUSD,
      raisedUSD: data?.collected_funds ?? fallback.raisedUSD,
      supporters: data?.contributions_count ?? fallback.supporters,
      campaignUrl: data?.web_url ?? fallback.campaignUrl,
      topBackers: fallback.topBackers,
      stretchGoals: fallback.stretchGoals,
      source: 'live'
    };
  } catch (error) {
    return {
      ...fallback,
      source: 'offline',
      message: 'Unable to fetch Indiegogo stats, using cached campaign data.'
    };
  }
}

export async function getIcoMetrics() {
  const state = getState();
  const { activePhase, progress, phases } = summarizePhases();
  const contractAddress = process.env.TOKEN_CONTRACT_ADDRESS ?? FALLBACK_CONTRACT;
  const crowdfunding = await fetchIndiegogoSnapshot(process.env.INDIEGOGO_CAMPAIGN_ID, state.crowdfunding);

  const nextMilestones = phases
    .filter((phase) => phase.progress < 100)
    .map((phase) => ({
      id: phase.id,
      label: phase.label,
      remainingTokens: Math.max(phase.allocationTokens - phase.soldTokens, 0)
    }));

  return {
    totalTokensSold: Math.round(state.totals.soldTokens),
    totalRaisedUSD: Math.round(state.totals.raisedUSD),
    tokenPriceUSD: state.tokenPriceUSD,
    currentPhase: activePhase.label,
    phaseProgress: progress,
    phases,
    nextMilestones,
    tokenAddress: contractAddress,
    documents,
    crowdfunding: {
      ...crowdfunding,
      progress: Math.min(Math.round((crowdfunding.raisedUSD / crowdfunding.goalUSD) * 100), 100)
    }
  };
}

export async function recordPurchase({ amount, currency, wallet }) {
  const state = getState();
  const numericAmount = Number(amount);
  if (Number.isNaN(numericAmount) || numericAmount <= 0) {
    throw new Error('Purchase amount must be a positive number.');
  }

  const rate = resolveConversionRate(currency, state.conversions);
  const usdValue = Number((numericAmount * rate).toFixed(2));
  const tokenAmount = Number((usdValue / state.tokenPriceUSD).toFixed(2));

  const entry = recordPurchaseEntry({
    wallet,
    amount: numericAmount,
    currency: currency?.toUpperCase?.() ?? 'USD',
    usdValue,
    tokenAmount
  });

  const { activePhase, progress } = summarizePhases();

  return {
    purchase: entry,
    totals: {
      tokens: Math.round(state.totals.soldTokens),
      usd: Math.round(state.totals.raisedUSD)
    },
    phase: {
      id: activePhase.id,
      label: activePhase.label,
      progress
    },
    nextSteps:
      'Confirm the transaction in your connected wallet. Tokens auto-claim once the BSC transaction finalizes and KYC is cleared.'
  };
}
