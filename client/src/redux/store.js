// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import classReducer from "./slices/ClassesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    classes: classReducer,
  },
  devTools: true,
});

export default store;
