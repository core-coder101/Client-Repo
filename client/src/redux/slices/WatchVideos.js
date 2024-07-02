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

export const getVideoInfoByID = createAsyncThunk("getVideoInfoByID", async (ID, { getState, rejectWithValue }) => {
  const state = getState()
  const CSRFToken = state.auth.CSRFToken
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/show-video-info?ID=${ID}`,
        {
        headers: {
          "X-CSRF-TOKEN": CSRFToken,
          "Content-Type": "application/json",
          "API-TOKEN": "IT is to secret you cannot break it :)",
        },
      })
      if (data.success == true) {
       return data
      } else {
        return rejectWithValue(data.message || "Failed to load lecture info")
      }
    } catch (error) {
      return rejectWithValue(handleError(error))
      // return rejectWithValue(error.response?.data?.message || error.message || "Error loading lecture")
    }
})

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
      console.log(data);
      if (data) {
          return (data)
      } else {
        return rejectWithValue(data.message || "Failed to load lecture")
      }
    } catch (error) {
      return rejectWithValue(handleError(error))
      // return rejectWithValue(error.response?.data?.message || error.message || "Error loading lecture")
    }
})
// export const fetchVideoRange = createAsyncThunk("fetchVideoRange", async ({ID, startByte, endByte}, { getState, rejectWithValue }) => {
//   const url = `http://127.0.0.1:8000/api/show-video?ID=${ID}`;
//   const state = getState()
//   const CSRFToken = state.auth.CSRFToken
//   const headers = {
//       "X-CSRF-TOKEN": CSRFToken,
//       "Content-Type": "application/json",
//       "API-TOKEN": process.env.REACT_APP_SECRET_KEY,
//       Range: `bytes=${startByte}-${endByte}`,
//   }
//   try {
//     const response = await axios.get(url, { headers });

//     if (response.status === 206) {
//       console.log(response.data);
//       const arrayBuffer = response.data
//       const uint8Array = new Uint8Array(arrayBuffer);
//       const blob = new Blob([uint8Array], { type: 'video/mp4' });
//       const videoUrl = URL.createObjectURL(blob);
//       return videoUrl
//       const reader = response.body.getReader();
//       const contentLength = +response.headers['content-length'];
//       let receivedLength = 0;
//       const chunks = [];

//       while (true) {
//         const { done, value } = await reader.read();

//         if (done) {
//           break;
//         }

//         chunks.push(value);
//         receivedLength += value.length;
//         console.log(`Received ${receivedLength} of ${contentLength} bytes`);
//       }

//       const concatenatedChunks = new Uint8Array(receivedLength);
//       let position = 0;

//       for (const chunk of chunks) {
//         concatenatedChunks.set(chunk, position);
//         position += chunk.length;
//       }

//       return concatenatedChunks;
//     } else {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error('Fetch error:', error);
//     return rejectWithValue(error.message);
//   }
// })


// Async Thunk
export const fetchVideoRange = createAsyncThunk("fetchVideoRange", async ({ ID, startByte, endByte }, { getState, rejectWithValue }) => {
  const url = `http://127.0.0.1:8000/api/show-video?ID=${ID}`;
  const state = getState();
  const CSRFToken = state.auth.CSRFToken;
  const headers = {
    "X-CSRF-TOKEN": CSRFToken,
    "Content-Type": "application/json",
    "API-TOKEN": process.env.REACT_APP_SECRET_KEY,
    Range: `bytes=${startByte}-${endByte}`,
  };

  try {
    const response = await axios.get(url, { headers, responseType: 'arraybuffer' });

    if (response.status === 206 || response.status === 200) {
      const arrayBuffer = response.data;
      const blob = new Blob([arrayBuffer], { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(blob);
      return videoUrl;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return rejectWithValue(error.message);
  }
});

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
          state.file = action.payload
          state.loading = false
        })
        .addCase(getVideoByID.rejected, (state, action) => {
          state.error = action.payload || "An Unknown Error"
          state.loading = false
          state.popup = true
        })
        .addCase(getVideoInfoByID.pending, (state) => {
          state.error = "Loading Lecture Info"
          state.loading = true
        })
        .addCase(getVideoInfoByID.fulfilled, (state, action) => {
          state.videoInfo = action.payload.data
          state.loading = false
        })
        .addCase(getVideoInfoByID.rejected, (state, action) => {
          state.error = action.payload || "An Unknown Error"
          state.loading = false
          state.popup = true
        })
        .addCase(fetchVideoRange.pending, (state) => {
          state.error = "Loading Lecture Info"
          state.loading = true
        })
        .addCase(fetchVideoRange.fulfilled, (state, action) => {
          state.file = action.payload
          state.loading = false
        })
        .addCase(fetchVideoRange.rejected, (state, action) => {
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