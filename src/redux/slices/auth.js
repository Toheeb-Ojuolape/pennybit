import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  authorization: { access: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginUser: (state, { payload }) => {
      state.user = payload?.data?.user;
      state.authorization.access = payload?.data.token;
    },
  },
});

export const { setLoginUser } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
