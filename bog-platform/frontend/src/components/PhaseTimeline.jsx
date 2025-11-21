const phases = [
  {
    name: 'Prelaunch Whitelist',
    description: 'Exclusive access for referral partners with tiered bonuses and guaranteed allocations.',
    perks: ['Up to 18% bonus', 'Early access NFT pass', 'Private founder briefing']
  },
  {
    name: 'Presale',
    description: 'Discounted token price before public launch. Staking rewards accrue from day one.',
    perks: ['12% discount', 'Instant staking activation', 'DAO charter preview']
  },
  {
    name: 'Public Launch',
    description: 'Tokens listed, staking rewards live, auto-claim enabled for all participants.',
    perks: ['Auto-claim dashboard', 'Liquidity incentives', 'DAO governance vote #1']
  }
];

function PhaseTimeline() {
  return (
    <section className="mx-auto max-w-6xl">
      <h2 className="text-2xl font-semibold text-white">ICO Stages</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {phases.map((phase) => (
          <div key={phase.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">{phase.name}</h3>
            <p className="mt-2 text-sm text-white/70">{phase.description}</p>
            <ul className="mt-4 space-y-2 text-xs text-white/60">
              {phase.perks.map((perk) => (
                <li key={perk}>• {perk}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PhaseTimeline;
