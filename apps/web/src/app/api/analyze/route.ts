import { NextRequest, NextResponse } from 'next/server';
import { YahooFinanceAdapter } from '../../../../../../services/api/src/yahoo-adapter';
import { generateRecommendation } from '../../../../../../services/analytics/src/recommendation';
import { positionSize } from '../../../../../../services/analytics/src/allocation';
import { RiskAppetite, StockSnapshot } from '../../../../../../services/analytics/src/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const symbols: string[] = Array.isArray(body.symbols) ? body.symbols : [];
    const capital = Number(body.capital || 0);
    const riskAppetite = (body.riskAppetite || 'Moderate') as RiskAppetite;

    if (!symbols.length) return NextResponse.json({ error: 'symbols are required' }, { status: 400 });
    if (!capital || capital <= 0) return NextResponse.json({ error: 'capital must be > 0' }, { status: 400 });

    const provider = new YahooFinanceAdapter();
    const quotes = await provider.getQuotes(symbols);

    const snapshots: StockSnapshot[] = quotes.map((q) => {
      const dayReturnPct = q.prevClose ? ((q.price - q.prevClose) / q.prevClose) * 100 : 0;
      return {
        symbol: q.symbol,
        price: q.price,
        volume: q.volume,
        rsi: Math.max(10, Math.min(90, 50 + dayReturnPct * 3)),
        trendScore: Math.max(0, Math.min(20, 10 + dayReturnPct * 2)),
        momentumScore: Math.max(0, Math.min(15, 7 + dayReturnPct * 1.5)),
        liquidityScore: q.volume > 1_000_000 ? 5 : 3,
        fundamentalScore: 10,
      };
    });

    const recommendations = snapshots
      .map((s) => generateRecommendation(s, false))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const equalAlloc = capital / Math.max(1, recommendations.length);
    const allocation = recommendations.map((r) => {
      const sized = positionSize({
        capital,
        risk: riskAppetite,
        entry: r.entry,
        stopLoss: r.stopLoss,
        allocCapital: equalAlloc,
      });
      return {
        symbol: r.symbol,
        shares: sized.shares,
        usedCapital: Number(sized.usedCapital.toFixed(2)),
      };
    });

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      source: 'YAHOO',
      quotes,
      recommendations,
      allocation,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
