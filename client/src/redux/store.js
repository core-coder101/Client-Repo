// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import UploadLectureReducer from "./slices/UploadLecture";
import createClassReducer from "./slices/CreateClass";

const store = configureStore({
  reducer: {
    auth: authReducer,
    uploadLecture: UploadLectureReducer,
    createClass: createClassReducer,
  },
  devTools: true,
});

export default store;
