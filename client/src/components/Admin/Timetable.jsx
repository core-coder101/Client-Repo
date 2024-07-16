import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import "../../assets/css/Teacher.css";
import "../../assets/css/studentInformation.css";
import "../../assets/css/studentInformation/all.min.css";
import { InputLabel, MenuItem, OutlinedInput, FormControl, Button, Tabs, Tab, Box, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "../common/LoadingOverlay";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import Select from '@mui/material/Select';
import { GetClasses, setError, setPopup } from "../../redux/slices/Admin/UploadLecture";
import CustomPopup from "../common/CustomPopup";
import { GetTeachers, setPopup as createClassSetPopup, setError as createClassSetError } from "../../redux/slices/Admin/CreateClass";
import { GetTimeTable, submitTimetableLecture, setError as submitTimetableSetError, setPopup as submitTimetableSetPopup } from "../../redux/slices/Admin/CreateTimetables";
import dayjs from "dayjs";

export default function Timetable() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { classesData, loading, popup, error } = useSelector(state => state.uploadLecture)
  const { DBTimeTableData, loading: createTimeTableLoading, popup: createTimeTablePopup, error: createTimeTableError } = useSelector(state => state.createTimeTable)
  const { teachersData, loading: createClassLoading, popup: createClassPopup, error: createClassError } = useSelector(state => state.createClass)

  const [ApiSearchData, SetApiSearchData] = useState({
    campus: "Main Campus",
    ClassRank: "",
    ClassName: "",
    ClassID: "",
  });

  useEffect(() => {
    if(classesData && classesData.length > 0 && ApiSearchData.ClassRank && ApiSearchData.ClassName){
      const filteredClass = classesData.find((Class) => {
        return Class.ClassRank === ApiSearchData.ClassRank && Class.ClassName === ApiSearchData.ClassName
      })
      SetApiSearchData(prev=>(
        {
          ...prev,
          ClassID: filteredClass.id,
        }
      ))
    }
  }, [ApiSearchData.ClassName, ApiSearchData.ClassRank])

  useEffect(()=>{
    if(ApiSearchData.ClassID){
      dispatch(GetTimeTable(ApiSearchData.ClassID))
    }
  }, [ApiSearchData.ClassID])

  useEffect(() => {
    let dataToSet = [];
    DBTimeTableData.forEach((lecture) => {
      let dataToPush = {
        period: [new dayjs(new Date(`2024-11-09T${lecture.period[0]}`)),new dayjs(new Date(`2024-11-09T${lecture.period[1]}`))],
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: "",
      };
      ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].forEach(day => {
        const dayData = lecture[day];
        if (dayData.subject) {
          const teacher = teachersData.find(teacher => teacher.id === dayData.teacher_id);
          dataToPush[day] = {
            teacherName: teacher?.users.name || "",
            teacherId: dayData.teacher_id,
            subject: dayData.subject || "none",
          };
        } else {
          dataToPush[day] = { teacherName: "", teacherId: "", subject: "" };
        }
      });
      dataToSet.push(dataToPush);
    });
    console.log("dataToSet: ", dataToSet);
    setTimeTableData(dataToSet)
  }, [DBTimeTableData]);
  

  // {teacherName: teacher.users.name,teacherId: teacher.id, subject: teacher.subjects.SubjectName}

  const [timeTableData, setTimeTableData] = useState([
    { period: [null, null], Monday: "", Tuesday: "", Wednesday: "", Thursday: "", Friday: "", Saturday: "" },
  ]);

  const [fridayTableData, setFridayTableData] = useState([
    { period: [null, null], Friday: "" },
  ]);

  const [timeRanges, setTimeRanges] = useState(
    timeTableData.map(() => [null, null])
  );

  const [fridayTimeRanges, setFridayTimeRanges] = useState(
    fridayTableData.map(() => [null, null])
  );

  const [tabIndex, setTabIndex] = useState(0);

  const query = ['users:id,name','subjects:UsersID,SubjectName']

  useEffect(() => {
    dispatch(GetClasses())
    dispatch(GetTeachers(query))
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetApiSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "ClassRank") {
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
  };

  const handleSelectChange = (event, periodIndex, day) => {
    const { value } = event.target;
    const updatedTimeTableData = [...timeTableData];
    updatedTimeTableData[periodIndex][day] = value;
    setTimeTableData(updatedTimeTableData);
  };

  const handleFridaySelectChange = (event, periodIndex) => {
    const { value } = event.target;
    const updatedFridayTableData = [...fridayTableData];
    updatedFridayTableData[periodIndex].Friday = value;
    setFridayTableData(updatedFridayTableData);
  };

  const addNewPeriod = () => {
    if (tabIndex === 0) {
      setTimeTableData([
        ...timeTableData,
        { period: [null, null], Monday: "", Tuesday: "", Wednesday: "", Thursday: "", Friday: "", Saturday: "" },
      ]);
      setTimeRanges([...timeRanges, [null, null]]);
    } else {
      setFridayTableData([
        ...fridayTableData,
        { period: [null, null], Friday: "" },
      ]);
      setFridayTimeRanges([...fridayTimeRanges, [null, null]]);
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        maxWidth:150,
      },
    },
  };


  //  format to send: 
  //   classId: 8,
  //   teacherId: 1,
  //   startTime: "07:00:00",
  //   endTime: "07:30:00",
  //   day: "Monday",
  //   subject: "Maths",

  const handleSubmit = (e) => {
    e.preventDefault()
    if(tabIndex === 0){
      // regular timetable submission
      timeTableData.forEach(period => {
        const startTime = new Date(period.period[0]).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        const endTime = new Date(period.period[1]).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        days.forEach(async (day) => {
          if(period[day].subject === "none"){
            return
          }
          let dataToSend
          dataToSend = {
            classId: ApiSearchData.ClassID,
            teacherId: period[day].teacherId,
            startTime: startTime,
            endTime: endTime,
            day: day,
            subject: period[day].subject,
            }
            console.log(dataToSend);
            dispatch(submitTimetableLecture(dataToSend))
            return
        })})
    } else {
      // friday timetable submission

    }
  }

  const handleTimeRangeChange = (newTimeRange, periodIndex) => {
    const updatedTimeTableData = [...timeTableData];
    updatedTimeTableData[periodIndex].period = [
      newTimeRange.startTime,
      newTimeRange.endTime
    ];
    setTimeTableData(updatedTimeTableData);
  };

  return (
    <>
      <LoadingOverlay loading={loading || createClassLoading || createTimeTableLoading} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ padding: "15px 20px" }}>
          <div className="mt-2 mb-4">
            <div className="headingNavbar d-flex justify-content-center">
              <div className="d-flex">
                <FaRegArrowAltCircleLeft
                  className="arrow"
                  onClick={() => {
                    navigate("/");
                  }}
                />
                <h4>Dashboard \ Create Timetables</h4>
              </div>
            <div className="ms-auto me-4"></div>
          </div>
        </div>
          <form onSubmit={handleSubmit}>
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
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <Chip key={selected} label={selected} />
                  </Box>
                )}
                MenuProps={MenuProps}
                style={{marginRight: "10px"}}
              >
                  <MenuItem value={"Main Campus"}>
                    Main Campus
                  </MenuItem>
                  <MenuItem value={"Second Campus"}>
                    Second Campus
                  </MenuItem>
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
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <Chip key={selected} label={selected} />
                  </Box>
                )}
                MenuProps={MenuProps}
                style={{marginRight: "10px"}}
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
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        <Chip key={selected} label={selected} />
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  style={{marginRight: "10px"}}
                  required
              >
                {classesData &&
                    classesData.map(
                      (Class) =>
                        ApiSearchData.ClassRank === Class.ClassRank && (
                          <MenuItem key={Class.ClassName} value={Class.ClassName}>
                            {Class.ClassName}
                          </MenuItem>
                        )
                    )}
              </Select>
              </FormControl>
              </div>
            </div>
          
          <div className="row pt-4 pl-3">
            <div className="col-md-6">
              <div>
                <h4 className="att_heading">Weekly Time Table</h4>
              </div>
            </div>
          </div>
          <div className="row">
            <Tabs value={tabIndex} onChange={handleTabChange}>
              <Tab label="Regular Timetable" />
              <Tab label="Friday Timetable" />
            </Tabs>
            <div className="col-md-12 mt-3" style={{overflow: "auto"}}>
              {tabIndex === 0 && (
                <div style={{transition: "all 0.3s ease"}}>
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th>Period</th>
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timeTableData.map((lecture, periodIndex) => {
                        return (
                          <tr key={periodIndex}>
                            <td>{periodIndex + 1}</td>
                            <td>
                            <SingleInputTimeRangeField
                              key={periodIndex}
                              value={lecture.period}
                              onChange={(newTimeRange) => {
                                let updated = timeTableData
                                timeTableData[periodIndex].period = newTimeRange
                                setTimeTableData(updated)
                              }}
                              style={{ minWidth: "max-content" }}
                            />
                            </td>
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                              <td key={day}>
                                <FormControl fullWidth>
                                  <InputLabel>Subject</InputLabel>
                                  <Select
                                    labelId={`select-label-${day}-${periodIndex}`}
                                    value={JSON.stringify(lecture[day])}
                                    onChange={(e) => handleSelectChange(e, periodIndex, day)}
                                    input={<OutlinedInput label="Subject" />}
                                    MenuProps={MenuProps}
                                    renderValue={(selected) => {
                                      const parsed = JSON.parse(selected)
                                      if(parsed.teacherName && parsed.subject){
                                        return (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                            <Chip label={`${parsed.teacherName} ${parsed.subject}`} />
                                        </Box>
                                        )
                                      } else if (parsed.subject){
                                        return (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                            <Chip label={`${parsed.subject}`} />
                                        </Box>
                                        )} else {
                                        return (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                            <Chip label={"none"} />
                                        </Box>
                                        )}}}
                                    required
                                  >
                                    {/* {teachersData.length > 0 && (
                                    <> */}
                                      <MenuItem key={teachersData.length} value={JSON.stringify({teacherName: "", teacherId: "", subject: "none"})}>
                                        none
                                      </MenuItem>
                                      <MenuItem key={teachersData.length + 1} value={JSON.stringify({teacherName: "", teacherId: "", subject: "break"})}>
                                        break
                                      </MenuItem>
                                    {/* </>
                                    )} */}
                                    {teachersData.length > 0 && teachersData.map((teacher, index) => (
                                    <MenuItem key={index} value={JSON.stringify({teacherName: teacher.users.name,teacherId: teacher.id, subject: teacher.subjects.SubjectName})}>
                                      {`${teacher.users.name} ${teacher.subjects.SubjectName}`}
                                    </MenuItem>
                                  ))}
                                  </Select>
                                </FormControl>
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {tabIndex === 1 && (
                <div>
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th>Period</th>
                        <th>Time</th>
                        <th>Friday</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fridayTableData.map((lecture, periodIndex) => {
                        return (
                          <tr key={periodIndex}>
                            <td>{periodIndex + 1}</td>
                            <td>
                              <SingleInputTimeRangeField
                                value={{startTime: lecture.period[0], endTime: lecture.period[1]}}
                                onChange={(newTimeRange) => {
                                  let updatedTimeTableData = timeTableData
                                  updatedTimeTableData[periodIndex].period = newTimeRange
                                  setFridayTableData(updatedTimeTableData)
                                }}
                                style={{minWidth: "max-content"}}
                              />
                            </td>
                            <td>
                              <FormControl fullWidth>
                                <InputLabel>Subject</InputLabel>
                                <Select
                                  labelId={`select-label-Friday-${periodIndex}`}
                                  value={JSON.stringify(lecture.Friday)}
                                  onChange={(e) => handleFridaySelectChange(e, periodIndex)}
                                  input={<OutlinedInput label="Subject" />}
                                  MenuProps={MenuProps}
                                  required
                                >
                                  {teachersData.length > 0 && teachersData.map((teacher) => (
                                    <MenuItem key={teacher} value={{teacherId: teacher.id, subject: teacher.subjects.SubjectName}}>
                                      {`${teacher.users.name} ${teacher.subjects.SubjectName}`}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              <Button onClick={addNewPeriod} variant="contained" color="primary" style={{ marginBottom: "10px" }}>
                Add New Period
              </Button>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button type="submit" variant="contained" color="primary">
              Save Timetable
            </Button>
          </div>
        </form>
        </div>
      </LocalizationProvider>
      <CustomPopup 
        Visible={popup}
        OnClose={() => {
          dispatch(setPopup(false))
          setTimeout(() => {
            dispatch(setError(null))
          }, 400);
        }}
        errorMessage={error}
      />
      <CustomPopup 
        Visible={createClassPopup}
        OnClose={() => {
          dispatch(createClassSetPopup(false))
          setTimeout(() => {
            dispatch(createClassSetError(null))
          }, 400);
        }}
        errorMessage={createClassError}
      />
      <CustomPopup 
        Visible={createTimeTablePopup}
        OnClose={() => {
          dispatch(submitTimetableSetPopup(false))
          setTimeout(() => {
            dispatch(submitTimetableSetError(null))
          }, 400);
        }}
        errorMessage={createTimeTableError}
      />
    </>
  );
}
