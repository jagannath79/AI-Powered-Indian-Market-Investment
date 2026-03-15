export function CapitalInputPanel() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="font-semibold text-lg mb-3">Capital & Risk Profile</h2>
      <div className="space-y-3 text-sm text-slate-300">
        <div>Capital (INR)</div>
        <input className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2" placeholder="100000" />
        <div className="grid grid-cols-2 gap-2">
          <select className="bg-slate-950 border border-slate-700 rounded-xl p-2"><option>Moderate</option></select>
          <select className="bg-slate-950 border border-slate-700 rounded-xl p-2"><option>1M</option></select>
        </div>
        <button className="w-full bg-emerald-600 rounded-xl p-2 font-medium">Run Analysis</button>
      </div>
    </div>
  );
}
