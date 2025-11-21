import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';
import { useWeb3 } from '../context/Web3Context.jsx';
import WalletConnectPanel from './WalletConnectPanel.jsx';

const fetchMetrics = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/ico/metrics`);
  return data;
};

function TokenSaleDashboard() {
  const { address, status } = useWeb3();
  const { data, isLoading } = useQuery({ queryKey: ['ico-metrics'], queryFn: fetchMetrics });
  const crowdfunding = data?.crowdfunding;
  const nextMilestone = data?.nextMilestones?.[0];

  return (
    <section className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[2fr,1fr]">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <WalletConnectPanel />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-xs uppercase tracking-wide text-white/60">Wallet Status</p>
            <p className="mt-2 text-sm text-white">{status === 'connected' ? address : 'Not Connected'}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-xs uppercase tracking-wide text-white/60">Smart Contract</p>
            <a
              href="https://bscscan.com/address/0x3bb95b521AF86e01C1A50578875ADbb1222b6e4b"
              className="mt-2 block text-sm text-glow hover:underline"
            >
              0x3bb9...6e4b
            </a>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-6">
          <h3 className="text-lg font-semibold text-white">Real-Time Metrics</h3>
          {isLoading ? (
            <p className="mt-4 text-sm text-white/60">Syncing with ocean nodes...</p>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/60">Token Price</p>
                <p className="text-2xl font-semibold text-glow">${data?.tokenPriceUSD?.toFixed(2) ?? '0.12'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/60">Total Tokens Sold</p>
                <p className="text-2xl font-semibold text-glow">{data?.totalTokensSold?.toLocaleString() ?? '--'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/60">Total Raised</p>
                <p className="text-2xl font-semibold text-glow">${data?.totalRaisedUSD?.toLocaleString() ?? '--'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/60">Current Phase</p>
                <p className="text-2xl font-semibold text-glow">{data?.currentPhase ?? 'Loading'}</p>
              </div>
            </div>
          )}
          <div className="mt-6">
            <p className="text-xs uppercase tracking-wide text-white/60">Phase Progress</p>
            <div className="mt-2 h-2 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-ocean-500 to-glow"
                style={{ width: `${data?.phaseProgress ?? 0}%` }}
              />
            </div>
            {nextMilestone ? (
              <p className="mt-3 text-xs text-white/60">
                Next milestone: <span className="text-white">{nextMilestone.label}</span> •{' '}
                <span className="text-glow">{nextMilestone.remainingTokens.toLocaleString()} BOG</span> remaining
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Purchase Tokens</h3>
          <p className="mt-3 text-sm text-white/70">Select your currency and confirm the transaction in your wallet.</p>
          <iframe
            title="B.O.G Token Widget"
            src="https://widgets.onramper.com?apiKey=demo"
            className="mt-4 h-72 w-full rounded-2xl border border-white/10"
            allow="accelerometer; autoplay; camera; gyroscope; payment"
          />
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          <h3 className="text-lg font-semibold text-white">Security Verification</h3>
          <ul className="mt-3 space-y-2">
            <li>✅ Wallet signature confirmation</li>
            <li>🔒 Smart contract audited and verified on BscScan</li>
            <li>🛡️ KYC/AML via Onfido integration</li>
          </ul>
        </div>
        {crowdfunding ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            <h3 className="text-lg font-semibold text-white">Crowdfunding Progress</h3>
            <p className="mt-2 text-xs uppercase tracking-wide text-white/60">Indiegogo Campaign</p>
            <p className="mt-1 text-sm text-white">
              ${crowdfunding.raisedUSD.toLocaleString()} raised of ${crowdfunding.goalUSD.toLocaleString()} goal
            </p>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-ocean-500 to-glow"
                style={{ width: `${crowdfunding.progress}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-white/60">
              <span>{crowdfunding.supporters} backers</span>
              <span>Source: {crowdfunding.source ?? 'static'}</span>
            </div>
            <a
              href={crowdfunding.campaignUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-glow/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-glow hover:bg-glow/10"
            >
              Support on Indiegogo
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default TokenSaleDashboard;
