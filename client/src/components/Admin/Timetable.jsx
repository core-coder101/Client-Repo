import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import "../../assets/css/Teacher.css";
import "../../assets/css/studentInformation.css";
import { CiSearch } from "react-icons/ci";
import "../../assets/css/studentInformation/all.min.css";
import { FaKey } from "react-icons/fa6";
import { TiDocumentText } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import axios from "axios";
import defaultImg from "../../assets/img/default.png";
import Popup from "react-animated-popup";
import { Button, Tooltip } from "@mui/material";
import { ReactBarcode } from "react-jsbarcode";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { toPng } from "html-to-image";
import converter from "number-to-words";
import { useSelector } from "react-redux";
import CustomPopup from "../common/CustomPopup";

export default function StudentInformation() {
  const navigate = useNavigate();

  const [Classes, SetClasses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [popup, setPopup] = useState(false);
  const [StudentInformation, SetStudentInformation] = useState([]);
  const [filteredStudentsInfo, setFilteredStudentsInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [ApiSearchData, SetApiSearchData] = useState({
    campus: "Main Campus",
    ClassRank: "",
    ClassName: "",
  });

  const { CSRFToken, user } = useSelector((state) => state.auth);
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

  const GetStudentInformation = async () => {
    setErrorMessage("Loading Students' data");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/GetStudentInformation",
        {
          campus: ApiSearchData.campus,
          ClassRank: ApiSearchData.ClassRank,
          ClassName: ApiSearchData.ClassName,
        },
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": "IT is to secret you cannot break it :)",
          },
        }
      );
      SetStudentInformation(response.data.data || []);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Get Student Info");
      setPopup(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetClasses();
  }, []);

  useEffect(() => {
    if (ApiSearchData.ClassRank && ApiSearchData.ClassName) {
      GetStudentInformation();
    }
  }, [ApiSearchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetApiSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "ClassRank") {
      // Update ClassName based on the selected ClassRank
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

  useEffect(() => {
    const results = StudentInformation.filter(
      (student) =>
        JSON.stringify(student.id)
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.users.name.toLowerCase().includes(search.toLowerCase()) ||
        student.StudentPhoneNumber.toLowerCase().includes(
          search.toLowerCase()
        ) ||
        student.StudentHomeAddress.toLowerCase().includes(
          search.toLowerCase()
        ) ||
        student.StudentReligion.toLowerCase().includes(search.toLowerCase()) ||
        student.StudentCNIC.toLowerCase().includes(search.toLowerCase()) ||
        student.parents.FatherName.toLowerCase().includes(
          search.toLowerCase()
        ) ||
        student.parents.GuardiansPhoneNumber.toLowerCase().includes(
          search.toLowerCase()
        )
    );
    setFilteredStudentsInfo(results);
  }, [search, StudentInformation]);

  const timeTableData = [
    {
      day: "Monday",
      1: "Physics",
      2: "Maths",
      3: "Chemistry",
      4: "Break",
      5: "Computer Science",
      6: "Urdu",
      7: "English",
      8: "Islamiat",
    },
    {
      day: "Tuesday",
      1: "Physics",
      2: "Maths",
      3: "Chemistry",
      4: "Break",
      5: "Computer Science",
      6: "Urdu",
      7: "English",
      8: "Islamiat",
    },
    {
      day: "Wednesday",
      1: "Physics",
      2: "Maths",
      3: "Chemistry",
      4: "Break",
      5: "Computer Science",
      6: "Urdu",
      7: "English",
      8: "Islamiat",
    },
    {
      day: "Thursday",
      1: "Physics",
      2: "Maths",
      3: "Chemistry",
      4: "Break",
      5: "Computer Science",
      6: "Urdu",
      7: "English",
      8: "Islamiat",
    },
    {
      day: "Friday",
      1: "Physics",
      2: "Maths",
      3: "Chemistry",
      4: "Break",
      5: "Computer Science",
      6: "Urdu",
      7: "English",
      8: "Islamiat",
    },
    {
      day: "Saturday",
      1: "Physics",
      2: "Maths",
      3: "Chemistry",
      4: "Break",
      5: "Computer Science",
      6: "Urdu",
      7: "English",
      8: "Islamiat",
    },
  ]

  return (
    <div style={{padding: "15px 20px"}}>
      <div className="headingNavbar d-flex justify-content-center">
        <div className="d-flex">
          <FaRegArrowAltCircleLeft
            onClick={() => {
              navigate("/");
            }}
            className="arrow"
          />
          <h4>Dashboard \ Students Information</h4>
        </div>
        <div className="ms-auto me-4"></div>
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
                  (Class, index) =>
                    ApiSearchData.ClassRank == Class.ClassRank && (
                      <option key={Class.id} value={Class.ClassName}>
                        {Class.ClassName}
                      </option>
                    )
                )}
            </select>
          </div>
          <div className="filterDataDiv">
            <Tooltip title="Search on this page" arrow>
              <input
                type="text"
                className="searchInput"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search Student"
              ></input>
            </Tooltip>
            <Tooltip title="Search the Database" arrow>
              <button type="button">
                <CiSearch color="white" />
              </button>
            </Tooltip>
          </div>
        </div>
      </form>
      <div className="tableDiv">
        <div className="card-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Day</th>
                <th>7:00 AM - 8:40 AM</th>
                <th>8:40 AM - 9:20 AM</th>
                <th>9:20 AM - 10:00 AM</th>
                <th>10:00 AM - 10:20 AM</th>
                <th>10:20 AM - 11:00 AM</th>
                <th>11:00 AM - 11:40 AM</th>
                <th>11:40 AM - 12:20 PM</th>
                <th>12:20 PM - 1:00 PM</th>
              </tr>
            </thead>
            <tbody>
              {timeTableData && timeTableData.length > 0 ? (
                timeTableData.map((lecture, index) => (
                  <tr key={index}>
                    <td>{lecture.day}</td>
                    <td>{lecture[1]}</td>
                    <td>{lecture[2]}</td>
                    <td>{lecture[3]}</td>
                    <td>{lecture[4]}</td>
                    <td>{lecture[5]}</td>
                    <td>{lecture[6]}</td>
                    <td>{lecture[7]}</td>
                    <td>{lecture[8]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">
                    No Student Information Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
      <CustomPopup
        Visible={loading}
        OnClose={() => {}}
        errorMessage={errorMessage}
        />
    </div>
  );
}
