import React from "react";
import {
  MdDashboard,
  MdOndemandVideo,
  MdOutlineAccountCircle,
} from "react-icons/md";
import { BiTransfer, BiLogOut, BiWallet } from "react-icons/bi";
import { BsFillNodePlusFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import Icon from "./Icons";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="px-2 xl:px-10 w-[25%] h-screen bg-[#f5f5f5] md:flex flex-col justify-between pb-10 sticky top-0 hidden">
      <div>
        <div className="flex items-center">
          <Icon height="25" width="30" id="logo-icon" />
          <p className="px-2 py-7 text-base text-orange font-semibold">
            Pennybit
          </p>
        </div>

        <div className="w-full">
          <Link to="/dashboard">
            <div
              className={`flex items-center text-black text-lg mb-7 font-semibold px-5 cursor-pointer py-3 ${
                location.pathname === "/dashboard" &&
                "text-center rounded-lg text-black flex-purple bg-orange !text-white"
              }`}
            >
              <MdDashboard className="text-3xl mr-7" />
              <p>Dashboard</p>
            </div>
          </Link>
          <Link to="/wallet">
            <div
              className={`flex items-center text-black text-lg mb-7 font-semibold px-5 cursor-pointer py-3  ${
                location.pathname === "/wallet" &&
                "text-center rounded-lg text-black flex-purple bg-white"
              }`}
            >
              <BiWallet className="text-3xl mr-7" />
              <p>Wallet</p>
            </div>
          </Link>
          <Link to="/exchange">
            <div
              className={`flex items-center text-black text-lg mb-7 font-semibold px-5 cursor-pointer py-3  ${
                location.pathname === "/exchange" &&
                "text-center rounded-lg text-black flex-purple bg-white"
              }`}
            >
              <BiTransfer className="text-3xl mr-7" />
              <p>Exchange</p>
            </div>
          </Link>
          <Link to="/learn">
            <div
              className={`flex items-center text-black text-lg mb-7 font-semibold px-5 cursor-pointer py-3  ${
                location.pathname === "/learn" &&
                "text-center rounded-lg text-black flex-purple bg-white"
              }`}
            >
              <MdOndemandVideo className="text-3xl mr-7" />
              <p>Learn</p>
            </div>
          </Link>
          <Link to="/play">
            <div
              className={`flex items-center text-black text-lg mb-7 font-semibold px-5 cursor-pointer py-3  ${
                location.pathname === "/play" &&
                "text-black text-center rounded-lg text-black flex-purple bg-white"
              }`}
            >
              <BsFillNodePlusFill className="text-3xl mr-7" />
              <p>Play</p>
            </div>
          </Link>
          <Link to="/account">
            <div
              className={`flex items-center text-black text-lg mb-7 font-semibold px-5 cursor-pointer py-3  ${
                location.pathname === "/account" &&
                "text-center rounded-lg text-black flex-purple bg-white"
              }`}
            >
              <MdOutlineAccountCircle className="text-3xl mr-7" />
              <p>Account</p>
            </div>
          </Link>
        </div>
      </div>
      <div className=" flex items-center text-lg px-5 font-semibold cursor-pointer">
        <BiLogOut className="text-3xl mr-7 text-black flex-purple" />
        <p className="text-black">Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
