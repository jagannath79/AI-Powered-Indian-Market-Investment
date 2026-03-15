import { MarketDataProvider, Quote } from './data-adapter';

export class NseAdapter implements MarketDataProvider {
  async getQuote(_symbol: string): Promise<Quote> {
    throw new Error('NSE adapter endpoint wiring pending compliance-approved integration.');
  }

  async getQuotes(symbols: string[]): Promise<Quote[]> {
    return Promise.all(symbols.map((s) => this.getQuote(s)));
  }
}
