import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

import NewRouter from "./components/common/NewRouter";
import { logout,fetchCSRFToken, UserData } from "./redux/slices/authSlice";
import axios from "axios";

export default function App() {
  const dispatch = useDispatch();
  const { CSRFToken, rememberMe } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!CSRFToken){
    dispatch(fetchCSRFToken());
  }
  }, [CSRFToken]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!rememberMe) {
        dispatch(logout());
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    };
  }, [rememberMe, dispatch])

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
    
    if (userFromLocalStorage && userFromLocalStorage.token) {
      dispatch(UserData())
    }
  }, [dispatch]);

  return (
    <div>
      <NewRouter />
    </div>
  );
}
