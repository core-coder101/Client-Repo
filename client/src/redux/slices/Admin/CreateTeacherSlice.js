import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../errorHandler";
import { handleResponse } from "../../responseHandler";

export const GetTeacherByID = createAsyncThunk(
  "GetTeacherByID",
  async (ID, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_HOST}api/GetTeacherData?ID=${ID}`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": process.env.REACT_APP_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data;
      } else {
        return rejectWithValue(data.message || "Failed to load teacher");
      }
    } catch (error) {
      console.log(error.message);
      const errorMessage = handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const createTeacher = createAsyncThunk(
  "createTeacher",
  async (formData, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_HOST}api/CreateTeacher`,
        formData,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": process.env.REACT_APP_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data;
      } else {
        // return rejectWithValue(data.message || "Failed to load teacher")
        return rejectWithValue(handleResponse(data));
      }
    } catch (error) {
      console.log(error.message);
      const errorMessage = handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const UpdateTeacher = createAsyncThunk(
  "UpdateTeacher",
  async (formData, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_HOST}api/UpdateTeacher`,
        formData,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": process.env.REACT_APP_SECRET_KEY,
          },
        }
      );
      if (data.success == true) {
        return data;
      } else {
        return rejectWithValue(data.message || "Failed to Update Teacher");
      }
    } catch (error) {
      console.log(error.message);
      const errorMessage = handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  teacherData: [],
  loading: false,
  error: null,
  popup: false,
};

const CreateTeacherSlice = createSlice({
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
      .addCase(GetTeacherByID.pending, (state) => {
        state.error = "Loading teacher's data";
        state.loading = true;
      })
      .addCase(GetTeacherByID.fulfilled, (state, action) => {
        state.teacherData = action.payload.data;
        state.loading = false;
      })
      .addCase(GetTeacherByID.rejected, (state, action) => {
        state.error = action.payload || "An Unknown Error Occurred";
        state.loading = false;
        state.popup = true;
      })
      .addCase(createTeacher.pending, (state) => {
        state.error = "Adding New Teacher";
        state.loading = true;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Teacher created successfully";
        state.popup = true;
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.error = action.payload || "An Unknown Error Occurred";
        state.loading = false;
        state.popup = true;
      })
      .addCase(UpdateTeacher.pending, (state) => {
        state.error = "Updating Changes. . .";
        state.loading = true;
      })
      .addCase(UpdateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.popup = true;
      })
      .addCase(UpdateTeacher.rejected, (state, action) => {
        state.error = action.payload || "An Unknown Error Occurred";
        state.loading = false;
        state.popup = true;
      });
  },
});

export const { setError, setPopup } = CreateTeacherSlice.actions;

export default CreateTeacherSlice.reducer;
