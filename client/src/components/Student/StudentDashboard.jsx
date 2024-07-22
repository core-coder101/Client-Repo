import React, { useEffect, useState } from "react";
import "../../assets/css/dashboard.css";
import "../../assets/css/student/calender.css";
import Calendar from "react-calendar";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { PieChart } from "@mui/x-charts/PieChart";
import { GetStudentAttendance, setError, setPopup } from "../../redux/slices/Student/StudentDashboard";
import LoadingOverlay from "../common/LoadingOverlay";
import { GetTimeTable, setError as setError2, setPopup as setPopup2 } from "../../redux/slices/Admin/CreateTimetables";
import { Snackbar } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function Dashboard() {
  
  const { attendanceData, presentCount, absentCount, loading, popup, error } = useSelector(state=>state.studentDashboard)
  const { DBTimeTableData, loading: loading2, popup: popup2, error: error2 } = useSelector(state=>state.createTimeTable)
  const dispatch = useDispatch()
  const [localLoading, setLocalLoading] = useState(false)

  // redux state update bug fix
  useEffect(()=>{
    setLocalLoading(loading)
  }, [loading])

  useEffect(() => {
    if(DBTimeTableData.length > 0){
      setTimeTable(DBTimeTableData)
    }
  }, [DBTimeTableData])

  useEffect(()=>{
    dispatch(GetStudentAttendance())
    dispatch(GetTimeTable(""))
  }, [dispatch])

  const data = [
    { label: "Present", value: presentCount },
    { label: "Absent", value: absentCount },
  ];
  
  const series = [
    {
      innerRadius: 110,
      outerRadius: 120,
      id: "series-2",
      data: data,
    },
  ];

  const [itemData, setItemData] = useState()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [timetable, setTimeTable] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
}, []);

  let presentPercentage = 0
  if(presentCount + absentCount > 0){
    // denomenator can't be zero 💀
    presentPercentage = (
      (presentCount / (presentCount + absentCount)) *
      100
    ).toFixed(2);
  }

  const present = [];
  const absent = [];
  // 2024-07-08

  attendanceData.forEach((attendance)=>{
    if(attendance.attendance === "Present"){
      present.push(attendance.Date)
    } else {
      absent.push(attendance.Date)
    }
  })

  return (
    <>
      <LoadingOverlay loading={localLoading || loading2} />
      <div className="dashboard">
        <div className="mt-2 mb-4">
          <div className="headingNavbar d-flex justify-content-center">
            <div className="d-flex">
              <h4>Dashboard</h4>
            </div>
            <div className="ms-auto me-4"></div>
          </div>
        </div>
        <div className="d-flex align-items-start flex-wrap flex-md-nowrap justify-content-center justify-content-md-between" >
          <div className="timeTableMainDiv">
            <h2 style={{textAlign: "center", marginTop: "5px"}}>Timetable</h2>
            {timetable.map(lecture => {
              let ongoing = false;
              let start = lecture.StartingTime;
              let end = lecture.EndingTime;
              let [startHours, startMinutes, startSeconds] = start?.split(":");
              let [endHours, endMinutes, endSeconds] = end?.split(":");
              
              let currentSeconds = currentTime.getSeconds();
              let currentTimeInSeconds = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentSeconds;
              let startTimeInSeconds = parseInt(startHours) * 3600 + parseInt(startMinutes) * 60 + parseInt(startSeconds);
              let endTimeInSeconds = parseInt(endHours) * 3600 + parseInt(endMinutes) * 60 + parseInt(endSeconds);
              
              if (currentTimeInSeconds >= startTimeInSeconds && currentTimeInSeconds < endTimeInSeconds) {
                  ongoing = true;
              }
              
              const startMessage = new Date("2024-09-11T" + start).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
              const endMessage = new Date("2024-09-11T" + end).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
              
              return (
                  <div key={lecture.Subject} className={"timetable " + (ongoing ? "onGoingLecture" : "")}>
                      <h6>{lecture.Subject}</h6>
                      <p>{`${startMessage} - ${endMessage}`}</p>
                  </div>
              );
            })}
          </div>
          <div className="d-flex flex-wrap itemsContainer justify-content-center justify-content-md-start">
            <div
              className="attendanceMAINDIV"
              style={{
                margin: "5px",
                boxShadow: "rgba(0, 0, 0, 0.122) 0px 0px 5px 5px",
                border: "1px solid rgb(218, 207, 207)",
              }}
            >
              <h2 style={{ textAlign: "center", margin: "0", margin: "5px 0px" }}>
                Attendance
              </h2>
              <div className="attendanceOuterDiv">
                <PieChart
                  colors={["rgb(1, 128, 35)", "rgb(199, 14, 33)"]}
                  series={series}
                  width={350}
                  height={250}
                  slotProps={{
                    legend: { hidden: true },
                  }}
                  onItemClick={(event, d) => setItemData(d)}
                />
                <div className="percentageDiv">{`${presentPercentage}%`}</div>
                <ul
                  style={{
                    display: "flex",
                    listStyle: "none",
                    padding: 0,
                    width: "max-content",
                    position: "relative",
                    right: "25px",
                  }}
                >
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "green",
                        borderRadius: "50%",
                        display: "inline-block",
                        marginRight: "5px",
                      }}
                    ></span>
                    Present
                  </li>
                  <li style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "red",
                        borderRadius: "50%",
                        display: "inline-block",
                        marginRight: "5px",
                      }}
                    ></span>
                    Absent
                  </li>
                </ul>
              </div>
            </div>
            <div className="calendarDiv" style={{ margin: "5px" }}>
              <Calendar
                tileClassName={({ date, view }) => {
                  if (
                    present.find((x) => x === moment(date).format("YYYY-MM-DD"))
                  ) {
                    return "present";
                  } else if (
                    absent.find((x) => x === moment(date).format("YYYY-MM-DD"))
                  ) {
                    return "absent";
                  }
                }}
              ></Calendar>
            </div>
            <div></div>
          </div>
        </div>
      </div>
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
    </>
  );
}
