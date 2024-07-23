import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../errorHandler";
import { handleResponse } from "../../responseHandler";

export const GetStudentWeekAttendance = createAsyncThunk(
  "GetStudentWeekAttendance",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/GetStudentWeekAttendance`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data.data;
      } else {
        return rejectWithValue(handleResponse(data))
      }
    } catch (error) {
      return rejectWithValue(handleError(error))
    }
  }
);
export const GetTeacherAttendance = createAsyncThunk(
  "GetTeacherAttendance",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/GetTeacherAttendance`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data.data;
      } else {
        return rejectWithValue(handleResponse(data))
      }
    } catch (error) {
      return rejectWithValue(handleError(error))
    }
  }
);
export const GetTotalExpenses = createAsyncThunk(
  "GetTotalExpenses",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/TotalExpensives`,
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
        return rejectWithValue(handleResponse(data))
      }
    } catch (error) {
      return rejectWithValue(handleError(error))
    }
  }
);
export const GetGeneratedPaidFee = createAsyncThunk(
  "GetGeneratedPaidFee",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/GeneratedPaidFee`,
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
        return rejectWithValue(handleResponse(data))
      }
    } catch (error) {
      return rejectWithValue(handleError(error))
    }
  }
);
export const GetGeneratedChallans = createAsyncThunk(
  "GetGeneratedChallans",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/GeneratedChallans`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data.data;
      } else {
        return rejectWithValue(handleResponse(data))
      }
    } catch (error) {
      return rejectWithValue(handleError(error))
    }
  }
)

const initialState = {
    challans: [],
    feeData: [],
    expenses: [],
    staffAttendance: [],
    studentWeekAttendance: [],
    loading: false,
    error: null,
    popup: false,
  };

const createDashboardsSlice = createSlice({
  name: "dashboard",
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
      .addCase(GetStudentWeekAttendance.pending, (state) => {
        state.popup = false
        state.error = "Loading Weekly Attendance Data";
        state.loading = true;
      })
      .addCase(GetStudentWeekAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.studentWeekAttendance = action.payload;
      })
      .addCase(GetStudentWeekAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An Unknown Error";
        state.popup = true;
      })
      .addCase(GetTeacherAttendance.pending, (state) => {
        state.popup = false
        state.error = "Loading Teachers' Attendance Data";
        state.loading = true;
      })
      .addCase(GetTeacherAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.staffAttendance = action.payload;
      })
      .addCase(GetTeacherAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An Unknown Error";
        state.popup = true;
      })
      .addCase(GetTotalExpenses.pending, (state) => {
        state.popup = false
        state.error = "Loading Expenses";
        state.loading = true;
      })
      .addCase(GetTotalExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(GetTotalExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An Unknown Error";
        state.popup = true;
      })
      .addCase(GetGeneratedPaidFee.pending, (state) => {
        state.popup = false
        state.error = "Loading Fee Data";
        state.loading = true;
      })
      .addCase(GetGeneratedPaidFee.fulfilled, (state, action) => {
        state.loading = false;
        state.feeData = action.payload;
      })
      .addCase(GetGeneratedPaidFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An Unknown Error";
        state.popup = true;
      })
      .addCase(GetGeneratedChallans.pending, (state) => {
        state.popup = false
        state.error = "Loading Fee Data";
        state.loading = true;
      })
      .addCase(GetGeneratedChallans.fulfilled, (state, action) => {
        state.loading = false;
        state.challans = action.payload;
      })
      .addCase(GetGeneratedChallans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An Unknown Error";
        state.popup = true;
      })
  },
});

export const { setError, setPopup } = createDashboardsSlice.actions;

export default createDashboardsSlice.reducer;
