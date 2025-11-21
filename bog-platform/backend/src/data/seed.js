export const documents = {
  whitepaper: {
    id: 'whitepaper',
    title: 'Blue Ocean Grid Whitepaper',
    summary:
      'The B.O.G whitepaper details the architecture for subaquatic, current-powered data centers and the BEP-20 BOG utility token that fuels staking, governance, and compute leasing.',
    highlights: [
      'Modular Ocean Nodes anchored 1,200m below sea level with energy harvested from currents.',
      'Thermal exchange with deep water keeps compute arrays at peak efficiency without external power.',
      'BOG token governs access to compute lanes, staking rewards, and DAO votes for new deployments.'
    ]
  },
  investorPlan: {
    id: 'investor-plan',
    title: 'Investor Acceleration Plan',
    summary:
      'The investor plan breaks down the commercialization strategy, partnership funnel, and five-year revenue projections for enterprise compute and DAO-managed nodes.',
    highlights: [
      'Tiered pricing for GPU batches with carbon-negative certification.',
      'Partnership roadmap with maritime research hubs in Cyprus and Greece.',
      'DAO treasury model that routes 22% of net profits to community reinvestment.'
    ]
  },
  tokenomics: {
    id: 'tokenomics',
    title: 'Tokenomics & Allocation',
    summary:
      'Token supply is fixed at 100M BOG with multi-year vesting across founders, community programs, liquidity, and partner funds.',
    highlights: [
      'Founders allocation locked for 36 months with quarterly cliffs.',
      'Crowdfunding tranche earmarked for Ocean Node expansion and regulatory filings.',
      'Staking rewards escalate when DAO votes activate the Blue Ocean governance layer.'
    ]
  },
  roadmap: {
    id: 'roadmap',
    title: 'Roadmap 2025 – 2030',
    summary:
      'Deployment milestones chart expansion from Cyprus HQ to a planetary-scale ocean compute mesh managed by the B.O.G DAO.',
    highlights: [
      '2025: Launch Cyprus HQ and first Ocean Node pilot.',
      '2026: Commission Aegean hub with EU-backed sustainability lab.',
      '2028+: Activate autonomous oceanic compute corridors with AI-driven maintenance drones.'
    ]
  }
};

export const seedState = {
  tokenPriceUSD: 0.12,
  conversions: {
    USD: 1,
    USDT: 1,
    BNB: 520,
    ETH: 3200
  },
  totals: {
    soldTokens: 17250000,
    raisedUSD: 2070000
  },
  phases: [
    {
      id: 'whitelist',
      label: 'Prelaunch Whitelist Phase',
      allocationTokens: 12000000,
      soldTokens: 11000000,
      benefits: '12% bonus + referral boosters'
    },
    {
      id: 'presale',
      label: 'Presale Phase',
      allocationTokens: 18000000,
      soldTokens: 6250000,
      benefits: '8% bonus + hardware NFT airdrop'
    },
    {
      id: 'public',
      label: 'Public Launch Phase',
      allocationTokens: 20000000,
      soldTokens: 0,
      benefits: 'Staking rewards activate with DAO governance'
    }
  ],
  purchases: [
    {
      id: 'PR-20240510-001',
      wallet: '0xf3a92fd0e8f1a0de4f1e4cf82b1e4c14b58f65c6',
      currency: 'USDT',
      amount: 25000,
      usdValue: 25000,
      tokenAmount: 208333.33,
      phaseId: 'whitelist',
      timestamp: '2024-05-10T09:24:00.000Z'
    },
    {
      id: 'PR-20240518-014',
      wallet: '0x84cE3905d1c7E5a5218cB5b59D5C41C9239DE724',
      currency: 'BNB',
      amount: 180,
      usdValue: 93600,
      tokenAmount: 780000,
      phaseId: 'presale',
      timestamp: '2024-05-18T18:40:12.000Z'
    },
    {
      id: 'PR-20240602-031',
      wallet: '0x32e17F8D55D5862dD93C9125C0b9bf2D84b9b6eF',
      currency: 'ETH',
      amount: 48,
      usdValue: 153600,
      tokenAmount: 1280000,
      phaseId: 'presale',
      timestamp: '2024-06-02T13:15:04.000Z'
    }
  ],
  investors: {
    '0xf3a92fd0e8f1a0de4f1e4cf82b1e4c14b58f65c6': {
      wallet: '0xf3a92fd0e8f1a0de4f1e4cf82b1e4c14b58f65c6',
      referrals: 24,
      referralVolumeUSD: 186000,
      claimedRewardsTokens: 13650,
      notifications: [
        'Ocean Node profit share statement available in dashboard.',
        'DAO vote #3 opens in 3 days: Approve Aegean robotics lab partnership.',
        'Reminder: Lock tokens for 90-day staking to unlock 18% APY tier.'
      ],
      staking: {
        annualYield: '18%',
        oceanNodeShare: '0.92%'
      },
      vestingEnd: '2027-06-01'
    }
  },
  crowdfunding: {
    campaignUrl: 'https://www.indiegogo.com/projects/blue-ocean-grid',
    goalUSD: 800000,
    raisedUSD: 562000,
    supporters: 812,
    stretchGoals: [
      { milestone: 600000, title: 'Deploy Aegean sensor array', achieved: false },
      { milestone: 750000, title: 'Launch DAO-operated research grants', achieved: false },
      { milestone: 1000000, title: 'Commission Atlantic Ocean Node', achieved: false }
    ],
    topBackers: [
      { name: 'AquaVentures DAO', amountUSD: 50000 },
      { name: 'Mediterranean Green Fund', amountUSD: 42000 },
      { name: 'Poseidon Labs', amountUSD: 32000 }
    ]
  }
};
