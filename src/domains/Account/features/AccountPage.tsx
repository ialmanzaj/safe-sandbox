"use client";

import { useState } from "react";
import { SectionHeader } from "@/src/ui-kit";
import { SideDrawer } from "@/src/components";
import { notReachable } from "@/src/utils/notReachable";
import {
  ActionsTabs,
  AccountActions,
  AccountBalance,
} from "@/src/domains/Account/components";
import { ActivityList } from "../../UserOperation/components";
import { useGetAccountActivity } from "../../UserOperation/api/getAddressActivity";
import { PlaygroundBanner } from "../components/PlaygroundBanner";

type sideViewState = {
  type: "closed" | "send" | "receive" | "lend";
};

export function AccountPage() {
  const [sideViewState, setSideViewState] = useState<sideViewState>({
    type: "closed",
  });

  const { data: groupedUserOps } = useGetAccountActivity();

  const getSideViewTitle = () => {
    switch (sideViewState.type) {
      case "closed":
        return "";
      case "send":
      case "receive":
        return "Send, Swap & Receive";
      case "lend":
        return "Lend"
      default:
        return "";
    }
  };

  return (
    <>
      <div className="pb-8">
        <div className="flex gap-2">
          <AccountBalance />
          <div className="self-end gap-2">
            <AccountActions
              onLendClick={() => setSideViewState({ type: "lend" })}
              onSendClick={() => setSideViewState({ type: "send" })}
              onReceiveClick={() => setSideViewState({ type: "receive" })}
            />
          </div>
        </div>

        <div className="my-16">
          <div className="mt-6" />
          <PlaygroundBanner />
        </div>

        <div className="my-16">
          <SectionHeader
            title="activity"
            href={
              groupedUserOps && Object.keys(groupedUserOps).length > 0
                ? "/activity"
                : ""
            }
          />
          <div className="mt-6" />
          <ActivityList activities={groupedUserOps} />
        </div>
      </div>

      <SideDrawer
        isOpen={sideViewState.type !== "closed"}
        title={getSideViewTitle()}
        onClose={() => setSideViewState({ type: "closed" })}
      >
        {(() => {
          switch (sideViewState.type) {
            case "lend":
            case "send":
            case "receive":
              return (
                <ActionsTabs
                  active={sideViewState.type}
                  onClose={() => setSideViewState({ type: "closed" })}
                />
              );

            case "closed":
              return null;
            default:
              return null;
          }
        })()}
      </SideDrawer>
    </>
  );
}
