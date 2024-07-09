import React, { useEffect } from 'react'
import "../../assets/css/common/LoadingOverlay.css"
import { TailSpin } from "react-loader-spinner"

export default function LoadingOverlay({ loading }) {

  return (
    <div className={'LoadingOverlay ' + (loading ? 'visible noScroll' : "")}>
      <TailSpin
        height="80"
        width="80"
        color="#FFFFFF"
        ariaLabel="loading"
      />
    </div>
  )
}
