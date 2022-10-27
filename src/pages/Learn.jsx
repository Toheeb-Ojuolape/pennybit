import React from "react";
import LearnBitcoin from "../components/LearnBitcoin";
import Wrapper from "../HOC/Wrapper";

const Learn = () => {
  return (
    <Wrapper>
      <div className="flex flex-wrap justify-between gap-8">
        <div className="w-[45%]">
          <LearnBitcoin />
        </div>
        <div className="w-[45%]">
          <LearnBitcoin />
        </div>
        <div className="w-[45%]">
          <LearnBitcoin />
        </div>
        <div className="w-[45%]">
          <LearnBitcoin />
        </div>
      </div>
    </Wrapper>
  );
};

export default Learn;
