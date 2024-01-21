import { AccountBalance } from "../Account";
import { useActiveNetwork } from "../../Network/hooks";
import { useGetAccountBalance } from "../api";
import { useGetUserTokens } from "../../Token/ERC20Token/api";
import { ERC20Token } from "../../Token/ERC20Token/ERC20Token";
import { useGetUserLendedTokens } from "../../Aave/api/getLendedTokens";
import { useGetUserBorrowedTokens } from "../../Aave/api/getBorrowedTokens";

export const useFetchAccountData = () => {
  const [activeNetwork] = useActiveNetwork();
  const { refetch: fetchAccountBalance } = useGetAccountBalance();
  const { refetch: fetchUserTokens } = useGetUserTokens();
  const { refetch: fetchUserLendedTokens } = useGetUserLendedTokens();
  const { refetch: fetchUserBorrowedTokens } = useGetUserBorrowedTokens();

  const fetchAccountData = async (): Promise<
    [AccountBalance, ERC20Token[], ERC20Token[], ERC20Token[]]
  > => {
    const [balance, tokens, lendedTokens, borrowedTokens] = await Promise.all([
      fetchAccountBalance(),
      fetchUserTokens(),
      fetchUserLendedTokens(),
      fetchUserBorrowedTokens(),
    ]);

    return [
      balance.data || {
        balance: "0",
        symbol: activeNetwork.nativeCurrency.symbol,
      },
      tokens.data || [],
      lendedTokens.data || [],
      borrowedTokens.data || [],
    ];
  };

  return fetchAccountData;
};
