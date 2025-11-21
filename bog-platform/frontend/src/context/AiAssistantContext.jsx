import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import { AI_ENDPOINT } from '../config.js';

const AiAssistantContext = createContext(null);

const defaultSystemPrompt = `You are B.O.Genius, the friendly yet professional AI guide for the Blue Ocean Grid ICO. Use inspiring but factual language, keep responses concise, and always highlight sustainability, investor value, and the ocean-powered infrastructure. Support English, Greek, Spanish, and Chinese.`;

export function AiAssistantProvider({ children }) {
  const [history, setHistory] = useState([
    {
      role: 'system',
      content: defaultSystemPrompt
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (message) => {
    setLoading(true);
    setError(null);
    try {
      const nextHistory = [...history, { role: 'user', content: message }];
      setHistory(nextHistory);
      const { data } = await axios.post(AI_ENDPOINT, {
        messages: nextHistory
      });
      setHistory([...nextHistory, data.reply]);
      return data.reply.content;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [history]);

  const value = useMemo(() => ({ history, sendMessage, loading, error }), [history, sendMessage, loading, error]);

  return <AiAssistantContext.Provider value={value}>{children}</AiAssistantContext.Provider>;
}

export function useAiAssistant() {
  const context = useContext(AiAssistantContext);
  if (!context) throw new Error('useAiAssistant must be used within AiAssistantProvider');
  return context;
}
