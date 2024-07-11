import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../../errorHandler";
import { handleResponse } from "../../responseHandler";

export const DeleteClass = createAsyncThunk(
  "DeleteClass",
  async (ID, { getState, rejectWithValue }) => {
    const state = getState();
    const CSRFToken = state.auth.CSRFToken;
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_HOST}api/DeleteClass`,
        { ID:ID },
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": process.env.REACT_APP_SECRET_KEY,
          },
        }
      );
      if (data?.success == true) {
        return data.message
      } else {
        return rejectWithValue(handleResponse(data));
      }
    } catch (error) {
      console.log(error.message);
      const errorMessage = handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  popup: false,
};

const manageClassesSlice = createSlice({
  name: "manageClasses",
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
      .addCase(DeleteClass.pending, (state) => {
        state.popup = false
        state.error = "Deleting Class";
        state.loading = true;
      })
      .addCase(DeleteClass.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Class Deleted Successfully"
        state.popup = true
      })
      .addCase(DeleteClass.rejected, (state, action) => {
          state.loading = false;
        state.error = action.payload || "An Unknown Error Occurred";
        state.popup = true;
      })
  },
});

export const { setError, setPopup } = manageClassesSlice.actions;

export default manageClassesSlice.reducer;
