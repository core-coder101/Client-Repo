import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const GetClasses = createAsyncThunk("GetClasses", async (_, { getState, rejectWithValue }) => {
  const state = getState()
  const CSRFToken = state.auth.CSRFToken
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
          return (data.data)
        }
      } else {
        return rejectWithValue(data.message || "Failed to get classes' data")
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data?.message || error.message || "Error fetching classes' data")
    }
})

export const GetStudentData = createAsyncThunk("GetStudentData", async (ID, { getState, rejectWithValue }) => {
  const state = getState()
  const CSRFToken = state.auth.CSRFToken
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/GetStudentData?ID=${ID}`, {
        headers: {
          "X-CSRF-TOKEN": CSRFToken,
          "Content-Type": "application/json",
          "API-TOKEN": "IT is to secret you cannot break it :)",
        },
      });
      if (data.success == true) {
        if(!(data.data.length > 0)){
          return rejectWithValue("Student not found")
        }
          return (data.data)
      } else {
        return rejectWithValue(data.message || "Failed to get student data")
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || error.message || "Error fetching classes' data")
    }
})


export const Createstudent = createAsyncThunk("Createstudent", async (formData, { getState, rejectWithValue }) => {
  const state = getState()
  const CSRFToken = state.auth.CSRFToken
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/CreateStudent", 
        formData,
        {
        headers: {
          "X-CSRF-TOKEN": CSRFToken,
          "Content-Type": "application/json",
          "API-TOKEN": "IT is to secret you cannot break it :)",
        },
      });
      if (data.success == true) {
          return (data)
      } else {
        return rejectWithValue(data.message || "Failed to Create student")
      }
    } catch (error) {
      if (error.response.data.message.includes("users_email_unique")){
        return rejectWithValue("Email must be unique");
      }
      console.log(error);
      return rejectWithValue(error.response?.data?.message || error.message || "Error adding student")
    }
})



export const UpdateStudent = createAsyncThunk("UpdateStudent", async (formData, { getState, rejectWithValue }) => {
  const state = getState()
  const CSRFToken = state.auth.CSRFToken
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/UpdateStudent", 
        formData,
        {
        headers: {
          "X-CSRF-TOKEN": CSRFToken,
          "Content-Type": "application/json",
          "API-TOKEN": "IT is to secret you cannot break it :)",
        },
      });
      if (data.success == true) {
          return (data)
      } else {
        return rejectWithValue(data.message || "Failed to Updated Student")
      }
    } catch (error) {
      if (error.response.data.message.includes("users_email_unique")){
        return rejectWithValue("Email must be unique");
      }
      console.log(error);
      return rejectWithValue(error.response?.data?.message || error.message || "Error Updating student")
    }
})

const initialState = {
    classesData: [],
    StudentData:[],
    Createstudent:[],
    loading: false,
    error: null,
    popup: false,
}

const ClassSlice = createSlice({
    name: "classes",
    initialState,
    reducers: {
      setError: (state, action) => {
        state.error = action.payload
      },
      setPopup: (state, action) => {
        state.popup = !!action.payload
        // even though we will only pass true or false to this but I'm still writing '!!' to ensure this stays as a boolean type state
      },
      SetStudentData: (state,action) =>{
        state.StudentData = action.payload
      }
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetClasses.pending, (state) => {
          state.error = "Loading Classes' Data"
          state.loading = true
        })
        .addCase(GetClasses.fulfilled, (state, action) => {
          state.classesData = action.payload
          state.loading = false
        })
        .addCase(GetClasses.rejected, (state, action) => {
          state.error = action.payload || "An Unknown Error"
          state.loading = false
          state.popup = true
        })
        .addCase(GetStudentData.pending, (state) => {
          state.error = "Loading student Data"
          state.loading = true
        })
        .addCase(GetStudentData.fulfilled, (state, action) => {
          state.StudentData = action.payload
          state.loading = false
        })
        .addCase(GetStudentData.rejected, (state, action) => {
          state.error = action.payload || "An Unknown Error"
          state.loading = false
          state.popup = true
        })
        .addCase(Createstudent.pending, (state) => {
          state.error = "Adding new student"
          state.loading = true
        })
        .addCase(Createstudent.fulfilled, (state, action) => {
          state.loading = false
          state.error = action.payload.message || "Created new student successfully"
          state.popup = true
        })
        .addCase(Createstudent.rejected, (state, action) => {
          state.error = action.payload || "An Unknown Error"
          state.loading = false
          state.popup = true
        })
        .addCase(UpdateStudent.pending, (state) => {
          state.error = "Updating Student Data"
          state.loading = true
        })
        .addCase(UpdateStudent.fulfilled, (state, action) => {
          state.loading = false
          state.StudentData = []
          state.error = action.payload.message || "Succcessfully Updated Student"
          state.popup = true
        })
        .addCase(UpdateStudent.rejected, (state, action) => {
          state.error = action.payload || "An Unknown Error"
          state.loading = false
          state.popup = true
        })
    }
})

export const {
  setError,
  setPopup,
  SetStudentData
} = ClassSlice.actions;

export default ClassSlice.reducer;