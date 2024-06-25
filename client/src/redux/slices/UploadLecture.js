import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const GetClasses = createAsyncThunk("GetClasses", async (_, { getState, rejectWithValue }) => {
  const state = getState()
  const CSRFToken = state.auth.CSRFToken
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/GetClasses", {
        headers: {
          "X-CSRF-TOKEN": CSRFToken,
          "Content-Type": "application/json",
          "API-TOKEN": "IT is to secret you cannot break it :)",
        },
      });
      if (data.success == true) {
        if (!data.data.length > 0) {
        return rejectWithValue("Please create a class first")
        } else {
          return (data.data)
        }
      } else {
        return rejectWithValue(data.message || "Failed to get classes' data")
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data?.message || error.message || "Error fetching classes' data")
    }
})

export const createPlaylist = createAsyncThunk("createPlaylist", async (playlistData, { getState, rejectWithValue }) => {
  const state = getState()
  const CSRFToken = state.auth.CSRFToken
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/createplaylist", 
        createPlaylist,
        {
        headers: {
          "X-CSRF-TOKEN": CSRFToken,
          "Content-Type": "application/json",
          "API-TOKEN": "IT is to secret you cannot break it :)",
        },
      });
      if (data.success == true) {
        return
      } else {
        return rejectWithValue(data.message || "Failed to get classes' data")
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data?.message || error.message || "Error fetching classes' data")
    }
})

  const initialState = {
    classesData: [],
    loading: false,
    error: null,
    popup: false,
  }

const ClassSlice = createSlice({
    name: "classes",
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
        .addCase(GetClasses.pending, (state) => {
          state.error = "Loading Classes' Data"
          state.loading = true
        })
        .addCase(GetClasses.fulfilled, (state, action) => {
          state.classesData = action.payload
          state.loading = false
        })
        .addCase(GetClasses.rejected, (state, action) => {
          state.error = action.payload || "An Unknown Error"
          state.loading = false
          state.popup = true
        })
        .addCase(createPlaylist.pending, (state) => {
          state.error = "Creating new playlist"
          state.loading = true
        })
        .addCase(createPlaylist.fulfilled, (state) => {
          state.loading = false
          state.error = "Playlist created successfully"
          state.popup = true
        })
        .addCase(createPlaylist.rejected, (state, action) => {
          state.error = action.payload || "An Unknown Error"
          state.loading = false
          state.popup = true
        })
    }
})

export const {
  setError,
  setPopup
} = ClassSlice.actions;

export default ClassSlice.reducer;