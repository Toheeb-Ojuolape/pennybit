import React from "react";
import Icon from "../components/Icons";

const Verification = () => {
  return (
    <div className="bg-background min-h-screen flex justify-center items-center w-full">
      <div className="lg:w-[35%] py-10 px-4 w-full">
        <div className="flex justify-center pb-5">
          <Icon height="32" width="43" id="logo-icon" />
        </div>
        <div className="bg-white px-4 py-10 md:p-10 rounded-3xl">
          <div className="pb-5">
            <p className="text-3xl text-center font-sans pb-1">Token Sent to your Email</p>
            <p className="text-sm text-center mt-4">We’ve sent an OTP to your email. Kindly enter it below to confirm your email address</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
