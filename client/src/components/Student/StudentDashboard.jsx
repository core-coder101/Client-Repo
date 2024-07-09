import React, { useState } from "react";
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
  const cardBackgroundIconStyles = {
    opacity: "20%",
    width: "80%",
    height: "80%",
    position: "absolute",
    right: "-40px",
  };
  const [itemData, setItemData] = useState();

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
      <div className="d-flex justify-content-evenly align-items-cente flex-wrap">
        <div
          style={{ position: "relative", width: "350px", height: "250px" }}
          className="attendanceOuterDiv"
        >
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
            <ul style={{ display: "flex", listStyle: "none", padding: 0, width: "max-content", position: "relative", right: "25px" }}>
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
        <div className="calendarDiv">
          <Calendar
            style={{ height: 500 }}
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
      </div>
    </div>
  );
}
