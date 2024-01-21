import { useQuery } from "@tanstack/react-query";
import { getPublicClient } from "@/src/domains/Network/helpers";
import { useActiveNetwork } from "../../Network/hooks";
import { useActiveAccount } from "../../Account/hooks";
import { Account } from "../../Account";
import { Network } from "../../Network";
import { contracts } from "@/src/constants/contracts";
import UiPoolDataProvider from "@/src/constants/abis/UiPoolDataProvider.json";
import { ERC20Token } from "../../Token/ERC20Token/ERC20Token";
import { allTokens } from "../../Token/api/data";

type Params = {
  account: Pick<Account, "address">;
  network: Network;
};
  
export async function getBorrowedTokens({
  account,
  network,
}: Params): Promise<ERC20Token[]> {
  const publicClient = getPublicClient(network); 
  const rawData = (await publicClient.readContract({
    address: contracts.AAVE_UI_POOL_DATA_PROVIDER,
    abi: UiPoolDataProvider.abi,
    functionName: "getUserReservesData",
    args: [contracts.AAVE_POOL_ADDRESS_PROVIDER, account.address]
  })) as any[];

  let result: ERC20Token[] = [];
  let assets: any[] = rawData[0];
  for (let i = 0; i < assets.length; i++) {
    let balance = assets[i].stableBorrowRate;
    if (balance == 0) {
        balance = assets[i].scaledVariableDebt;
    }
    if (balance > 0) {
      let address = assets[i].underlyingAsset.toLowerCase();
      for (const token of allTokens) {
        if (token.token_address.toLowerCase() == address) {
          result.push({
            ...token,
            balance: String(Number(balance) / 10 ** token.decimals)
          });
        }
      }
    }
  }

  return result;
}

export const useGetUserBorrowedTokens = () => {
  const [activeNetwork] = useActiveNetwork();
  const [activeAccount] = useActiveAccount();

  return useQuery<ERC20Token[], Error>({
    queryKey: ["borrowedTokens", activeNetwork.id, activeAccount.address],
    queryFn: () =>
    getBorrowedTokens({ account: activeAccount, network: activeNetwork }),
    enabled: false,
    retry: false,
  });
};