import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useState } from 'react';

const allocation = [
  { name: 'Founders (Locked)', value: 40, color: '#0e7490' },
  { name: 'Crowdfunding / ICO', value: 25, color: '#06b6d4' },
  { name: 'Exchange Liquidity', value: 15, color: '#22d3ee' },
  { name: 'Development Fund', value: 10, color: '#38f8ff' },
  { name: 'Partnerships', value: 5, color: '#67e8f9' },
  { name: 'Community Rewards', value: 5, color: '#cffafe' }
];

function TokenomicsSection() {
  const [supply, setSupply] = useState(1000000000);
  const [price, setPrice] = useState(0.12);

  const marketCap = (supply * price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <section className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr,1fr]">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white">Token Allocation</h2>
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={allocation} innerRadius={80} outerRadius={120} dataKey="value" paddingAngle={4}>
                {allocation.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#020617', borderRadius: '12px', border: '1px solid rgba(56,248,255,0.4)' }}
                itemStyle={{ color: '#ffffff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-6 grid gap-2 text-sm text-white/70 md:grid-cols-2">
          {allocation.map((item) => (
            <li key={item.name} className="flex items-center gap-3">
              <span className="h-2 w-6 rounded-full" style={{ background: item.color }} />
              {item.name} – {item.value}%
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Vesting Schedule</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>Founders locked for 24 months, then linear release over 36 months.</li>
            <li>Development fund releases quarterly to support R&D and AI superpods.</li>
            <li>Community rewards distributed via staking and DAO missions.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Market Cap Simulator</h3>
          <label className="mt-3 block text-xs uppercase tracking-wide text-white/60">Total Supply</label>
          <input
            type="number"
            value={supply}
            onChange={(event) => setSupply(Number(event.target.value))}
            className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-glow focus:outline-none"
          />
          <label className="mt-4 block text-xs uppercase tracking-wide text-white/60">Token Price (USD)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
            className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-glow focus:outline-none"
          />
          <div className="mt-4 rounded-2xl border border-glow/40 bg-glow/10 p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-white/60">Projected Market Cap</p>
            <p className="mt-2 text-3xl font-semibold text-glow">${marketCap}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TokenomicsSection;
