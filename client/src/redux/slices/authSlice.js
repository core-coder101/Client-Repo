import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  CSRFToken: "",
  result: "",
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCSRFToken: (state, action) => {
      state.CSRFToken = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.CSRFToken = "";
      state.result = "";
      localStorage.clear();
      delete axios.defaults.headers.common["Authorization"];
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setUser: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCSRFToken,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setResult,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
