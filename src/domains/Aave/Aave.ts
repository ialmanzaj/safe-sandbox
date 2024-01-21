import { Address, Hex } from "viem";
import { ERC20Token } from "../Token/ERC20Token/ERC20Token";

export type LendedAsset = {
  token_address: string
  balance: BigInt
};

