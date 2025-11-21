import TokenSaleDashboard from '../components/TokenSaleDashboard.jsx';
import PhaseTimeline from '../components/PhaseTimeline.jsx';

function TokenSalePage() {
  return (
    <div className="space-y-16 px-6 py-16">
      <section className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-white">Token Sale Dashboard</h1>
        <p className="mt-4 text-white/70">
          Connect your wallet, verify KYC, and join the B.O.G token sale across whitelist, presale, and public launch phases. Rea
l-time metrics keep you informed every step of the way.
        </p>
      </section>
      <TokenSaleDashboard />
      <PhaseTimeline />
    </div>
  );
}

export default TokenSalePage;
