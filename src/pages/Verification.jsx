import React from "react";
import Image01 from "../assets/svg/logo.svg";

const Verification = () => {
  return (
    <div className="bg-background h-screen flex justify-center items-center w-full">
      <div className="w-[35%] py-10">
        <div className="flex justify-center pb-5">
          <img src={Image01} alt="" />
        </div>
        <div className="bg-white py-10 px-16 rounded-3xl ">
          <div className="pb-10">
            <p className="text-3xl text-center font-sans pb-1">
              Verification Code sent
            </p>
            <p className="text-sm text-center">
              We’ve sent an OTP to your email. Kindly enter it below to confirm
              your email address
            </p>
          </div>
          <div>
            <p className="text-base text-center">
              Didn’t receive an OTP?
              <span className="underline cursor-pointer"> Resend OTP</span>
            </p>
          </div>

          <button className="p-4 mt-5 rounded-full text-white bg-orange w-full text-lg hover:border-2 hover:border-orange hover:text-orange hover:bg-transparent">
            Confirm Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
