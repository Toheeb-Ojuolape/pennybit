import { Field } from "formik";
import React from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const InputField = ({ label, placeholder, isPassword, password, setPassword, name }) => {
  return (
    <div className="py-2 relative">
      <label className="text-xs text-black font-medium">{label}</label>
      <Field
        type={isPassword ? (password ? "password" : "text") : "text"}
        name={name}
        placeholder={placeholder}
        className="w-full border-2 rounded-2xl mt-1 p-2 border-[#ADADAD] placeholder-[#877F7F] focus:outline-none"
      />
      {isPassword &&
        (password ? (
          <BsFillEyeFill className="cursor-pointer absolute top-1/2 right-4 text-gray-500 text-2xl" onClick={() => setPassword(false)} />
        ) : (
          <BsFillEyeSlashFill className="cursor-pointer absolute text-2xl top-1/2 text-gray-500 right-4" onClick={() => setPassword(true)} />
        ))}
    </div>
  );
};

export default InputField;
