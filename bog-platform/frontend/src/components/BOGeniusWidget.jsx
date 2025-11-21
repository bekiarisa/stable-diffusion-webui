import { useState } from 'react';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { useAiAssistant } from '../context/AiAssistantContext.jsx';

function BOGeniusWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { history, sendMessage, loading } = useAiAssistant();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    try {
      await sendMessage(message.trim());
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 text-sm">
      {open && (
        <div className="w-80 overflow-hidden rounded-2xl border border-glow/40 bg-abyss/95 shadow-xl backdrop-blur">
          <div className="flex items-center gap-2 border-b border-white/10 bg-gradient-to-r from-abyss to-ocean-900 px-4 py-3">
            <SparklesIcon className="h-5 w-5 text-glow" />
            <div>
              <p className="text-sm font-semibold">B.O.Genius</p>
              <p className="text-xs text-white/60">Your oceanic AI investment guide</p>
            </div>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-3">
            {history
              .filter((entry) => entry.role !== 'system')
              .map((entry, index) => (
                <div
                  key={index}
                  className={`rounded-lg px-3 py-2 ${
                    entry.role === 'user' ? 'bg-glow/10 text-right text-white' : 'bg-white/5 text-left text-white/90'
                  }`}
                >
                  <p className="text-xs uppercase tracking-wide text-white/40">{entry.role === 'user' ? 'You' : 'B.O.Genius'}</p>
                  <p className="mt-1 whitespace-pre-line leading-relaxed">{entry.content}</p>
                </div>
              ))}
            {loading ? <p className="text-center text-xs text-white/60">Composing response...</p> : null}
          </div>
          <form onSubmit={handleSubmit} className="border-t border-white/10 bg-abyss/90 px-4 py-3">
            <div className="flex items-center gap-2">
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask about tokenomics, roadmap, KYC..."
                rows={2}
                className="flex-1 resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-white/40 focus:border-glow focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-glow/20 p-3 text-glow transition hover:bg-glow/30 disabled:opacity-60"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-ocean-500 to-glow px-4 py-2 text-sm font-semibold uppercase tracking-wide text-abyss shadow-glow"
      >
        <SparklesIcon className="h-5 w-5" />
        {open ? 'Close B.O.Genius' : 'Ask B.O.Genius'}
      </button>
    </div>
  );
}

export default BOGeniusWidget;
