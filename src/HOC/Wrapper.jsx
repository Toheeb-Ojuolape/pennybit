import React from "react";
import Sidebar from "../components/Sidebar";

const Wrapper = ({ children }) => {
  return (
    <div className="flex md:flex-row flex-col gap-3">
      <Sidebar />
      {children}
    </div>
  );
};

export default Wrapper;
