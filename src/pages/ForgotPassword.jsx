import React from "react";
import Button from "../components/Button";
import AuthScreen from "../HOC/AuthScreen";
import { Formik } from "formik";
import InputField from "../components/InputField";

const ForgotPassword = () => {
  return (
    <AuthScreen title={"Forgot Passowrd"} subtitle="Don’t worry, we got you!. Enter your email below">
      <Formik onSubmit={() => null} initialValues={{}} enableReinitialize validationSchema={""}>
        {({ handleSubmit }) => (
          <>
            <InputField label="Email Address" placeholder="What is your email address" name="email" />
            <Button content={"Recover Password"} />
          </>
        )}
      </Formik>
    </AuthScreen>
  );
};

export default ForgotPassword;
