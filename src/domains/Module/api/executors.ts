import { contracts } from "@/src/constants/contracts";
import { Account } from "../../Account";
import { InitialModule } from "../Module";

export const getInstallFlashLoanFallbackExecutorData = (): InitialModule => {
  return {
    module: contracts.FLASHCALL_FALLBACK_EXECUTOR,
    data: "0x",
  };
};
