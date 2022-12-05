import React, { useEffect } from "react";
import Button from "../components/Button";
import AuthScreen from "../HOC/AuthScreen";
import { Formik } from "formik";
import InputField from "../components/InputField";
import { EmailSchema } from "../schema/sign-in.schema";
import { useForgotPasswordMutation } from "../redux/services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading, isSuccess, isError, error }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const formRef = React.useRef(null);

  const handleSubmit = (values) => {
    forgotPassword(values);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset link sent to your email");
      localStorage.setItem("email", JSON.stringify(formRef.current.values.email));
      navigate("/verification");
    }
    if (isError && error && "status" in error) {
      toast.error(error?.data?.message);
    }
  }, [isLoading, isSuccess, isError, error, navigate]);

  return (
    <AuthScreen title={"Forgot Password"} subtitle="Don’t worry, we got you!. Enter your email below">
      <Formik onSubmit={handleSubmit} innerRef={formRef} initialValues={{ email: "" }} enableReinitialize validationSchema={EmailSchema}>
        {({ handleSubmit, isValid, values, setFieldTouched }) => (
          <>
            <InputField
              label="Email Address"
              placeholder="What is your email address"
              name="email"
              handleSubmit={handleSubmit}
              setFieldTouched={setFieldTouched}
            />
            <Button disabled={!isValid || !values?.email} onClick={handleSubmit} loader={isLoading}>
              Recover Password{" "}
            </Button>
          </>
        )}
      </Formik>
    </AuthScreen>
  );
};

export default ForgotPassword;
