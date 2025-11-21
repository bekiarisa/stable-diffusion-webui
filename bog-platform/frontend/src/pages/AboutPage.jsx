import FoundersSection from '../components/FoundersSection.jsx';
import RoadmapSection from '../components/RoadmapSection.jsx';

function AboutPage() {
  return (
    <div className="space-y-16 px-6 py-16">
      <section className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-bold text-white">Our Story</h1>
        <p className="mt-6 text-lg text-white/80">
          B.O.G – Blue Ocean Grid pioneers zero-energy blockchain infrastructure by building subaquatic data centers harnessing o
cean currents. Founded by ocean engineers, climatetech entrepreneurs, and blockchain veterans, B.O.G creates a sustainable backb
one for decentralized finance and AI workloads.
        </p>
      </section>
      <FoundersSection />
      <section className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold text-white">Global Mission</h2>
        <p className="mt-4 text-white/70">
          We believe the future of computing lies beneath the waves. By uniting marine science, renewable energy, and blockchain p
rotocols, B.O.G delivers carbon-negative infrastructure accessible to investors worldwide. Our mission is to empower communities
 with climate-positive technology and inclusive governance.
        </p>
      </section>
      <RoadmapSection />
    </div>
  );
}

export default AboutPage;
