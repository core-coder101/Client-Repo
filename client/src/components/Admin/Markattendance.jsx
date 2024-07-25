import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Markattendance() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const key = queryParams.get('key')
  const url = queryParams.get('url')
  const [error, setError] = useState("welcome to mark attendance page")
  const { CSRFToken } = useSelector(state => state.auth)
  console.log("key: ", key);
  console.log("url: ", url);
  const navigate = useNavigate()
  const markAttendance = async () => {
    if(!(key && key === "SecretRandomKeyToMarkAttendance")){
      setError("unauthorized")
      setTimeout(() => {
        window.close()
        navigate(-1)
      }, 3000)
      return
    }
    if(!url){
      setError("no url received")
    }
    const splitted = url.split("/")
    const UserID = splitted[splitted.length - 1]
    setError("Marking Attendance")
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST}api/MarkEachAttendance?ID=${UserID}`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if(data?.success){
        setError("close")
        setTimeout(() => {
          window.close();
        }, 1500)
      } else {
        setError("Failed to mark attendance")
        setTimeout(() => {
          window.close();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to mark attendance")
    }
  };

  useEffect(() => {
    markAttendance()
  }, [])
  return (
  <div style={{margin: "20px"}}>
    {error}
  </div>
)
}
