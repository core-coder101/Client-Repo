import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import MyRoutes from "./components/Admin/MyRoutes";
import { logout, setCSRFToken } from "./redux/slices/authSlice";
import axios from "axios";

export default function App() {
  const { CSRFToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const fetchCSRFToken = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/csrf-token");
      if (response.data.csrfToken) {
        dispatch(setCSRFToken(response.data.csrfToken));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
      dispatch(logout());
    }
  };

  useEffect(() => {
    if (!CSRFToken) {
      fetchCSRFToken();
    }
  }, [CSRFToken]);

  return (
    <div>
      <MyRoutes />
    </div>
  );
}
