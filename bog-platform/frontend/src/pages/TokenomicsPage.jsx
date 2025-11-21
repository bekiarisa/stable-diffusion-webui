import TokenomicsSection from '../components/TokenomicsSection.jsx';

function TokenomicsPage() {
  return (
    <div className="space-y-16 px-6 py-16">
      <section className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-white">Tokenomics</h1>
        <p className="mt-4 text-white/70">
          Explore allocation, vesting, and market cap simulations for the BOG token across founders, community rewards, and liqu
idity pools.
        </p>
      </section>
      <TokenomicsSection />
    </div>
  );
}

export default TokenomicsPage;
