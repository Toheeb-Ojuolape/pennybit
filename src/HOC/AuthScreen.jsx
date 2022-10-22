import React from "react";
import Image01 from "../assets/svg/logo.svg";

const AuthScreen = ({ children, title, subtitle }) => {
  return (
    <div className="bg-background min-h-screen flex justify-center items-center w-full">
      <div className="lg:w-[35%] py-10 px-4 w-full">
        <div className="flex justify-center pb-5">
          <img src={Image01} alt="" />
        </div>
        <div className="bg-white px-4 py-10 md:p-10 rounded-3xl">
          <div className="pb-5">
            <p className="text-3xl text-center font-sans pb-1">{title}</p>
            <p className="text-sm text-center">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
