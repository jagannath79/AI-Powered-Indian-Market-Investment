import { StockSnapshot } from './types';

export function computeCompositeScore(stock: StockSnapshot, marketAdjustment = 0, dataPenalty = 0): number {
  const trend = stock.trendScore ?? 0;
  const momentum = stock.momentumScore ?? 0;
  const volume = Math.min(10, stock.volume > 1_000_000 ? 10 : 5);
  const indicator = stock.rsi ? (stock.rsi > 45 && stock.rsi < 70 ? 8 : 4) : 0;
  const fundamentals = stock.fundamentalScore ?? 5;
  const liquidity = stock.liquidityScore ?? 3;

  const raw = trend + momentum + volume + indicator + fundamentals + liquidity;
  const total = Math.max(0, Math.min(100, raw + marketAdjustment - dataPenalty));
  return Number(total.toFixed(2));
}

export function confidenceBand(score: number): 'Very High' | 'High' | 'Medium' | 'Low' {
  if (score >= 85) return 'Very High';
  if (score >= 70) return 'High';
  if (score >= 55) return 'Medium';
  return 'Low';
}
