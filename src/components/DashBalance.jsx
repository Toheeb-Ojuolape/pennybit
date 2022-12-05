import React from "react";
import { FiSend, FiArrowDown, FiPlus } from "react-icons/fi";
import Popup from "reactjs-popup";
import WalletForm from "./WalletForm";
import XCancel from "./XCancel";

const DashBalance = () => {
  // const [withdrawFund, { isLoading: loading, isSuccess: IsSuccess, isError: Iserror, error: Err }] = useWithdrawFundsMutation();

  const handleFund = (values, close) => {
    close();
  };
  return (
    <div className="border-2 border-orange rounded-xl mb-6 flex flex-col justify-center items-center py-10">
      <p>Wallet Balance</p>
      <div className="flex items-end gap-3 mb-10">
        <p className="text-6xl font-bold text-orange">$40,000</p>
        <div className="flex items-center gap-2 bg-light-orange text-orange text-xs p-1 rounded-lg">
          <FiArrowDown className="bg-orange text-white rounded-full" />
          <p>20%</p>
        </div>
      </div>
      <div className="flex items-center gap-20">
        <Popup
          trigger={
            <div className="flex items-center gap-2 bg-orange text-white cursor-pointer py-2 px-8 rounded-full">
              <FiPlus />
              <p>Fund</p>
            </div>
          }
          position="right center"
          modal
          closeOnDocumentClick
          nested
          contentStyle={{
            borderRadius: "12px",
            width: "fit-content",
            backgroundColor: "white",
            fontSize: "0.8rem",
          }}
        >
          {(close) => (
            <>
              <div className="mt-4 mr-4">
                <XCancel close={close} />
              </div>
              <div className="px-[24px] pb-[32px] w-[300px] md:w-[500px] h-[auto]">
                <WalletForm handleFundWallet={handleFund} close={close} />
              </div>
            </>
          )}
        </Popup>
        <div className="flex items-center gap-2 border-2 border-orange text-orange cursor-pointer py-2 px-8 rounded-full">
          <FiSend />
          <p>Send</p>
        </div>
      </div>
    </div>
  );
};

export default DashBalance;
