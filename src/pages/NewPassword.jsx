import React, { useState } from "react";
import Image01 from "../assets/svg/logo.svg";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

const NewPassword = () => {
  const [password, setPassword] = useState(false);
  return (
    <div className="bg-background h-screen flex justify-center items-center w-full">
      <div className="w-[35%] py-10">
        <div className="flex justify-center pb-5">
          <img src={Image01} alt="" />
        </div>

        <div className="bg-white p-10 rounded-3xl">
          <div className="mb-3">
            <p className="font-sans text-3xl pb-1 text-center">Welcome Back</p>
            <p className="text-center text-xs text-black">
              Time to make some money moves!
            </p>
          </div>

          <form action="">
            <div className="pb-3">
              <p className="text-xs pb-1 text-black font-medium">
                New Password
              </p>
              <div className="flex justify--between items-center w-full border-2 rounded-2xl p-3 border-[#ADADAD]">
                <input
                  type={password ? "password" : "text"}
                  className="w-full placeholder-[#877F7F] focus:outline-none"
                />
                {password ? (
                  <BsFillEyeFill
                    className="cursor-pointer text-2xl"
                    onClick={() => setPassword(false)}
                  />
                ) : (
                  <BsFillEyeSlashFill
                    className="cursor-pointer text-2xl"
                    onClick={() => setPassword(true)}
                  />
                )}
              </div>
            </div>
            <div className="pb-3">
              <p className="text-xs pb-1 text-black font-medium">
                Confirm New Password
              </p>
              <div className="flex justify--between items-center w-full border-2 rounded-2xl p-3 border-[#ADADAD]">
                <input
                  type={password ? "password" : "text"}
                  className="w-full placeholder-[#877F7F] focus:outline-none"
                />
                {password ? (
                  <BsFillEyeFill
                    className="cursor-pointer text-2xl"
                    onClick={() => setPassword(false)}
                  />
                ) : (
                  <BsFillEyeSlashFill
                    className="cursor-pointer text-2xl"
                    onClick={() => setPassword(true)}
                  />
                )}
              </div>
            </div>

            <button className="p-5 rounded-full text-white bg-orange w-full text-lg hover:border-2 hover:border-orange hover:text-orange hover:bg-transparent">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
