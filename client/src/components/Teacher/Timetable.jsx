import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import "../../assets/css/Teacher.css";
import "../../assets/css/studentInformation.css";
import "../../assets/css/studentInformation/all.min.css";
import { InputLabel, MenuItem, OutlinedInput, FormControl, Button, Box, Chip, Tooltip, } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "../common/LoadingOverlay";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import Select from '@mui/material/Select';
import { GetTeachers, setPopup as createClassSetPopup, setError as createClassSetError } from "../../redux/slices/Admin/CreateClass";
import { GetTimeTable, destroyTimeTable, submitTimetableLecture, setError as submitTimetableSetError, setPopup as submitTimetableSetPopup } from "../../redux/slices/Admin/CreateTimetables";
import dayjs from "dayjs";
import Snackbar from '@mui/material/Snackbar';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


export default function Timetable() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { DBTimeTableData, loading: createTimeTableLoading, popup: createTimeTablePopup, error: createTimeTableError } = useSelector(state => state.createTimeTable)
  const { teachersData, loading: createClassLoading, popup: createClassPopup, error: createClassError } = useSelector(state => state.createClass)
  const { teacherData } = useSelector(state => state.studentAttendanceTeacher)
  
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    if (!(DBTimeTableData && DBTimeTableData.length > 0)){
      return
    }
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
        disabled: true,
      };
      ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].forEach(day => {
        const dayData = lecture[day];
        if (dayData.subject) {
          const teacher = teachersData.find(teacher => teacher.id === dayData.teacher_id);
          dataToPush[day] = {
            teacherName: teacher?.users.name || "",
            teacherId: dayData.teacher_id,
            subject: dayData.subject || "none",
          }
        } else {
          dataToPush[day] = { teacherName: "", teacherId: "", subject: "" };
        }
      });
      dataToSet.push(dataToPush);
    });

    setTimeTableData(dataToSet)

  }, [DBTimeTableData]);
  

  // {teacherName: teacher.users.name,teacherId: teacher.id, subject: teacher.subjects.SubjectName}

  const [timeTableData, setTimeTableData] = useState([
    // { period: [null, null], Monday: "", Tuesday: "", Wednesday: "", Thursday: "", Friday: "", Saturday: "" },
  ]);

  const query = ['users:id,name','subjects:UsersID,SubjectName']

  useEffect(() => {
    dispatch(GetTeachers(query))
    dispatch(GetTimeTable(""))
  }, []);

  const handleSelectChange = (event, periodIndex, day) => {
    const { value } = event.target;
    const updatedTimeTableData = [...timeTableData];
    updatedTimeTableData[periodIndex][day] = value;
    setTimeTableData(updatedTimeTableData);
  };

  const addNewPeriod = () => {
    setTimeTableData([
      ...timeTableData,
      { period: [null, null],
        Monday: {teacherName: "", teacherId: "", subject: "none"},
        Tuesday: {teacherName: "", teacherId: "", subject: "none"},
        Wednesday: {teacherName: "", teacherId: "", subject: "none"},
        Thursday: {teacherName: "", teacherId: "", subject: "none"},
        Friday: {teacherName: "", teacherId: "", subject: "none"},
        Saturday: {teacherName: "", teacherId: "", subject: "none"},
        disabled: false,
      },
    ]);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        maxWidth:150,
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    let dataToSend
    timeTableData && timeTableData.length > 0 && timeTableData.forEach(period => {
        const startTime = new Date(period.period[0]).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        const endTime = new Date(period.period[1]).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        days.forEach(async (day) => {
          if(period[day].subject === "none" || period[day].subject === ""){
            return
          }
          dataToSend = {
            classId: "",
            teacherId: period[day].teacherId,
            startTime: startTime,
            endTime: endTime,
            day: day,
            subject: period[day].subject,
            }
            dispatch(submitTimetableLecture(dataToSend))
            return
        })})
    dispatch(GetTimeTable(""))
  }

  const resetTimetable = () => {
    setTimeTableData([])
    dispatch(destroyTimeTable())
  }

  return (
    <>
      <LoadingOverlay loading={createClassLoading || createTimeTableLoading} />
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
          <div className="row pt-4 pl-3">
            <div className="col-md-6">
              <div>
                <h4 className="att_heading">Weekly Time Table</h4>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-3" style={{overflow: "auto"}}>
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
                              <Tooltip title={lecture.disabled ? "Reset Timetable to change time" : ""} arrow placement="bottom">
                                <SingleInputTimeRangeField
                                  key={periodIndex}
                                  value={lecture.period}
                                  onChange={(newTimeRange) => {
                                    let updated = timeTableData
                                    timeTableData[periodIndex].period = newTimeRange
                                    setTimeTableData(updated)
                                  }}
                                  disabled={lecture.disabled}
                                  style={{ minWidth: "max-content" }}
                                />
                              </Tooltip>
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
                                      <MenuItem key={teachersData.length} value={{teacherName: "", teacherId: "", subject: "none"}}>
                                        none
                                      </MenuItem>
                                      <MenuItem key={teachersData.length + 1} value={{teacherName: "", teacherId: "", subject: "break"}}>
                                        break
                                      </MenuItem>
                                    {/* </>
                                    )} */}
                                    {teachersData.length > 0 && teachersData.map((teacher, index) => (
                                    <MenuItem key={index} value={{teacherName: teacher.users.name,teacherId: teacher.id, subject: teacher.subjects.SubjectName}}>
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
              <Button onClick={addNewPeriod} variant="contained" color="primary" style={{ margin: "0px 10px 10px 0px" }}>
                Add New Period
              </Button>
              <Tooltip title="Reset Timetable to edit Period Times" arrow placement="bottom">
                <Button onClick={() =>setDialogOpen(true)} variant="contained" color="warning" style={{ marginBottom: "10px" }}>
                  Reset
                </Button>
              </Tooltip>
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
      <Snackbar
        open={createClassPopup}
        onClose={() => {
          dispatch(createClassSetPopup(false))
        }}
        onAnimationEnd={()=>{
          dispatch(createClassSetError(""))
        }}
        message={createClassError}
        autoHideDuration={3000}
      />
      <Snackbar
        open={createTimeTablePopup}
        onClose={() => {
          dispatch(submitTimetableSetPopup(false))
        }}
        onAnimationEnd={()=>{
          dispatch(submitTimetableSetError(""))
        }}
        message={createTimeTableError}
        autoHideDuration={3000}
        transitionDuration={400}
      />
      <Dialog
        open={dialogOpen}
        onClose={() =>setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reset Timetable Data?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reset yout current timetable data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>setDialogOpen(false)} autoFocus>
            No
          </Button>
          <Button onClick={() =>{setDialogOpen(false); resetTimetable()}}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
