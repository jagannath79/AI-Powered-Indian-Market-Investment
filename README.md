# AI-Powered Indian Market Investment Intelligence Platform

This repository now contains a **functional MVP** with a runnable Next.js app that fetches **live market quotes** from Yahoo Finance, computes basic scores/recommendations, and performs risk-based position sizing in INR.

## What is implemented now
- Live quote adapter (`YahooFinanceAdapter`) using Yahoo quote endpoint.
- API route `POST /api/analyze` that:
  - accepts capital, risk appetite, and symbols
  - fetches live quotes
  - builds stock snapshots from real quote values
  - generates recommendations (BUY/WATCH/AVOID + style + SL/T1/T2)
  - computes position sizing allocation
- Interactive dashboard panel to run analysis from the browser.
- Database schema starter for production expansion.

## Run locally
```bash
cd apps/web
npm install
npm run dev
```
Open: `http://localhost:3000`

## API Example
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "content-type: application/json" \
  -d '{
    "capital": 100000,
    "riskAppetite": "Moderate",
    "symbols": ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS"]
  }'
```

## Current architecture
- `apps/web`: Next.js UI + API route
- `services/api`: data adapter layer (Yahoo + NSE placeholder)
- `services/analytics`: scoring, recommendation, allocation engines
- `db/schema.sql`: core persistence model

## Important guardrails
- No hardcoded fake stock quotes are used.
- If data provider fails, API returns explicit error.
- Output is decision-support only.

## Disclaimer
Educational/informational only. Not investment advice. Markets involve risk.
