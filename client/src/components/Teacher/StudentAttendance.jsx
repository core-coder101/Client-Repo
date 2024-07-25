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
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  GetStudentInformation,
  GetTeacherClassinfo,
  GetTodayattendance,
  SubmitAttendance,
  setError,
  setPopup,
} from "../../redux/slices/Teacher/StudentAttendance";
import LoadingOverlay from "../common/LoadingOverlay";
import { GetTimeTableForTeacherDashboard } from "../../redux/slices/Admin/CreateTimetables";

export default function StudentAttendance() {
  const navigate = useNavigate();

  const [filteredRows, setFilteredRows] = useState([]);
  const [search, setSearch] = useState("");

  const {
    teacherData,
    todayClassAttendance,
    studentsData,
    loading,
    popup,
    error,
  } = useSelector((state) => state.studentAttendanceTeacher);
  const {
    teacherDashboardTimetable,
    loading: loading2,
    popup: popup2,
    error: error2,
  } = useSelector((state) => state.createTimeTable);
  const dispatch = useDispatch();

  const [localLoading, setLocalLoading] = useState(false);
  const [localPopup, setLocalPopup] = useState(false);

  // temp
  const [classesData, setClassesData] = useState([]);
  const [ApiSearchData, SetApiSearchData] = useState({
    campus: "Main Campus",
    ClassRank: "",
    ClassName: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetApiSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "ClassRank") {
      // Update ClassName based on the selected ClassRank
      const selectedClass = classesData.find(
        (Class) => Class.ClassRank === value
      );
      if (selectedClass) {
        SetApiSearchData((prev) => ({
          ...prev,
          ClassName: selectedClass.ClassName,
        }));
      }
    }
    setErrorMessage("");
  };

  useEffect(() => {
    if (ApiSearchData.ClassRank && ApiSearchData.ClassName) {
      dispatch(
        GetStudentInformation({
          ClassRank: ApiSearchData.ClassRank,
          ClassName: ApiSearchData.ClassName,
        })
      );
      dispatch(
        GetTodayattendance({
          ClassRank: ApiSearchData.ClassRank,
          ClassName: ApiSearchData.ClassName,
        })
      );
    }
  }, [ApiSearchData]);

  useEffect(() => {
    if (teacherDashboardTimetable && teacherDashboardTimetable.length > 0) {
      const classIds = Array.from(
        new Set([
          ...teacherDashboardTimetable.map((lecture) => lecture.ClassID),
          ...(teacherData?.classes?.id ? [teacherData.classes.id] : []),
        ])
      );
      let classes = [];
      teacherDashboardTimetable.forEach((lecture) => {
        console.log("lecture: ", lecture);
        if (classIds.includes(lecture.ClassID)) {
          classes.push(lecture.class);
          classIds.filter((id) => id !== lecture.ClassID);
        }
      });

      setClassesData(classes);
      SetApiSearchData((prev) => {
        return {
          ...prev,
          ClassRank: classes[0].ClassRank,
          ClassName: classes[0].ClassName,
        };
      });
    }
  }, [teacherDashboardTimetable, teacherData]);

  useEffect(() => {
    setLocalLoading(loading);
    setLocalPopup(popup);
  }, [loading, popup]);

  useEffect(() => {
    if (!teacherData) {
      dispatch(GetTeacherClassinfo());
    }
  }, []);

  const handleSubmit = () => {
    if (!(ApiSearchData.ClassName && ApiSearchData.ClassRank)) {
      return;
    }
    dispatch(
      SubmitAttendance({
        selectedRows,
        ClassName: ApiSearchData.ClassName,
        ClassRank: ApiSearchData.ClassRank,
      })
    );
  };

  useEffect(() => {
    dispatch(GetTimeTableForTeacherDashboard("TImETableforfuckingteacher"));
  }, []);

  useEffect(() => {
    if (todayClassAttendance && todayClassAttendance.length > 0) {
      setSelectedRows(todayClassAttendance);
    }
  }, [todayClassAttendance]);

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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        maxWidth: 150,
      },
    },
  };

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
            <div className="inputDiv">
              <FormControl>
                <InputLabel id="createTimetableCampus">Campus</InputLabel>
                <Select
                  labelId="createTimetableCampus"
                  id="createTimetableCampus"
                  value={ApiSearchData.campus}
                  name="campus"
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <Chip key={selected} label={selected} />
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  style={{ marginRight: "10px" }}
                >
                  <MenuItem value={"Main Campus"}>Main Campus</MenuItem>
                  <MenuItem value={"Second Campus"}>Second Campus</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="inputDiv">
              <FormControl>
                <InputLabel id="createTimetableCampus">Class Rank</InputLabel>
                <Select
                  labelId="createTimetableCampus"
                  id="createTimetableCampus"
                  value={ApiSearchData.ClassRank}
                  name="ClassRank"
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <Chip key={selected} label={selected} />
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  style={{ marginRight: "10px" }}
                  required
                >
                  {classesData &&
                    Array.from(
                      new Set(classesData.map((Class) => Class.ClassRank))
                    ).map((rank) => (
                      <MenuItem key={rank} value={rank}>
                        {rank}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className="inputDiv">
              <FormControl>
                <InputLabel id="createTimetableCampus">Class Name</InputLabel>
                <Select
                  labelId="createTimetableCampus"
                  id="createTimetableCampus"
                  value={ApiSearchData.ClassName}
                  name="ClassName"
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <Chip key={selected} label={selected} />
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  style={{ marginRight: "10px" }}
                  required
                >
                  {/* {classesData &&
                    Array.from(
                      new Set(classesData.map((Class) => Class.Name))
                    ).map((ClassName) => (
                      <MenuItem key={ClassName} value={ClassName}>
                        {ClassName}
                      </MenuItem>
                    ))} */}
                  {classesData &&
                    Array.from(
                      new Set(
                        classesData.map((Class) => {
                          if (ApiSearchData.ClassRank == Class.ClassRank) {
                            return Class.ClassName;
                          }
                          {
                            /* <MenuItem key={Class.id} value={Class.ClassName}>
                            {Class.ClassName}
                          </MenuItem> */
                          }
                        })
                      )
                    ).map((name) => {
                      return (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </div>
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
              rowSelectionModel={selectedRows}
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
