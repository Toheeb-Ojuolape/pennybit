import { ErrorMessage, Field } from "formik";
import React from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Icon from "./Icons";

const InputField = ({ label, placeholder, isPassword, password, setPassword, name, setFieldTouched, handleSubmit }) => {
  return (
    <div className="mt-3">
      <div className="py-2 relative">
        <label className="text-xs text-black font-medium">{label}</label>
        <Field
          type={isPassword ? (password ? "password" : "text") : "text"}
          name={name}
          placeholder={placeholder}
          onKeyUp={(e) => {
            setFieldTouched(name, true);
            e.key === "Enter" && handleSubmit();
          }}
          className="w-full border-2 rounded-2xl mt-1 p-2 border-[#ADADAD] placeholder-[#877F7F] focus:outline-none"
        />
        {isPassword &&
          (password ? (
            <BsFillEyeFill className="cursor-pointer absolute top-1/2 right-4 text-gray-500 text-2xl" onClick={() => setPassword(false)} />
          ) : (
            <BsFillEyeSlashFill className="cursor-pointer absolute text-2xl top-1/2 text-gray-500 right-4" onClick={() => setPassword(true)} />
          ))}
      </div>{" "}
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div className="text-[12px] text-red-600 text-left flex gap-1 font-normal">
            <Icon id="danger-icon" width="16" height="13" />
            {msg}
          </div>
        )}
      />{" "}
    </div>
  );
};

export default InputField;
