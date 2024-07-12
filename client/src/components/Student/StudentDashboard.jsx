import React, { useEffect, useState } from "react";
import "../../assets/css/dashboard.css";
import "../../assets/css/student/calender.css";
import Calendar from "react-calendar";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { PieChart } from "@mui/x-charts/PieChart";
import { GetStudentAttendance } from "../../redux/slices/Student/StudentDashboard";
import LoadingOverlay from "../common/LoadingOverlay";


export default function Dashboard() {
  
  const { attendanceData, presentCount, absentCount, loading, popup, error } = useSelector(state=>state.studentDashboard)
  const dispatch = useDispatch()
  const [localLoading, setLocalLoading] = useState(false)

  // redux state update bug fix
  useEffect(()=>{
    setLocalLoading(loading)
  }, [loading])

  useEffect(()=>{
    dispatch(GetStudentAttendance())
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
  const [timetable, setTimeTable] = useState([
    {
      subject: "Physics",
      start: "14:40:00",
      end: "16:20:00",
    },
    {
      subject: "Chemistry",
      start: "15:20:00",
      end: "16:00:00",
    },
    {
      subject: "Maths",
      start: "16:00:00",
      end: "16:40:00",
    },
    {
      subject: "Urdu",
      start: "16:40:00",
      end: "17:20:00",
    },
    {
      subject: "Computer",
      start: "17:20:00",
      end: "18:00:00",
    },
    {
      subject: "English",
      start: "18:00:00",
      end: "18:40:00",
    },
    {
      subject: "Islamiat",
      start: "18:40:00",
      end: "19:20:00",
    },
    {
      subject: "Tarjama-tul-Quran",
      start: "19:20:00",
      end: "19:40:00",
    },
  ])

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
      <LoadingOverlay loading={localLoading} />
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
              let start = lecture.start;
              let end = lecture.end;
              let [startHours, startMinutes, startSeconds] = start.split(":");
              let [endHours, endMinutes, endSeconds] = end.split(":");
              
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
                  <div key={lecture.subject} className={"timetable " + (ongoing ? "onGoingLecture" : "")}>
                      <h6>{lecture.subject}</h6>
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
    </>
  );
}
