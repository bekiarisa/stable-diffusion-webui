import InvestorDashboard from '../components/InvestorDashboard.jsx';

function InvestorDashboardPage() {
  return (
    <div className="space-y-12 px-6 py-16">
      <section className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-white">Investor App</h1>
        <p className="mt-4 text-white/70">
          Track your live BOG token balance, staking rewards, referral bonuses, and DAO updates in one place. Stay ready for the
 next phase of the ocean grid.
        </p>
      </section>
      <InvestorDashboard />
    </div>
  );
}

export default InvestorDashboardPage;
