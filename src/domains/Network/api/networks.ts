import { Network } from "../Network";

export const networks: Network[] = [
  {
    name: "Polygon Mumbai",
    testnet: true,
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    bundlerUrl: process.env.NEXT_PUBLIC_BUNDLER_URL_MUMBAI!,
    rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
    zeroExBaseUrl: "",
    id: 80001,
    network: "Polygon Mumbai",
    queryName: "mumbai",
    nativeCurrency: { name: "Polygon MATIC", symbol: "MATIC", decimals: 18 },
    rpcUrls: {
      default: {
        http: ["https://rpc.ankr.com/polygon_mumbai"],
      },
      public: {
        http: ["https://rpc.ankr.com/polygon_mumbai"],
      },
    },
    blockExplorerUrl: "https://mumbai.polygonscan.com",
    explorerName: "PolygonScan",
  },
  {
    name: "Ethereum Sepolia",
    testnet: true,
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    bundlerUrl: process.env.NEXT_PUBLIC_BUNDLER_URL_MUMBAI!,
    rpcUrl: "https://rpc.ankr.com/eth_sepolia",
    zeroExBaseUrl: "",
    id: 11155111,
    network: "Ethereum Sepolia",
    queryName: "sepolia",
    nativeCurrency: { name: "SepoliaETH", symbol: "SepoliaETH", decimals: 18 },
    rpcUrls: {
      default: {
        http: ["https://rpc.ankr.com/eth_sepolia"],
      },
      public: {
        http: ["https://rpc.ankr.com/eth_sepolia"],
      },
    },
    blockExplorerUrl: "https://sepolia.etherscan.io/",
    explorerName: "SepoliaScan",
  },
];
