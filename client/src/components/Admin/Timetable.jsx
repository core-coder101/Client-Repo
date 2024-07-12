import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import "../../assets/css/Teacher.css";
import "../../assets/css/studentInformation.css";
import "../../assets/css/studentInformation/all.min.css";
import axios from "axios";
import { Box, Chip, InputLabel, TextField, MenuItem, OutlinedInput, FormControl, Button, Tabs, Tab } from "@mui/material";
import { useSelector } from "react-redux";
import CustomPopup from "../common/CustomPopup";
import LoadingOverlay from "../common/LoadingOverlay";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import Select from '@mui/material/Select';

export default function StudentInformation() {
  const navigate = useNavigate();

  const [Classes, SetClasses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ApiSearchData, SetApiSearchData] = useState({
    campus: "Main Campus",
    ClassRank: "",
    ClassName: "",
  });

  const [timeTableData, setTimeTableData] = useState([
    { period: "07:00", Monday: "", Tuesday: "", Wednesday: "", Thursday: "", Friday: "", Saturday: "" },
  ]);

  const [fridayTableData, setFridayTableData] = useState([
    { period: "07:00", Friday: "" },
  ]);

  const [timeRanges, setTimeRanges] = useState(
    timeTableData.map(() => [null, null])
  );

  const [fridayTimeRanges, setFridayTimeRanges] = useState(
    fridayTableData.map(() => [null, null])
  );

  const [tabIndex, setTabIndex] = useState(0);

  const { CSRFToken } = useSelector((state) => state.auth);

  const GetClasses = async () => {
    setErrorMessage("Loading Class data");
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/GetClasses", {
        headers: {
          "X-CSRF-TOKEN": CSRFToken,
          "Content-Type": "application/json",
          "API-TOKEN": "IT is to secret you cannot break it :)",
        },
      });
      if (response.data && response.data.data.length > 0) {
        SetClasses(response.data);
        SetApiSearchData((prev) => {
          return {
            ...prev,
            ClassRank: response.data.data[0].ClassRank,
            ClassName: response.data.data[0].ClassName,
          };
        });
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Load Classes");
      setPopup(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetApiSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "ClassRank") {
      const selectedClass = Classes.data.find(
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

  const names = [
    'none',
    'Maths',
    'General Science',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'Pakistan Studies',
    'Urdu',
    'English',
    'Islamiat',
    'Break'
  ];

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

  const handleTimeChange = (index, newTimeRange) => {
    const updatedTimeRanges = [...timeRanges];
    updatedTimeRanges[index] = newTimeRange;
    setTimeRanges(updatedTimeRanges);
  };

  const handleFridayTimeChange = (index, newTimeRange) => {
    const updatedFridayTimeRanges = [...fridayTimeRanges];
    updatedFridayTimeRanges[index] = newTimeRange;
    setFridayTimeRanges(updatedFridayTimeRanges);
  };

  const addNewPeriod = () => {
    if (tabIndex === 0) {
      setTimeTableData([
        ...timeTableData,
        { period: "", Monday: "", Tuesday: "", Wednesday: "", Thursday: "", Friday: "", Saturday: "" },
      ]);
      setTimeRanges([...timeRanges, [null, null]]);
    } else {
      setFridayTableData([
        ...fridayTableData,
        { period: "", Friday: "" },
      ]);
      setFridayTimeRanges([...fridayTimeRanges, [null, null]]);
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
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
          <form>
            <div className="inputsDiv">
              <div className="inputDiv">
                <p>Campus</p>
                <select className="input" name="campus" onChange={handleChange}>
                  <option value="Main Campus">Main Campus</option>
                  <option value="Second Campus">Second Campus</option>
                </select>
              </div>
              <div className="inputDiv">
                <p>Class</p>
                <select className="input" name="ClassRank" onChange={handleChange}>
                  {Classes.data &&
                    Array.from(
                      new Set(Classes.data.map((Class) => Class.ClassRank))
                    ).map((rank) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                </select>
              </div>
              <div className="inputDiv">
                <p>Name</p>
                <select
                  className="input"
                  name="ClassName"
                  value={ApiSearchData.ClassName}
                  onChange={handleChange}
                >
                  {Classes.data &&
                    Classes.data.map(
                      (Class) =>
                        ApiSearchData.ClassRank === Class.ClassRank && (
                          <option key={Class.ClassName} value={Class.ClassName}>
                            {Class.ClassName}
                          </option>
                        )
                    )}
                </select>
              </div>
            </div>
          </form>
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
                                value={timeRanges[periodIndex]}
                                onChange={(newTimeRange) => handleTimeChange(periodIndex, newTimeRange)}
                              />
                            </td>
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                              <td key={day}>
                                <FormControl fullWidth>
                                  <InputLabel>Subject</InputLabel>
                                  <Select
                                    labelId={`select-label-${day}-${periodIndex}`}
                                    value={lecture[day]}
                                    onChange={(e) => handleSelectChange(e, periodIndex, day)}
                                    input={<OutlinedInput label="Subject" />}
                                    MenuProps={MenuProps}
                                  >
                                    {names.map((name) => (
                                      <MenuItem key={name} value={name}>
                                        {name}
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
                                value={fridayTimeRanges[periodIndex]}
                                onChange={(newTimeRange) => handleFridayTimeChange(periodIndex, newTimeRange)}
                              />
                            </td>
                            <td>
                              <FormControl fullWidth>
                                <InputLabel>Subject</InputLabel>
                                <Select
                                  labelId={`select-label-Friday-${periodIndex}`}
                                  value={lecture.Friday}
                                  onChange={(e) => handleFridaySelectChange(e, periodIndex)}
                                  input={<OutlinedInput label="Subject" />}
                                  MenuProps={MenuProps}
                                >
                                  {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                      {name}
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
              <Button onClick={addNewPeriod} variant="contained" color="primary" style={{ marginTop: "20px" }}>
                Add New Period
              </Button>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button onClick={() => console.log(tabIndex === 0 ? timeTableData : fridayTableData)} variant="contained" color="primary">
              Save Timetable
            </Button>
          </div>
        </div>
      </LocalizationProvider>
    </>
  );
}
