import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
  photoUrl: "",
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
      localStorage.setItem("admin_GenKiKoi", JSON.stringify(action.payload));
    },
    removeAuth: (state, _action) => {
      state.data = initialState;
      localStorage.setItem("admin_GenKiKoi", JSON.stringify({}));
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth } = authSlice.actions;
