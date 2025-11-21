import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWeb3 } from '../context/Web3Context.jsx';

function WalletConnectPanel() {
  const { connect, disconnect, status, address, buyTokens } = useWeb3();
  const { register, handleSubmit, reset } = useForm({ defaultValues: { amount: '500', currency: 'BNB' } });
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (values) => {
    try {
      setProcessing(true);
      setError(null);
      const txReceipt = await buyTokens({ value: values.amount, currency: values.currency });
      setReceipt(txReceipt);
      reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  });

  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Wallet Connection</h3>
          <p className="text-xs uppercase tracking-wide text-white/60">MetaMask · Trust Wallet · WalletConnect</p>
        </div>
        {status === 'connected' ? (
          <button
            type="button"
            onClick={disconnect}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:border-glow"
          >
            Disconnect
          </button>
        ) : (
          <button
            type="button"
            onClick={connect}
            className="rounded-full bg-glow/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-glow hover:bg-glow/30"
          >
            Connect Wallet
          </button>
        )}
      </div>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <label className="text-xs uppercase tracking-wide text-white/60">Amount</label>
          <input
            type="number"
            step="0.01"
            min="0"
            className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-glow focus:outline-none"
            {...register('amount', { required: true })}
          />
        </div>
        <div className="md:col-span-1">
          <label className="text-xs uppercase tracking-wide text-white/60">Currency</label>
          <select
            className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-glow focus:outline-none"
            {...register('currency')}
          >
            <option value="BNB">BNB</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div className="md:col-span-1 flex items-end">
          <button
            type="submit"
            disabled={status !== 'connected' || processing}
            className="w-full rounded-lg bg-gradient-to-r from-ocean-500 to-glow py-2 text-sm font-semibold uppercase tracking-wide text-abyss shadow-glow disabled:opacity-50"
          >
            {processing ? 'Processing...' : 'Buy Tokens'}
          </button>
        </div>
      </form>
      {error ? <p className="mt-4 text-xs text-red-400">{error}</p> : null}
      {receipt ? (
        <div className="mt-4 rounded-lg border border-glow/40 bg-glow/10 p-4 text-xs text-white">
          <p className="font-semibold text-glow">Transaction Submitted</p>
          <pre className="mt-2 whitespace-pre-wrap break-all">{JSON.stringify(receipt, null, 2)}</pre>
        </div>
      ) : null}
      {address ? (
        <p className="mt-4 text-xs text-white/50">Connected: {address}</p>
      ) : null}
    </div>
  );
}

export default WalletConnectPanel;
