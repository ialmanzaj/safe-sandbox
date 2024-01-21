import { useContext, useEffect, useState } from 'react'
import { ActiveNetworkContext } from '@/src/context'
import { useActiveAccount, useFetchAccountData } from '../../Account/hooks'
import { useQueueTransactions } from '../../Transaction/hooks/useQueueTransactions'
import { useIsUserOpInProgress } from '../../UserOperation/hooks'
import { useIsTransactionInProgress } from '../../Transaction/hooks' 
import { ERC20Token } from '../../Token/ERC20Token/ERC20Token'
import { Item } from '@/src/ui-kit'
import { TokenIcon } from '../../Token/components/TokenIcon'
import { InfoMessage } from '@/src/ui-kit/InfoMessage'

export const BorrowedAssetList = () => {
  const [activeAccount] = useActiveAccount()
  const { activeNetwork } = useContext(ActiveNetworkContext)
  const [tokens, setTokens] = useState<ERC20Token[]>([]);
  const [isUserOpInProgress] = useIsUserOpInProgress();
  const [isTransactionInProgress] = useIsTransactionInProgress();
  const queueTransaction = useQueueTransactions()
  const fetchAccountData = useFetchAccountData();
  const title = "No Tokens to show";

  useEffect(() => {
    if (activeAccount.address) {
      fetchAccountData().then(([_1, _2, _3, borrowedTokens]) => {
        setTokens(borrowedTokens);
      });
    }
  }, [
    activeNetwork,
    isUserOpInProgress,
    isTransactionInProgress,
    activeAccount.address,
  ]);
  
  return tokens.length > 0 ? (
    <div className="flex flex-col divide-y divide-base-300 gap-2">
        <div className="flex-1">
        <p className="text-zinc-400 text-base font-medium font-oatmealProMedium">
            Borrowed Tokens
        </p>
        </div>

      {tokens.map((token, index) => (
        <div className="py-2" key={index}>
          <Item
            icon={<TokenIcon size={48} token={token} />}
            title={
              <div className="text-neutral-dark text-base font-medium">
                {token.name}
              </div>
            }
            subTitle={
              <div className="opacity-50 text-slate-900 text-base font-normal">
                {token.symbol}
              </div>
            }
            value={`${token.balance} ${token.symbol}`}
            className="border-none !px-0 py-1"
          />
        </div>
      ))}
    </div>
  ) : (
    <InfoMessage
      title="No Tokens to show"
      desc="Claim some tokens and start testing the Rhinestone Wallet"
    />
  );
}
