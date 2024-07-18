import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../errorHandler";
import { handleResponse } from "../../responseHandler";

export const GetStudentAttendance = createAsyncThunk(
  "GetStudentAttendance",
  async (ID, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/GetStudentAttendance`,
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

const initialState = {
  attendanceData: [],
  presentCount: 0,
  absentCount: 0,
  loading: false,
  error: null,
  popup: false,
};

const studentDashboardSlice = createSlice({
  name: "studentDashboard",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPopup: (state, action) => {
      state.popup = !!action.payload;
      // even though we will only pass true or false to this but I'm still writing '!!' to ensure this stays as a boolean type state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetStudentAttendance.pending, (state) => {
        state.popup = false;
        state.error = "Loading Attendance Data";
        state.loading = true;
      })
      .addCase(GetStudentAttendance.fulfilled, (state, action) => {
        state.attendanceData = action.payload.attendance;
        state.absentCount = action.payload.absentCount;
        state.presentCount = action.payload.presentCount;
        state.loading = false;
      })
      .addCase(GetStudentAttendance.rejected, (state, action) => {
        state.error = action.payload || "An Unknown Error Occurred";
        state.loading = false;
        state.popup = true;
      });
  },
});

export const { setError, setPopup } = studentDashboardSlice.actions;

export default studentDashboardSlice.reducer;
