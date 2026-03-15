import { RiskAppetite } from './types';

export function maxRiskPct(risk: RiskAppetite): number {
  if (risk === 'Conservative') return 0.005;
  if (risk === 'Moderate') return 0.01;
  return 0.015;
}

export function positionSize(params: {
  capital: number;
  risk: RiskAppetite;
  entry: number;
  stopLoss: number;
  allocCapital: number;
}) {
  const riskCapital = params.capital * maxRiskPct(params.risk);
  const stopDistance = Math.max(0.01, Math.abs(params.entry - params.stopLoss));
  const sharesByRisk = Math.floor(riskCapital / stopDistance);
  const sharesByCapital = Math.floor(params.allocCapital / params.entry);
  const shares = Math.max(0, Math.min(sharesByRisk, sharesByCapital));
  const usedCapital = shares * params.entry;

  return { shares, usedCapital, riskCapital, stopDistance };
}
