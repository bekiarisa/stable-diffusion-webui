function IndiegogoEmbed() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Indiegogo Campaign</h2>
          <p className="mt-3 text-sm text-white/70">
            Support B.O.G&apos;s underwater data center vision on Indiegogo. Watch the pitch, share with your network, and track liv
            e fundraising momentum.
          </p>
          <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl">
            <iframe
              title="Indiegogo Campaign"
              src="https://www.youtube.com/embed/2vjPBrBU-TM"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">
          <h3 className="text-lg font-semibold text-white">Live Crowdfunding</h3>
          <p className="mt-2 text-4xl font-bold text-glow">$1,245,330</p>
          <p className="text-xs uppercase tracking-wide text-white/60">Raised of $2,000,000 goal</p>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-ocean-500 to-glow" />
          </div>
          <ul className="mt-6 space-y-3">
            <li>🎯 Stretch Goal 1 – $1.5M: Deploy second Cyprus node</li>
            <li>🌊 Stretch Goal 2 – $2.0M: Launch Aegean research partnership</li>
            <li>🌐 Stretch Goal 3 – $3.0M: Expand to Singapore blue corridor</li>
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="https://www.indiegogo.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-glow/20 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-glow"
            >
              Support on Indiegogo
            </a>
            <a
              href="/token-sale"
              className="rounded-full border border-white/30 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white"
            >
              Buy Tokens Directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndiegogoEmbed;
