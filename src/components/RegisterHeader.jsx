import dayjs from "dayjs";
import React from "react";
import Image02 from "../assets/image/Vector.jpg";

const RegisterHeader = ({ youngster, setYoungster, setFieldValue }) => {
  return (
    <>
      <div className="flex justify-between text-[14px] pb-3">
        <button className={`font-bold w-[50%] ${youngster && "bg-background border-b-2 border-orange py-2"}`} onClick={() => setYoungster(true)}>
          As a Youngster
        </button>
        <button
          className={`font-bold w-[50%] ${!youngster && "bg-background border-b-2 border-orange py-2"}`}
          onClick={() => {
            setFieldValue("dateOfBirth", dayjs(new Date()).format("YYYY-MM-DD"));
            setYoungster(false);
          }}
        >
          As a Parent
        </button>
      </div>
      {!youngster && (
        <div className="flex items-center gap-3 pb-5">
          <img src={Image02} alt="" />
          <p className="text-[10px]">
            As a parent, you can create a custodian account for your kid on Pennybit.
            <br /> To learn more about custodian accounts, click here
          </p>
        </div>
      )}
    </>
  );
};

export default RegisterHeader;
