import WhitepaperViewer from '../components/WhitepaperViewer.jsx';

function WhitepaperPage() {
  return (
    <div className="space-y-16 px-6 py-16">
      <section className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-white">Whitepaper & Business Plan</h1>
        <p className="mt-4 text-white/70">
          Review the full technical vision, tokenomics, and investor readiness plan. Ask B.O.Genius to summarize any section in s
 econds.
        </p>
      </section>
      <WhitepaperViewer />
    </div>
  );
}

export default WhitepaperPage;
