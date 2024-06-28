import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { handleError } from "../errorHandler";


const decodeVideo = (file) => {
  const byteCharacters = atob(file);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'video/mp4' });
  const videoUrl = URL.createObjectURL(blob);
  return videoUrl
};

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
          const videoURL = decodeVideo(data.file)
          return ({data, videoURL: videoURL})
        }
      } else {
        return rejectWithValue(data.message || "Failed to load lecture")
      }
    } catch (error) {
      return rejectWithValue(handleError(error))
      // return rejectWithValue(error.response?.data?.message || error.message || "Error loading lecture")
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
          state.videoInfo = action.payload.data.data
          state.file = action.payload.videoURL
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