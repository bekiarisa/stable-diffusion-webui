import { BoltIcon, GlobeEuropeAfricaIcon, CurrencyDollarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const highlights = [
  {
    icon: BoltIcon,
    title: 'Energy-Free Ocean Nodes',
    description: 'Harness ocean currents to power subsea data centers with zero external electricity.'
  },
  {
    icon: GlobeEuropeAfricaIcon,
    title: 'Carbon-Neutral Blockchain',
    description: 'A fully carbon-negative infrastructure that offsets emissions by leveraging marine ecosystems.'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Token Utility',
    description: 'BOG tokens unlock node revenue sharing, governance, and staking rewards across ocean grids.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Profit & Impact',
    description: 'Invest in clean tech while enabling climate-positive computing for blue economy partners.'
  }
];

function ProjectHighlights() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="grid gap-8 md:grid-cols-2">
        {highlights.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:border-glow hover:shadow-glow"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-glow/10 p-3 text-glow">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>
            <p className="mt-4 text-sm text-white/70">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectHighlights;
