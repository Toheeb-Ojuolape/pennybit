import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { BiTransferAlt } from "react-icons/bi";

const ExchangeBoard = () => {
  return (
    <div>
      <form action="">
        <div className="flex justify-center items-end gap-6 bg-[#E3F2FD] rounded-xl mb-6 py-12">
          <div>
            <p className="text-sm pb-1">From</p>
            <div className="bg-white h-[50px] rounded-md w-full flex justify-between items-center">
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
          </div>
          <div className="bg-orange p-2 rounded-full">
            <BiTransferAlt className="text-2xl text-white" />
          </div>
          <div>
            <p className="text-sm pb-1">To</p>
            <div className="bg-white h-[50px] rounded-md w-full flex justify-between items-center">
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
          </div>
        </div>

        <div className="flex">
          <div className="bg-orange flex justify-center items-center gap-4 py-2 px-5 rounded-md text-white">
            <p>Exchange</p>
            <BsArrowRight />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExchangeBoard;
