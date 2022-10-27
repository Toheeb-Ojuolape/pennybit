import React from "react";
import Image01 from "../assets/image/Bitcoin 1.png";
import Image02 from "../assets/image/chart.png";

const ExchangeDetail = ({ title }) => {
  return (
    <div className="flex items-center space-between pt-5">
      <div className="w-[40%] flex items-center gap-3">
        <img src={Image01} alt="" />
        <p className="font-bold text-sm">{title}</p>
      </div>
      <p className="w-[20%] text-center font-bold text-sm">$ 23,000</p>
      <p className="w-[20%] text-center font-bold text-sm text-[#2EC76B]">
        +2.25%
      </p>
      <div className="w-[20%] flex items-center justify-center">
        <img src={Image02} alt="" />
      </div>
    </div>
  );
};

export default ExchangeDetail;
