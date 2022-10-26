import React from "react";
import Image01 from "../assets/image/profile.png";
import { MdNotifications } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex justify-center items-center gap-3">
        <div className="bg-light-orange rounded-full p-1">
          <img src={Image01} alt="" />
        </div>
        <div>
          <p className="text-3xl font-bold">Hey Wakeel</p>
          <p>you’re a cool kid!</p>
        </div>
      </div>
      <MdNotifications className="text-3xl mr-2 " />
    </div>
  );
};

export default Navbar;
