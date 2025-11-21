import { getState, listPurchasesForWallet } from '../store/state.js';

const DEFAULT_NOTIFICATIONS = [
  'Complete KYC to unlock your staking multipliers.',
  'Invite friends to earn an extra 2% Ocean Node bonus.',
  'DAO launch webinar: 12 June, 18:00 EEST.'
];

export async function getInvestorPortfolio({ wallet }) {
  const state = getState();
  const normalized = wallet?.toLowerCase();
  const purchases = listPurchasesForWallet(normalized);
  const investor = normalized ? state.investors[normalized] : null;

  const tokenBalance = purchases.reduce((total, purchase) => total + purchase.tokenAmount, 0);
  const claimedRewardsTokens = investor?.claimedRewardsTokens ?? tokenBalance * 0.05;
  const referralBonusTokens = tokenBalance * 0.02 + (investor?.referrals ?? 0) * 120;

  return {
    wallet: normalized,
    tokenBalance: Number(tokenBalance.toFixed(2)),
    claimedRewards: Number(claimedRewardsTokens.toFixed(2)),
    referralBonus: Number(referralBonusTokens.toFixed(2)),
    staking: investor?.staking ?? {
      annualYield: '16%',
      oceanNodeShare: '0.75%'
    },
    vestingEnd: investor?.vestingEnd ?? '2027-06-01',
    referrals: {
      total: investor?.referrals ?? 0,
      link: normalized ? `https://blueoceangrid.io/r/${normalized.slice(2, 8)}` : null
    },
    notifications: investor?.notifications ?? DEFAULT_NOTIFICATIONS,
    progress: {
      usdInvested: Number((investor?.totalUsdInvested ?? tokenBalance * state.tokenPriceUSD).toFixed(2)),
      targetUsd: 50000,
      percent: Math.min(
        100,
        Math.round(
          ((investor?.totalUsdInvested ?? tokenBalance * state.tokenPriceUSD) / 50000) * 100
        )
      )
    },
    purchaseHistory: purchases.map((purchase) => ({
      id: purchase.id,
      timestamp: purchase.timestamp,
      currency: purchase.currency,
      amount: purchase.amount,
      usdValue: purchase.usdValue,
      tokenAmount: Number(purchase.tokenAmount.toFixed(2)),
      phaseId: purchase.phaseId
    }))
  };
}
