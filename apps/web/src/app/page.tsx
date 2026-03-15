import { CapitalInputPanel } from '../components/CapitalInputPanel';
import { MarketOverview } from '../components/MarketOverview';
import { OpportunityBoard } from '../components/OpportunityBoard';

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">AI-Powered Indian Market Investment Intelligence Platform</h1>
        <p className="text-slate-400">Live-data decision support • INR allocation • Risk-first recommendations</p>
      </header>
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-1"><CapitalInputPanel /></div>
        <div className="xl:col-span-2"><MarketOverview /></div>
      </section>
      <section className="mt-4">
        <OpportunityBoard />
      </section>
      <footer className="text-xs text-slate-500 mt-6">
        Informational/educational only. Not guaranteed financial advice.
      </footer>
    </main>
  );
}
