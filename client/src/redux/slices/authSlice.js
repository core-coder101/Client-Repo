import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchCSRFToken = async (dispatch) => {
//   try {
//     const response = await axios.get("http://127.0.0.1:8000/api/csrf-token");
//     if (response.data.csrfToken) {
//       dispatch(setCSRFToken(response.data.csrfToken));
//     } else {
//       dispatch(logout());
//     }
//   } catch (error) {
//     console.error("Error fetching CSRF token:", error);
//     dispatch(logout());
//   }
// };

export const fetchCSRFToken = createAsyncThunk("fetchCSRFToken", async () => {
  try {
    const { data } = await axios.get("http://127.0.0.1:8000/api/csrf-token");
    return data;
  } catch (error) {
    throw error;
  }
});

export const login = createAsyncThunk("login", async (action) => {
  try {
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/login",
      action.payload
    );
    return data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  CSRFToken: "",
  result: "",
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCSRFToken: (state, action) => {
      state.CSRFToken = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.CSRFToken = "";
      state.result = "";
      localStorage.clear();
      delete axios.defaults.headers.common["Authorization"];
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setUser: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCSRFToken.pending, (state) => {
        // state.keywodsSuggetionStatus = true;
      })
      .addCase(fetchCSRFToken.fulfilled, (state, action) => {
        // state.keywodsSuggetionStatus = false;
        state.CSRFToken = action.payload.csrfToken;
      })
      .addCase(fetchCSRFToken.rejected, (state, action) => {
        // state.keywodsSuggetionStatus = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = true;
        state.user = action.payload
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })
  },
});

// export const login = async (formData, dispatch, getState) => {
//   const state = getState().auth;

//   dispatch(loginStart());
//   try {
//     const response = await axios.post(
//       "http://127.0.0.1:8000/api/login",
//       formData,
//       {
//         headers: {
//           "X-CSRF-TOKEN": state.csrfToken,
//           "Content-Type": "application/json",
//           "API-TOKEN": "IT is to secret you cannot break it :)",
//         },
//       }
//     );
//     if (response.data.success) {
//       dispatch(loginSuccess(response.data.data));
//       dispatch(setResult(response.data));
//     } else {
//       dispatch(loginFailure("Login failed"));
//     }
//   } catch (error) {
//     console.error(error);
//     dispatch(loginFailure(error.toString()));
//   }
// };

export const {
  setCSRFToken,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setResult,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
