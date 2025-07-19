import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IotaClientProvider } from '@iota/dapp-kit';
import { WalletProvider } from './contexts/WalletContext';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary'; // kalau ada
import './index.css'; // optional

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <QueryClientProvider client={queryClient}>
          <IotaClientProvider networks={{ testnet: { faucet: "", explorer: "", apiUrl: "" } }} defaultNetwork="testnet">
            <WalletProvider>
              <App />
            </WalletProvider>
          </IotaClientProvider>
        </QueryClientProvider>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);
