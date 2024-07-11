import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../errorHandler";
import { handleResponse } from "../../responseHandler";

export const submitTimetableLecture = createAsyncThunk(
  "submitTimetableLecture",
  async (dataToSend, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_HOST}api/CreateTimeTable`,
        dataToSend,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": process.env.REACT_APP_SECRET_KEY,
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

const initialState = {
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
    SetStudentData: (state, action) => {
      state.StudentData = action.payload;
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
  },
});

export const { setError, setPopup, SetStudentData } = createTimetablesSlice.actions;

export default createTimetablesSlice.reducer;