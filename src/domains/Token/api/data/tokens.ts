import { zeroAddress } from 'viem'

export const allTokens = [
  {
    name: 'MATIC',
    token_address: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
  {
    name: 'ETH',
    token_address: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    chainId: 11155111,
    logoURI:
      'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
  },
  {
    name: 'Wrapped Matic',
    token_address: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
    symbol: 'WMATIC',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912',
  },
]

export const nativeCoins = [
  {
    name: 'MATIC',
    token_address: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
  {
    name: 'ETH',
    token_address: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    chainId: 11155111,
    logoURI:
      'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
  },
]

export const ERC20Tokens = [
  {
    name: 'Wrapped Matic',
    token_address: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
    symbol: 'WMATIC',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912',
  },
  {
    name: 'USDC',
    token_address: '0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97',
    symbol: 'USDC',
    decimals: 6,
    chainId: 80001,
    logoURI:
      'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
  },
]

export const AnyERC20Token = {
  name: 'Any ERC20 Token',
  token_address: zeroAddress,
  symbol: 'Any ERC20 Token',
  decimals: 18,
  chainId: 80001,
  logoURI:
    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
}
