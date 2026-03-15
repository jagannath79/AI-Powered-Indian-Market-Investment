export type RiskAppetite = 'Conservative' | 'Moderate' | 'Aggressive';
export type Horizon = 'Intraday' | '1W' | '1M' | '3M' | '1Y' | '3Y+';

export interface UserInput {
  capital: number;
  riskAppetite: RiskAppetite;
  horizon: Horizon;
  goal: 'Quick Trade' | 'Wealth Building' | 'Balanced Growth' | 'Capital Preservation';
}

export interface StockSnapshot {
  symbol: string;
  price: number;
  volume: number;
  rsi?: number;
  atr?: number;
  trendScore?: number;
  momentumScore?: number;
  liquidityScore?: number;
  fundamentalScore?: number;
}

export interface Recommendation {
  symbol: string;
  action: 'BUY' | 'WATCH' | 'AVOID' | 'WAIT';
  style: 'Intraday' | 'Swing' | 'Positional' | 'Long-term';
  score: number;
  confidence: 'Very High' | 'High' | 'Medium' | 'Low';
  entry: number;
  stopLoss: number;
  target1: number;
  target2: number;
}
