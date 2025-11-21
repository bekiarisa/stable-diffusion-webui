import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';

const documents = [
  { label: 'Whitepaper', url: '/docs/whitepaper.pdf' },
  { label: 'Investor Plan', url: '/docs/investor-plan.pdf' },
  { label: 'Tokenomics Chart', url: '/docs/tokenomics-chart.pdf' },
  { label: 'Roadmap', url: '/docs/roadmap.pdf' }
];

function WhitepaperViewer() {
  const [selected, setSelected] = useState(documents[0]);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/ai/summarize`, {
        document: selected.url
      });
      setSummary(data.summary);
    } catch (error) {
      console.error(error);
      setSummary('Unable to summarize at this time.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[2fr,1fr]">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Dynamic Viewer</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {documents.map((doc) => (
            <button
              key={doc.url}
              type="button"
              onClick={() => setSelected(doc)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                selected.url === doc.url
                  ? 'bg-glow/20 text-glow border border-glow/40'
                  : 'border border-white/20 text-white hover:border-glow'
              }`}
            >
              {doc.label}
            </button>
          ))}
        </div>
        <div className="mt-6 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
          <iframe title={selected.label} src={selected.url} className="h-full w-full" />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {documents.map((doc) => (
            <a
              key={doc.label}
              href={doc.url}
              download
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:border-glow"
            >
              Download {doc.label}
            </a>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white">AI Summaries</h3>
        <p className="mt-2 text-sm text-white/70">
          Ask B.O.Genius for a concise summary of the selected section.
        </p>
        <button
          type="button"
          onClick={summarize}
          className="mt-4 w-full rounded-full bg-glow/20 py-2 text-sm font-semibold uppercase tracking-wide text-glow hover:bg-glow/30"
        >
          {loading ? 'Summarizing...' : 'Summarize this document'}
        </button>
        <div className="mt-4 min-h-[120px] rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
          {summary || 'Summary will appear here.'}
        </div>
      </div>
    </section>
  );
}

export default WhitepaperViewer;
