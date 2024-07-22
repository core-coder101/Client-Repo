import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../errorHandler";
import { handleResponse } from "../../responseHandler";

export const showAnnouncement = createAsyncThunk(
  "showAnnouncement",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/showAnnouncement`,
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
        return rejectWithValue(handleResponse(data));
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
  announcements: {},
};

const announcementSlice = createSlice({
  name: "announcementSlice",
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
      .addCase(showAnnouncement.pending, (state) => {
        state.popup = false;
        state.error = "Loading Attendance Data";
        state.loading = true;
      })
      .addCase(showAnnouncement.fulfilled, (state, action) => {
        state.announcements = action.payload;
        state.loading = false;
      })
      .addCase(showAnnouncement.rejected, (state, action) => {
        state.error = action.payload || "An Unknown Error Occurred";
        state.loading = false;
        state.popup = true;
      });
  },
});

export const { setError, setPopup } = announcementSlice.actions;

export default announcementSlice.reducer;
