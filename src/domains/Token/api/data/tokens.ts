import { zeroAddress } from "viem";

export const allTokens = [
  {
    name: "ETH",
    token_address: "ETH",
    symbol: "ETH",
    decimals: 18,
    chainId: 11155111,
    logoURI:
      "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
  },
  {
    name: "WETH",
    token_address: "0xc558dbdd856501fcd9aaf1e62eae57a9f0629a3c",
    symbol: "WETH",
    decimals: 18,
    chainId: 11155111,
    logoURI:
      "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
  },
];

export const nativeCoins = [
  {
    name: "ETH",
    token_address: "ETH",
    symbol: "ETH",
    decimals: 18,
    chainId: 11155111,
    logoURI:
      "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
  },
];

export const ERC20Tokens = [
  {
    name: "USDC",
    token_address: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
    symbol: "USDC",
    decimals: 6,
    chainId: 11155111,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
  },
];

export const AnyERC20Token = {
  name: "Any ERC20 Token",
  token_address: zeroAddress,
  symbol: "Any ERC20 Token",
  decimals: 18,
  chainId: 80001,
  logoURI:
    "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
};
