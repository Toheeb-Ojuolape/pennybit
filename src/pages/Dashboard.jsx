import React from "react";
import Wrapper from "../HOC/Wrapper";
import Navbar from "../components/Navbar";
import DashBalance from "../components/DashBalance";
import Image01 from "../assets/image/bitcoin.png";
import Image02 from "../assets/image/Wallet.png";
import Image03 from "../assets/image/QR-code.png";
import Transaction from "../components/Transaction";
import { BiWallet } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import Converter from "../components/Converter";

const Dashboard = () => {
  return (
    <Wrapper>
      <div className="w-full flex justify-between h-screen overflow-hidden">
        <div className="w-[70%] bg-[#fff] p-[54px] overflow-scroll">
          <Navbar />
          <DashBalance />
          <div className="flex justify-between items-center mb-6">
            <div className="bg-[#E5FDE3] pt-5 px-10 rounded-2xl">
              <p className="text-green font-bold text-xl">
                Bitcoin to <br />
                Airtime
              </p>
              <div className="flex justify-end w-[150px] h-[150px]">
                <img
                  src={Image01}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="bg-[#E3F2FD] pt-5 px-10 rounded-2xl">
              <p className="text-[#0099FF] font-bold text-xl">
                Virtual
                <br />
                Cards
              </p>
              <div className="flex justify-end w-[150px] h-[150px]">
                <img
                  src={Image02}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="bg-[#FEEAF3] pt-5 px-10 rounded-2xl">
              <p className="text-[#F975B8] font-bold text-xl">
                Generate <br />
                Links
              </p>
              <div className="flex justify-end w-[150px] h-[150px]">
                <img
                  src={Image03}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <p>Recent Transactions</p>
            <div>
              <Transaction
                icon={<BiWallet className="text-3xl text-white" />}
                color="green"
                title="Wallet funded!"
                amount="$ 40"
              />
              <Transaction
                icon={<FiSend className="text-3xl text-white" />}
                color="pink"
                title="Transfer successful!"
                amount="-$ 30"
              />
            </div>
          </div>
        </div>
        <div className="w-[30%] bg-[#f5f5f5] py-[81px] px-[37px] overflow-scroll">
          <Converter />
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
