import React, { useEffect, useState } from "react";
import Imag02 from "../assets/image/49.png";
import Imag03 from "../assets/image/108.png";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { Formik } from "formik";
import AuthScreen from "../HOC/AuthScreen";
import Gender from "./Gender";
import DateField from "../components/DateField";
import RegisterHeader from "../components/RegisterHeader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../redux/services";
import { initialSignUpValues, SignUpSchema } from "../schema/sign-in.schema";

const Register = () => {
  const [password, setPassword] = useState(true);
  const [youngster, setYoungster] = useState(true);
  const [selectGender, setSelectGender] = useState(false);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [register, { data, isLoading, isSuccess, isError, error }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const handleSubmit = (values, { setFieldTouched }) => {
    if (!youngster) {
      setFieldTouched("gender", true);
      setSelectGender(true);
      if (selectGender) {
        const { dateOfBirth, ...rest } = values;
        register({ ...rest, gender: selected?.value });
      }
    } else {
      register(values);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      JSON.stringify(localStorage.setItem("email", JSON.stringify(data?.data?.user?.email)));
      navigate("/verification");
    }
    if (isError && error && "status" in error) {
      toast.error(error?.data?.message);
    }
  }, [data, isLoading, isSuccess, isError, error, navigate, dispatch]);

  return (
    <AuthScreen
      title={
        !selectGender ? (
          <>
            Open an <span className="text-orange">account</span>
          </>
        ) : (
          "Choose your gender:"
        )
      }
      subtitle={selectGender ? "" : "Endless financial possibilities for young people"}
    >
      <Formik onSubmit={handleSubmit} validationSchema={SignUpSchema} initialValues={initialSignUpValues}>
        {({ values, setFieldTouched, isValid, handleSubmit, errors, setFieldValue }) =>
          !selectGender ? (
            <>
              <RegisterHeader youngster={youngster} setYoungster={setYoungster} setFieldValue={setFieldValue} />
              <div>
                <>
                  <InputField
                    label="First Name"
                    placeholder="What is your first name?"
                    name="firstName"
                    isValid={values?.firstName && !errors?.firstName}
                    setFieldTouched={setFieldTouched}
                  />
                  <InputField
                    label="Last Name"
                    placeholder="What is your last name?"
                    name="lastName"
                    isValid={values?.lastName && !errors?.lastName}
                    setFieldTouched={setFieldTouched}
                  />
                  <InputField
                    label="Email Address"
                    placeholder="What is your email address"
                    name="email"
                    isValid={values?.email && !errors?.email}
                    setFieldTouched={setFieldTouched}
                  />
                  <InputField
                    label="Phone Number"
                    placeholder="Tell us your phone number"
                    name="phoneNumber"
                    isValid={values?.phoneNumber && !errors?.phoneNumber}
                    setFieldTouched={setFieldTouched}
                  />
                  {youngster && <DateField date={values?.dateOfBirth} setFieldValue={setFieldValue} name={"dateOfBirth"} />}
                  <InputField
                    label="Password"
                    placeholder="This will be our secret"
                    isPassword
                    password={password}
                    setPassword={setPassword}
                    name="password"
                    isValid={values?.password && !errors?.password}
                    setFieldTouched={setFieldTouched}
                    handleSubmit={handleSubmit}
                  />
                  <Button disabled={!isValid || !values?.email} onClick={handleSubmit} loader={isLoading}>
                    Create Account{" "}
                  </Button>
                </>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center pt-3 text-base gap-1">
                <p>Already have an account?</p>
                <Link to="/" className="text-orange cursor-pointer font-bold">
                  Login
                </Link>
              </div>
            </>
          ) : (
            <div className="py-6">
              <div className="flex justify-center items-center gap-16 pb-12">
                <Gender name="babe" img={Imag02} selected={selected} setSelected={setSelected} />
                <Gender name="bro" img={Imag03} selected={selected} setSelected={setSelected} />
              </div>
              <Button disabled={!selected || !isValid || !values?.email} onClick={handleSubmit} loader={isLoading}>
                Continue{" "}
              </Button>
            </div>
          )
        }
      </Formik>
    </AuthScreen>
  );
};

export default Register;
