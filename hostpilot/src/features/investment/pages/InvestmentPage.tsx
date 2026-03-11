import { useMemo, useState } from 'react';
import { Badge, Card, PageHeader } from '@/design/ui';
import { investmentService } from '@/services/investmentService';
import { useI18n } from '@/i18n/i18nContext';

export const InvestmentPage = () => {
  const { dict, lang } = useI18n();
  const [askingPrice, setAskingPrice] = useState(220000);
  const [renovationBudget, setRenovationBudget] = useState(20000);
  const [longTermRent, setLongTermRent] = useState(850);
  const [shortTermNightly, setShortTermNightly] = useState(90);
  const [occupancy, setOccupancy] = useState(60);
  const [annualCosts, setAnnualCosts] = useState(7500);

  const output = useMemo(() => investmentService.estimate({ askingPrice, renovationBudget, expectedLongTermMonthlyRent: longTermRent, expectedShortTermNightlyRate: shortTermNightly, expectedOccupancyRatePct: occupancy, annualCosts }), [askingPrice, renovationBudget, longTermRent, shortTermNightly, occupancy, annualCosts]);

  return (
    <div className="space-y-4">
      <PageHeader title={dict.investment.title} subtitle={lang === 'el' ? 'Συγκριτική ανάλυση σεναρίων long-term vs short-term.' : 'Scenario comparison for long-term vs short-term strategies.'} />
      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Card>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm">Asking Price<input className="mt-1 w-full rounded border p-2" type="number" value={askingPrice} onChange={(e) => setAskingPrice(Number(e.target.value))} /></label>
            <label className="text-sm">Renovation<input className="mt-1 w-full rounded border p-2" type="number" value={renovationBudget} onChange={(e) => setRenovationBudget(Number(e.target.value))} /></label>
            <label className="text-sm">Long-term rent<input className="mt-1 w-full rounded border p-2" type="number" value={longTermRent} onChange={(e) => setLongTermRent(Number(e.target.value))} /></label>
            <label className="text-sm">Short-term nightly<input className="mt-1 w-full rounded border p-2" type="number" value={shortTermNightly} onChange={(e) => setShortTermNightly(Number(e.target.value))} /></label>
            <label className="text-sm">Occupancy %<input className="mt-1 w-full rounded border p-2" type="number" value={occupancy} onChange={(e) => setOccupancy(Number(e.target.value))} /></label>
            <label className="text-sm">Annual costs<input className="mt-1 w-full rounded border p-2" type="number" value={annualCosts} onChange={(e) => setAnnualCosts(Number(e.target.value))} /></label>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold">{lang === 'el' ? 'Αποτελέσματα' : 'Outputs'}</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li>LT income: €{output.grossAnnualLongTermIncome.toLocaleString('el-GR')}</li>
            <li>ST income: €{output.grossAnnualShortTermIncome.toLocaleString('el-GR')}</li>
            <li>LT yield: {output.indicativeYieldLongTermPct}%</li>
            <li>ST yield: {output.indicativeYieldShortTermPct}%</li>
            <li>LT payback: {output.simplePaybackYearsLongTerm}y</li>
            <li>ST payback: {output.simplePaybackYearsShortTerm}y</li>
          </ul>
          <div className="mt-3"><Badge tone="brand">Score {output.investmentScore}/100</Badge></div>
          <p className="mt-3 rounded-lg bg-amber-50 p-2 text-xs text-amber-900">{dict.investment.disclaimer}</p>
          <p className="mt-2 text-xs text-slate-600">{dict.investment.next}</p>
        </Card>
      </div>
    </div>
  );
};
