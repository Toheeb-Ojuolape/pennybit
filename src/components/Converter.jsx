import React from "react";
import { BsArrowRight, BsPlayCircle } from "react-icons/bs";
import Image01 from "../assets/image/learnBitcoin.png";

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
        <div className="w-full">
          <div className="w-full relative h-full">
            <img src={Image01} alt="" className="w-full h-full" />
            <div className="absolute w-full h-full flex justify-center items-center top-0">
              <BsPlayCircle className="text-2xl text-white" />
            </div>
          </div>
          <div className="bg-white px-3 pb-5 rounded-b-lg">
            <p className="text-sm font-bold pt-2">Introduction to Bitcoin</p>
            <div className="flex pt-2">
              <p className="text-xs text-[#0099FF] bg-[#E3F2FD] px-5 py-1 rounded-full">
                Beginner
              </p>
            </div>
            <p className="text-[10px] pt-2">
              This is the first video of our 5 video series on Bitcoin. The aim
              of this series is to simplify the concept of Cryptocurrencies.
              This is the first video of our 5 video series on Bitcoin. The aim
              of this series is to simplify the concept of Cryptocurrencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
