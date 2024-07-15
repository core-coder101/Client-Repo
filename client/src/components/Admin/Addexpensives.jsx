import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import CustomPopup from '../common/CustomPopup';

export default function Addexpensives() {


    const [errorMessage, setErrorMessage] = useState("");
    const [popup, setPopup] = useState(false);
    
  const { CSRFToken, user } = useSelector((state) => state.auth);

  if (user.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  }


    const [FormData , setFormData] = useState({
        heading:'',
        amount:'',
        description:''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const Addexpensives = async () =>{
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_HOST}api/Addexpensives`,
            FormData,
            {
              headers: {
                "X-CSRF-TOKEN": CSRFToken,
                "Content-Type": "application/json",
                "API-TOKEN": "IT is to secret you cannot break it :)",
              },
            }
          );
    
          if (response.data.success == true) {
            setFormData({
                heading:'',
                amount:'',
                description:''
            });
            setPopup(true);
            setErrorMessage(response.data.message);
          } else {
            setErrorMessage(response.data.message);
            setPopup(true);
          }
        } catch (error) {
          console.error(error);
          setErrorMessage("Failed to Mark Fee Paid");
          setPopup(true);
        }
      }


    const Submit = () =>{
        Addexpensives()
    }


  return (
    <>
        <div className='p-5 ms-auto me-auto mt-5' style={{maxWidth:'700px' , backgroundColor:'ghostwhite'}}>
        <center><h1 className='mb-4'>Add Expensive</h1></center>
<div className="input-group mb-3">
  <input type="text" name='heading' onChange={handleChange} value={FormData.heading} className="form-control" placeholder="heading" aria-label="Username" aria-describedby="basic-addon1" required/>
</div>
<div className="input-group mb-3">
  <span className="input-group-text">PKR</span>
  <input type="number" name="amount" onChange={handleChange} value={FormData.amount} className="form-control" aria-label="Amount (to the nearest dollar)" required/>
  <span className="input-group-text">.00</span>
</div>
<div className="input-group">
  <textarea name="description" onChange={handleChange} value={FormData.description} style={{maxHeight:'200px'}} className="form-control" aria-label="With textarea" required placeholder='Description'></textarea>
</div>
<div >
  <button className="btn btn-primary form-control mt-3" onClick={Submit}>Submit</button>
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

    </>
  )
}
