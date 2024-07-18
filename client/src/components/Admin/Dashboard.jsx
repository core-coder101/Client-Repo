import React, { useEffect, useState } from "react";
import "../../assets/css/dashboard.css";

import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts"
import { useSelector } from "react-redux";
import axios from 'axios';
import CustomPopup from "../common/CustomPopup";

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

export function customFormatNumber(number) {
  // Convert the number to a string
  let numStr = number.toString();
  // Split the string into an array of individual characters
  let numArray = numStr.split('');
  // Initialize an empty array to store the formatted characters
  let formattedArray = [];

  // Iterate over the number array in reverse
  for (let i = numArray.length - 1; i >= 0; i--) {
      // Push the current digit to the formatted array
      formattedArray.push(numArray[i]);

      // Determine if we need to add a comma
      let positionFromEnd = numArray.length - i;
      if (positionFromEnd === 3 || (positionFromEnd > 3 && (positionFromEnd - 3) % 2 === 0)) {
          // Add a comma
          formattedArray.push(',');
      }
  }

  // Reverse the array to get the correct order and join it into a string
  let formattedNumber = formattedArray.reverse().join('');

  // Remove any leading comma if it exists
  if (formattedNumber[0] === ',') {
      formattedNumber = formattedNumber.substring(1);
  }

  return formattedNumber;
}



export default function Dashboard() {


    const [errorMessage, setErrorMessage] = useState("");
    const [popup, setPopup] = useState(false);
    const [FeeDataDB , SetFeeData] = useState('');
    const [Expensives , SetExpensives] = useState('');
    
  const { CSRFToken, user } = useSelector((state) => state.auth);

  if (user.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  }

  const [studentweekattendances , setstudentweekattendance] = useState('');

  const GetStudentWeekAttendance = async () =>{
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}api/GetStudentWeekAttendance`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": "IT is to secret you cannot break it :)",
          },
        }
      );

      if (response.data.success == true) {
        setstudentweekattendance(response.data);
      } else {
        setErrorMessage(response.data.message);
        setPopup(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Reset Password");
      setPopup(true);
    }
  }

  useEffect(()=>{
    GetStudentWeekAttendance();
  },[]);

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
      title: {
        text: 'Today Preset Staff',
        align: 'center', // Align title to center
        style: {
          fontSize: '24px',
          color: '#666'
        },
      },
      colors: ["#179c13", "#cc1d28"]
    },
    series: [17, 3],
  };


  const mergedData = {};

// Process Expensives data
if (Expensives && Expensives.combinedResults) {
  Expensives.combinedResults.forEach((data) => {
    const month = data.month_name.trim();
    if (!mergedData[month]) {
      mergedData[month] = { total_expensive: 0, total_fee: 0 };
    }
    mergedData[month].total_expensive = data.total_expensive;
  });
}

// Process FeeDataDB data
if (FeeDataDB && FeeDataDB.data) {
  FeeDataDB.data.forEach((data) => {
    const month = data.month_name.trim();
    if (!mergedData[month]) {
      mergedData[month] = { total_expensive: 0, total_fee: 0 };
    }
    mergedData[month].total_fee = data.total_fee;
  });
}

// Calculate the combined result (total_fee - total_expensive)
const combinedResults = Object.keys(mergedData).map((month) => ({
  month_name: month,
  total_expensive: mergedData[month].total_expensive,
  total_fee: mergedData[month].total_fee,
  net_amount: mergedData[month].total_fee - mergedData[month].total_expensive
}));


  const ProfitSeries = {
    monthDataSeries1: {
  prices: combinedResults.map((data) => data.net_amount),
  dates: combinedResults.map((data) => data.month_name)
    }
  }

  const ProfitData = {
          
    series: [{
      name: "Total Profit",
      data: ProfitSeries.monthDataSeries1.prices
    }],
    options: {
      chart: {
        type: 'area',
        height: 250,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false // Hide the toolbar/menu button
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
      },
      title: {
        text: `PKR ${customFormatNumber(FeeDataDB.YearlyTotalFee - Expensives.TotalExpensive)}`,
        align: 'center', // Align title to center
        style: {
          fontSize: '19px',
          color: '#666'
        },
        floating: true, // Makes the title float inside the chart area
        offsetY: 3, // Adjust vertical offset as needed
        offsetX: -57,
      },
      subtitle: {
      text: 'Total Profit this year',
      align: 'left',
      offsetX:20
    },

      xaxis: {
        type: 'category', // Use category type since we won't show dates
        labels: {
          show: false // Hide x-axis labels
        },
        axisBorder: {
          show: false // Hide x-axis line
        },
        axisTicks: {
          show: false // Hide x-axis ticks
        },
        categories: ProfitSeries.monthDataSeries1.dates // Provide categories without showing labels
      },
      yaxis: {
        labels: {
          show: false // Hide y-axis labels
        },
        axisBorder: {
          show: false // Hide y-axis line
        },
        axisTicks: {
          show: false // Hide x-axis ticks
        },
        opposite: true
      },
      legend: {
        show: false // Hide legend
      },
      tooltip: {
        enabled: true // Disable tooltip
      },
      grid: {
        show: false // Hide grid lines
      },
      fill: {
        opacity: 1 // Ensure no fill opacity
      },
      colors: ['#6ca7f0'],
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
  }


  const TotalExpensives = async () =>{
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}api/TotalExpensives`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": "IT is to secret you cannot break it :)",
          },
        }
      );

      if (response.data.success == true) {
        SetExpensives(response.data);
      } else {
        setErrorMessage(response.data.message);
        setPopup(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Reset Password");
      setPopup(true);
    }
  }

  useEffect(()=>{
    TotalExpensives();
  },[])
  
  const PaySeries = {
    monthDataSeries1: {
      prices: Expensives && Expensives.combinedResults ? Expensives.combinedResults.map((data) => data.total_expensive) : [],
      dates: Expensives && Expensives.combinedResults ? Expensives.combinedResults.map((data) => data.month_name) : []
    }
  }

  const PayData = {
          
    series: [{
      name: "Expensives",
      data: PaySeries.monthDataSeries1.prices
    }],
    options: {
      chart: {
        type: 'area',
        height: 250,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false // Hide the toolbar/menu button
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: `PKR ${Expensives && customFormatNumber(Expensives.TotalExpensive)}`,
        align: 'center', // Align title to center
        style: {
          fontSize: '19px',
          color: '#666'
        },
        floating: true, // Makes the title float inside the chart area
        offsetY: 3, // Adjust vertical offset as needed
        offsetX: -57,
      },
      subtitle: {
      text: 'Expensive this year',
      align: 'left',
      offsetX:20
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: 2,
      dashArray: 0,
    },

      xaxis: {
        type: 'category', // Use category type since we won't show dates
        labels: {
          show: false // Hide x-axis labels
        },
        axisBorder: {
          show: false // Hide x-axis line
        },
        axisTicks: {
          show: false // Hide x-axis ticks
        },
        categories: PaySeries.monthDataSeries1.dates // Provide categories without showing labels
      },
      yaxis: {
        labels: {
          show: false // Hide y-axis labels
        },
        axisTicks: {
          show: false // Hide x-axis ticks
        },
        axisBorder: {
          show: false // Hide y-axis line
        },
        opposite: true
      },
      legend: {
        show: false // Hide legend
      },
      tooltip: {
        enabled: true // Disable tooltip
      },
      grid: {
        show: false // Hide grid lines
      },
      fill: {
        opacity: 1 // Ensure no fill opacity
      },
      colors: ['#d1d8e3'],
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
  }

  const GeneratedPaidFee = async () =>{
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}api/GeneratedPaidFee`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": "IT is to secret you cannot break it :)",
          },
        }
      );

      if (response.data.success == true) {
        SetFeeData(response.data);
      } else {
        setErrorMessage(response.data.message);
        setPopup(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Reset Password");
      setPopup(true);
    }
  }

  useEffect(()=>{
    GeneratedPaidFee();
  },[])


  const FeeSeries = {
    monthDataSeries1: {
      prices: FeeDataDB && FeeDataDB.data ? FeeDataDB.data.map((data) => data.total_fee) : [],
      dates: FeeDataDB && FeeDataDB.data ? FeeDataDB.data.map((data) => data.month_name) : []
    }
  }

  const FeeData = {
    series: [{
      name: "Student Fee",
      data: FeeSeries.monthDataSeries1.prices
    }],
    options: {
      chart: {
        type: 'area',
        height: 250,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false // Hide the toolbar/menu button
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: `PKR ${customFormatNumber(FeeDataDB && FeeDataDB.YearlyTotalFee)}`,
        align: 'center',
        style: {
          fontSize: '19px',
          color: '#666'
        },
        floating: true, // Makes the title float inside the chart area
        offsetY: 3, // Adjust vertical offset as needed
        offsetX: -57,
      },
      subtitle: {
      text: 'Student Fee this year',
      align: 'left',
      offsetX:20
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: 2,
      dashArray: 0,
    },
      xaxis: {
        type: 'category', // Use category type since we won't show dates
        labels: {
          show: false // Hide x-axis labels
        },
        axisBorder: {
          show: false // Hide x-axis line
        },
        axisTicks: {
          show: false // Hide x-axis ticks
        },
        categories: FeeSeries.monthDataSeries1.dates // Provide categories without showing labels
      },
      yaxis: {
        labels: {
          show: false // Hide y-axis labels
        },
        axisBorder: {
          show: false // Hide y-axis line
        },
        axisTicks: {
          show: false // Hide x-axis ticks
        },
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      },
      tooltip: {
        enabled: true // Disable tooltip
      },
      grid: {
        show: false // Hide grid lines
      },
      fill: {
        opacity: 1 // Ensure no fill opacity
      },
      colors: ['#d1d8e3'],
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
  }


  const Radarseries = [{
    name: 'Present',
    data: studentweekattendances && studentweekattendances.data ? studentweekattendances.data.map((data) => data.present_count) : []
  }, {
    name: 'Absent',
    data: studentweekattendances && studentweekattendances.data ? studentweekattendances.data.map((data) => data.absent_count) : []
  }]

  const Radardata = {
    chart: {
      height: 400,
      type: 'radar',
      toolbar: {
        show: false // Hide the toolbar/menu button
      }
    },
    colors: ['#00FF00', '#FF0000'], 
    dataLabels: {
      enabled: true
    },
    title: {
      text: 'Student Attendance previous week',
      align:'center',
      style: {
          fontSize: '18px',
          color: '#666'
        },
      offsetY:0
    },
    plotOptions: {
      radar: {
        size: 140,
        polygons: {
          strokeColors: '#e9e9e9',
          fill: {
            colors: ['#f8f8f8', '#fff']
          }
        }
      }
    },stroke: {
                width: 2
              },
              fill: {
                opacity: 0.1
              },
              markers: {
                size: 0
              },
    tooltip: {
      y: {
        formatter: function(val) {
          return val
        }
      }
    },
    xaxis: {
      categories: studentweekattendances && studentweekattendances.data ? studentweekattendances.data.map((data) => data.day_name) : []
    },
    yaxis: {
      labels: {
        formatter: function(val, i) {
          if (i % 2 === 0) {
            return val
          } else {
            return ''
          }
        }
      }
    }
  }


  const [Challans , setChallans] = useState('');

  const GeneratedChallans = async () =>{
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}api/GeneratedChallans`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": "IT is to secret you cannot break it :)",
          },
        }
      );

      if (response.data.success == true) {
        setChallans(response.data);
      } else {
        setErrorMessage(response.data.message);
        setPopup(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Reset Password");
      setPopup(true);
    }
  }

  useEffect(()=>{
    GeneratedChallans();
  },[])



  const series = [{
      name: 'Paid',
      data: Challans && Challans.data ? Challans.data.map((data) => parseInt(data.paid_fee)) : [],
    },
    {
      name: 'UnPaid',
      data: Challans && Challans.data ? Challans.data.map((data) => -parseInt(data.unpaid_fee)) : [],
    }
    ]

  const data = {
    chart: {
      type: 'bar',
      height: 440,
      stacked: true
    },
    colors: ['#008FFB', '#FF4560'],
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusApplication: 'end', // 'around', 'end'
        borderRadiusWhenStacked: 'all', // 'all', 'last'
        horizontal: true,
        barHeight: '80%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 1,
      colors: ["#fff"]
    },
    
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    yaxis: {
      stepSize: 1
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function (val) {
          return val
        }
      },
      y: {
        formatter: function (val) {
          return Math.abs(val)
        }
      }
    },
    title: {
      text: 'Paid and UnPaid Fee',
      align:'center',
      style: {
          fontSize: '24px',
          color: '#666'
        },
      offsetY:15
    },
    xaxis: {
      categories: Challans && Challans.data ? Challans.data.map((data) => data.month_name) : [],
      title: {
        text: 'Percent'
      },
      labels: {
        formatter: function (val) {
          return Math.abs(Math.round(val))
        }
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
          <Chart
            options={FeeData.options}
            series={FeeData.series}
            width="100%"
            type="area"
            className="smallchart mt-2"
          />
          <Chart
            options={PayData.options}
            series={PayData.series}
            width="100%"
            type="area"
            className="smallchart mt-2"
          />
          <Chart
            options={ProfitData.options}
            series={ProfitData.series}
            width="100%"
            type="area"
            className="smallchart mt-2"
          />
      </div>
      <div className="d-flex" style={{ marginTop: "70px" }}>
        <div className="ms-auto me-auto">
          <div id="chart">
              <ReactApexChart options={data} series={series} type="bar" height={440} width={650} className="smallchart" />
              <br/>
          </div>
        </div>
        <div>
            <div style={{ position: "relative" }}>
              <Chart
                options={pieData.options}
                series={pieData.series}
                type="donut"
                width="380"
                className="smallchart"
              />
            </div>
            <div id="chart">
            <ReactApexChart options={Radardata} series={Radarseries} type="radar" height={400}  className="smallchart mt-5" />
              <br/>
          </div>
        </div>
      </div>
      <CustomPopup
            Visible={popup}
            OnClose={() => {
              setPopup(false);
              setTimeout(() => {
                setErrorMessage("");
              }, 400);
            }}
            errorMessage={errorMessage}
            />
    </div>
  );
}
