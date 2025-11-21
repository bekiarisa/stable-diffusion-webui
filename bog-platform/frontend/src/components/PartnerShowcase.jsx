const hubs = [
  {
    title: 'Cyprus Headquarters',
    description: 'Regulatory compliant HQ in Limassol with access to subsea fiber and renewable ocean energy pilots.'
  },
  {
    title: 'Greece Expansion Hub',
    description: 'Strategic presence across Aegean islands powering Mediterranean maritime and research partners.'
  },
  {
    title: 'Global Alliance Roadmap',
    description: 'Targeting partnerships in Singapore, Dubai, and Lisbon to launch regional blue data corridors.'
  }
];

function PartnerShowcase() {
  return (
    <section className="bg-abyss/80 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-white">Partner Hubs</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {hubs.map((hub) => (
            <div key={hub.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80">
              <h3 className="text-lg font-semibold text-white">{hub.title}</h3>
              <p className="mt-3 text-sm">{hub.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnerShowcase;
