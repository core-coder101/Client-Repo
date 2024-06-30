import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import MyRoutes from "./components/Admin/MyRoutes";
import { fetchCSRFToken } from "./redux/slices/authSlice";

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
      {CSRFToken ? <MyRoutes /> : null}
    </div>
  );
}
