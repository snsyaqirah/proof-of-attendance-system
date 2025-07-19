// src/App.tsx
import React from 'react';
import { IotaClientProvider, WalletProvider, createNetworkConfig } from '@iota/dapp-kit';
import WalletConnection from './components/WalletConnection';
import AttendanceScanner from './components/AttendanceScanner';

const { networkConfig } = createNetworkConfig({
  testnet: { url: 'https://api.testnet.shimmer.network' },
});

function App() {
  return (
    <IotaClientProvider networks={networkConfig} defaultNetwork="testnet">
      <WalletProvider>
        <div style={{ padding: '2rem' }}>
          <h1>Proof of Attendance</h1>
          <WalletConnection />
          <AttendanceScanner 
            packageId="0x123456::your_package" 
            eventId="0x789abc::your_event_object" 
          />
        </div>
      </WalletProvider>
    </IotaClientProvider>
  );
}

export default App;
