# Betika Predict — Smart Contracts (Testnet Demo)

Real, on-chain prediction market contracts, meant for **Polygon Amoy
testnet only** — everything here uses free test tokens with no real
value. Do not deploy this to Polygon mainnet without a professional
security audit and legal review; it has not been audited.

## What's actually "real" here
- Real Solidity contracts, compiled and deployed on-chain
- Real wallet transactions (MetaMask signs and pays gas, just testnet gas)
- Real on-chain escrow: USDC you deposit is genuinely locked in the
  contract until the market resolves
- Real payouts: winners call `claim()` and the contract transfers real
  (test) USDC to their wallet

## What's simplified vs. real Polymarket
| Real Polymarket | This demo |
|---|---|
| Central limit order book (CLOB), buy/sell at any price | Pari-mutuel pool — price is just yesPool / (yesPool + noPool) |
| UMA decentralized oracle resolves markets | A single admin address (the factory owner) resolves manually |
| Real USDC on Polygon mainnet | MockUSDC — a free, unlimited test token |
| Audited, billions in volume | Unaudited, built for learning |

## Contracts
- `MockUSDC.sol` — free test token with a public `faucet()` anyone can call
- `PredictionMarket.sol` — one binary YES/NO market: `buyYes`, `buyNo`,
  `resolve` (admin only), `claim`
- `MarketFactory.sol` — deploys new `PredictionMarket`s and keeps a
  registry (`getAllMarkets()`) the frontend can read

## Setup
```bash
npm install
cp .env.example .env
# paste a TESTNET-ONLY wallet's private key into .env — see below
```

### Get a testnet-only wallet
1. Open MetaMask, click your account icon → **Add account** → create a
   brand new one you'll only ever use for testing. Never reuse a wallet
   that holds real funds.
2. Account details → **Show private key** → paste it into `.env` as
   `PRIVATE_KEY`.
3. Add the Polygon Amoy network to MetaMask if it's not already there
   (chain ID `80002`, RPC `https://rpc-amoy.polygon.technology`).
4. Get free test MATIC (for gas) from
   [faucet.polygon.technology](https://faucet.polygon.technology) — select
   "Amoy" and paste your new wallet's address.

## Compile & test
```bash
npm run compile
npm test
```

## Deploy to Amoy
```bash
npm run deploy:amoy
```
This deploys `MockUSDC` and `MarketFactory`, mints you 1,000 test USDC,
and creates one starter market. Copy the two printed addresses
(`VITE_USDC_ADDRESS` and `VITE_FACTORY_ADDRESS`) — the frontend needs them.

## Get more test USDC later
```bash
npm run faucet:amoy
```

## Wiring this into the frontend
This is a separate project from `betika-prediction-market` (the React
app). To connect them:
1. Add `VITE_USDC_ADDRESS` and `VITE_FACTORY_ADDRESS` to the frontend's
   `.env`.
2. Copy the ABI JSON files from `artifacts/contracts/*.sol/*.json`
   (after `npm run compile`) into the frontend, e.g. `src/contracts/`.
3. Replace `useMarketPrices`/mock buy logic with `useReadContract` /
   `useWriteContract` from wagmi, calling `buyYes`/`buyNo`/`claim` on
   the deployed `PredictionMarket` addresses returned by
   `factory.getAllMarkets()`.
