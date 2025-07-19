// Network endpoints
const NETWORKS = {
  devnet: {
    rpcUrl: "https://api.devnet.iota.cafe:443",
    websocket: "wss://api.devnet.iota.cafe:443",
    faucet: "https://faucet.devnet.iota.cafe:443/gas",
    explorer: "https://explorer.rebased.iota.org/?network=devnet"
  },
  testnet: {
    rpcUrl: "https://api.testnet.iota.cafe:443",
    faucet: "https://faucet.testnet.iota.cafe:443/gas"
  },
  mainnet: {
    rpcUrl: "https://api.iota.cafe:443",
    explorer: "https://explorer.iota.org/"
  }
};
