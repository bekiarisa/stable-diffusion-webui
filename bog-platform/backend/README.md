# B.O.G Backend (Node.js + Express)

This service powers the ICO dashboard, investor app, AI assistant, and compliance workflows for the B.O.G platform.

## Features
- Express REST API with modular routing and OpenAPI documentation.
- In-memory data store seeded with realistic ICO metrics, crowdfunding stats, and investor records so the app runs without external dependencies.
- AI assistant responses generated from curated B.O.G knowledge, enabling deterministic behaviour in offline demos.
- Optional Indiegogo and Onfido integrations – when environment variables are present the service calls the live APIs, otherwise it falls back to cached data.
- Admin and investor endpoints that surface token sale performance, referral progress, and staking projections.
- Security hardening out of the box: rate limiting, CORS, Helmet, structured validation, and consistent error handling.

## Getting Started
```bash
cd bog-platform/backend
npm install
npm run dev
```

Create `.env` from `.env.example` (all variables are optional – the backend works offline with its seed data).

## Environment Variables
| Variable | Description |
| --- | --- |
| `PORT` | API port |
| `TOKEN_CONTRACT_ADDRESS` | BEP-20 token address |
| `INDIEGOGO_CAMPAIGN_ID` | Campaign identifier for pulling live stats |
| `ONFIDO_TOKEN` | Onfido API token |

## Scripts
- `npm run dev` – Start development server with nodemon
- `npm run start` – Production start
- `npm run lint` – ESLint checks
- `npm run test` – Jest tests (stubs)

## API Overview
- `GET /api/ico/metrics` – Live ICO statistics
- `POST /api/ico/purchase` – Deterministic order logging with automatic progress tracking
- `GET /api/investor/portfolio` – Investor balances, rewards, referrals
- `POST /api/ai` – B.O.Genius chat proxy
- `POST /api/ai/summarize` – Document summarization
- `POST /api/kyc/start` – Initiate KYC verification
- `POST /api/kyc/webhook` – Receive KYC provider updates
- `GET /api/admin/dashboard` – Admin analytics (protected)

Refer to `src/docs/openapi.yaml` for the complete specification.
