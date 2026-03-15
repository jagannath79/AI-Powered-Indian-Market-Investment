CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_preferences (
  user_id INT PRIMARY KEY REFERENCES users(id),
  risk_appetite TEXT NOT NULL,
  default_horizon TEXT,
  preferred_universe TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE market_snapshots (
  id BIGSERIAL PRIMARY KEY,
  snapshot_time TIMESTAMPTZ NOT NULL,
  nifty_level NUMERIC,
  banknifty_level NUMERIC,
  breadth_advancers INT,
  breadth_decliners INT,
  regime TEXT,
  source TEXT NOT NULL
);

CREATE TABLE stock_quotes (
  id BIGSERIAL PRIMARY KEY,
  symbol TEXT NOT NULL,
  quote_time TIMESTAMPTZ NOT NULL,
  open NUMERIC,
  high NUMERIC,
  low NUMERIC,
  close NUMERIC,
  prev_close NUMERIC,
  volume BIGINT,
  source TEXT NOT NULL
);

CREATE TABLE stock_indicators (
  id BIGSERIAL PRIMARY KEY,
  symbol TEXT NOT NULL,
  as_of TIMESTAMPTZ NOT NULL,
  rsi NUMERIC,
  macd NUMERIC,
  adx NUMERIC,
  atr NUMERIC,
  supertrend_signal TEXT,
  sma20 NUMERIC,
  sma50 NUMERIC,
  sma200 NUMERIC
);

CREATE TABLE stock_fundamentals (
  id BIGSERIAL PRIMARY KEY,
  symbol TEXT NOT NULL,
  as_of DATE NOT NULL,
  pe NUMERIC,
  pb NUMERIC,
  roe NUMERIC,
  roce NUMERIC,
  debt_to_equity NUMERIC,
  market_cap NUMERIC,
  revenue_growth NUMERIC,
  profit_growth NUMERIC
);

CREATE TABLE stock_scores (
  id BIGSERIAL PRIMARY KEY,
  symbol TEXT NOT NULL,
  as_of TIMESTAMPTZ NOT NULL,
  total_score NUMERIC NOT NULL,
  confidence_band TEXT NOT NULL,
  suitability_band TEXT NOT NULL,
  score_breakdown JSONB NOT NULL
);

CREATE TABLE recommendations (
  id BIGSERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  symbol TEXT NOT NULL,
  action TEXT NOT NULL,
  opportunity_type TEXT NOT NULL,
  entry_price NUMERIC,
  stop_loss NUMERIC,
  target_1 NUMERIC,
  target_2 NUMERIC,
  risk_reward NUMERIC,
  confidence_score NUMERIC,
  rationale TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE allocation_plans (
  id BIGSERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  total_capital NUMERIC NOT NULL,
  deployed_capital NUMERIC NOT NULL,
  cash_reserve NUMERIC NOT NULL,
  plan JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE watchlists (
  id BIGSERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  symbol TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE historical_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  event_type TEXT NOT NULL,
  payload JSONB,
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE alerts (
  id BIGSERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  symbol TEXT,
  condition TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE backtest_runs (
  id BIGSERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  strategy_name TEXT NOT NULL,
  run_params JSONB NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
