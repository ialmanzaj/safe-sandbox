"use client";

import { isAddress } from "viem";
import { useState } from "react";
import { InputText } from "@/src/ui-kit/Input";
import { LargeButton, Layout } from "@/src/ui-kit";
import { SideHeader } from "@/src/ui-kit/SideHeader";
import { NetworkSwitcher } from "../../../../Network/components";
import { ERC20Token } from "../../../../Token/ERC20Token/ERC20Token";
import { useGetUserTokens } from "@/src/domains/Token/ERC20Token/hooks";
import { InputTokenAmount } from "../../../../Token/components/InputTokenAmount";

type Props = {
  isUserOpCreated: boolean;
  onSendClick: ({
    token,
    amount,
  }: {
    token: ERC20Token;
    amount: number;
  }) => void;
};

const withoutGho = (tokens: ERC20Token[]) => {
  let result: ERC20Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].symbol !== "GHO") {
      result.push(tokens[i]);
    }
  }
  return result;
};

export const LendView = ({ isUserOpCreated, onSendClick }: Props) => {
  const userTokens = withoutGho(useGetUserTokens({ withNativeCoin: true }) as ERC20Token[]);
  const [token, setToken] = useState<ERC20Token>(userTokens[0]);
  const [amount, setAmount] = useState<string | undefined>();

  const isSendEnabled =
    amount && Number(amount) > 0;

  const getButtonText = () => {
    if (!amount) {
      return "Enter amount";
    }
    return "Execute";
  };

  return (
    <Layout>
      <Layout.Header>
        <SideHeader
          title="Lend crypto"
          subTitle="Lend your crypto to AAVE"
        />
      </Layout.Header>

      <Layout.Content>
        <div className="flex flex-col w-[448px] mt-[146px] gap-2">
          <InputTokenAmount
            label="Token to lend"
            onTokenChange={setToken}
            onAmountChange={setAmount}
            tokensList={userTokens}
          />
        </div>
      </Layout.Content>
      <Layout.Footer>
        <LargeButton
          className="bg-primary hover:bg-primary border-none disabled:bg-indigo-600 disabled:bg-opacity-20 disabled:text-red-600"
          contentClassName="font-normal !text-primary-content"
          isLoading={isUserOpCreated}
          disabled={!isSendEnabled || isUserOpCreated}
          onClick={() =>
            isSendEnabled &&
            onSendClick({ token, amount: parseFloat(amount) })
          }
        >
          {getButtonText()}
        </LargeButton>
      </Layout.Footer>
    </Layout>
  );
};
