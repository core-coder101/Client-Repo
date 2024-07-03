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
import IconButton from '@mui/material/IconButton';

import { PieChart } from '@mui/x-charts/PieChart';




const data1 = [
  { label: 'Present Staff', value: 20 }
  ];

const data2 = [
  { label: 'Present', value: 20},
  { label: 'Absent', value: 10 },
];


const series = [
  
  {
    innerRadius: 0,
    outerRadius: 80,
    id: 'series-1',
    data: data1,
    arcLabel: (text) => `Present Staff`,
    arcLabelMinAngle: 45,
  },
  {
    innerRadius: 110,
    outerRadius: 140,
    id: 'series-2',
    data: data2,
  },
];

export default function TeacherDashboard() {

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
            <div className='d-flex'><h4>Teacher Dashboard</h4></div>
            <div className='ms-auto me-4'></div>
          </div>
        </div>

        <div className='d-flex' style={{marginTop:"70px"}}>


        </div>
    </div>
  )
}
