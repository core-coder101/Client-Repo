import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../errorHandler";

export const fetchCSRFToken = createAsyncThunk("fetchCSRFToken", async (_ ,{ rejectWithValue }) => {
  try {
    const { data } = await axios.get("http://127.0.0.1:8000/api/csrf-token");
    if(data.csrfToken){
      return data
    } else{
      rejectWithValue(data.message || "Failed to fetch CSRF Token")
    }
  } catch (error) {
    return rejectWithValue(handleError(error))
    // return rejectWithValue(error.response?.data?.message || error.message);
  }
});


export const UserData = createAsyncThunk("UserData", async (_ ,{ getState , rejectWithValue  }) => {
  const state = getState()
  try {
    const { data } = await axios.get("http://127.0.0.1:8000/api/user",{
      headers: {
        "X-CSRF-TOKEN": state.auth.CSRFToken,
        "Content-Type": "application/json",
        "API-TOKEN": "IT is to secret you cannot break it :)",
      },
    });
    if(data.data){
      return data
    } else{
      rejectWithValue(data.message || "Failed to fetch User Data")
    }
  }catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});


export const login = createAsyncThunk("login", async (action, { getState, rejectWithValue }) => {
  try {
    const state = getState()
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/login",
      action,
      {
        headers: {
          "X-CSRF-TOKEN": state.csrfToken,
          "Content-Type": "application/json",
          "API-TOKEN": "IT is to secret you cannot break it :)",
        },
      }
    );
    if(data.success == true){
      return data;
    } else {
      return rejectWithValue(data.message || "An unexpected error occurred")
    }
  } catch (error) {
    return rejectWithValue(handleError(error))
    // return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const userFromLocalStorage = JSON.parse(localStorage.getItem("user"))
const initialState = {
  user: userFromLocalStorage || null,
  CSRFToken: "",
  result: "",
  loading: false,
  error: null,
  popup: false,
  userData: ""
}

if(userFromLocalStorage && userFromLocalStorage.token){
  axios.defaults.headers.common['Authorization'] = `Bearer ${userFromLocalStorage.token}`;
}

const authSlice = createSlice({
  name: "auth",
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
      state.error = action.payload
    },
    setUser: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCSRFToken.pending, (state) => {
        state.error = "Loading. . ."
        state.loading = true
      })
      .addCase(fetchCSRFToken.fulfilled, (state, action) => {
        state.CSRFToken = action.payload.csrfToken;
        state.loading = false
      })
      .addCase(fetchCSRFToken.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
        state.popup = true
        logout()
      })
      .addCase(login.pending, (state) => {
        state.popup = false
        state.error = "Processing request. . ."
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data
        localStorage.setItem("user", JSON.stringify(action.payload.data))
        axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload.data.token}`;
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false;
        state.popup = true
      })
      .addCase(UserData.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(UserData.fulfilled, (state, action) => {
        state.userData = action.payload.data
        state.loading = false
      })
      .addCase(UserData.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false;
        state.popup = true
      })
  },
});

export const {
  logout,
  setUser,
  setError,
} = authSlice.actions;

export default authSlice.reducer;
