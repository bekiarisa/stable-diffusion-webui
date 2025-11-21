# B.O.G Frontend (React + Vite + Tailwind)

The B.O.G ICO launch platform front-end delivers a cinematic, ocean-inspired experience with Web3 wallet onboarding, token sale dashboards, and an integrated AI assistant named **B.O.Genius**.

## Features
- **Responsive Marketing Site** with hero animations, roadmap timeline, partner hubs, and storytelling for the underwater data center vision.
- **Token Sale Dashboard** with wallet connection, live metrics, ICO phase progress, referral tracking, and staking previews.
- **Investor App** for balances, rewards, DAO notices, and personal investment goals.
- **Tokenomics Visualizations** using interactive charts and simulators.
- **Crowdfunding Widgets** pulling Indiegogo statistics and stretch milestones.
- **Legal & Compliance** center for KYC/AML verification, document downloads, and audit proofs.
- **B.O.Genius AI Assistant** overlay with multilingual Q&A, whitepaper summarization, and guided purchase flows.
- **Progressive Web App** manifest, offline caching shell, and install prompts for mobile devices.

## Tech Stack
- [React 18](https://react.dev/) with [Vite](https://vitejs.dev/) bundler
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Router](https://reactrouter.com/) for SPA routing
- [Recharts](https://recharts.org/) for charts and tokenomics visuals
- [Ethers.js](https://docs.ethers.io/) for Binance Smart Chain interactions
- [i18next](https://www.i18next.com/) for multilingual support
- [Workbox](https://developer.chrome.com/docs/workbox) powered service worker for PWA

## Getting Started
```bash
cd bog-platform/frontend
npm install
npm run dev
```

### Environment Variables
Create `.env` based on `.env.example` to configure API endpoints and AI keys. The app now falls back to `http://localhost:4000`
for API calls and Binance mainnet defaults when variables are not provided, so you can run the stack locally without extra
configuration.

| Variable | Description |
| --- | --- |
| `VITE_API_BASE_URL` | Backend API base path (e.g., `https://api.blueoceangrid.io`) |
| `VITE_AI_ENDPOINT` | AI assistant proxy endpoint |
| `VITE_BSC_RPC_URL` | Binance Smart Chain RPC provider |
| `VITE_TOKEN_ADDRESS` | BOG token contract address (defaults to `0x3bb95b521AF86e01C1A50578875ADbb1222b6e4b`) |
| `VITE_CHAIN_ID` | Chain ID for BSC mainnet (56) or testnet (97) |

## Scripts
- `npm run dev` – Start Vite dev server with hot reload
- `npm run build` – Production build
- `npm run preview` – Preview built app
- `npm run lint` – ESLint + Prettier checks
- `npm run test` – Vitest component tests (placeholders)

## Testing
Run unit tests using Vitest and React Testing Library.
```bash
npm run test
```

## Deployment
1. Build the project: `npm run build`
2. Upload the `dist/` folder to Vercel, Netlify, or AWS S3 + CloudFront.
3. Ensure environment variables and service worker scope match production domain.

## Design Assets
Design tokens, logo animations, and 3D ocean renders can be found in `src/assets/`.
