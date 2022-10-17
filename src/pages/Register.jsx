import React, { useState } from "react";
import Image01 from "../assets/svg/logo.svg";
import Image02 from "../assets/image/Vector.jpg";
import { BsFillEyeSlashFill, BsFillEyeFill, BsCalendar } from "react-icons/bs";

const Register = () => {
  const [password, setPassword] = useState(false);
  const [youngster, setYoungster] = useState(true);
  return (
    <div className="bg-background h-full flex justify-center items-center w-full">
      <div className="w-[35%] py-10">
        <div className="flex justify-center pb-5">
          <img src={Image01} alt="" />
        </div>

        <div className="bg-white p-10 rounded-3xl">
          <div className="mb-3">
            <p className="font-sans text-3xl text-center">
              Open an <span className="text-orange">account</span>
            </p>
            <p className="text-center text-xs text-black">
              Endless financial possibilities for young people
            </p>
          </div>

          <div className="flex justify-between text-[10px] pb-3">
            <button
              className={`w-[50%] ${
                youngster && "bg-background border-b-2 border-orange py-2"
              }`}
              onClick={() => setYoungster(true)}
            >
              As a Youngster
            </button>
            <button
              className={`w-[50%] ${
                !youngster && "bg-background border-b-2 border-orange py-2"
              }`}
              onClick={() => setYoungster(false)}
            >
              As a Parent
            </button>
          </div>

          {!youngster && (
            <div className="flex items-center gap-3 pb-5">
              <img src={Image02} alt="" />
              <p className="text-[10px]">
                As a parent, you can create a custodian account for your kid on
                Pennybit.
                <br /> To learn more about custodian accounts, click here
              </p>
            </div>
          )}

          <form action="">
            <div className="pb-3">
              <p className="text-xs pb-1 text-black font-medium">First Name</p>
              <input
                type="text"
                placeholder="What is your first name?"
                className="w-full border-2 rounded-2xl p-2 border-[#ADADAD] placeholder-[#877F7F] focus:outline-none"
              />
            </div>
            <div className="pb-3">
              <p className="text-xs pb-1 text-black font-medium">Last Name</p>
              <input
                type="text"
                placeholder="What is your last name?"
                className="w-full border-2 rounded-2xl p-2 border-[#ADADAD] placeholder-[#877F7F] focus:outline-none"
              />
            </div>
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
            <div className="pb-3">
              <p className="text-xs pb-1 text-black font-medium">
                Phone Number
              </p>
              <input
                type="text"
                placeholder="Tell us your phone number"
                className="w-full border-2 rounded-2xl p-2 border-[#ADADAD] placeholder-[#877F7F] focus:outline-none"
              />
            </div>
            {youngster && (
              <div className="pb-3">
                <p className="text-xs pb-1 text-black font-medium">
                  Date of Birth
                </p>
                <div className="flex justify--between items-center w-full border-2 rounded-2xl p-2 border-[#ADADAD]">
                  <input
                    type="text"
                    placeholder="25-12-1998"
                    className="w-full placeholder-[#877F7F] focus:outline-none"
                  />
                  <BsCalendar className="cursor-pointer text-2xl" />
                </div>
              </div>
            )}
            <div className="pb-3">
              <p className="text-xs pb-1 text-black font-medium">Password</p>
              <div className="flex justify--between items-center w-full border-2 rounded-2xl p-2 border-[#ADADAD]">
                <input
                  type={password ? "password" : "text"}
                  placeholder="This will be our secret"
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
              Create Account
            </button>
          </form>
          <div className="flex justify-center pt-3 text-base gap-1">
            <p>Already have an account?</p>
            <p className="text-orange cursor-pointer">Login</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
