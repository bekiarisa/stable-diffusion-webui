import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { BrowserProvider, Contract, formatUnits, parseUnits } from 'ethers';
import { BSC_RPC_URL, CHAIN_ID, TOKEN_ADDRESS } from '../config.js';
import tokenAbi from '../utils/tokenAbi.json';

const Web3Context = createContext(null);

const FALLBACK_NETWORK = {
  chainId: CHAIN_ID,
  rpcUrl: BSC_RPC_URL
};

export function Web3Provider({ children }) {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState(FALLBACK_NETWORK);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const connect = useCallback(async () => {
    try {
      setStatus('connecting');
      if (!window.ethereum) {
        throw new Error('No injected wallet found. Install MetaMask or use WalletConnect.');
      }
      const browserProvider = new BrowserProvider(window.ethereum);
      const signerInstance = await browserProvider.getSigner();
      const account = await signerInstance.getAddress();
      const { chainId } = await browserProvider.getNetwork();

      if (chainId !== FALLBACK_NETWORK.chainId) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${FALLBACK_NETWORK.chainId.toString(16)}` }]
        });
      }

      setProvider(browserProvider);
      setSigner(signerInstance);
      setAddress(account);
      setNetwork({ chainId, rpcUrl: FALLBACK_NETWORK.rpcUrl });
      setStatus('connected');
    } catch (err) {
      console.error(err);
      setError(err);
      setStatus('error');
    }
  }, []);

  const disconnect = useCallback(() => {
    setProvider(null);
    setSigner(null);
    setAddress(null);
    setStatus('idle');
    setError(null);
  }, []);

  const tokenContract = useMemo(() => {
    if (!provider) return null;
    return new Contract(TOKEN_ADDRESS, tokenAbi, signer || provider);
  }, [provider, signer]);

  const buyTokens = useCallback(
    async ({ value, currency = 'BNB' }) => {
      if (!tokenContract) throw new Error('Wallet not connected');
      const weiAmount = parseUnits(value.toString(), currency === 'BNB' ? 18 : 6);
      const tx = await tokenContract.purchase({ value: weiAmount });
      return tx.wait();
    },
    [tokenContract]
  );

  const getBalance = useCallback(async () => {
    if (!tokenContract || !address) return '0';
    const balance = await tokenContract.balanceOf(address);
    return formatUnits(balance, 18);
  }, [tokenContract, address]);

  const value = useMemo(
    () => ({
      provider,
      signer,
      address,
      network,
      status,
      error,
      connect,
      disconnect,
      buyTokens,
      getBalance
    }),
    [provider, signer, address, network, status, error, connect, disconnect, buyTokens, getBalance]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}
