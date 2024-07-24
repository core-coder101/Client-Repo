import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../errorHandler";
import { handleResponse } from "../responseHandler";

export const fetchCSRFToken = createAsyncThunk(
  "fetchCSRFToken",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/csrf-token`, {
          withCredentials: true,
        }
      );
      if (data.csrfToken) {
        return data;
      } else {
        rejectWithValue(handleResponse(data) || "Failed to fetch CSRF Token");
      }
    } catch (error) {
      return rejectWithValue(handleError(error));
      // return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const UserData = createAsyncThunk(
  "UserData",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_HOST}api/user`, {
        headers: {
          "X-CSRF-TOKEN": state.auth.CSRFToken,
          "Content-Type": "application/json",
          "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
        },
      });
      if (data.data) {
        return data;
      } else {
        rejectWithValue(handleResponse(data) || "Failed to fetch User Data");
      }
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (action, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const CSRFToken = state.auth.CSRFToken;
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}api/login`,
        action,
        {
          withCredentials: true,
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": "IT is to secret you cannot break it :)",
          },
        }
      );
      if (data.success == true) {
        return data;
      } else {
        return rejectWithValue(handleResponse(data) || "An unexpected error occurred");
      }
    } catch (error) {
      return rejectWithValue(handleError(error));
      // return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
if (userFromLocalStorage && userFromLocalStorage.token) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${userFromLocalStorage.token}`;
}
const initialState = {
  user: userFromLocalStorage || null,
  CSRFToken: "",
  result: "",
  loading: false,
  error: null,
  popup: false,
  roles: ["Admin", "Student", "Teacher"],
  rememberMe: true,
  userData: "",
};

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
      state.error = action.payload;
    },
    setPopup: (state, action) => {
      state.popup = !!action.payload
    },
    setUser: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    toggleRememberMe: (state) => {
      state.rememberMe = !state.rememberMe;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCSRFToken.pending, (state) => {
        state.popup = false
        state.error = "Loading. . .";
        state.loading = true;
      })
      .addCase(fetchCSRFToken.fulfilled, (state, action) => {
        state.CSRFToken = action.payload.csrfToken;
        state.loading = false;
      })
      .addCase(fetchCSRFToken.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.popup = true;
        logout();
      })
      .addCase(login.pending, (state) => {
        state.popup = false;
        state.error = "Processing request. . .";
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${action.payload.data.token}`;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.popup = true;
      })
      .addCase(UserData.pending, (state) => {
        state.popup = false
        state.loading = true;
        state.error = "";
      })
      .addCase(UserData.fulfilled, (state, action) => {
        state.userData = action.payload.data;
        state.loading = false;
      })
      .addCase(UserData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.popup = true;
      });
  },
});

export const { logout, setUser, setError, setPopup, toggleRememberMe } =
  authSlice.actions;

export default authSlice.reducer;
