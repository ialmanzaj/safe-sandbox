"use client";
import { useState } from "react";
import { UserOperation } from "permissionless";
import { formatAddress } from "@/src/utils/common";
import { notReachable } from "@/src/utils/notReachable";
import { Address, encodeFunctionData, parseAbi } from "viem";
import { useActiveNetwork } from "@/src/domains/Network/hooks";
import { useCreateUserOp } from "@/src/domains/UserOperation/hooks";
import { ERC20Token } from "@/src/domains/Token/ERC20Token/ERC20Token";
import { UserOpStatusView } from "@/src/domains/UserOperation/components";
import { getFormattedAmount } from "@/src/domains/Token/ERC20Token/helpers";
import { LendView } from "./views/LendView";
import { useActiveAccount } from "../../hooks";
import { contracts } from "@/src/constants/contracts";

type ViewState =
  | { type: "lend_view" }
  | {
      type: "submitted_view";
      lendAmount: string;
      recipient: string;
      userOp: UserOperation;
    };

type Props = {
  onTransactionSubmitted: () => void;
  onClose: () => void;
};

export const LendFlow = ({ onTransactionSubmitted, onClose }: Props) => {
  const [viewState, setViewState] = useState<ViewState>({
    type: "lend_view",
  });
  const [activeNetwork] = useActiveNetwork();
  const [activeAccount] = useActiveAccount();
  const createUserOp = useCreateUserOp();

  const onSendClick = async ({
    token,
    amount,
  }: {
    token: ERC20Token;
    amount: number;
  }) => {
    let userOp;

    // if (token.symbol !== activeNetwork.nativeCurrency.symbol) {
    //   // not implemented
    // } else {
      const calldata = encodeFunctionData({
        functionName: "depositETH",
        abi: parseAbi([
          "function depositETH(address, address onBehalfOf, uint16 referralCode) external payable",
        ]),
        args: [
          contracts.AAVE_POOL as Address,
          activeAccount.address as Address,
          0,
        ],
      });

      userOp = await createUserOp.mutateAsync({
        name: `Lend ${amount.toFixed(4)} ${token.symbol}`,
        actions: [
          {
            target: contracts.AAVE_WRAPPED_TOKEN_GATEWAY as Address,
            value: BigInt(amount * 10 ** Number(token.decimals)),
            callData: calldata,
          },
        ],
      });
    // }

    onTransactionSubmitted();

    setViewState({
      type: "submitted_view",
      lendAmount: getFormattedAmount({ token, amount, activeNetwork }),
      recipient: activeAccount.address,
      userOp,
    });
  };

  switch (viewState.type) {
    case "lend_view":
      return (
        <LendView
          onSendClick={onSendClick}
          // isUserOpCreated={createUserOp.isLoading} // todo: fix this
          isUserOpCreated={false}
        />
      );
    case "submitted_view":
      return (
        <UserOpStatusView
          title={`You're lending ${viewState.lendAmount}`}
          subTitle={`We're processing this transaction now`}
          userOp={viewState.userOp}
          onFinishClick={onClose}
        />
      );
    default:
      return notReachable(viewState);
  }
};
