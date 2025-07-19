// src/components/WalletConnection.tsx
import React from 'react';
import { ConnectButton, useCurrentAccount } from '@iota/dapp-kit';

export default function WalletConnection() {
  const account = useCurrentAccount();

  return (
    <div style={{ marginBottom: '1rem' }}>
      <ConnectButton />
      {account && <div>Connected: {account.address}</div>}
    </div>
  );
}
