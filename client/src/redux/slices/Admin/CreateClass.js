import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../errorHandler";
import { handleResponse } from "../../responseHandler";

export const GetClassDataById = createAsyncThunk(
  "GetClassDataById",
  async (ID, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/GetClassData?ID=${ID}`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data;
      } else {
        return rejectWithValue(data.message || "Failed to load class");
      }
    } catch (error) {
      console.log(error.message);
      const errorMessage = handleError(error);
      return rejectWithValue(errorMessage);
      // return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
);
export const GetTeachers = createAsyncThunk(
  "GetTeachers",
  async (query, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}api/GetTeacher`,
        { query: query },
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        if (!data.data.length > 0) {
          return rejectWithValue("Please add a teacher first");
        } else {
          return data.data;
        }
      } else {
        return rejectWithValue(data.message || "Failed to load teachers' data");
      }
    } catch (error) {
      console.log(error.message);
      const errorMessage = handleError(error);
      return rejectWithValue(errorMessage);
      // return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
);

export const createClass = createAsyncThunk(
  "createClass",
  async (formData, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}api/CreateClass`,
        formData,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return;
      } else {
        return rejectWithValue(handleResponse(data));
      }
    } catch (error) {
      console.log(error.message);
      const errorMessage = handleError(error);
      return rejectWithValue(errorMessage);
      // console.error(error);
      // return rejectWithValue(error.response?.data?.message || "Failed to create class")
    }
  }
);

export const UpdateClass = createAsyncThunk(
  "UpdateClass",
  async (formData, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}api/UpdateClass`,
        formData,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data;
      } else {
        return rejectWithValue(data.message || "Failed to Update Class");
      }
    } catch (error) {
      console.log(error.message);
      const errorMessage = handleError(error);
      return rejectWithValue(errorMessage);
      // return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
);

const initialState = {
  classData: [],
  teachersData: [],
  loading: false,
  error: null,
  popup: false,
};

const createClassSlice = createSlice({
  name: "createClass",
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
      .addCase(GetClassDataById.pending, (state) => {
        state.error = "Loading Class Data";
        state.loading = true;
      })
      .addCase(GetClassDataById.fulfilled, (state, action) => {
        state.classData = action.payload;
        state.loading = false;
      })
      .addCase(GetClassDataById.rejected, (state, action) => {
        state.error = action.payload || "An Unknown Error Occurred";
        state.loading = false;
        state.popup = true;
      })
      .addCase(createClass.pending, (state) => {
        state.error = "Creating new class";
        state.loading = true;
      })
      .addCase(createClass.fulfilled, (state) => {
        state.error = "Successfully Created a new Class";
        state.loading = false;
        state.popup = true;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.error = action.payload || "An Unknown Error Occurred";
        state.loading = false;
        state.popup = true;
      })
      .addCase(UpdateClass.pending, (state) => {
        state.error = "Updating Class. . .";
        state.loading = true;
      })
      .addCase(UpdateClass.fulfilled, (state) => {
        state.error = "Successfully Updated Class";
        state.loading = false;
        state.popup = true;
      })
      .addCase(UpdateClass.rejected, (state, action) => {
        state.error = action.payload || "An Unknown Error Occurred";
        state.loading = false;
        state.popup = true;
      })
      .addCase(GetTeachers.pending, (state) => {
        state.popup = false;
        state.error = "Loading teachers' data. . .";
        state.loading = true;
      })
      .addCase(GetTeachers.fulfilled, (state, action) => {
        state.teachersData = action.payload;
        state.loading = false;
      })
      .addCase(GetTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An Unknown Error Occurred";
        state.popup = true;
      });
  },
});

export const { setError, setPopup } = createClassSlice.actions;

export default createClassSlice.reducer;
