import { Formik } from "formik";
import React, { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import AuthScreen from "../HOC/AuthScreen";

const Login = () => {
  const [password, setPassword] = useState(true);

  return (
    <AuthScreen title={"Welcome Back"} subtitle={"Time to make some money moves!"}>
      <Formik onSubmit={() => null} initialValues={{}} enableReinitialize validationSchema={""}>
        {({ handleSubmit }) => (
          <>
            <InputField label="Email Address" placeholder="What is your email address" name="email" />
            <InputField
              label="Password"
              placeholder="This will be our secret"
              isPassword
              password={password}
              setPassword={setPassword}
              name="password"
            />
            <p className="text-xs text-black font-medium cursor-pointer text-end mb-6">Forgot Password?</p>
            <Button content={"Log in"} />
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
