import HeroSection from '../components/HeroSection.jsx';
import ProjectHighlights from '../components/ProjectHighlights.jsx';
import PartnerShowcase from '../components/PartnerShowcase.jsx';
import RoadmapSection from '../components/RoadmapSection.jsx';
import IndiegogoEmbed from '../components/IndiegogoEmbed.jsx';

function HomePage() {
  return (
    <div className="space-y-24">
      <HeroSection />
      <ProjectHighlights />
      <IndiegogoEmbed />
      <RoadmapSection />
      <PartnerShowcase />
    </div>
  );
}

export default HomePage;
