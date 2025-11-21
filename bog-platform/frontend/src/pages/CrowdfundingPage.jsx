import IndiegogoEmbed from '../components/IndiegogoEmbed.jsx';

function CrowdfundingPage() {
  return (
    <div className="space-y-12 px-6 py-16">
      <section className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-white">Crowdfunding</h1>
        <p className="mt-4 text-white/70">
          Track Indiegogo milestones, celebrate top backers, and transition supporters into token holders with exclusive bonus o
ffers.
        </p>
      </section>
      <IndiegogoEmbed />
      <section className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white">Top Backers</h2>
        <ol className="mt-4 space-y-3 text-sm text-white/80">
          {[
            { name: 'Aegean Ventures', amount: '$250,000' },
            { name: 'Poseidon Labs', amount: '$150,000' },
            { name: 'Oceanic Futures DAO', amount: '$120,000' }
          ].map((backer, index) => (
            <li key={backer.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-4">
              <span className="text-white">#{index + 1} {backer.name}</span>
              <span className="text-glow">{backer.amount}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default CrowdfundingPage;
