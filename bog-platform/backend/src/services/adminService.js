import { getState, summarizePhases } from '../store/state.js';

function buildLeaderboard(purchases) {
  const totals = new Map();
  for (const purchase of purchases) {
    if (!purchase.wallet) continue;
    const current = totals.get(purchase.wallet) ?? 0;
    totals.set(purchase.wallet, current + purchase.usdValue);
  }

  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([wallet, usd]) => ({ wallet, usd: Number(usd.toFixed(2)) }));
}

export async function getAdminMetrics() {
  const state = getState();
  const { phases } = summarizePhases();

  return {
    totalPurchases: state.purchases.length,
    totalUsd: Number(state.totals.raisedUSD.toFixed(2)),
    topBackers: buildLeaderboard(state.purchases),
    crowdfunding: state.crowdfunding,
    phases: phases.map((phase) => ({
      id: phase.id,
      label: phase.label,
      status: phase.progress >= 100 ? 'Complete' : phase.progress === 0 ? 'Upcoming' : 'Active',
      conversion: `${phase.progress}%`
    }))
  };
}
