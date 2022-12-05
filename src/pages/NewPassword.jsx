import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { Formik } from "formik";
import AuthScreen from "../HOC/AuthScreen";
import InputField from "../components/InputField";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../redux/services";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  newPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const NewPassword = () => {
  const [resetPassword, { isLoading, isSuccess, isError, error }] = useResetPasswordMutation();
  const { token } = useParams();
  const dispatch = useDispatch();
  const [password, setPassword] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    resetPassword({ newPassword: values?.newPassword, token });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "LOGOUT" });
      toast.success("Password reset successfully");
      localStorage.clear();
      navigate("/");
    }
    if (isError && error && "status" in error) {
      toast.error(error?.data?.message);
    }
  }, [isLoading, isSuccess, isError, error, dispatch, navigate]);
  return (
    <AuthScreen title={"Reset Password"} subtitle={"You may proceed to reset your password here!"}>
      <Formik onSubmit={handleSubmit} initialValues={{ password: "", newPassword: "" }} enableReinitialize validationSchema={ResetPasswordSchema}>
        {({ handleSubmit, isValid, setFieldTouched, values }) => (
          <>
            <InputField
              label="New Password"
              isPassword
              password={password}
              setPassword={setPassword}
              name="password"
              setFieldTouched={setFieldTouched}
            />{" "}
            <InputField
              label="Confirm New Password"
              isPassword
              password={password}
              setPassword={setPassword}
              name="newPassword"
              setFieldTouched={setFieldTouched}
              handleSubmit={handleSubmit}
            />
            <Button disabled={!token || !isValid || !values?.password} onClick={handleSubmit} loader={isLoading}>
              Change Password
            </Button>{" "}
          </>
        )}
      </Formik>
    </AuthScreen>
  );
};

export default NewPassword;
