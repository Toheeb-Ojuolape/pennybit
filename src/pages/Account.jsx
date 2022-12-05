import React, { useEffect } from "react";
import Wrapper from "../HOC/Wrapper";
import Image01 from "../assets/image/profile.png";
import InputField from "../components/InputField";
import { Formik } from "formik";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutationMutation } from "../redux/services";
import { setLoginUser } from "../redux/slices/auth";
import { toast } from "react-toastify";
import * as Yup from "yup";

const updateProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
});

const initialProfileValue = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

const Account = () => {
  const dispatch = useDispatch();
  const { authorization, user } = useSelector((state) => state.authStore);
  const [updateUser, { data, isLoading, isSuccess: updateSuccess, isError: isUpdateError, error: updateError }] = useUpdateUserMutationMutation();

  const handleSubmit = (values) => {
    updateUser(values);
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Profile updated successfully");
      dispatch(setLoginUser({ data: { user: data?.data?.user, token: authorization?.access } }));
    }
    if (isUpdateError && updateError && "status" in updateError) {
      toast.error(updateError?.data?.message);
    }
  }, [updateSuccess, isUpdateError, updateError, dispatch, authorization?.access, data?.data?.user]);

  return (
    <Wrapper>
      <>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-light-orange rounded-full p-2">
            <img src={Image01} alt="" className="w-[50px] h-[50px] object-cover" />
          </div>
          <p className="text-2xl font-semibold">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm lowercase">@{user?.firstName}</p>
        </div>

        <div className="mt-6">
          <p className="text-sm bg-[#FAFAFA] p-5 rounded">Personal Information</p>
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ ...initialProfileValue, firstName: user?.firstName, lastName: user?.lastName, phoneNumber: user?.phoneNumber }}
            enableReinitialize
            validationSchema={updateProfileSchema}
          >
            {({ handleSubmit, values, setFieldTouched, isValid, errors }) => (
              <>
                <div className="grid grid-cols-2 gap-5">
                  <InputField label="First Name" placeholder="What is your first name?" name="firstName" setFieldTouched={setFieldTouched} />
                  <InputField label="Last Name" placeholder="What is your last name?" name="lastName" setFieldTouched={setFieldTouched} />
                </div>
                <InputField
                  label="Phone Number"
                  placeholder="Tell us your phone number"
                  name="phoneNumber"
                  isValid={values?.phoneNumber && !errors?.phoneNumber}
                  setFieldTouched={setFieldTouched}
                />{" "}
                <Button disabled={!isValid} onClick={handleSubmit} loader={isLoading}>
                  Update
                </Button>
              </>
            )}
          </Formik>
        </div>
      </>
    </Wrapper>
  );
};

export default Account;
