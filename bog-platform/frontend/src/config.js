export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
export const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT || `${API_BASE_URL}/api/ai`;
export const BSC_RPC_URL =
  import.meta.env.VITE_BSC_RPC_URL || 'https://bsc-dataseed.binance.org/';
export const TOKEN_ADDRESS =
  import.meta.env.VITE_TOKEN_ADDRESS || '0x3bb95b521AF86e01C1A50578875ADbb1222b6e4b';
export const CHAIN_ID = parseInt(import.meta.env.VITE_CHAIN_ID || '56', 10);
