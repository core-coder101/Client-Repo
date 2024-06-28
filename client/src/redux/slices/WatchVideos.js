import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const getVideoByID = createAsyncThunk("getVideoByID", async (ID, { getState, rejectWithValue }) => {
  const state = getState()
  const CSRFToken = state.auth.CSRFToken
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/show-video?ID=${ID}`,
        {
        headers: {
          "X-CSRF-TOKEN": CSRFToken,
          "Content-Type": "application/json",
          "API-TOKEN": "IT is to secret you cannot break it :)",
        },
      })
      if (data.success == true) {
        if (!data.data) {
        return rejectWithValue("Lecture not found")
        } else {
          return (data)
        }
      } else {
        return rejectWithValue(data.message || "Failed to load lecture")
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data?.message || error.message || "Error loading lecture")
    }
})

  const initialState = {
    loading: false,
    error: null,
    popup: false,
    videoInfo: null,
    file: null,
  }

const watchVideosSlice = createSlice({
    name: "watchVideos",
    initialState,
    reducers: {
      setError: (state, action) => {
        state.error = action.payload
      },
      setPopup: (state, action) => {
        state.popup = !!action.payload
        // even though we will only pass true or false to this but I'm still writing '!!' to ensure this stays as a boolean type state
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getVideoByID.pending, (state) => {
          state.error = "Loading Lecture"
          state.loading = true
        })
        .addCase(getVideoByID.fulfilled, (state, action) => {
          state.videoInfo = action.payload.data
          state.file = action.payload.file
          state.loading = false
        })
        .addCase(getVideoByID.rejected, (state, action) => {
          state.error = action.payload || "An Unknown Error"
          state.loading = false
          state.popup = true
        })
    }
})

export const {
  setError,
  setPopup,
  setProgress
} = watchVideosSlice.actions;

export default watchVideosSlice.reducer;