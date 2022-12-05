import * as Yup from "yup";

export const initialSignInValues = {
  email: "",
  password: "",
};
export const initialSignUpValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
};

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").trim().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").trim().required("Email is required"),
  password: Yup.string().required("Password is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.number()
    .required("Phone number  is a required field")
    .typeError("Only digit(s) is allowed")
    .test("len", "Minimum is 10 digits", (val) => val?.toString().length >= 10),
  dateOfBirth: Yup.date().required("Date of birth is required").nullable(),
  gender: Yup.string((val) => {
    if (val) {
      if (val.length > 0) {
        return Yup.string().required("Gender is required");
      } else {
        return Yup.string().notRequired();
      }
    } else {
      return Yup.string().notRequired();
    }
  }),
});

export const EmailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").trim().required("Email is required"),
});
