// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import classReducer from "./slices/UploadLecture";
import createClassReducer from "./slices/ClassesSlice";
import createStudentReducer from "./slices/CreateStudent";

const store = configureStore({
  reducer: {
    auth: authReducer,
    classes: classReducer,
    createClass: createClassReducer,
    createStudent: createStudentReducer,
  },
  devTools: true,
});

export default store;
