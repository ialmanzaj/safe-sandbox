"use client";

import { useContext } from "react";
import { Button } from "@/src/ui-kit";
import { useActiveAccount } from "../hooks";
import { ActiveNetworkContext } from "@/src/context";
import { getCoinFromFaucet } from "../../Network/helpers/faucet";
import {
  AssetsIcon,
  PolygonIcon,
  ReceiveIcon,
  SendIcon,
} from "@/src/ui-kit/Icons";
import { useQueueTransactions } from "../../Transaction/hooks/useQueueTransactions";

type Props = {
  onLendClick: () => void;
  onSendClick: () => void;
  onReceiveClick: () => void;
};

export const AccountActions = ({ onLendClick, onSendClick, onReceiveClick }: Props) => {
  const [activeAccount] = useActiveAccount();
  const { activeNetwork } = useContext(ActiveNetworkContext);
  const queueTransaction = useQueueTransactions();

  return (
    <div className="flex gap-2 font-mono uppercase">
      <Button
        className="bg-white w-[92px] h-[36px] btn-xs gap-1 pl-0 font-medium border-slate-900 border-opacity-5"
        onClick={onLendClick}
      >
        <AssetsIcon isActive color="#05003B" />
        Lend
      </Button>
      <Button
        className="regular-neutral w-24 h-[36px] btn-xs gap-2 pl-1 font-medium"
        onClick={onSendClick}
      >
        <SendIcon />
        Send
      </Button>
      <Button
        className="regular-neutral w-24 h-[36px] btn-xs gap-1 pl-0 font-medium"
        onClick={onReceiveClick}
      >
        <ReceiveIcon />
        Receive
      </Button>
    </div>
  );
};
