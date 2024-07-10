import React, { useEffect, useState } from "react";
import "../../assets/css/dashboard.css";
import "../../assets/css/student/calender.css";
import Calendar from "react-calendar";
import moment from "moment";

import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { label: "Present", value: 75 },
  { label: "Absent", value: 25 },
];

const series = [
  {
    innerRadius: 110,
    outerRadius: 120,
    id: "series-2",
    data: data,
  },
];

export default function Dashboard() {
  const [itemData, setItemData] = useState()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [timetable, setTimeTable] = useState([
    {
      subject: "Physics",
      start: "14:40:00",
      end: "15:20:00",
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
  ])

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
}, []);

  const presentPercentage = (
    (data[0].value / (data[0].value + data[1].value)) *
    100
  ).toFixed(2);

  const present = ["10-07-2024", "12-07-2024", "15-07-2024"];
  const absent = ["09-07-2024", "11-07-2024", "13-07-2024"];

  return (
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
          <h3 style={{textAlign: "center", margin: 0, marginTop: "5px"}}>Timetable</h3>
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
                  present.find((x) => x === moment(date).format("DD-MM-YYYY"))
                ) {
                  return "present";
                } else if (
                  absent.find((x) => x === moment(date).format("DD-MM-YYYY"))
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
  );
}
