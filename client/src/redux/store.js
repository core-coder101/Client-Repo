// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import UploadLectureReducer from "./slices/Admin/UploadLecture";
import createClassReducer from "./slices/Admin/CreateClass";
import createStudentReducer from "./slices/Admin/CreateStudent";
import watchVideosSlice from "./slices/Admin/WatchVideos"
import CreateTeacherReducer from "./slices/Admin/CreateTeacherSlice"
import SelectVideoReducer from "./slices/Admin/SelectVideoSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    uploadLecture: UploadLectureReducer,
    createClass: createClassReducer,
    createStudent: createStudentReducer,
    watchVideos: watchVideosSlice,
    createTeacher: CreateTeacherReducer,
    selectVideo: SelectVideoReducer,
  },
  devTools: true,
});

export default store;
