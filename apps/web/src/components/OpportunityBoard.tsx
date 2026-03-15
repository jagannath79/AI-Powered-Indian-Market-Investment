const sections = ['Intraday Opportunities', 'Swing Opportunities', 'Long-term Opportunities'];

export function OpportunityBoard() {
  return (
    <div className="grid lg:grid-cols-3 gap-3">
      {sections.map((title) => (
        <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-slate-400 mt-2">Ranked ideas with entry, stop loss, target, allocation, confidence.</p>
        </div>
      ))}
    </div>
  );
}
