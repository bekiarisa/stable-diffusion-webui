import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';
import { useWeb3 } from '../context/Web3Context.jsx';

const fetchPortfolio = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/investor/portfolio`, { withCredentials: true });
  return data;
};

function StatCard({ label, value, sublabel }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-xs uppercase tracking-wide text-white/60">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-glow">{value}</p>
      {sublabel ? <p className="mt-1 text-xs text-white/50">{sublabel}</p> : null}
    </div>
  );
}

function InvestorDashboard() {
  const { address } = useWeb3();
  const { data, isLoading } = useQuery({ queryKey: ['portfolio'], queryFn: fetchPortfolio });

  return (
    <section className="mx-auto max-w-6xl space-y-10">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Wallet" value={address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'} />
        <StatCard label="Token Balance" value={isLoading ? 'Loading...' : `${data?.tokenBalance ?? '0'} BOG`} />
        <StatCard label="Claimed Rewards" value={`${data?.claimedRewards ?? 0} BOG`} />
        <StatCard label="Referral Bonus" value={`${data?.referralBonus ?? 0} BOG`} />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Staking Rewards Forecast</h3>
          <p className="mt-2 text-sm text-white/70">
            Estimate your future staking rewards based on lock duration and ocean node performance.
          </p>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <p>🪙 Annual Yield: {data?.staking?.annualYield ?? '18%'} APY</p>
            <p>🌊 Ocean Node Share: {data?.staking?.nodeShare ?? '0.85%'} of network revenue</p>
            <p>🔒 Vesting Ends: {data?.vestingEnd ?? '2027-06-01'}</p>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">DAO & Notifications</h3>
          <ul className="mt-3 space-y-3 text-sm text-white/70">
            {(data?.notifications ?? [
              'Presale bonus claim window opens in 48 hours.',
              'DAO Vote: Approve Aegean research partnership.',
              'Reminder: Complete KYC to unlock referral tier 2.'
            ]).map((note) => (
              <li key={note} className="rounded-2xl border border-white/10 bg-black/40 p-3">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white">Referral Progress</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/60">Total Referrals</p>
            <p className="text-2xl font-semibold text-glow">{data?.referrals?.total ?? 0}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-white/60">Referral Link</p>
            <p className="text-sm text-white/80">{data?.referrals?.link ?? 'Complete KYC to unlock.'}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wide text-white/60">Investment Progress</p>
          <div className="mt-2 h-2 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-ocean-500 to-glow"
              style={{ width: `${data?.progress?.percent ?? 0}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-white/60">
            ${
              data?.progress?.usdInvested != null
                ? data.progress.usdInvested.toLocaleString()
                : '0'
            }{' '}
            raised toward a $50,000 Ocean Node target
          </p>
        </div>
      </div>
      <div className="rounded-3xl border border-dashed border-glow/40 bg-glow/5 p-6 text-center">
        <h3 className="text-lg font-semibold text-glow">Phase 2: DAO Voting</h3>
        <p className="mt-3 text-sm text-white/80">
          Governance launches with the first Ocean Node deployment vote in Q4 2025. Stake BOG to receive voting NFT badges and gl
obal policy influence.
        </p>
      </div>
    </section>
  );
}

export default InvestorDashboard;
