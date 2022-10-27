import React from "react";
import Sidebar from "../components/Sidebar";
import Converter from "../components/Converter";
import Navbar from "../components/Navbar";

const Wrapper = ({ children }) => {
  return (
    <div className="flex md:flex-row flex-col gap-3">
      <Sidebar />
      <div className="w-full flex justify-between h-screen overflow-hidden">
        <div className="w-[70%] bg-[#fff] p-[54px] overflow-auto">
          <Navbar />
          {children}
        </div>
        <div className="w-[30%] bg-[#f5f5f5] py-[81px] px-[37px] overflow-auto">
          <Converter />
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
