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
        <div className='cardsDiv '>
          <div className='card ' style={{backgroundColor: "#DC493B"}}>
            <FaRegCreditCard color='black' style={cardBackgroundIconStyles} />
            <h4>27</h4>
            <h6>Dues - Amount: ****</h6>
            <button style={{backgroundColor: "#C84332"}}>More Info <FaArrowCircleRight /></button>
          </div>
          <div className='card ' style={{backgroundColor: "#01BFEC"}}>
            <FaMoneyCheckDollar color='black' style={cardBackgroundIconStyles} />
            <h4>5000</h4>
            <h6>Total Income This Year</h6>
            <button style={{backgroundColor: "#02ABD7"}}>More Info <FaArrowCircleRight /></button>
          </div>
          <div className='card ' style={{backgroundColor: "#03A459"}}>
            <GoGraph color='black' style={cardBackgroundIconStyles} />
            <h4>5000</h4>
            <h6>Total Income This Month</h6>
            <button style={{backgroundColor: "#019450"}}>More Info <FaArrowCircleRight /></button>
          </div>
          <div className='card ' style={{backgroundColor: "#0272B6"}}>
            <FaChartPie color='black' style={cardBackgroundIconStyles} />
            <h4>0</h4>
            <h6>Income Today</h6>
            <button style={{backgroundColor:"#0166A5"}}>More Info <FaArrowCircleRight /></button>
          </div>
          <div className='card ' style={{backgroundColor: "#03A459"}}>
            <BsGraphUpArrow color='black' style={cardBackgroundIconStyles} />
            <h4>5000</h4>
            <h6>Profit This Month</h6>
            <button style={{backgroundColor: "#019450"}}>More Info <FaArrowCircleRight /></button>
          </div>
          <div className='card ' style={{backgroundColor: "#DC493B"}}>
            <VscGraphLine color='black' style={cardBackgroundIconStyles} />
            <h4>0</h4>
            <h6>Total Expense This Year</h6>
            <button style={{backgroundColor: "#C84332"}}>More Info <FaArrowCircleRight /></button>
          </div>
        </div>
        <div className='d-flex' style={{marginTop:"70px"}}>
        <div className='ms-auto me-auto'>
        <center><h2 className='protest-revolution-regular mb-4'>Fee Generated and Submitted</h2></center>
        <Graph className="mt-1" />
        </div>
      <div>
      <h2 className='protest-revolution-regular mb-4'>Today Present Staff</h2>
        <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 0, md: 4 }}
      sx={{ width: '100%' }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <PieChart
          colors={['#03a459','#dc493b']}
          series={series}
          
          width={400}
          height={300}
          slotProps={{
            legend: { hidden: true },
          }}
          onItemClick={(event, d) => setItemData(d)}
        />{' '}
      </Box>

      <Stack direction="column" sx={{ width: { xs: '100%', md: '40%' } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton
            aria-label="reset"
            size="small"
            onClick={() => {
              setItemData(null);
            }}
          >
          </IconButton>
        </Box>
      </Stack>
    </Stack>
        </div>
        </div>
    </div>
  )
}
