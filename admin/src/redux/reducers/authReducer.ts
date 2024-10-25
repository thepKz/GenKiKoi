import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  photoUrl: "",
  email: "",
  role: "",
  token: "",
  adminId: "",
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
    updateAuth: (state, action) => {
      state.data = {
        ...state.data,
        photoUrl: action.payload.photoUrl,
      };
    },
    removeAuth: (state, _action) => {
      state.data = initialState;
      localStorage.setItem("admin_GenKiKoi", JSON.stringify({}));
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth, updateAuth } = authSlice.actions;
