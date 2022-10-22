import React, { useState } from "react";
import Button from "../components/Button";
import { Formik } from "formik";
import AuthScreen from "../HOC/AuthScreen";
import InputField from "../components/InputField";

const NewPassword = () => {
  const [password, setPassword] = useState(true);
  return (
    <AuthScreen title={"Reset Password"} subtitle={"You may proceed to reset your password here!"}>
      <Formik onSubmit={() => null} initialValues={{}} enableReinitialize validationSchema={""}>
        {({ handleSubmit }) => (
          <>
            <InputField label="New Password" isPassword password={password} setPassword={setPassword} name="password" />{" "}
            <InputField label="Confirm New Password" isPassword password={password} setPassword={setPassword} name="password" />
            <Button content={"Change Password"} />
          </>
        )}
      </Formik>
    </AuthScreen>
  );
};

export default NewPassword;
