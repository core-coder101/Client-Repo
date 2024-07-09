import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import "../../assets/css/Teacher.css";
import "../../assets/css/studentInformation.css";
import { CiSearch } from "react-icons/ci";
import "../../assets/css/studentInformation/all.min.css";
import { DataGrid } from "@mui/x-data-grid";
import "../../assets/css/StudentAttendance.css";
import CustomFooter from "../Admin/CustomFooter";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetStudentInformation, GetTeacherClassinfo, SubmitAttendance, setError, setLoading, setPopup } from "../../redux/slices/Teacher/StudentAttendance";
import CustomPopup from "../common/CustomPopup";
import LoadingOverlay from "../common/LoadingOverlay";
import axios from "axios";

export default function StudentAttendance() {
  const navigate = useNavigate();

  const [filteredRows, setFilteredRows] = useState([]);
  const [search, setSearch] = useState("");

  const { teacherData, studentsData, loading, popup, error } = useSelector((state) => state.studentAttendanceTeacher);
  const { CSRFToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const [localLoading, setLocalLoading] = useState(false)
  const [localPopup, setLocalPopup] = useState(false)

  useEffect(()=>{
    setLocalLoading(loading)
    setLocalPopup(popup)
  }, [loading, popup])

  useEffect(()=>{
    if(!teacherData){
      dispatch(GetTeacherClassinfo()) 
    }
  }, [])

  const handleSubmit = () => {
    dispatch(SubmitAttendance(selectedRows))
  }

  useEffect(()=>{
    if(teacherData){
      dispatch(GetStudentInformation())
    }
  }, [teacherData])

  const columns = [
    { field: "ID", headerName: "Sr no.", width: 75 },
    { field: "StudentName", headerName: "Student Name", width: 140 },
    { field: "FatherName", headerName: "Father Name", width: 140 },
    {
      field: "age",
      headerName: "Student DOB",
      width: 120,
    },
    {
      field: "PhoneNumber",
      headerName: "Phone Number",
      width: 160,
    },
    {
      field: "JoiningDate",
      headerName: "Joining Date",
      width: 160,
    },
    {
      field: "HomeAddress",
      headerName: "Home Address",
      width: 250,
    },
  ];

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (studentsData && studentsData.length > 0) {
      let mapped = studentsData.map((student, index) => ({
        id: student.users.id,
        ID: index + 1,
        StudentName: student.users.name,
        FatherName: student.parents.FatherName,
        age: student.StudentDOB,
        PhoneNumber: student.StudentPhoneNumber,
        JoiningDate: student.created_at.split("T")[0],
        HomeAddress: student.StudentHomeAddress,
      }));
      setRows(mapped);
      setFilteredRows(mapped);
    }
  }, [studentsData]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const results = rows.filter(
      (student) =>
        student.StudentName.toLowerCase().includes(search.toLowerCase()) ||
        student.FatherName.toLowerCase().includes(search.toLowerCase()) ||
        student.PhoneNumber.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRows(results);
  }, [search, rows]);

  return (
    <>
      <LoadingOverlay loading={localLoading} />
    <div className="studentAttendanceMainDiv">
      <div className="headingNavbar d-flex justify-content-center">
        <div className="d-flex">
          <FaRegArrowAltCircleLeft
            onClick={() => {
              navigate("/");
            }}
            className="arrow"
          />
          <h4>Dashboard \ Student Attendance</h4>
        </div>
        <div className="ms-auto me-4"></div>
      </div>
      <form>
        <div className="inputsDiv">
          <Tooltip title="Search students from your class" arrow>
            <div className="filterDataDiv">
                <input
                  type="text"
                  className="searchInput"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search Student"
                ></input>
                <button type="button">
                  <CiSearch color="white" />
                </button>
            </div>
          </Tooltip>
        </div>
      </form>
      <div className="tableDiv attendacnceDiv">
        <div
          style={{
            height: 400,
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CustomPopup
            Visible={localPopup}
            OnClose={() => {
              dispatch(setPopup(false))
              setTimeout(() => {
                dispatch(setError(""))
              }, 400);
            }}
            errorMessage={error}
          />
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            loading={loading}
            className="dataGrid"
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            onRowSelectionModelChange={(newSelection) => {
              setSelectedRows(newSelection);
            }}
            slots={{
              footer: CustomFooter,
            }}
            slotProps={{
              footer: { handleSubmit: handleSubmit },
            }}
          />
        </div>
      </div>
    </div>
  </>
  );
}
