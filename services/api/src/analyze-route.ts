import { YahooFinanceAdapter } from './yahoo-adapter';

export async function analyze(symbols: string[]) {
  const provider = new YahooFinanceAdapter();
  const quotes = await provider.getQuotes(symbols);
  return {
    generatedAt: new Date().toISOString(),
    source: 'YAHOO',
    quotes,
  };
}
