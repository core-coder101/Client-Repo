import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Markattendance() {
  const { UserID } = useParams();
  const [error, setError] = useState("Marking Attendance")
  const { CSRFToken } = useSelector(state => state.auth)
  const markAttendance = async () => {
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
        setError("Successfully marked attendance")
        window.close();
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
  }, [CSRFToken]);
  return (
  <div>
    {error}
  </div>
)
}
