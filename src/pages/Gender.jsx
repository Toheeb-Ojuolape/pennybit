import React from "react";
import Image01 from "../assets/svg/logo.svg";
import Imag02 from "../assets/image/49.png";
import Imag03 from "../assets/image/108.png";

const Gender = () => {
  return (
    <div className="bg-background h-screen flex justify-center items-center w-full">
      <div className="w-[30%] py-10">
        <div className="flex justify-center pb-5">
          <img src={Image01} alt="" />
        </div>
        <div className="bg-white py-10 px-16 rounded-3xl ">
          <p className="text-3xl text-center font-sans pb-10">
            Choose your gender:
          </p>
          <div className="flex justify-center items-center gap-16">
            <div className="flex flex-col items-center justify-center px-4 py-1 rounded-lg border-2 border-orange shadow-2xl cursor-pointer">
              <img src={Imag02} alt="" />
              <p>Babe</p>
            </div>
            <div className="flex flex-col items-center justify-center px-4 py-1 rounded-lg shadow-2xl cursor-pointer">
              <img src={Imag03} alt="" />
              <p>Bro</p>
            </div>
          </div>
          <button className="p-4  mt-10 rounded-full text-white bg-orange w-full text-lg hover:border-2 hover:border-orange hover:text-orange hover:bg-transparent">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gender;
