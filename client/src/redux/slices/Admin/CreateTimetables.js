import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../errorHandler";
import { handleResponse } from "../../responseHandler";

export const GetTimeTable = createAsyncThunk(
  "GetTimeTable",
  async (ID, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/GetTimeTable?ID=${ID}`,
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
export const submitTimetableLecture = createAsyncThunk(
  "submitTimetableLecture",
  async (dataToSend, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}api/CreateTimeTable`,
        dataToSend,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data.message;
      } else {
        return rejectWithValue(handleResponse(data))
      }
    } catch (error) {
      return rejectWithValue(handleError(error))
    }
  }
);
export const destroyTimeTable = createAsyncThunk(
  "destroyTimeTable",
  async (ID, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/destroyTimeTable?ID=${ID}`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data.message || "Successfully reset timetable data";
      } else {
        return rejectWithValue(handleResponse(data))
      }
    } catch (error) {
      return rejectWithValue(handleError(error))
    }
  }
);

const initialState = {
    DBTimeTableData: [],
    loading: false,
    error: null,
    popup: false,
  };

const createTimetablesSlice = createSlice({
  name: "createTimetable",
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
      .addCase(submitTimetableLecture.pending, (state) => {
        state.popup = false
        state.error = "Submitting Lecture";
        state.loading = true;
      })
      .addCase(submitTimetableLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.popup = true
      })
      .addCase(submitTimetableLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An Unknown Error";
        state.popup = true;
      })
      .addCase(GetTimeTable.pending, (state) => {
        state.popup = false
        state.error = "Loading Timetable";
        state.loading = true;
      })
      .addCase(GetTimeTable.fulfilled, (state, action) => {
        state.loading = false;
        state.DBTimeTableData = action.payload;
      })
      .addCase(GetTimeTable.rejected, (state, action) => {
        state.loading = false;
        state.DBTimeTableData = [];
        state.error = action.payload || "An Unknown Error";
        state.popup = true;
      })
      .addCase(destroyTimeTable.pending, (state) => {
        state.popup = false
        state.error = "Resetting Timetable Data";
        state.loading = true;
      })
      .addCase(destroyTimeTable.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload
        state.popup = true
      })
      .addCase(destroyTimeTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An Unknown Error";
        state.popup = true;
      })
  },
});

export const { setError, setPopup } = createTimetablesSlice.actions;

export default createTimetablesSlice.reducer;
