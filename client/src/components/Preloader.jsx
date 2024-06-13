import React from 'react'
import { ThreeDots } from "react-loader-spinner"

export default function Preloader() {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{width: "100%", height: "100%"}} >
        <ThreeDots
            visible={true}
            height="100"
            width="100"
            color="#11101D"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass= ""
        />
  </div>
  )
}
