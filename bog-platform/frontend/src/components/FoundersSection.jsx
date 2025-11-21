const founders = [
  {
    name: 'Dr. Eleni Kostas',
    title: 'CEO & Ocean Engineer',
    bio: 'Marine energy pioneer with 15 years designing underwater turbines and sustainable offshore infrastructure.'
  },
  {
    name: 'Marcus Li',
    title: 'CTO & Blockchain Architect',
    bio: 'Former lead at major DeFi protocol, architecting high-availability systems and cross-chain governance.'
  },
  {
    name: 'Sophia Alvarez',
    title: 'Chief Impact Officer',
    bio: 'Climate finance strategist previously at UN Ocean Council, focused on ESG transparency and blue economy funding.'
  }
];

function FoundersSection() {
  return (
    <section className="mx-auto max-w-6xl">
      <h2 className="text-3xl font-bold text-white text-center">Meet the Founders</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {founders.map((founder) => (
          <div key={founder.name} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/80">
            <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-ocean-400 via-glow to-ocean-700 shadow-glow" />
            <h3 className="mt-4 text-lg font-semibold text-white">{founder.name}</h3>
            <p className="text-xs uppercase tracking-wide text-glow">{founder.title}</p>
            <p className="mt-3 text-sm">{founder.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FoundersSection;
