import React from 'react'
import Popup from 'react-animated-popup';


export default function CustomPopup({ Visible , errorMessage ,OnClose }) {
    return (
    <>
      <div className='popup'>
        <Popup
          visible={Visible}
          onClose={OnClose}
          style={{
            backgroundColor: "rgba(17, 16, 29, 0.95)",
            boxShadow: "rgba(0, 0, 0, 0.2) 5px 5px 5px 5px",
            padding: "40px 20px",
          }}
          animationDuration={400}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "fit-content", height: "100%", padding: "0" }}
          >
            <h5 style={{ color: "white", margin: "0" }}>
              {errorMessage}
            </h5>
          </div>
        </Popup>
      </div>
    </>
  )
}
