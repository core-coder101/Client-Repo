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
export const SubmitAttendance = createAsyncThunk(
  "SubmitAttendance",
  async (selectedRows, { getState, rejectWithValue }) => {
    const state = getState();
    const { teacherData } = state.studentAttendanceTeacher;
    if (!teacherData.classes) {
      return rejectWithValue("No teacher info");
    }
    try {
      let dataToSend = {
        ClassName: teacherData.classes[0].ClassName,
        ClassRank: teacherData.classes[0].ClassRank,
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

export const GetStudentInformation = createAsyncThunk(
  "GetStudentInformation",
  async (_, { getState, rejectWithValue }) => {
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
          ClassRank: parseInt(teacherData.classes[0].ClassRank),
          ClassName: teacherData.classes[0].ClassName,
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
};

const studentAttendanceSliceTeacher = createSlice({
  name: "studentAttendanceTeacher",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.CSRFToken = "";
      state.result = "";
      localStorage.clear();
      delete axios.defaults.headers.common["Authorization"];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPopup: (state, action) => {
      state.popup = !!action.payload;
    },
    setLoading: (state, action) => {
      state.loading = !!action;
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
        state.error = action.payload;
        state.loading = false;
        state.popup = true;
      })
      .addCase(GetStudentInformation.pending, (state) => {
        state.error = "Loading. . .";
        state.loading = true;
      })
      .addCase(GetStudentInformation.fulfilled, (state, action) => {
        state.studentsData = action.payload;
        state.loading = false;
      })
      .addCase(GetStudentInformation.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.popup = true;
      })
      .addCase(SubmitAttendance.pending, (state) => {
        state.error = "Loading. . .";
        state.loading = true;
      })
      .addCase(SubmitAttendance.fulfilled, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.popup = true;
      })
      .addCase(SubmitAttendance.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.popup = true;
      });
  },
});

export const { setError, setPopup, setLoading } =
  studentAttendanceSliceTeacher.actions;

export default studentAttendanceSliceTeacher.reducer;
