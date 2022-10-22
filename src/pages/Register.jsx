import React, { useState } from "react";
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

const Register = () => {
  const [password, setPassword] = useState(true);
  const [youngster, setYoungster] = useState(true);
  const [selectGender, setSelectGender] = useState(false);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleChangedate = (value, setFieldValue) => {
    setFieldValue("date", value);
    console.log(value);
  };

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
      {!selectGender ? (
        <>
          <RegisterHeader youngster={youngster} setYoungster={setYoungster} />
          <div>
            <Formik onSubmit={() => null} initialValues={{}} enableReinitialize validationSchema={""}>
              {({ handleSubmit, values, setFieldValue }) => (
                <>
                  <InputField label="First Name" placeholder="What is your first name?" name="firstName" />
                  <InputField label="Last Name" placeholder="What is your last name?" name="lastName" />
                  <InputField label="Email Address" placeholder="What is your email address" name="email" />
                  <InputField label="Phone Number" placeholder="Tell us your phone number" name="phone" />
                  {youngster && <DateField date={values?.date} handleChangedate={(value) => handleChangedate(value, setFieldValue)} />}
                  <InputField
                    label="Password"
                    placeholder="This will be our secret"
                    isPassword
                    password={password}
                    setPassword={setPassword}
                    name="password"
                  />
                  <Button content={"Create Account"} onClick={() => (!youngster ? setSelectGender(true) : navigate("/verification"))} />
                </>
              )}
            </Formik>
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
            <Gender name="Babe" img={Imag02} selected={selected} setSelected={setSelected} />
            <Gender name="bro" img={Imag03} selected={selected} setSelected={setSelected} />
          </div>
          <Button content={"Continue"} onClick={() => navigate("/verification")} />
        </div>
      )}
    </AuthScreen>
  );
};

export default Register;
