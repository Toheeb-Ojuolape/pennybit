import React from "react";
import Spinner from "./Loader/Spinner";

const Button = ({ onClick, loader, children, classname, disabled, ...rest }) => {
  return (
    <button
      onClick={onClick}
      {...rest}
      disabled={disabled}
      className={`p-3 mt-4 rounded-full focus:outline-none text-white ${disabled ? "bg-[#E0E0E0]" : "bg-orange "} w-full text-lg`}
    >
      {loader ? <Spinner /> : <>{children}</>}
    </button>
  );
};

export default Button;
