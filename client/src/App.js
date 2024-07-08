import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

import NewRouter from "./components/common/NewRouter";
import { logout,fetchCSRFToken, UserData } from "./redux/slices/authSlice";
import { Navigate } from "react-router-dom";
import { GetTeacherClassinfo } from "./redux/slices/Teacher/StudentAttendance";

export default function App() {
  const dispatch = useDispatch();
  const { CSRFToken, rememberMe, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!CSRFToken){
    dispatch(fetchCSRFToken());
  }
  }, [CSRFToken]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!rememberMe) {
        dispatch(logout())
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
      if(userFromLocalStorage.Role === "Teacher"){
        dispatch(GetTeacherClassinfo())
      }
    }
  }, [dispatch]);

  return (
    <div>
      <NewRouter />
    </div>
  );
}
