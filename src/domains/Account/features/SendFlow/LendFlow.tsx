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
  const createUserOp = useCreateUserOp();

  const onSendClick = async ({
    token,
    address,
    amount,
  }: {
    token: ERC20Token;
    address: string;
    amount: number;
  }) => {
    let userOp;

    if (token.symbol !== activeNetwork.nativeCurrency.symbol) {
      const calldata = encodeFunctionData({
        functionName: "transfer",
        abi: parseAbi([
          "function transfer(address to, uint256 amount) public returns (bool)",
        ]),
        args: [
          address as Address,
          BigInt(amount * 10 ** Number(token.decimals)),
        ],
      });

      userOp = await createUserOp.mutateAsync({
        name: `Lend ${amount.toFixed(2)} ${token.symbol}`,
        actions: [
          {
            target: token.token_address as Address,
            value: BigInt(0),
            callData: calldata,
          },
        ],
      });
    } else {
      const calldata = encodeFunctionData({
        functionName: "depositETH",
        abi: parseAbi([
          "function depositETH(address, address onBehalfOf, uint16 referralCode) external payable",
        ]),
        args: [
          "0x6ae43d3271ff6888e7fc43fd7321a503ff738951" as Address,
          address as Address,
          0,
        ],
      });

      userOp = await createUserOp.mutateAsync({
        name: `Lend ${amount.toFixed(4)} ${token.symbol}`,
        actions: [
          {
            target: address as Address,
            value: BigInt(amount * 10 ** Number(token.decimals)),
            callData: calldata,
          },
        ],
      });
    }

    onTransactionSubmitted();

    setViewState({
      type: "submitted_view",
      lendAmount: getFormattedAmount({ token, amount, activeNetwork }),
      recipient: address,
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
