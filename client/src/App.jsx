import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import NewRouter from "./components/common/NewRouter";
import { logout,fetchCSRFToken, UserData, setPopup, setError } from "./redux/slices/authSlice";
import { GetTeacherClassinfo, teacherAttendance } from "./redux/slices/Teacher/StudentAttendance";
import { Snackbar } from "@mui/material";
import { setPopup as setPopup2, setError as setError2 } from "./redux/slices/Teacher/StudentAttendance"

export default function App() {
  const dispatch = useDispatch();
  const { CSRFToken, rememberMe, loading, error, popup } = useSelector((state) => state.auth);
  const { loading: loading2, error: error2, popup: popup2 } = useSelector((state) => state.studentAttendanceTeacher);

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
        dispatch(teacherAttendance())
      }
    }
  }, [dispatch]);

  return (
    <div>
      <NewRouter />
      <Snackbar
        open={popup2}
        onClose={() => {
          dispatch(setPopup2(false))
        }}
        onAnimationEnd={()=>{
          dispatch(setError2(""))
        }}
        message={error2}
        autoHideDuration={3000}
        transitionDuration={400}
      />
      <Snackbar
        open={popup}
        onClose={() => {
          dispatch(setPopup(false))
        }}
        onAnimationEnd={()=>{
          dispatch(setError(""))
        }}
        message={error}
        autoHideDuration={3000}
        transitionDuration={400}
      />
    </div>
  );
}
