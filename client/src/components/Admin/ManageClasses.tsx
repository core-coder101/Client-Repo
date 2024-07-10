import React , {useEffect,useState} from 'react'
import "../../assets/css/table.less"
import "../../assets/css/class.css"
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from 'react-animated-popup';
import { useSelector } from 'react-redux';
import LoadingOverlay from '../common/LoadingOverlay';
import CustomPopup from '../common/CustomPopup';

export default function ManageClasses() {

  const { CSRFToken } = useSelector((state) => state.auth)

  const [Classes , SetClasses] = useState([]);
  const [errorMessage , setErrorMessage] = useState(null);
  const [popup, setPopup] = useState(false)
  const [loading, setLoading] = useState(false)


  const GetClasses = async () =>{
    setErrorMessage("Loading Classes. . . ")
    setLoading(true)
    try {
      const response = await axios.get(
          'http://127.0.0.1:8000/api/GetClasses'
          ,{
              headers: {
                  'X-CSRF-TOKEN': CSRFToken,
                  'Content-Type': 'application/json',
                  'API-TOKEN': 'IT is to secret you cannot break it :)',
              },
          }
      );
      if(response && response.data.success == true){
        SetClasses(response.data.data);
      }
  } catch (error) {
      console.error(error);
      if(error.response.data.message.includes("[2002]")){
        setErrorMessage("Database down at the moment. . . ")
        setPopup(true)
      } else{
        setErrorMessage("Failed to Load Classes")
        setPopup(true)
      }
  } finally {
    setLoading(false)
  }
}


  useEffect(()=>{
    GetClasses();
  },[]);


  const navigate = useNavigate()


  const Delete = async(id) => {
    setErrorMessage("Deleting Class")
    setLoading(true)
    try {
      const response = await axios.post(
          'http://127.0.0.1:8000/api/DeleteClass',{ID:id}
          ,{
              headers: {
                  'X-CSRF-TOKEN': CSRFToken,
                  'Content-Type': 'application/json',
                  'API-TOKEN': 'IT is to secret you cannot break it :)',
              },
          }
      );
      SetClasses((prev)=>{
        return(prev.filter((Class) =>{
          return !(Class.id == id)
        }))
      })
      setErrorMessage("Class Deleted Successfully")
      setPopup(true)
  } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Delete Class");
      setPopup(true)
  } finally {
    setLoading(false)
  }
  }

  const Edit = (id) => {
    navigate(`/createclass/${id}`);
  };
  const Details = (id) =>{
    navigate(`/ClassDetails/${id}`);
  }


  return (
    <>
    <LoadingOverlay loading={loading} />
    <div className='dashboard'>
        <div className='mt-2 mb-4'>
          <div className='headingNavbar d-flex justify-content-center'>
            <div className='d-flex'><FaRegArrowAltCircleLeft className='arrow' onClick={()=>{navigate("/")}} /><h4>Dashboard \ Manage Classes</h4></div>
            <button onClick={()=>{navigate("/createclass")}} type='button' className='ms-auto me-4 btn btn-primary'>Add a new class</button>
          </div>
        </div>
        <div className='outerTable'>
        <div className="table-responsive-vertical shadow-z-1">
        <table id="table" className=" table table-hover table-mc-light-blue">
          <thead>
            <tr>
              <th>ClassRank</th>
              <th>ClassName</th>
              <th>ClassTeacher</th>
              <th>ClassFloor</th>
              <th>Details</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Classes && Classes.length > 0 ? Classes.map((Class) => {
              console.log(Class);
                return (
              <tr>
              <td data-title="Rank">{Class.ClassRank} th</td>
              <td data-title="Name">{Class.ClassName}</td>
              <td data-title="TeacherName">{Class.teachers ? Class.teachers.users.name : "none"}</td>
              <td data-title="Floor">{Class.ClassFloor}</td>
              <td data-title="Details"><button type="button" onClick={()=>{Details(Class.id)}}  className="btn btn-info">Details</button></td>
              <td data-title="Edit"><button type="button" onClick={()=>{Edit(Class.id)}} className="btn btn-warning">Edit</button></td>
              <td data-title="Delete"><button type="button" onClick={()=>{Delete(Class.id)}} className="btn btn-danger">Delete</button></td>
            </tr>
          );
            }) :

              <p style={{textAlign: "center"}}>No classes to show. . .</p>

            }
          </tbody>
        </table>
      </div>
        <CustomPopup 
          Visible={popup} 
          OnClose={() => {setPopup(false); setTimeout(()=>{setErrorMessage("")},400)}}
          errorMessage={errorMessage}
          />
      </div>
    </div>
    </>
  )
}
