import { useMemo, useState } from 'react';
import { Card, PageHeader } from '@/design/ui';
import { investmentService } from '@/services/investmentService';

export const InvestmentPage = () => {
  const [askingPrice, setAskingPrice] = useState(200000);
  const [renovationBudget, setRenovationBudget] = useState(25000);
  const [longTermRent, setLongTermRent] = useState(850);
  const [shortTermNightly, setShortTermNightly] = useState(85);
  const [occupancy, setOccupancy] = useState(62);
  const [annualCosts, setAnnualCosts] = useState(8000);

  const output = useMemo(
    () => investmentService.estimate({
      askingPrice,
      renovationBudget,
      expectedLongTermMonthlyRent: longTermRent,
      expectedShortTermNightlyRate: shortTermNightly,
      expectedOccupancyRatePct: occupancy,
      annualCosts,
    }),
    [askingPrice, renovationBudget, longTermRent, shortTermNightly, occupancy, annualCosts],
  );

  return (
    <div className="space-y-4">
      <PageHeader title="Investment / ROI Assistant" subtitle="Indicative decision-support, όχι regulated investment advice." />
      <Card>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-sm">Asking price (€)<input className="mt-1 w-full rounded border p-2" type="number" value={askingPrice} onChange={(e) => setAskingPrice(Number(e.target.value))} /></label>
          <label className="text-sm">Renovation budget (€)<input className="mt-1 w-full rounded border p-2" type="number" value={renovationBudget} onChange={(e) => setRenovationBudget(Number(e.target.value))} /></label>
          <label className="text-sm">Long-term rent / μήνα (€)<input className="mt-1 w-full rounded border p-2" type="number" value={longTermRent} onChange={(e) => setLongTermRent(Number(e.target.value))} /></label>
          <label className="text-sm">Short-term nightly (€)<input className="mt-1 w-full rounded border p-2" type="number" value={shortTermNightly} onChange={(e) => setShortTermNightly(Number(e.target.value))} /></label>
          <label className="text-sm">Occupancy (%)<input className="mt-1 w-full rounded border p-2" type="number" value={occupancy} onChange={(e) => setOccupancy(Number(e.target.value))} /></label>
          <label className="text-sm">Annual costs (€)<input className="mt-1 w-full rounded border p-2" type="number" value={annualCosts} onChange={(e) => setAnnualCosts(Number(e.target.value))} /></label>
        </div>
      </Card>
      <Card>
        <h3 className="font-semibold">Scenario output</h3>
        <div className="mt-2 grid gap-2 text-sm md:grid-cols-2">
          <p>Gross annual LT: <strong>€{output.grossAnnualLongTermIncome.toLocaleString('el-GR')}</strong></p>
          <p>Gross annual ST: <strong>€{output.grossAnnualShortTermIncome.toLocaleString('el-GR')}</strong></p>
          <p>Yield LT: <strong>{output.indicativeYieldLongTermPct}%</strong></p>
          <p>Yield ST: <strong>{output.indicativeYieldShortTermPct}%</strong></p>
          <p>Payback LT: <strong>{output.simplePaybackYearsLongTerm} έτη</strong></p>
          <p>Payback ST: <strong>{output.simplePaybackYearsShortTerm} έτη</strong></p>
          <p>Investment score: <strong>{output.investmentScore}/100</strong></p>
        </div>
        <p className="mt-3 rounded-lg bg-amber-50 p-2 text-xs text-amber-900">Disclaimer: Οι υπολογισμοί είναι ενδεικτικοί και δεν αποτελούν επενδυτική ή χρηματοοικονομική συμβουλή.</p>
      </Card>
    </div>
  );
};
