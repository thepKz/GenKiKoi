import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  id: string;
  username: string;
  photoUrl: string;
  email: string;
  role: string;
  token: string;
  isVerified: boolean;
}

const initialState: AuthState = {
  id: "",
  username: "",
  photoUrl: "",
  email: "",
  role: "",
  token: "",
  isVerified: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action: PayloadAction<AuthState>) => {
      Object.assign(state, action.payload);
      localStorage.setItem("customer_GenKiKoi", JSON.stringify(action.payload));
    },
    removeAuth: (state) => {
      Object.assign(state, initialState);
      localStorage.setItem("customer_GenKiKoi", JSON.stringify({}));
    },
    updateAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.assign(state, action.payload);
      const updatedState = { ...state, ...action.payload };
      localStorage.setItem("customer_GenKiKoi", JSON.stringify(updatedState));
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth, updateAuth } = authSlice.actions;
