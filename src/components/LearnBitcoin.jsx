import React from "react";
import { BsPlayCircle } from "react-icons/bs";
import Image01 from "../assets/image/learnBitcoin.png";

const LearnBitcoin = () => {
  return (
    <div className="w-full shadow-2xl rounded-b-2xl">
      <div className="w-full relative h-full">
        <img src={Image01} alt="" className="w-full h-full" />
        <div className="absolute w-full h-full flex justify-center items-center top-0">
          <BsPlayCircle className="text-2xl text-white" />
        </div>
      </div>
      <div className="bg-white px-3 pb-5 rounded-b-xl">
        <p className="text-sm font-bold pt-2">Introduction to Bitcoin</p>
        <div className="flex pt-2">
          <p className="text-xs text-[#0099FF] bg-[#E3F2FD] px-5 py-1 rounded-full">
            Beginner
          </p>
        </div>
        <p className="text-[10px] pt-2">
          This is the first video of our 5 video series on Bitcoin. The aim of
          this series is to simplify the concept of Cryptocurrencies. This is
          the first video of our 5 video series on Bitcoin. The aim of this
          series is to simplify the concept of Cryptocurrencies.
        </p>
      </div>
    </div>
  );
};

export default LearnBitcoin;
