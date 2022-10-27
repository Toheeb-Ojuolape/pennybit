import React from "react";
import Wrapper from "../HOC/Wrapper";
import Image01 from "../assets/image/virtualCard.png";

const VirtualCard = () => {
  return (
    <Wrapper>
      <>
        <div className="relative flex justify-center items-center">
          <img src={Image01} alt="" />
          <p className="absolute top-[7%] right-[40%] bg-pink text-white text-xl py-1 px-5 rounded-full">
            Coming soon
          </p>
        </div>
        <p className="text-center text-2xl font-medium">
          Make payments internationally with your <br />
          Virtual Bitcoin Credit Card
        </p>
      </>
    </Wrapper>
  );
};

export default VirtualCard;
