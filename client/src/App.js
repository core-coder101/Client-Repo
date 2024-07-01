import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCSRFToken } from "./redux/slices/authSlice";
import MyRoutes from "./components/common/MyRoutes";

export default function App() {
  const dispatch = useDispatch();
  const { CSRFToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!CSRFToken){
    dispatch(fetchCSRFToken());
  }
  }, [CSRFToken]);

  return (
    <div>
      <MyRoutes />
    </div>
  );
}
