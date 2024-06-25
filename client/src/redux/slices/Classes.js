import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  classes: [],
  loading: false,
  error: null,
  popup: false,
}


export const GetClasses = createAsyncThunk("GetClasses", async (_, { getState, rejectWithValue }) => {
    // setErrorMessage("Loading Classes' data. . .");
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/GetClasses", {
        headers: {
          "X-CSRF-TOKEN": CSRFToken,
          "Content-Type": "application/json",
          "API-TOKEN": "IT is to secret you cannot break it :)",
        },
      });
      if (data.success == true) {
        if (!data.data.length > 0) {
        return rejectWithValue("Please create a class first")
        } else {
          SetClassData(data.data);
          setFormData((prev) => ({
            ...prev,
            StudentClassID: JSON.stringify(data.data[0].id),
          }));
        }
      } else {
        return rejectWithValue(data.message || "Failed to get classes' data")
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data?.message || "Error fetching classes' data")
    }
  })


const ClassSlice = createSlice({
    name: "classes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(GetClasses.pending, (state, action) => {
          state.error = "Loading Classes' Data"
          state.loading = true
        })
        .addCase(GetClasses.fulfilled, (state) => {
          state.classes = action.payload
          state.loading = false
          state.error = ""
          state.popup = true
          // we do not set the error to null here as we want to do it when the user closes the popup
        })
        .addCase(GetClasses.rejected, (state, action) => {
          state.error = action.payload || "An Unknown Error"
        })
    }
})