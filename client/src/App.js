import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCSRFToken, logout } from "./redux/slices/authSlice";
import NewRouter from "./components/common/NewRouter";

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

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [rememberMe, dispatch])

  return (
    <div>
      <NewRouter />
    </div>
  );
}
