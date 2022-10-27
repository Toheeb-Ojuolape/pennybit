import React from "react";
import Airtime from "../components/Airtime";
import Button from "../components/Button";
import Wrapper from "../HOC/Wrapper";
import Image01 from "../assets/image/mtn.png";
import { BsChevronDown } from "react-icons/bs";

const BitcoinAirtime = () => {
  return (
    <Wrapper>
      <>
        <div className="bg-white py-2 shadow rounded-md w-full flex justify-between items-center mb-5">
          <div className="w-[12%] flex items-center justify-center gap-4 cursor-pointer">
            <img src={Image01} alt="" />
            <BsChevronDown />
          </div>

          <div className="bg-[#EAEAEA] h-[50px] w-[2px] " />
          <input
            type="text"
            placeholder="08167299743"
            className="px-3 focus:outline-none w-[86%]"
          />
        </div>
        <div className="shadow p-5 rounded-lg pb-20 mb-12">
          <p className="text-base pb-3">Top up</p>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <Airtime amount="₦ 50" bonus="₦ 1 cashback" />
            <Airtime amount="₦ 100" bonus="₦ 10 cashback" />
            <Airtime amount="₦ 200" bonus="₦ 20 cashback" />
            <Airtime amount="₦ 500" bonus="₦ 50 cashback" />
            <Airtime amount="₦ 1000" bonus="₦ 100 cashback" />
            <Airtime amount="₦ 2000" bonus="₦ 200 cashback" />
            <Airtime amount="₦ 5000" bonus="₦ 500 cashback" />
            <Airtime amount="₦ 10000" bonus="₦ 1000 cashback" />
          </div>

          <div className="mt-12">
            <p className="pb-1">Enter amount</p>
            <input
              type="text"
              placeholder="Enter amount"
              className="focus:outline-none w-full shadow p-4 rounded-md"
            />
          </div>
        </div>
        <Button content="Buy Airtime" />
      </>
    </Wrapper>
  );
};

export default BitcoinAirtime;
