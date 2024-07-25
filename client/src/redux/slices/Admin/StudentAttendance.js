import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleError } from "../../errorHandler";
import { handleResponse } from "../../responseHandler";
import axios from "axios";

export const GetTodayattendanceForAdmin = createAsyncThunk(
  "GetTodayattendance",
  async ({ ClassRank, ClassName }, { getState, rejectWithValue }) => {
    const state = getState();
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

const initialState = {
  loading: false,
  error: null,
  popup: false,
  todayAttendance: [],
};

const todayAtteendanceStudent = createSlice({
  name: "todayAtteendanceStudent",
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
      .addCase(GetTodayattendanceForAdmin.pending, (state) => {
        state.popup = false;
        state.error = "Loading Today's Attendance Data";
        state.loading = true;
      })
      .addCase(GetTodayattendanceForAdmin.fulfilled, (state, action) => {
        state.todayAttendance = action.payload;
        state.loading = false;
      })
      .addCase(GetTodayattendanceForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.popup = true;
      })
  },
});

export const { setError, setPopup, setLoading } =
  todayAtteendanceStudent.actions;

export default todayAtteendanceStudent.reducer;
