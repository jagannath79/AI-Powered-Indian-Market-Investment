import { computeCompositeScore, confidenceBand } from './scoring';
import { Recommendation, StockSnapshot } from './types';

export function generateRecommendation(stock: StockSnapshot, marketIsRisky: boolean): Recommendation {
  const marketAdjustment = marketIsRisky ? -10 : 2;
  const score = computeCompositeScore(stock, marketAdjustment, 0);

  const style = score > 75 ? 'Swing' : score > 60 ? 'Positional' : 'Long-term';
  const action: Recommendation['action'] = score >= 70 ? 'BUY' : score >= 55 ? 'WATCH' : 'AVOID';

  const entry = stock.price;
  const stopLoss = Number((stock.price * 0.97).toFixed(2));
  const target1 = Number((stock.price * 1.05).toFixed(2));
  const target2 = Number((stock.price * 1.09).toFixed(2));

  return {
    symbol: stock.symbol,
    action,
    style,
    score,
    confidence: confidenceBand(score),
    entry,
    stopLoss,
    target1,
    target2,
  };
}
