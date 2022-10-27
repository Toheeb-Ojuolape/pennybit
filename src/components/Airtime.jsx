import React from "react";

const Airtime = ({ amount, bonus }) => {
  return (
    <div className="w-[130px] h-[100px] shadow rounded-md cursor-pointer flex flex-col justify-center items-center">
      <p className="text-xl font-medium text-[#585858] text-center">{amount}</p>
      <p className="text-xs text-orange text-center">{bonus}</p>
    </div>
  );
};

export default Airtime;
