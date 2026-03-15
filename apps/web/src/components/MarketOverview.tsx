export function MarketOverview() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="font-semibold text-lg mb-3">Market Overview (NIFTY / BANKNIFTY / Breadth)</h2>
      <div className="grid md:grid-cols-3 gap-3">
        {['Regime', 'Volatility', 'Breadth'].map((x) => (
          <div key={x} className="rounded-xl border border-slate-800 bg-slate-950 p-3">
            <p className="text-slate-400 text-xs">{x}</p>
            <p className="font-semibold">Live data panel</p>
          </div>
        ))}
      </div>
    </div>
  );
}
