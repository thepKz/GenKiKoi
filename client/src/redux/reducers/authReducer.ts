import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
  photoUrl: "",
  email: "",
  role: "",
  token: "",
  isVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("customer_GenKiKoi", JSON.stringify(action.payload));
    },
    removeAuth: (state, _action) => {
      state.data = initialState;
      localStorage.setItem("customer_GenKiKoi", JSON.stringify({}));
    },
    updateAuth: (state, action) => {
      state.data = {
        ...action.payload,
        role: state.data.role,
        token: state.data.token,
      };
    },
    checkVerified: (state, _action) => {
      state.data = {
        ...state.data,
        isVerified: true,
      };
      localStorage.setItem("customer_GenKiKoi", JSON.stringify(state.data));
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth, updateAuth, checkVerified } = authSlice.actions;
