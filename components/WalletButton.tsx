'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { formatShortAddress } from '@/lib/rating-store';

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const connector = connectors.find((item) => item.id === 'injected') ?? connectors[0];

  if (isConnected) {
    return (
      <button className="wallet-button" data-connected="true" type="button" onClick={() => disconnect()}>
        {formatShortAddress(address)}
      </button>
    );
  }

  return (
    <button
      className="wallet-button"
      type="button"
      disabled={!connector || isPending}
      onClick={() => connector && connect({ connector })}
    >
      {isPending ? 'Connecting...' : 'Connect wallet'}
    </button>
  );
}

