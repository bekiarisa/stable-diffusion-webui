import { RoiAssumptions, RoiScenarioOutput } from '@/core/types/domain';

export const investmentService = {
  estimate(assumptions: RoiAssumptions): RoiScenarioOutput {
    const investedCapital = assumptions.askingPrice + assumptions.renovationBudget;
    const grossAnnualLongTermIncome = assumptions.expectedLongTermMonthlyRent * 12;
    const grossAnnualShortTermIncome = assumptions.expectedShortTermNightlyRate * 365 * (assumptions.expectedOccupancyRatePct / 100);

    const netAnnualLongTerm = Math.max(grossAnnualLongTermIncome - assumptions.annualCosts, 1);
    const netAnnualShortTerm = Math.max(grossAnnualShortTermIncome - assumptions.annualCosts, 1);

    const indicativeYieldLongTermPct = +(grossAnnualLongTermIncome / investedCapital * 100).toFixed(2);
    const indicativeYieldShortTermPct = +(grossAnnualShortTermIncome / investedCapital * 100).toFixed(2);

    const simplePaybackYearsLongTerm = +(investedCapital / netAnnualLongTerm).toFixed(2);
    const simplePaybackYearsShortTerm = +(investedCapital / netAnnualShortTerm).toFixed(2);

    const investmentScore = Math.max(1, Math.min(100, Math.round((indicativeYieldShortTermPct * 0.6 + indicativeYieldLongTermPct * 0.4) * 2)));

    return {
      grossAnnualLongTermIncome: +grossAnnualLongTermIncome.toFixed(2),
      grossAnnualShortTermIncome: +grossAnnualShortTermIncome.toFixed(2),
      indicativeYieldLongTermPct,
      indicativeYieldShortTermPct,
      simplePaybackYearsLongTerm,
      simplePaybackYearsShortTerm,
      investmentScore,
    };
  },
};
