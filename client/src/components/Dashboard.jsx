import React from 'react'
import "../css/dashboard.css"
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { FaChartPie } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";




export default function Dashboard() {



  const cardBackgroundIconStyles = { opacity: "20%",
    width: "80%",
    height: "80%",
    position: "absolute",
    right: "-40px",
  }

  return (
    <div className='dashboard'>
      <div className='mt-2 mb-4'>
          <div className='headingNavbar d-flex justify-content-center'>
            <div className='d-flex'><FaRegArrowAltCircleLeft className='arrow' /><h4>Dashboard</h4></div>
            <div className='ms-auto me-4'></div>
          </div>
        </div>
        <div className='cardsDiv'>
          <div className='card col-3' style={{backgroundColor: "#DC493B"}}>
            <FaRegCreditCard color='black' style={cardBackgroundIconStyles} />
            <h4>27</h4>
            <h6>Dues - Amount: ****</h6>
            <button style={{backgroundColor: "#C84332"}}>More Info <FaArrowCircleRight /></button>
          </div>
          <div className='card col-3' style={{backgroundColor: "#01BFEC"}}>
            <FaMoneyCheckDollar color='black' style={cardBackgroundIconStyles} />
            <h4>5000</h4>
            <h6>Total Income This Year</h6>
            <button style={{backgroundColor: "#02ABD7"}}>More Info <FaArrowCircleRight /></button>
          </div>
          <div className='card col-3' style={{backgroundColor: "#03A459"}}>
            <GoGraph color='black' style={cardBackgroundIconStyles} />
            <h4>5000</h4>
            <h6>Total Income This Month</h6>
            <button style={{backgroundColor: "#019450"}}>More Info <FaArrowCircleRight /></button>
          </div>
          <div className='card col-3' style={{backgroundColor: "#0272B6"}}>
            <FaChartPie color='black' style={cardBackgroundIconStyles} />
            <h4>0</h4>
            <h6>Income Today</h6>
            <button style={{backgroundColor:"#0166A5"}}>More Info <FaArrowCircleRight /></button>
          </div>
          <div className='card col-3' style={{backgroundColor: "#03A459"}}>
            <BsGraphUpArrow color='black' style={cardBackgroundIconStyles} />
            <h4>5000</h4>
            <h6>Profit This Month</h6>
            <button style={{backgroundColor: "#019450"}}>More Info <FaArrowCircleRight /></button>
          </div>
          <div className='card col-3' style={{backgroundColor: "#DC493B"}}>
            <VscGraphLine color='black' style={cardBackgroundIconStyles} />
            <h4>0</h4>
            <h6>Total Expense This Year</h6>
            <button style={{backgroundColor: "#C84332"}}>More Info <FaArrowCircleRight /></button>
          </div>
        </div>
    </div>
  )
}
