import React , {useEffect,useState} from 'react'
import "../css/table.less"
import "../css/class.css"
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useAuth } from './context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ManageClasses() {

  const { CSRFToken, user } = useAuth();

    if (user.token) {
        axios.defaults.headers.common['Authorization'] =
        `Bearer ${user.token}`;
    }

  const [Classes , SetClasses] = useState('');

  const GetClasses = async () =>{
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
      SetClasses(response.data);
  } catch (error) {
      console.error(error);
      SetClasses({ success: false, message: "Failed to create teacher" });
  }}


  useEffect(()=>{
    GetClasses();
  },[]);


  const navigate = useNavigate()

  return (
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
            
            {Classes && Classes.data.map((Class) => {
              console.log(Class);
                return (
              <tr>
              <td data-title="Rank">{Class.ClassRank} th</td>
              <td data-title="Name">{Class.ClassName}</td>
              <td data-title="TeacherName">{Class.ClassTeacherID}</td>
              <td data-title="Floor">{Class.ClassFloor}</td>
              <td data-title="Details"><button type="button" class="btn btn-info">Details</button></td>
              <td data-title="Edit"><button type="button" class="btn btn-warning">Edit</button></td>
              <td data-title="Delete"><button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
          );
            })}
            <tr>
              <td data-title="Rank">10 th</td>
              <td data-title="Name">10 white House</td>
              <td data-title="TeacherName">Ahmad Mujtaba</td>
              <td data-title="Floor">A3</td>
              <td data-title="Details"><button type="button" class="btn btn-info">Details</button></td>
              <td data-title="Edit"><button type="button" class="btn btn-warning">Edit</button></td>
              <td data-title="Delete"><button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            <tr>
              <td data-title="Rank">10 th</td>
              <td data-title="Name">10 white House</td>
              <td data-title="TeacherName">Ahmad Mujtaba</td>
              <td data-title="Floor">A3</td>
              <td data-title="Details"><button type="button" class="btn btn-info">Details</button></td>
              <td data-title="Edit"><button type="button" class="btn btn-warning">Edit</button></td>
              <td data-title="Delete"><button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            <tr>
              <td data-title="Rank">10 th</td>
              <td data-title="Name">10 white House</td>
              <td data-title="TeacherName">Ahmad Mujtaba</td>
              <td data-title="Floor">A3</td>
              <td data-title="Details"><button type="button" class="btn btn-info">Details</button></td>
              <td data-title="Edit"><button type="button" class="btn btn-warning">Edit</button></td>
              <td data-title="Delete"><button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            <tr>
              <td data-title="Rank">10 th</td>
              <td data-title="Name">10 white House</td>
              <td data-title="TeacherName">Ahmad Mujtaba</td>
              <td data-title="Floor">A3</td>
              <td data-title="Details"><button type="button" class="btn btn-info">Details</button></td>
              <td data-title="Edit"><button type="button" class="btn btn-warning">Edit</button></td>
              <td data-title="Delete"><button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            <tr>
              <td data-title="Rank">10 th</td>
              <td data-title="Name">10 white House</td>
              <td data-title="TeacherName">Ahmad Mujtaba</td>
              <td data-title="Floor">A3</td>
              <td data-title="Details"><button type="button" class="btn btn-info">Details</button></td>
              <td data-title="Edit"><button type="button" class="btn btn-warning">Edit</button></td>
              <td data-title="Delete"><button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            <tr>
              <td data-title="Rank">10 th</td>
              <td data-title="Name">10 white House</td>
              <td data-title="TeacherName">Ahmad Mujtaba</td>
              <td data-title="Floor">A3</td>
              <td data-title="Details"><button type="button" class="btn btn-info">Details</button></td>
              <td data-title="Edit"><button type="button" class="btn btn-warning">Edit</button></td>
              <td data-title="Delete"><button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            <tr>
              <td data-title="Rank">10 th</td>
              <td data-title="Name">10 white House</td>
              <td data-title="TeacherName">Ahmad Mujtaba</td>
              <td data-title="Floor">A3</td>
              <td data-title="Details"><button type="button" class="btn btn-info">Details</button></td>
              <td data-title="Edit"><button type="button" class="btn btn-warning">Edit</button></td>
              <td data-title="Delete"><button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            <tr>
              <td data-title="Rank">10 th</td>
              <td data-title="Name">10 white House</td>
              <td data-title="TeacherName">Ahmad Mujtaba</td>
              <td data-title="Floor">A3</td>
              <td data-title="Details"><button type="button" class="btn btn-info">Details</button></td>
              <td data-title="Edit"><button type="button" class="btn btn-warning">Edit</button></td>
              <td data-title="Delete"><button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            <tr>
              <td data-title="Rank">10 th</td>
              <td data-title="Name">10 white House</td>
              <td data-title="TeacherName">Ahmad Mujtaba</td>
              <td data-title="Floor">A3</td>
              <td data-title="Details"><button type="button" class="btn btn-info">Details</button></td>
              <td data-title="Edit"><button type="button" class="btn btn-warning">Edit</button></td>
              <td data-title="Delete"><button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}
