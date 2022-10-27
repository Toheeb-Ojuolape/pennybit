import React from "react";
import Wrapper from "../HOC/Wrapper";
import Image01 from "../assets/image/QRcode.png";
import { AiOutlineCopy } from "react-icons/ai";
import { BsExclamationTriangle } from "react-icons/bs";

const PaymentLink = () => {
  return (
    <Wrapper>
      <>
        <div className="flex justify-center items-center">
          <div className="bg-light-orange p-3 rounded-lg ">
            <img src={Image01} alt="" />
          </div>
        </div>
        <p className="text-center py-2">
          lnffflflriroieriroeioioddfdfjkjkkjkfjkjfdkjfkjd
        </p>
        <div className="flex justify-center items-center">
          <div className="p-2 rounded-full bg-light-orange">
            <AiOutlineCopy className="text-xl" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 pt-3">
          <BsExclamationTriangle className="text-xl text-orange" />
          <p className="text-xs">this lightning invoice expires in 1 hour</p>
        </div>
        <div className="flex justify-center items-center gap-10 pt-5">
          <button className="py-3 px-7 bg-orange text-xs text-white rounded-lg">
            Share
          </button>
          <button className="py-3 px-7 border-2 border-orange text-xs text-orange rounded-lg">
            Close
          </button>
        </div>
      </>
    </Wrapper>
  );
};

export default PaymentLink;
