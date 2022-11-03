import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ErrorMessage } from "formik";
import { BsCalendar } from "react-icons/bs";

const DateField = ({ date, setFieldValue, name, setFieldTouched }) => {
  return (
    <div className="relative flex w-full border-[#ADADAD] placeholder-[#877F7F] flex-col mt-3">
      <label className="text-xs text-black font-medium mb-1">Date of Birth</label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          components={{ OpenPickerIcon: () => <BsCalendar className="cursor-pointer text-xl" /> }}
          className="w-full focus:outline-none"
          inputFormat="DD-MM-YYYY"
          disableMaskedInput={true}
          value={date || null}
          onChange={(value) => setFieldValue(name, value)}
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
        <ErrorMessage name={name} render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal"}>{msg}</div>} />
      </LocalizationProvider>
    </div>
  );
};

export default DateField;
