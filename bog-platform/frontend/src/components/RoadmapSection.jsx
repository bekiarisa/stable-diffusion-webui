const milestones = [
  {
    year: '2025',
    title: 'Cyprus HQ Launch',
    description: 'Deploy pilot ocean node off the coast of Cyprus. Secure CySEC compliance and launch whitelist.'
  },
  {
    year: '2026',
    title: 'Greece Expansion',
    description: 'Scale to Aegean Sea hub, onboard maritime research partners, initiate DAO governance.'
  },
  {
    year: '2027',
    title: 'Global Ocean Grid',
    description: 'Deploy nodes across the Mediterranean and Atlantic with renewable energy data corridors.'
  },
  {
    year: '2028',
    title: 'AI Superpod',
    description: 'Launch underwater AI compute clusters offering carbon-neutral GPU rentals for enterprise partners.'
  },
  {
    year: '2030',
    title: 'Planetary Blue Cloud',
    description: 'Interconnect ocean grids worldwide, enabling fully autonomous, zero-emission blockchain infrastructure.'
  }
];

function RoadmapSection() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <h2 className="text-3xl font-bold text-white">Roadmap 2025 – 2030</h2>
      <div className="mt-8 space-y-6 border-l border-white/10 pl-8">
        {milestones.map((item, index) => (
          <div key={item.year} className="relative">
            <span className="absolute -left-[37px] flex h-6 w-6 items-center justify-center rounded-full border border-glow bg-abyss text-xs font-semibold text-glow">
              {index + 1}
            </span>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-widest text-glow">{item.year}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/70">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RoadmapSection;
