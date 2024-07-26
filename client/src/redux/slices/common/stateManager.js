import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  popup: false,
};

const stateManager = createSlice({
  name: "stateManager",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPopup: (state, action) => {
      state.popup = !!action.payload;
    },
    showPopup: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.popup = true;
    },
    setLoading: (state, action) => {
      state.loading = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { setError, setPopup, showPopup } =
  stateManager.actions;

export default stateManager.reducer;
