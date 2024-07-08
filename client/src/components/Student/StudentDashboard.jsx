import React , {useState} from 'react'
import "../../assets/css/dashboard.css"
import { FaArrowCircleRight } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { FaChartPie } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import Graph from './Graph';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Present', value: 20},
  { label: 'Absent', value: 10 },
];


const series = [
  {
    innerRadius: 110,
    outerRadius: 120,
    id: 'series-2',
    data: data,
  },
];

export default function Dashboard() {

  const cardBackgroundIconStyles = { opacity: "20%",
    width: "80%",
    height: "80%",
    position: "absolute",
    right: "-40px",
  }
  const [itemData, setItemData] = useState();


  return (
    <div className='dashboard'>
      <div className='mt-2 mb-4'>
          <div className='headingNavbar d-flex justify-content-center'>
            <div className='d-flex'><h4>Dashboard</h4></div>
            <div className='ms-auto me-4'></div>
          </div>
        </div>
        <div className='d-flex'>
      <div>
      <h2 className='protest-revolution-regular mb-4' style={{textAlign: "center"}}>Attendance</h2>
        <div style={{position: "relative", left: "40px"}}>
          <PieChart
            colors={['#03a459','#dc493b']}
            series={series}
            width={350}
            height={250}
            slotProps={{
              legend: { hidden: true },
            }}
            onItemClick={(event, d) => setItemData(d)}
          />
        </div>
        </div>
        </div>
    </div>
  )
}
