import React from "react";
import Image01 from "../assets/svg/logo.svg";

const ForgotPassword = () => {
  return (
    <div className="bg-background h-screen flex justify-center items-center w-full">
      <div className="w-[35%] py-10">
        <div className="flex justify-center pb-5">
          <img src={Image01} alt="" />
        </div>

        <div className="bg-white p-10 rounded-3xl">
          <div className="mb-3">
            <p className="font-sans text-3xl text-center pb-1">
              Forgot Password?
            </p>
            <p className="text-center text-xs text-black">
              Don’t worry, we got you!. Enter your email below
            </p>
          </div>

          <form action="">
            <div className="pb-3">
              <p className="text-xs pb-1 text-black font-medium">
                Email Address
              </p>
              <input
                type="text"
                placeholder="What is your email address"
                className="w-full border-2 rounded-2xl p-2 border-[#ADADAD] placeholder-[#877F7F] focus:outline-none"
              />
            </div>

            <button className="p-5 rounded-full text-white bg-orange w-full text-lg hover:border-2 hover:border-orange hover:text-orange hover:bg-transparent">
              Recover Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
