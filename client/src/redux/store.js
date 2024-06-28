// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import UploadLectureReducer from "./slices/UploadLecture";
import createClassReducer from "./slices/CreateClass";
import createStudentReducer from "./slices/CreateStudent";
import watchVideosSlice from "./slices/WatchVideos"

const store = configureStore({
  reducer: {
    auth: authReducer,
    uploadLecture: UploadLectureReducer,
    createClass: createClassReducer,
    createStudent: createStudentReducer,
    watchVideos: watchVideosSlice,
  },
  devTools: true,
});

export default store;
