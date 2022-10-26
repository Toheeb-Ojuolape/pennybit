import React from "react";

const Transaction = ({ icon, color, title, amount }) => {
  return (
    <div className="flex justify-between items-center border border-black px-5 py-1 rounded-lg mt-2">
      <div className="flex items-center gap-5">
        <div className={`bg-${color} p-2 rounded-full`}>{icon}</div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs">1 day ago</p>
        </div>
      </div>
      <p className={`text-${color} font-bold`}>{amount}</p>
    </div>
  );
};

export default Transaction;
