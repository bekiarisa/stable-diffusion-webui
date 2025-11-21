import { ethers } from 'ethers';
import tokenAbi from '../abis/tokenAbi.json' assert { type: 'json' };

export function getProvider() {
  return new ethers.JsonRpcProvider(process.env.BSC_RPC_URL);
}

export function getTokenContract(provider = getProvider()) {
  const address = process.env.TOKEN_CONTRACT_ADDRESS;
  return new ethers.Contract(address, tokenAbi, provider);
}
