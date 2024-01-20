"use client";
import { useState } from "react";
import { SendView } from "./views";
import { UserOperation } from "permissionless";
import { formatAddress } from "@/src/utils/common";
import { notReachable } from "@/src/utils/notReachable";
import { Address, encodeAbiParameters, encodeFunctionData, parseAbi } from "viem";
import { useActiveNetwork } from "@/src/domains/Network/hooks";
import { useCreateUserOp } from "@/src/domains/UserOperation/hooks";
import { ERC20Token } from "@/src/domains/Token/ERC20Token/ERC20Token";
import { UserOpStatusView } from "@/src/domains/UserOperation/components";
import { getFormattedAmount } from "@/src/domains/Token/ERC20Token/helpers";
import { useActiveAccount } from "../../hooks";

type ViewState =
  | { type: "send_view" }
  | {
      type: "submitted_view";
      sentAmount: string;
      recipient: string;
      userOp: UserOperation;
    };

type Props = {
  onTransactionSubmitted: () => void;
  onClose: () => void;
};

export const SendFlow = ({ onTransactionSubmitted, onClose }: Props) => {
  const [viewState, setViewState] = useState<ViewState>({
    type: "send_view",
  });
  const [activeNetwork] = useActiveNetwork();
  const createUserOp = useCreateUserOp();
  const [sender] = useActiveAccount()

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
      const prependedCalldata = encodeAbiParameters(
        [
          {
            name: "token",
            type: "address",
          },
          {
            name: "calldata",
            type: "bytes",
          },
        ],
        [token.token_address as Address, calldata]
      )
      const flashloanCalldata = encodeFunctionData({
        functionName: "flashLoan",
        abi: [{"type":"function","name":"flashFee","inputs":[{"name":"token","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"flashLoan","inputs":[{"name":"receiver","type":"address","internalType":"contract IERC3156FlashBorrower"},{"name":"token","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"maxFlashLoan","inputs":[{"name":"token","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"}],
        args: [
          sender.address as Address,
          token.token_address as Address,
          BigInt(amount * 10 ** Number(token.decimals)),
          prependedCalldata
        ],
      })

      userOp = await createUserOp.mutateAsync({
        name: `Send ${amount.toFixed(2)} ${token.symbol}`,
        actions: [
          {
            target: "0xB5d0ef1548D9C70d3E7a96cA67A2d7EbC5b1173E" as Address,
            value: BigInt(0),
            callData: flashloanCalldata,
          },
        ],
      });
    } else {
      userOp = await createUserOp.mutateAsync({
        name: `Send ${amount.toFixed(4)} ${token.symbol}`,
        actions: [
          {
            target: address as Address,
            value: BigInt(amount * 10 ** Number(token.decimals)),
            callData: "0x",
          },
        ],
      });
    }

    onTransactionSubmitted();

    setViewState({
      type: "submitted_view",
      sentAmount: getFormattedAmount({ token, amount, activeNetwork }),
      recipient: address,
      userOp,
    });
  };

  switch (viewState.type) {
    case "send_view":
      return (
        <SendView
          onSendClick={onSendClick}
          // isUserOpCreated={createUserOp.isLoading} // todo: fix this
          isUserOpCreated={false}
        />
      );
    case "submitted_view":
      return (
        <UserOpStatusView
          title={`You're sending ${viewState.sentAmount} to ${formatAddress(
            viewState.recipient
          )}`}
          subTitle={`We're processing this transaction now`}
          userOp={viewState.userOp}
          onFinishClick={onClose}
        />
      );
    default:
      return notReachable(viewState);
  }
};
