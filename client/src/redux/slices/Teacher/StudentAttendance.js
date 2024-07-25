import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleError } from "../../errorHandler";
import { handleResponse } from "../../responseHandler";
import axios from "axios";

export const GetTeacherClassinfo = createAsyncThunk(
  "GetTeacherClassinfo",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/GetTeacherClassinfo`,
        {
          headers: {
            "X-CSRF-TOKEN": state.auth.CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data.data[0];
      } else {
        return rejectWithValue(
          handleResponse(data.message) || "Failed to fetch User Data"
        );
      }
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
export const teacherAttendance = createAsyncThunk(
  "teacherAttendance",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/teacherattendance`,
        {
          headers: {
            "X-CSRF-TOKEN": state.auth.CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data.message;
      } else {
        return rejectWithValue(
          handleResponse(data) || "Failed to mark your attendance"
        );
      }
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
export const SubmitAttendance = createAsyncThunk(
  "SubmitAttendance",
  async (
    { selectedRows, ClassName, ClassRank },
    { getState, rejectWithValue }
  ) => {
    const state = getState();
    const { teacherData } = state.studentAttendanceTeacher;
    if (!teacherData.classes) {
      return rejectWithValue("No teacher info");
    }
    try {
      let dataToSend = {
        ClassName: ClassName,
        ClassRank: ClassRank,
        campus: "Main Campus",
        selectedRows: selectedRows,
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}api/studentattendance`,
        dataToSend,
        {
          headers: {
            "X-CSRF-TOKEN": state.auth.CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data.message;
      } else {
        return rejectWithValue(handleResponse(data));
      }
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
export const GetTeacherAttendanceDashboard = createAsyncThunk(
  "GetTeacherAttendanceDashboard",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/GetTeacherAttendanceDashboard`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data;
      } else {
        return rejectWithValue(handleResponse(data));
      }
    } catch (error) {
      const errorMessage = handleError(error);
      return rejectWithValue(errorMessage);
      // return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
);

export const GetTodayattendance = createAsyncThunk(
  "GetTodayattendance",
  async ({ ClassRank, ClassName }, { getState, rejectWithValue }) => {
    const state = getState();
    const { teacherData } = state.studentAttendanceTeacher;
    if (!teacherData?.classes?.length > 0) {
      return rejectWithValue("You are not assigned a class yet");
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}api/GetTodayattendance`,
        {
          campus: "Main Campus",
          ClassRank: parseInt(ClassRank),
          ClassName: ClassName,
        },
        {
          headers: {
            "X-CSRF-TOKEN": state.auth.CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data.data;
      } else {
        return rejectWithValue(
          handleResponse(data) || "Failed to fetch User Data"
        );
      }
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
export const GetStudentInformation = createAsyncThunk(
  "GetStudentInformation",
  async ({ ClassRank, ClassName }, { getState, rejectWithValue }) => {
    const state = getState();
    const { teacherData } = state.studentAttendanceTeacher;
    if (!teacherData.classes?.length > 0) {
      return rejectWithValue("You are not assigned a class yet");
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}api/GetStudentInformation`,
        {
          campus: "Main Campus",
          ClassRank: parseInt(ClassRank),
          ClassName: ClassName,
        },
        {
          headers: {
            "X-CSRF-TOKEN": state.auth.CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data.data;
      } else {
        return rejectWithValue(
          handleResponse(data.message) || "Failed to fetch User Data"
        );
      }
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  popup: false,
  teacherData: null,
  studentsData: null,
  todayClassAttendance: [],
  teacherAttendance: [],
  presentCount: 0,
  absentCount: 0,
};

const studentAttendanceSliceTeacher = createSlice({
  name: "studentAttendanceTeacher",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPopup: (state, action) => {
      state.popup = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetTeacherClassinfo.pending, (state) => {
        state.error = "Loading. . .";
        state.loading = true;
      })
      .addCase(GetTeacherClassinfo.fulfilled, (state, action) => {
        state.teacherData = action.payload;
        state.loading = false;
      })
      .addCase(GetTeacherClassinfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.popup = true;
      })
      .addCase(GetStudentInformation.pending, (state) => {
        state.error = "Loading. . .";
        state.loading = true;
      })
      .addCase(GetStudentInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsData = action.payload;
      })
      .addCase(GetStudentInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.popup = true;
      })
      .addCase(SubmitAttendance.pending, (state) => {
        state.error = "Loading. . .";
        state.loading = true;
      })
      .addCase(SubmitAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.popup = true;
      })
      .addCase(SubmitAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.popup = true;
      })
      .addCase(teacherAttendance.pending, (state) => {
        state.error = "Loading Attendance Data";
        state.loading = true;
      })
      .addCase(teacherAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.popup = true;
      })
      .addCase(teacherAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.popup = true;
      })
      .addCase(GetTeacherAttendanceDashboard.pending, (state) => {
        state.popup = false;
        state.error = "Loading Attendance Data";
        state.loading = true;
      })
      .addCase(GetTeacherAttendanceDashboard.fulfilled, (state, action) => {
        state.teacherAttendance = action.payload.attendance;
        state.absentCount = action.payload.absentCount;
        state.presentCount = action.payload.presentCount;
        state.loading = false;
      })
      .addCase(GetTeacherAttendanceDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.popup = true;
      })
      .addCase(GetTodayattendance.pending, (state) => {
        state.popup = false;
        state.error = "Loading Today's Attendance Data";
        state.loading = true;
      })
      .addCase(GetTodayattendance.fulfilled, (state, action) => {
        state.todayClassAttendance = action.payload;
        state.loading = false;
      })
      .addCase(GetTodayattendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.popup = true;
      });
  },
});

export const { setError, setPopup } = studentAttendanceSliceTeacher.actions;

export default studentAttendanceSliceTeacher.reducer;
