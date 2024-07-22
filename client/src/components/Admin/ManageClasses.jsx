import React , {useEffect,useState} from 'react'
import "../../assets/css/class.css"
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../common/LoadingOverlay';
import CustomPopup from '../common/CustomPopup';
import { GetClasses } from '../../redux/slices/Admin/UploadLecture';
import { DeleteClass, setError as manageClassesSetError, setPopup as manageClassesSetPopup } from '../../redux/slices/Admin/ManageClasses';
import { setError, setPopup } from '../../redux/slices/Admin/UploadLecture';
import { MenuItem, OutlinedInput, Select } from "@mui/material";

export default function ManageClasses() {

  const { classesData, loading, error, popup } = useSelector(state => state.uploadLecture)
  const { loading: manageClassesLoading, error: manageClassesError, popup: manageClassesPopup } = useSelector(state => state.manageClasses)

  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(GetClasses())
  },[]);


  const navigate = useNavigate()

  const Edit = (id) => {
    navigate(`/createclass/${id}`);
  };
  const Details = (id) =>{
    navigate(`/ClassDetails/${id}`);
  }

  const actions = [
    {
      name: "Details",
      action: (id) => {navigate(`/ClassDetails/${id}`)}
    },
    {
      name: "Edit",
      action: (id) => {navigate(`/createclass/${id}`)}
    },
    {
      name: "Delete",
      action: (id) => {dispatch(DeleteClass(id))}
    },
  ]


  return (
    <>
    <LoadingOverlay loading={loading || manageClassesLoading} />
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
              <th>Timetable</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classesData && classesData.length > 0 ? classesData.map((Class) => {
              console.log(Class);
                return (
              <tr>
              <td data-title="Rank">{Class.ClassRank} th</td>
              <td data-title="Name">{Class.ClassName}</td>
              <td data-title="TeacherName">{Class.teachers ? Class.teachers.users.name : "none"}</td>
              <td data-title="Floor">{Class.ClassFloor}</td>
              {/* <td data-title="Details"><button type="button" onClick={()=>{Details(Class.id)}}  class="btn btn-info">Details</button></td>
              <td data-title="Edit"><button type="button" onClick={()=>{Edit(Class.id)}} class="btn btn-warning">Edit</button></td>
              <td data-title="Delete"><button type="button" onClick={()=>{Delete(Class.id)}} class="btn btn-danger">Delete</button></td> */}
              <td data-title="Timetable">
                <button className='btn btn-danger' style={{fontSize:'small'}}> Check TimeTable</button>
              </td>
              <td data-title="Actions">
                <Select
                  labelId="manageClassesActions"
                  id="demo-multiple-chip"
                  input={<OutlinedInput value="Actions" id="select-multiple-chip" label="Chip" />}
                >
                  {actions.map((action, index) => (
                      <MenuItem
                      key={index}
                      onClick={()=>{action.action(Class.id)}}
                      >
                      {action.name}
                      </MenuItem>
                  ))}
                </Select>
              </td>
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
          OnClose={() => {dispatch(setPopup(false)); setTimeout(()=>{dispatch(setError(""))},400)}}
          errorMessage={error}
          />
        <CustomPopup 
          Visible={manageClassesPopup} 
          OnClose={() => {dispatch(manageClassesSetPopup(false)); setTimeout(()=>{dispatch(manageClassesSetError(""))},400)}}
          errorMessage={manageClassesError}
          />
      </div>
    </div>
    </>
  )
}
