import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../errorHandler";
import { handleResponse } from "../../responseHandler";

export const GetStudentData = createAsyncThunk(
  "GetStudentData",
  async (ID, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SECRET_KEY}api/GetStudentData?ID=${ID}`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": "IT is to secret you cannot break it :)",
          },
        }
      );
      if (data.success == true) {
        if (!(data.data.length > 0)) {
          return rejectWithValue("Student not found");
        }
        return data.data;
      } else {
        return rejectWithValue(handleResponse(data) || "Failed to get student data");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(handleError(error));
      // return rejectWithValue(error.response?.data?.message || error.message || "Error fetching classes' data")
    }
  }
);

export const Createstudent = createAsyncThunk(
  "Createstudent",
  async (formData, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}api/CreateStudent`,
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
        return rejectWithValue(handleResponse(data) || "Failed to Create student");
      }
    } catch (error) {
      // if (error.response.data.message.includes("users_email_unique")){
      //   return rejectWithValue("Email must be unique");
      // }
      console.log(error);
      return rejectWithValue(handleError(error));
      // return rejectWithValue(error.response?.data?.message || error.message || "Error adding student")
    }
  }
);

export const UpdateStudent = createAsyncThunk(
  "UpdateStudent",
  async (formData, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}api/UpdateStudent`,
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
        return rejectWithValue(handleResponse(data) || "Failed to Updated Student");
      }
    } catch (error) {
      // if (error.response.data.message.includes("users_email_unique")){
      //   return rejectWithValue("Email must be unique");
      // }
      console.log(error);
      return rejectWithValue(handleError(error));
      // return rejectWithValue(error.response?.data?.message || error.message || "Error Updating student")
    }
  }
);

const initialState = {
  classesData: [],
  StudentData: [],
  Createstudent: [],
  loading: false,
  error: null,
  popup: false,
};

const ClassSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPopup: (state, action) => {
      state.popup = !!action.payload;
      // even though we will only pass true or false to this but I'm still writing '!!' to ensure this stays as a boolean type state
    },
    SetStudentData: (state, action) => {
      state.StudentData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetStudentData.pending, (state) => {
        state.error = "Loading student Data";
        state.loading = true;
      })
      .addCase(GetStudentData.fulfilled, (state, action) => {
        state.StudentData = action.payload;
        state.loading = false;
      })
      .addCase(GetStudentData.rejected, (state, action) => {
        state.error = action.payload || "An Unknown Error";
        state.loading = false;
        state.popup = true;
      })
      .addCase(Createstudent.pending, (state) => {
        state.error = "Adding new student";
        state.loading = true;
      })
      .addCase(Createstudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.message || "Created new student successfully";
        state.popup = true;
      })
      .addCase(Createstudent.rejected, (state, action) => {
        state.error = action.payload || "An Unknown Error";
        state.loading = false;
        state.popup = true;
      })
      .addCase(UpdateStudent.pending, (state) => {
        state.error = "Updating Student Data";
        state.loading = true;
      })
      .addCase(UpdateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.StudentData = [];
        state.error = action.payload.message || "Succcessfully Updated Student";
        state.popup = true;
      })
      .addCase(UpdateStudent.rejected, (state, action) => {
        state.error = action.payload || "An Unknown Error";
        state.loading = false;
        state.popup = true;
      });
  },
});

export const { setError, setPopup, SetStudentData } = ClassSlice.actions;

export default ClassSlice.reducer;
