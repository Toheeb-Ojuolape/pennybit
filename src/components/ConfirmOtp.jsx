import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OTPInput from "../components/OTPInput/Index";
import AuthScreen from "../HOC/AuthScreen";
import { useActivateUserMutation } from "../redux/services";
import Button from "./Button";

const ConfirmOTP = ({ title }) => {
  const [otp, setOtp] = React.useState("");
  const email = JSON.parse(localStorage.getItem("email"));
  const navigate = useNavigate();
  const [verifyUser, { isLoading, isSuccess, isError, error }] = useActivateUserMutation();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    verifyUser({ pin: otp, email });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    }
    if (isError && error && "status" in error) {
      toast.error(error?.data?.message);
    }
  }, [isLoading, isSuccess, isError, error, navigate, dispatch]);

  return (
    <AuthScreen title={title} subtitle={"We’ve sent an OTP to your email. Kindly enter it below to confirm your email address"}>
      <div className="mb-10">
        <OTPInput
          autoFocus
          isNumberInput
          length={5}
          className="my-[1.46rem] flex items-center  justify-center"
          inputClassName="border-2 text-[0.78125rem] md:py-2 font-normal outline-none text-center w-[1.7335rem]  md:w-[3.3335rem] text-2xl md:text-4xl mr-[0.83rem]"
          onChangeOTP={(otp) => setOtp(otp)}
        />
      </div>
      <Button disabled={otp.length !== 5} onClick={handleSubmit} loader={isLoading}>
        Confirm Code
      </Button>
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
