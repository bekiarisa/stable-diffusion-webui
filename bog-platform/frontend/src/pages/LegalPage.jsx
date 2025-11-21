function LegalPage() {
  return (
    <div className="space-y-16 px-6 py-16">
      <section className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-white">Legal & Compliance</h1>
        <p className="mt-4 text-white/70">
          B.O.G operates under CySEC guidelines with rigorous KYC/AML screening, audited smart contracts, and transparent investo
r disclosures.
        </p>
      </section>
      <section id="kyc" className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white">KYC / AML Verification</h2>
        <p className="mt-3 text-sm text-white/70">
          We partner with Onfido and Sumsub to validate investor identities and ensure compliance with EU AMLD5 requirements. Sub
mit your documents securely through the investor dashboard to unlock token purchases and referral tiers.
        </p>
        <a
          href="https://onfido.com"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
        >
          Start Verification
        </a>
      </section>
      <section id="audits" className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Smart Contract Audit</h3>
          <p className="mt-3 text-sm text-white/70">
            Independent audit by OceanSec Labs verifying BOG BEP-20 contract and ICO vesting logic.
          </p>
          <a
            href="https://bscscan.com/address/0x3bb95b521AF86e01C1A50578875ADbb1222b6e4b"
            className="mt-4 inline-block rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
          >
            View on BscScan
          </a>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Disclaimers</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>Investing in digital assets involves risk. Never invest more than you can afford to lose.</li>
            <li>BOG tokens do not represent equity; they provide utility and governance access.</li>
            <li>Compliance documents available upon request: Terms, Privacy, Risk Statement.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default LegalPage;
