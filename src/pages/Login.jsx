import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import AuthScreen from "../HOC/AuthScreen";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../redux/services";
import { setLoginUser } from "../redux/slices/auth";
import { initialSignInValues, SignInSchema } from "../schema/sign-in.schema";
import { toast } from "react-toastify";

const Login = () => {
  const [password, setPassword] = useState(true);
  const navigate = useNavigate();
  const [login, { data, isLoading, isSuccess, isError, error }] = useLoginUserMutation();
  const dispatch = useDispatch();
  
  const handleSubmit = (values) => {
    login(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setLoginUser(data));
      navigate("/overview-admin");
    }
    if (isError && error && "status" in error) {
      toast.error(error?.data?.message);
    }
  }, [data, isLoading, isSuccess, isError, error, navigate, dispatch]);

  return (
    <AuthScreen title={"Welcome Back"} subtitle={"Time to make some money moves!"}>
      <Formik onSubmit={handleSubmit} validationSchema={SignInSchema} initialValues={initialSignInValues}>
        {({ values, setFieldTouched, isValid, handleSubmit, errors }) => (
          <>
            <InputField
              label="Email Address"
              placeholder="What is your email address"
              name="email"
              isValid={values?.email && !errors?.email}
              setFieldTouched={setFieldTouched}
            />
            <InputField
              label="Password"
              placeholder="This will be our secret"
              isPassword
              password={password}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              name="password"
              setFieldTouched={setFieldTouched}
            />
            <p className="text-xs text-black font-medium cursor-pointer text-end mb-6">Forgot Password?</p>
            <Button disabled={!isValid || !values?.email} onClick={handleSubmit} loader={isLoading}>
              Log in
            </Button>
          </>
        )}
      </Formik>
      <div className="flex flex-col md:flex-row items-center justify-center pt-3 text-base gap-1">
        <p>Don’t have an account? </p>
        <Link to="register" className="text-orange cursor-pointer font-bold">
          Signup
        </Link>
      </div>
    </AuthScreen>
  );
};

export default Login;
