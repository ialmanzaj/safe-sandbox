import { Network } from "../Network";

export const networks: Network[] = [
  {
    name: "Ethereum Sepolia",
    testnet: true,
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    bundlerUrl: process.env.NEXT_PUBLIC_BUNDLER_URL_SEPOLIA!,
    rpcUrl: "https://rpc.sepolia.org",
    zeroExBaseUrl: "",
    id: 11155111,
    network: "Ethereum Sepolia",
    queryName: "sepolia",
    nativeCurrency: { name: "Sepolia ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: {
        http: ["https://rpc.sepolia.org"],
      },
      public: {
        http: ["https://rpc.sepolia.org"],
      },
    },
    blockExplorerUrl: "https://sepolia.etherscan.io/",
    explorerName: "SepoliaScan",
  },
];
