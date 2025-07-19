// src/iota/config.ts

import { getFullnodeUrl, IotaClient } from '@iota/iota-sdk/client';
import { Transaction } from '@iota/iota-sdk/transactions';
import { Ed25519Keypair } from '@iota/iota-sdk/keypairs/ed25519';

import {
  IotaClientProvider,
  WalletProvider,
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransaction,
  createNetworkConfig
} from '@iota/dapp-kit';

import { requestIotaFromFaucetV0 } from '@iota/iota-sdk/faucet';

// Export commonly used things if needed
export {
  IotaClient,
  Ed25519Keypair,
  requestIotaFromFaucetV0,
  IotaClientProvider,
  WalletProvider,
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransaction,
  createNetworkConfig,
};
