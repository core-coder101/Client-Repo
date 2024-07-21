import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/ReactQuill.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Announcement() {

  const [errorMessage, setErrorMessage] = useState("");
  const [popup, setPopup] = useState(false);
  
const { CSRFToken, user } = useSelector((state) => state.auth);

if (user.token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
}


  const [value, setValue] = useState('');
  const [FormData , setFormData] = useState({
    heading:'',
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const [isTeacherChecked, setIsTeacherChecked] = useState(false);
  const [isStudentChecked, setIsStudentChecked] = useState(false);

  // Handle change event for teacher checkbox
  const handleTeacherChange = (event) => {
    setIsTeacherChecked(event.target.checked);
  };

  // Handle change event for student checkbox
  const handleStudentChange = (event) => {
    setIsStudentChecked(event.target.checked);
  };

  const CreateAnnouncement = async() =>{
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}api/createAnnouncement`,
        {'heading':FormData.heading , 'description':value,'teacher':isTeacherChecked,'student':isStudentChecked},
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
        });
        setValue('');
        isTeacherChecked('');
        isStudentChecked('');
        setPopup(true);
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage(response.data.message);
        setPopup(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed create announcement");
      setPopup(true);
    }
  }

const Submit = () =>{
  CreateAnnouncement();
}

  return (
    <>
              <div className='p-5 ms-auto me-auto mt-5' style={{maxWidth:'700px' , backgroundColor:'ghostwhite'}}>
        <center><h1 className='mb-4'>Make Announcement</h1></center>
<div className="input-group mb-3">
  <input type="text" name='heading' onChange={handleChange} value={FormData.heading} className="form-control" placeholder="Heading" aria-label="Username" aria-describedby="basic-addon1" required/>
</div>
<div className="input-group">
<ReactQuill theme="snow" className='ReactQuill' value={value} onChange={setValue} />
</div>
<div className='mt-3'>
  <input type="checkbox" id="vehicle2" name="teacher"        checked={isTeacherChecked}
        onChange={handleTeacherChange} />
  <label for="vehicle2" className='ms-2'> For Teachers</label><br />
  <input type="checkbox" id="vehicle3" name="student"         checked={isStudentChecked}
        onChange={handleStudentChange} />
  <label for="vehicle3" className='ms-2'> For Students</label><br />
</div>
<div >
  <button className="btn btn-primary form-control mt-3" onClick={Submit}>Submit</button>
</div>
        </div>
    </>
  )
}
