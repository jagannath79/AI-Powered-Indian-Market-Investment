'use client';

import { useState } from 'react';

type AnalyzeResponse = {
  generatedAt: string;
  source: string;
  quotes: Array<{ symbol: string; price: number; volume: number }>;
  recommendations: Array<{ symbol: string; action: string; style: string; score: number; confidence: string; entry: number; stopLoss: number; target1: number; target2: number }>;
  allocation: Array<{ symbol: string; shares: number; usedCapital: number }>;
};

export function CapitalInputPanel() {
  const [capital, setCapital] = useState('100000');
  const [risk, setRisk] = useState('Moderate');
  const [symbols, setSymbols] = useState('RELIANCE.NS,TCS.NS,HDFCBANK.NS,INFY.NS');
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          capital: Number(capital),
          riskAppetite: risk,
          symbols: symbols.split(',').map((s) => s.trim()).filter(Boolean),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Analysis failed');
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="font-semibold text-lg mb-3">Capital & Risk Profile</h2>
      <div className="space-y-3 text-sm text-slate-300">
        <div>Capital (INR)</div>
        <input value={capital} onChange={(e) => setCapital(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2" />
        <div>Risk Appetite</div>
        <select value={risk} onChange={(e) => setRisk(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2">
          <option>Conservative</option><option>Moderate</option><option>Aggressive</option>
        </select>
        <div>Symbols (Yahoo NSE format)</div>
        <input value={symbols} onChange={(e) => setSymbols(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2" />
        <button disabled={loading} onClick={run} className="w-full bg-emerald-600 rounded-xl p-2 font-medium disabled:opacity-60">{loading ? 'Analyzing...' : 'Run Live Analysis'}</button>
        {error ? <p className="text-rose-400">{error}</p> : null}
        {data ? (
          <div className="mt-2 text-xs space-y-1">
            <p className="text-slate-400">Source: {data.source} | {new Date(data.generatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            {data.recommendations.map((r) => (
              <div key={r.symbol} className="border border-slate-700 rounded-lg p-2">
                <div className="font-semibold">{r.symbol} • {r.action} • {r.style}</div>
                <div>Score {r.score} ({r.confidence}) | Entry ₹{r.entry} | SL ₹{r.stopLoss} | T1 ₹{r.target1}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
