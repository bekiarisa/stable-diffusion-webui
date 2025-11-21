import { Routes, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import TokenSalePage from './pages/TokenSalePage.jsx';
import InvestorDashboardPage from './pages/InvestorDashboardPage.jsx';
import TokenomicsPage from './pages/TokenomicsPage.jsx';
import WhitepaperPage from './pages/WhitepaperPage.jsx';
import LegalPage from './pages/LegalPage.jsx';
import CrowdfundingPage from './pages/CrowdfundingPage.jsx';
import { Web3Provider } from './context/Web3Context.jsx';
import { AiAssistantProvider } from './context/AiAssistantContext.jsx';
import BOGeniusWidget from './components/BOGeniusWidget.jsx';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

function App() {
  useEffect(() => {
    const unlisten = () => {
      scrollToTop();
    };
    return () => unlisten?.();
  }, []);

  return (
    <Web3Provider>
      <AiAssistantProvider>
        <div className="min-h-screen flex flex-col bg-ocean-gradient">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<div className="p-12 text-center text-glow">Loading the ocean grid...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/token-sale" element={<TokenSalePage />} />
                <Route path="/investor" element={<InvestorDashboardPage />} />
                <Route path="/tokenomics" element={<TokenomicsPage />} />
                <Route path="/whitepaper" element={<WhitepaperPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/crowdfunding" element={<CrowdfundingPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <BOGeniusWidget />
        </div>
      </AiAssistantProvider>
    </Web3Provider>
  );
}

export default App;
