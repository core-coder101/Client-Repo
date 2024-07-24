import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../errorHandler";
import { handleResponse } from "../../responseHandler";

export const GetVideoData = createAsyncThunk(
  "GetVideoData",
  async ({ Subject, Rank }, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_HOST
        }api/showvideoDataPic?Subject=${Subject}&ClassRank=${Rank}`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.message == "video") {
        return {
          data: data.data,
          type: "video",
        };
      } else {
        return {
          data: data.data,
          type: "playlist",
        };
      }
    } catch (error) {
      const errorMessage = handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);


export const Delete = createAsyncThunk(
  "Delete",
  async (id , { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_HOST
        }api/destroy-video?ID=${id}`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        GetVideoData();
        return rejectWithValue(handleResponse(data));
      } else {
        return rejectWithValue(handleResponse(data));
      }
    } catch (error) {
      const errorMessage = handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);


export const DeletePlaylist = createAsyncThunk(
  "DeletePlaylist",
  async (id , { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_HOST
        }api/destroy-Playlist?ID=${id}`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        GetVideoData();
        return rejectWithValue(handleResponse(data));
      } else {
        return rejectWithValue(handleResponse(data));
      }
    } catch (error) {
      const errorMessage = handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);



const initialState = {
  loading: false,
  error: null,
  popup: false,
  VideosData: [],
  PlaylistData: [],
};

const createSelectVideoSlice = createSlice({
  name: "selectVideo",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPopup: (state, action) => {
      state.popup = !!action.payload;
      // even though we will only pass true or false to this but I'm still writing '!!' to ensure this stays as a boolean type state
    },
    emptyArrays: (state) => {
      state.VideosData = [];
      state.PlaylistData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetVideoData.pending, (state) => {
        state.error = "Loading Videos";
        state.loading = true;
      })
      .addCase(GetVideoData.fulfilled, (state, action) => {
        if (action.payload.type === "video") {
          state.VideosData = action.payload.data;
        } else {
          state.PlaylistData = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(GetVideoData.rejected, (state, action) => {
        state.error = action.payload || "An Unknown Error Occurred";
        state.loading = false;
        state.popup = true;
      })
      .addCase(Delete.pending, (state) => {
        state.error = "Deleting Video";
        state.loading = true;
      })
      .addCase(Delete.fulfilled, (state, action) => {
        state.popup = true;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(Delete.rejected, (state, action) => {
        state.error = action.payload || "An Unknown Error Occurred";
        state.loading = false;
        state.popup = true;
      })
  },
});

export const { setError, setPopup, emptyArrays } =
  createSelectVideoSlice.actions;

export default createSelectVideoSlice.reducer;
