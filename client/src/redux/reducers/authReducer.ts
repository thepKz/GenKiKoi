import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
  email: "",
  role: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("auth_GenKiKoi", JSON.stringify(action.payload));
    },
    removeAuth: (state, _action) => {
      state.data = initialState;
      localStorage.removeItem("auth_GenKiKoi");
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth } = authSlice.actions;
