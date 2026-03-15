import { MarketDataProvider, Quote } from './data-adapter';

export class YahooFinanceAdapter implements MarketDataProvider {
  async getQuote(symbol: string): Promise<Quote> {
    const resp = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbol)}`);
    if (!resp.ok) throw new Error(`Yahoo quote failed: ${resp.status}`);
    const data = await resp.json();
    const q = data?.quoteResponse?.result?.[0];
    if (!q) throw new Error(`No quote for ${symbol}`);

    return {
      symbol: q.symbol,
      price: q.regularMarketPrice,
      open: q.regularMarketOpen,
      high: q.regularMarketDayHigh,
      low: q.regularMarketDayLow,
      prevClose: q.regularMarketPreviousClose,
      volume: q.regularMarketVolume,
      timestamp: new Date((q.regularMarketTime ?? Date.now() / 1000) * 1000).toISOString(),
      source: 'YAHOO',
    };
  }

  async getQuotes(symbols: string[]): Promise<Quote[]> {
    return Promise.all(symbols.map((s) => this.getQuote(s)));
  }
}
