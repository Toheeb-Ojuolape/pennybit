import React from "react";
import OTPInput from "../components/OTPInput/Index";
import AuthScreen from "../HOC/AuthScreen";
import Button from "./Button";

const ConfirmOTP = ({ title }) => {
  const [otp, setOtp] = React.useState("");
  console.log(otp);

  return (
    <AuthScreen title={title} subtitle={"We’ve sent an OTP to your email. Kindly enter it below to confirm your email address"}>
      <div className="mb-10">
        <OTPInput
          autoFocus
          isNumberInput
          length={5}
          className="my-[1.46rem] flex items-center  justify-center"
          inputClassName="border-2 text-[0.78125rem] font-normal outline-none text-center w-[1.7335rem]  md:w-[3.3335rem] text-2xl md:text-4xl mr-[0.83rem]"
          onChangeOTP={(otp) => setOtp(otp)}
        />
      </div>
      <Button content={"Confirm Code"} />
      <div>
        <p className="text-base text-center mt-4">
          Didn’t receive an OTP?
          <span className="underline cursor-pointer"> Resend OTP</span>
        </p>
      </div>
    </AuthScreen>
  );
};

export default ConfirmOTP;
