import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const GetClassDataById = createAsyncThunk("GetClassDataById", async (ID, { getState, rejectWithValue }) => {
  const state = getState()
  const CSRFToken = state.auth.CSRFToken
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/GetClassData?ID=${ID}`,
        {
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
        return rejectWithValue(data.message || "Failed to load class")
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  })

  export const createClass = createAsyncThunk("createClass", async (formData, { getState, rejectWithValue }) => {
    const state = getState()
    const CSRFToken = state.auth.CSRFToken
      try {
        const { data } = await axios.post(
          "http://127.0.0.1:8000/api/CreateClass",
          formData,
          {
            headers: {
              "X-CSRF-TOKEN": CSRFToken,
              "Content-Type": "application/json",
              "API-TOKEN": "IT is to secret you cannot break it :)",
            },
          }
        );
        if (data.success == true) {
          return          
        } else {
          return rejectWithValue(data?.message || "Failed to create class")
        }
      } catch (error) {
        console.error(error);
        return rejectWithValue(error.response?.data?.message || "Failed to create class")
      }
  })

  export const UpdateClass = createAsyncThunk("CreateClass", async (formData, { getState, rejectWithValue }) => {
    const state = getState
    const CSRFToken = state.auth.CSRFToken
      try {
        const { data } = await axios.post(
          "http://127.0.0.1:8000/api/UpdateClass",
          formData,
          {
            headers: {
              "X-CSRF-TOKEN": CSRFToken,
              "Content-Type": "application/json",
              "API-TOKEN": "IT is to secret you cannot break it :)",
            },
          }
        );
        if (data.success == true) {
          return
        } else {
          return rejectWithValue(data.message || "Failed to Update Class")
        }
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message)
      }
})


  const initialState = {
    classData: [],
    loading: false,
    error: null,
    popup: false,
  }

const createClassSlice = createSlice({
    name: "createClass",
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
        .addCase(GetClassDataById.pending, (state) => {
          state.error = "Loading Class Data"
          state.loading = true
        })
        .addCase(GetClassDataById.fulfilled, (state, action) => {
          state.classData = action.payload
          state.loading = false
        })
        .addCase(GetClassDataById.rejected, (state, action) => {
          state.error = action.payload || "An Unknown Error Occurred"
          state.loading = false
          state.popup = true
        })
        .addCase(createClass.pending, (state) => {
          state.error = "Creating new class"
          state.loading = true
        })
        .addCase(createClass.fulfilled, (state) => {
          state.error = "Successfully Created a new Class"
          state.loading = false
          state.popup = true
        })
        .addCase(createClass.rejected, (state, action) => {
          state.error = action.payload || "An Unknown Error Occurred"
          state.loading = false
          state.popup = true
        })
        .addCase(UpdateClass.pending, (state) => {
          state.error = "Updating Class. . ."
          state.loading = true
        })
        .addCase(UpdateClass.fulfilled, (state) => {
          state.error = "Successfully Updated Class"
          state.loading = false
          state.popup = true
        })
        .addCase(UpdateClass.rejected, (state, action) => {
          state.error = action.payload || "An Unknown Error Occurred"
          state.loading = false
          state.popup = true
        })
    }
})

export const {
  setError,
  setPopup
} = createClassSlice.actions;

export default createClassSlice.reducer;