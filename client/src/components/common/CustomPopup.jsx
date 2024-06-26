import React from 'react'
import Popup from 'react-animated-popup';
import { useDispatch, useSelector } from 'react-redux';


export default function CustomPopup({ Visible , errorMessage ,OnClose }) {
    const dispatch = useDispatch();
    return (
    <>
        <Popup
                visible={Visible}
                onClose={OnClose}
                style={{
                  backgroundColor: "rgba(17, 16, 29, 0.95)",
                  boxShadow: "rgba(0, 0, 0, 0.2) 5px 5px 5px 5px",
                  padding: "40px 20px",
                }}
              >
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: "max-content", height: "100%", padding: "0" }}
                >
                  <h5 style={{ color: "white", margin: "0" }}>
                    {errorMessage}
                  </h5>
                </div>
      </Popup>
    </>
  )
}
