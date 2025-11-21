# B.O.G ICO Launch Platform

This monorepo contains a full-stack implementation of the **B.O.G – Blue Ocean Grid** ICO launch experience, including a responsive React PWA front-end, a Node.js/Express backend API, and shared assets for the B.O.Genius AI assistant.

## Structure

```
bog-platform/
├── frontend/   # React + Tailwind + Vite PWA
├── backend/    # Express API, AI assistant, ICO metrics, and KYC integrations
└── README.md   # Project overview (this file)
```

### Frontend Highlights
- Multi-page marketing site with routes for Home, About, Token Sale, Investor dashboard, Tokenomics, Whitepaper, and Legal.
- Tailwind-driven oceanic theme with animated hero section, roadmap visualizations, tokenomics charts, and Indiegogo integration widgets.
- Web3 wallet onboarding, real-time ICO metrics, referral tracking, staking previews, and downloadables for whitepaper / investor plan.
- "B.O.Genius" AI assistant widget embedded sitewide with multilingual support.
- Progressive Web App (PWA) support with offline shell, installable manifest, and push notification scaffolding.

### Backend Highlights
- Express server with modular routes for ICO metrics, investor portfolios, staking simulations, referrals, AI chat proxy, KYC status, and admin controls.
- Deterministic in-memory data store that seeds realistic token sale figures, crowdfunding stats, and investor accounts so demos run without a database.
- AI integration powered by a curated B.O.G knowledge base that answers investor questions offline while still supporting future API providers.
- Optional external integrations (Indiegogo for crowdfunding stats, Onfido for KYC) that gracefully fall back to cached data when credentials are absent.
- Security middleware for rate limiting, Helmet, CORS, structured validation, and consistent error responses.

### Getting Started
Please refer to the individual `README.md` files inside `frontend/` and `backend/` for setup instructions, environment variables, and deployment guidance.
