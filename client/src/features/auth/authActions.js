import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCSRFToken, loginStart, loginSuccess, loginFailure, logout, setResult, setUser } from './authSlice';

export const fetchCSRFToken = createAsyncThunk('auth/fetchCSRFToken', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/csrf-token');
    if (response.data.csrfToken) {
      thunkAPI.dispatch(setCSRFToken(response.data.csrfToken));
    } else {
      thunkAPI.dispatch(logout());
    }
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    thunkAPI.dispatch(logout());
  }
});

export const login = createAsyncThunk('auth/login', async (formData, thunkAPI) => {
  const state = thunkAPI.getState().auth;
  thunkAPI.dispatch(loginStart());
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/login',
      formData,
      {
        headers: {
          'X-CSRF-TOKEN': state.csrfToken,
          'Content-Type': 'application/json',
          'API-TOKEN': 'IT is to secret you cannot break it :)',
        },
      }
    );
    if (response.data.success) {
      thunkAPI.dispatch(loginSuccess(response.data.data));
      thunkAPI.dispatch(setResult(response.data));
    } else {
      thunkAPI.dispatch(loginFailure('Login failed'));
    }
  } catch (error) {
    console.error(error);
    thunkAPI.dispatch(loginFailure(error.toString()));
  }
});

export const setFromLocalStorage = createAsyncThunk("auth/setFromLocalStorage", async (_,thunkAPI) => {
    try{
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("reached");
        thunkAPI.dispatch(setUser(user));
    } catch(err){
        console.log(err);
    }
})