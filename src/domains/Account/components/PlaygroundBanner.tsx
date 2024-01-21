import { Toggle } from "@/src/ui-kit";
import Image from "next/image";
import { LendedAssetList } from "../../Aave/components";
import { BorrowedAssetList } from "../../Aave/components/BorrowedAssetsList";

export const PlaygroundBanner = () => {
  return (
    <div className="flex flex-col w-full h-[360px] bg-white bg-center bg-border-[10px] rounded-[16px] box-border p-8 relative">
      <div className="grid grid-cols-9 gap-3">
        <div className="col-span-4">
          <LendedAssetList/>
        </div>
        <div className="col-start-6 col-span-4">
          <BorrowedAssetList/>
        </div>

      </div>
    </div>
  );
};
