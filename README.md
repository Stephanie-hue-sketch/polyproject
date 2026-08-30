# Betika Predict

A prediction-market trading UI built with React 18 + TypeScript, Tailwind CSS,
shadcn/ui-style primitives, and wagmi + viem + RainbowKit for wallet
connectivity on Polygon (USDC settlement).

## Design tokens
- Primary `#0055FF` · Secondary (teal) `#00D4AA`
- Dark background `#0A0A1A`, light mode `#FFFFFF`
- Font: Inter · Radius: 8px
- Layout: two-panel — market list (40%, left) / trading interface (60%, right)

## Getting started
```bash
npm install
cp .env.example .env        # add a WalletConnect Cloud project id
npm run dev
```

## Structure
```
src/
  components/
    layout/         Navbar, WalletConnectButton (RainbowKit)
    markets/         MarketList, MarketCard
    trading/         TradingPanel (buy YES/NO, quantity slider, payout)
    portfolio/       PortfolioView, PnLChart (recharts)
    market-creation/ CreateMarketForm (question, category, end date, image)
    ui/              button, card, input, slider, tabs (shadcn-style)
  hooks/
    useMarketPrices  simulated live price feed (2.5s random walk)
    usePortfolio     derives portfolio value / P&L from positions
  lib/
    mockData.ts      seed markets & positions (swap for your indexer/API)
  wagmi.config.ts    Polygon chain + USDC address, RainbowKit config
```

## Wiring up real data
Everything trades against `src/lib/mockData.ts` and the simulated feed in
`useMarketPrices`. To go live:
1. Replace `useMarketPrices` with a websocket/subscription hook against your
   CLOB or indexer.
2. Replace the mock `handleSubmit` in `TradingPanel` and `CreateMarketForm`
   with real contract calls (`useWriteContract` from wagmi) against your
   market + factory contracts.
3. Add a real WalletConnect Cloud `projectId` in `.env`.
4. Resolve markets via your oracle (e.g. UMA's Optimistic Oracle) and flip
   `Market.resolved` / `Market.outcome` once settled.

This scaffold ships with **no smart contracts** — trading and market
creation are wired to local state/mocks so the UI is fully demoable without
a wallet balance or deployed contracts. Contract integration is intentionally
left as the next step for your engineering team to point at audited,
reviewed contracts.
