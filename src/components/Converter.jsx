import React from "react";
import { BsArrowRight } from "react-icons/bs";
import LearnBitcoin from "./LearnBitcoin";

const Converter = () => {
  return (
    <div>
      <div>
        <p className="pb-1">Converter</p>
        <form action="">
          <div className="bg-white h-[50px] rounded-md w-full flex justify-between items-center mb-5">
            <input
              type="text"
              placeholder="100"
              className="px-3 focus:outline-none w-[70%]"
            />
            <select
              name=""
              id=""
              className="px-3 focus:outline-none w-[30%] bg-light-orange mr-1 py-2 rounded-md text-orange text-xs"
            >
              <option value="">BTC</option>
            </select>
          </div>
          <div className="bg-white h-[50px] rounded-md w-full flex justify-between items-center mb-5">
            <input
              type="text"
              placeholder="32,000,000"
              className="px-3 focus:outline-none w-[70%]"
            />
            <select
              name=""
              id=""
              className="px-3 focus:outline-none w-[30%] bg-[#FBE3FD] mr-1 py-2 rounded-md text-[#E600FF] text-xs"
            >
              <option value="">NGN</option>
            </select>
          </div>

          <div className="flex">
            <div className="bg-orange flex justify-center items-center gap-4 py-2 px-5 rounded-md text-white">
              <p>Convert</p>
              <BsArrowRight />
            </div>
          </div>
        </form>
      </div>

      <div className="w-full pt-40">
        <p className="pb-3 font-medium">Learn Bitcoin</p>
        <LearnBitcoin />
      </div>
    </div>
  );
};

export default Converter;
