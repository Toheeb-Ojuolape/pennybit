import React, { useState } from "react";
import Image02 from "../assets/image/Vector.jpg";
import Imag02 from "../assets/image/49.png";
import Imag03 from "../assets/image/108.png";
import { BsCalendar } from "react-icons/bs";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Formik } from "formik";
import dayjs from "dayjs";
import AuthScreen from "../HOC/AuthScreen";
import Gender from "./Gender";

const Register = () => {
  const [password, setPassword] = useState(true);
  const [youngster, setYoungster] = useState(true);
  const [date, setDate] = useState(dayjs("2014-08-18T21:11:54"));
  const [selectGender, setSelectGender] = useState(false);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleChangedate = (value) => {
    setDate(value);
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
          <div className="flex justify-between text-[14px] pb-3">
            <button className={`font-bold w-[50%] ${youngster && "bg-background border-b-2 border-orange py-2"}`} onClick={() => setYoungster(true)}>
              As a Youngster
            </button>
            <button
              className={`font-bold w-[50%] ${!youngster && "bg-background border-b-2 border-orange py-2"}`}
              onClick={() => setYoungster(false)}
            >
              As a Parent
            </button>
          </div>

          {!youngster && (
            <div className="flex items-center gap-3 pb-5">
              <img src={Image02} alt="" />
              <p className="text-[10px]">
                As a parent, you can create a custodian account for your kid on Pennybit.
                <br /> To learn more about custodian accounts, click here
              </p>
            </div>
          )}
          <div>
            <Formik onSubmit={() => null} initialValues={{}} enableReinitialize validationSchema={""}>
              {({ handleSubmit, setFieldValue }) => (
                <>
                  <InputField label="First Name" placeholder="What is your first name?" name="firstName" />
                  <InputField label="Last Name" placeholder="What is your last name?" name="lastName" />
                  <InputField label="Email Address" placeholder="What is your email address" name="email" />
                  <InputField label="Phone Number" placeholder="Tell us your phone number" name="phone" />
                  {youngster && (
                    <div className="py-2 relative flex w-full border-[#ADADAD] placeholder-[#877F7F] flex-col">
                      <label className="text-xs text-black font-medium mb-1">Date of Birth</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          components={{ OpenPickerIcon: () => <BsCalendar className="cursor-pointer text-xl" /> }}
                          className="w-full focus:outline-none"
                          inputFormat="DD-MM-YYYY"
                          disableMaskedInput={true}
                          value={date}
                          onChange={handleChangedate}
                          renderInput={(params) => (
                            <TextField
                              focused={false}
                              {...params}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& > fieldset": { borderColor: "#ADADAD", borderRadius: "1rem", borderWidth: "2px" },
                                  "&:hover fieldset": {
                                    borderColor: "grey",
                                  },
                                },
                                "& .MuiOutlinedInput-root:hover": {
                                  "& > fieldset": {
                                    borderColor: "#ADADAD",
                                  },
                                },
                              }}
                              inputProps={{
                                ...params.inputProps,
                                style: {
                                  padding: 10,
                                },
                                placeholder: "25-12-1998",
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  )}
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
