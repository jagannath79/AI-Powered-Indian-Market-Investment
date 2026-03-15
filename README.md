# AI-Powered Indian Market Investment Intelligence Platform

Enterprise-grade blueprint + implementation starter for a live-data Indian equity decision-support platform.

## 1) Product Vision
A premium intelligence platform that helps Indian investors and traders decide **whether to deploy capital now**, **where to deploy**, and **how much risk to take**, using live market context, stock-level analytics, and transparent explainability.

## 2) Solution Architecture
- **Frontend**: Next.js + TypeScript + Tailwind (premium dashboard, drill-down analytics)
- **API Layer**: Node/Next API routes for orchestration
- **Analytics Service**: TypeScript service (indicator, scoring, recommendation, allocation engines)
- **Data Adapter Layer**:
  - `YahooFinanceAdapter`
  - `NseAdapter`
  - unified `MarketDataProvider` interface
- **Storage**: PostgreSQL schema + caching (Redis-ready)
- **Scheduler**: periodic market snapshots + fundamentals refresh
- **Guardrails**: confidence bands, missing-data flags, disclaimer gating

## 3) Application Modules
1. Market Overview Dashboard
2. User Profile + Capital Input
3. Market Regime Engine
4. Opportunity Ranking Engine
5. Strategy Suitability Engine (Intraday/Swing/Positional/Long-term)
6. Capital Allocation Planner
7. Stock Drilldown + Explainability
8. Risk Control Panel
9. Watchlist & Alerts
10. Recommendation History + Backtest/Paper mode

## 4) User Journey
1. User enters capital, risk profile, horizon, goal, optional sector/universe.
2. Platform fetches live quotes/index breadth and recent OHLCV.
3. Market regime is classified (Bullish/Sideways/Bearish/High Volatility Risk).
4. Stocks are scored on trend, momentum, volume, risk, fundamentals.
5. Engine maps each stock to best strategy style.
6. Allocation engine computes position sizing, share counts, cash reserve.
7. UI presents recommendations + rejected ideas + reasons + risk notes.

## 5) Data Flow
1. `client -> /api/analyze`
2. API fetches data via adapter (`/api/market`, `/api/stocks`)
3. Analytics pipeline:
   - normalize
   - compute indicators
   - score/rank
   - risk filter
   - allocation
   - explainability summary
4. Persist snapshots, scores, recommendation plans.
5. Return dashboard payload with metadata (`dataQuality`, `lastUpdatedIST`).

## 6) Capital Allocation Engine Logic
Key configurable controls:
- `maxRiskPerTradePct`: Conservative 0.5%, Moderate 1.0%, Aggressive 1.5%
- `maxSectorExposurePct`: 25-40%
- `cashReservePct`: 10-40% (market regime dependent)
- `maxOpenPositions`: by capital band

Position sizing formula:
- `riskCapitalPerTrade = totalCapital * maxRiskPerTradePct`
- `stopDistance = abs(entry - stopLoss)`
- `sharesByRisk = floor(riskCapitalPerTrade / stopDistance)`
- `sharesByCapital = floor(allocCapital / entry)`
- `finalShares = min(sharesByRisk, sharesByCapital)`

Capital bands:
- **₹1,000–₹9,999**: max 1 idea; if stop impractical -> hold cash/watchlist
- **₹10,000–₹99,999**: 1–3 positions
- **₹1,00,000+**: 3–8 diversified positions

## 7) Recommendation Engine Logic
Decision pipeline:
1. **Market Gate**: if regime risk high, tighten thresholds or switch to WAIT mode.
2. **Stock Eligibility**: liquidity, spread, min volume, data completeness.
3. **Scoring**: weighted composite out of 100.
4. **Strategy Suitability**:
   - Intraday: high liquidity + intraday trend confirmation + manageable ATR
   - Swing: breakout/pullback + daily momentum + volume confirmation
   - Positional/Long-term: fundamentals + multi-month trend + valuation sanity
5. **Action**:
   - BUY / WATCH / AVOID / WAIT
6. **Risk Plan**: entry range, stop loss, target1/2, R:R, confidence.

## 8) Scoring Model (100)
- Trend score: 15
- Momentum score: 10
- Volume confirmation: 10
- Breakout quality: 10
- Indicator alignment: 10
- Fundamental quality: 15
- Valuation: 10
- Risk score: 10
- Liquidity score: 5
- Sector strength: 5

Adjustments:
- `marketRegimeAdjustment`: -10 to +5
- `dataQualityPenalty`: up to -15

Confidence bands:
- 85+: Very High
- 70–84: High
- 55–69: Medium
- <55: Low

## 9) Risk Management Framework
- Max capital-at-risk per idea shown explicitly in INR + %
- Volatility-adjusted stops via ATR multipliers
- Sector concentration cap
- Portfolio drawdown guardrail (cut deployment after threshold)
- Event risk flags (earnings, macro events)
- “No quality setup” mode with capital preservation messaging

## 10) Dashboard Layout & Screen Breakdown
- **Top Sticky Bar**: capital, deployed, cash reserve, regime badge, IST clock
- **Row 1**: NIFTY/BANKNIFTY trend cards, breadth, VIX/volatility card
- **Row 2**: Opportunity ranking table + confidence gauges
- **Row 3**: Intraday, Swing, Long-term recommendation lanes
- **Row 4**: Allocation pie, sector exposure, risk distribution charts
- **Row 5**: rejected opportunities and why
- **Detail Screen**: technicals, fundamentals, risk, setup rationale, chart zones

## 11) Database Schema
See `db/schema.sql` for production-ready starter schema with required tables:
- users, user_preferences
- market_snapshots, stock_quotes, stock_indicators, stock_fundamentals
- stock_scores, recommendations, allocation_plans
- watchlists, historical_logs, alerts, backtest_runs

## 12) API Route Structure
- `GET /api/market/overview`
- `POST /api/analyze`
- `GET /api/stocks/:symbol`
- `GET /api/recommendations/latest`
- `POST /api/watchlist`
- `GET /api/alerts`
- `POST /api/backtest/run`

## 13) UI Design Language
- Finance-grade cards with density tiers
- Dark/light themes
- Semantic colors (bullish green, bearish red, caution amber)
- Modular chart-first layouts
- Explainability panels with “Why this recommendation” chips
- Indian formatting: `₹`, lakh/crore labels, IST timestamps

## 14) Phase-wise Implementation
### Phase 1 (Completed in this repo)
- Product architecture and design blueprint
- Data model, scoring logic, recommendation flow, allocation formulas

### Phase 2 (Scaffolded)
- Folder structure for web/api/analytics
- Adapter interface + Yahoo/NSE adapter stubs
- API contract + analysis pipeline placeholders
- SQL schema

### Phase 3 (Scaffolded UI)
- Premium dashboard shell and module cards in React
- Input panel and recommendation sections

### Phase 4 (Scaffolded engines)
- Indicator, scoring, recommendation, allocation modules
- Explainability payload structure

### Phase 5 (Testing/deployment plan)
- Add integration tests for adapter and analysis routes
- Add data quality monitors and fallback states
- Deploy web + api + worker with scheduler and cache

## Live Data Compliance Note
This implementation uses **adapter interfaces and real endpoint stubs** to ensure no mock stock values are hardcoded. If an upstream feed is unavailable, the UI must show “data unavailable” with timestamp and source status instead of fabricated values.

## Disclaimer
Decision-support only. Not investment advice. Markets involve risk. Verify all outputs before execution.
