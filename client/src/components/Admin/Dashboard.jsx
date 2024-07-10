import React, { useState } from "react";
import "../../assets/css/dashboard.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { FaChartPie } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import Graph from "./Graph";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chart from "react-apexcharts";
import { PieChart } from "@mui/x-charts/PieChart";

const data2 = [
  { label: "Present", value: 17 },
  { label: "Absent", value: 3 },
];
const displayMessage = `${data2[0].value} / ${data2[0].value + data2[1].value}`;
const series = [
  {
    innerRadius: 110,
    outerRadius: 120,
    id: "series-2",
    data: data2,
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

  const pieData = {
    options: {
      labels: ["Present", "Absent"],
      legend: {
        show: true,
        position: 'bottom'
      },
      colors: ["#179c13", "#cc1d28"]
    },
    series: [17, 3],
  };

  const series = {
    monthDataSeries1: {
      prices: [70, 91, 100, 150, 40, 60, 30, 200, 150],
      dates: ['21 Nov', '22 Nov','23 Nov', '24 Nov', '25 Nov', '26 Nov', '27 Nov','30 Nov' ,'15 Dec']
    }
  }

  const data = {
          
    series: [{
      name: "STOCK ABC",
      data: series.monthDataSeries1.prices
    }],
    options: {
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      title: {
        text: 'Fundamental Analysis of Stocks',
        align: 'left'
      },
      subtitle: {
        text: 'Price Movements',
        align: 'left'
      },
      labels: series.monthDataSeries1.dates,
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
    },
  }

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
      <div className="cardsDiv ">
        <div className="card " style={{ backgroundColor: "#DC493B" }}>
          <FaRegCreditCard color="black" style={cardBackgroundIconStyles} />
          <h4>27</h4>
          <h6>Dues - Amount: ****</h6>
          <button style={{ backgroundColor: "#C84332" }}>
            More Info <FaArrowCircleRight />
          </button>
        </div>
        <div className="card " style={{ backgroundColor: "#01BFEC" }}>
          <FaMoneyCheckDollar color="black" style={cardBackgroundIconStyles} />
          <h4>5000</h4>
          <h6>Total Income This Year</h6>
          <button style={{ backgroundColor: "#02ABD7" }}>
            More Info <FaArrowCircleRight />
          </button>
        </div>
        <div className="card " style={{ backgroundColor: "#03A459" }}>
          <GoGraph color="black" style={cardBackgroundIconStyles} />
          <h4>5000</h4>
          <h6>Total Income This Month</h6>
          <button style={{ backgroundColor: "#019450" }}>
            More Info <FaArrowCircleRight />
          </button>
        </div>
        <div className="card " style={{ backgroundColor: "#0272B6" }}>
          <FaChartPie color="black" style={cardBackgroundIconStyles} />
          <h4>0</h4>
          <h6>Income Today</h6>
          <button style={{ backgroundColor: "#0166A5" }}>
            More Info <FaArrowCircleRight />
          </button>
        </div>
        <div className="card " style={{ backgroundColor: "#03A459" }}>
          <BsGraphUpArrow color="black" style={cardBackgroundIconStyles} />
          <h4>5000</h4>
          <h6>Profit This Month</h6>
          <button style={{ backgroundColor: "#019450" }}>
            More Info <FaArrowCircleRight />
          </button>
        </div>
        <div className="card " style={{ backgroundColor: "#DC493B" }}>
          <VscGraphLine color="black" style={cardBackgroundIconStyles} />
          <h4>0</h4>
          <h6>Total Expense This Year</h6>
          <button style={{ backgroundColor: "#C84332" }}>
            More Info <FaArrowCircleRight />
          </button>
        </div>
      </div>
      <div className="d-flex" style={{ marginTop: "70px" }}>
        <div className="ms-auto me-auto">
          <center>
            <h2 className="protest-revolution-regular mb-4">
              Fee Generated and Submitted
            </h2>
          </center>
          <Chart
            options={data.options}
            series={data.series}
            width="600"
            type="area"
          />
        </div>
        <div>
          <h2 className="protest-revolution-regular mb-4">
            Today Present Staff
          </h2>
          <div>
            <div style={{ position: "relative" }}>
              <Chart
                options={pieData.options}
                series={pieData.series}
                type="donut"
                width="380"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
