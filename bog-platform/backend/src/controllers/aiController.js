import { runChatCompletion, summarizeDoc } from '../services/aiService.js';

export async function chatWithAi(req, res, next) {
  try {
    const reply = await runChatCompletion(req.body.messages);
    res.json({ reply });
  } catch (error) {
    next(error);
  }
}

export async function summarizeDocument(req, res, next) {
  try {
    const summary = await summarizeDoc(req.body.document);
    res.json({ summary });
  } catch (error) {
    next(error);
  }
}
