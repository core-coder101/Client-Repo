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
import Preloader from "./Preloader";
import { Button, Tooltip } from "@mui/material";
import { ReactBarcode } from "react-jsbarcode";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { toPng } from "html-to-image";
import converter from "number-to-words";
import { useSelector } from "react-redux";

export default function StudentInformation() {
  const navigate = useNavigate();

  // moved all state definitions to the top (hope it doesn't break anything when merging)

  const pngElementRef = useRef(null);

  const [isOpen, setIsOpen] = useState({});
  const [Classes, SetClasses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [popup, setPopup] = useState(false);
  const [StudentInformation, SetStudentInformation] = useState([]);
  const [filteredStudentsInfo, setFilteredStudentsInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [idPopup, setIdPopup] = useState(false);
  const [passwordPopup, setPasswordPopup] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);
  const [popupInput, setPopupInput] = useState(null);
  const [ApiSearchData, SetApiSearchData] = useState({
    campus: "Main Campus",
    ClassRank: "",
    ClassName: "",
  });

  const toggleDropdown = (id) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const { CSRFToken, user } = useSelector((state) => state.auth);

  if (user.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  }

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
      SetClasses(response.data);
      SetApiSearchData((prev) => {
        return {
          ...prev,
          ClassRank: response.data.data[0].ClassRank,
          ClassName: response.data.data[0].ClassName,
        };
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Load Classes");
      setPopup(true);
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

  const Delete = async (id) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/DeleteStudent",
        { ID: id },
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": "IT is to secret you cannot break it :)",
          },
        }
      );

      if (response.data.success == true) {
        setErrorMessage(response.data.message);
        setPopup(true);
        SetStudentInformation((prev) => {
          return prev.filter((student) => {
            return !(student.id === id);
          });
        });
      } else {
        setErrorMessage(response.data.message);
        setPopup(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Delete Student");
      setPopup(true);
    }
  };

  const Edit = (id) => {
    navigate(`/addstudent/${id}`);
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

  const generatePopup = (input, type) => {
    // the idea is that this function works for all three of the buttons: generate id, reset password and view profile
    setPopupInput(input);
    const setTypePopup = {
      id: setIdPopup,
      password: setPasswordPopup,
      profie: setProfilePopup,
    };

    if (setTypePopup[type]) {
      setTypePopup[type](true);
    }
  };

  const htmlToPng = async (name) => {
    setErrorMessage("Generating image. . .");
    setLoading(true);
    try {
      let dataUrl = await toPng(pngElementRef.current, { cacheBust: false });
      const link = document.createElement("a");
      link.download = name + ".png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
                <th>Roll no.</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Parent Name</th>
                <th>Class</th>
                <th>Class Name</th>
                <th>Campus</th>
                <th>Parent Phone</th>
                <th>ID Card</th>
                <th>Reset Password</th>
                <th>Profile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudentsInfo && filteredStudentsInfo.length > 0 ? (
                filteredStudentsInfo.map((student, index) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>
                      <div
                        style={{ width: "40px", height: "40px" }}
                        className="profile-container ms-auto me-auto mb-3"
                      >
                        <img
                          src={
                            student.users.images[0]
                              ? `data:image/png;base64,${student.users.images[0].data}`
                              : defaultImg
                          }
                          alt="Profile Icon"
                          className="profile-icon"
                        />
                      </div>
                    </td>
                    <td>{student.users.name}</td>
                    <td>{student.parents.FatherName}</td>
                    <td>{ApiSearchData.ClassRank}</td>
                    <td>{ApiSearchData.ClassName}</td>
                    <td>{ApiSearchData.campus}</td>
                    <td>{student.parents.GuardiansPhoneNumber}</td>
                    <td>
                      <div
                        onClick={() => {
                          generatePopup(student, "id");
                        }}
                        className="filterDataDiv generateID innerButtonDiv"
                      >
                        <p>Generate ID</p>
                        <button>
                          <TiDocumentText
                            color="white"
                            style={{ width: "18px", height: "18px" }}
                          />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="filterDataDiv resetPassword innerButtonDiv">
                        <p>Reset Password</p>
                        <button>
                          <FaKey
                            color="white"
                            style={{ width: "18px", height: "18px" }}
                          />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="filterDataDiv viewProfile innerButtonDiv">
                        <p>View Profile</p>
                        <button>
                          <IoPerson
                            color="white"
                            style={{ width: "18px", height: "18px" }}
                          />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="DeleteBtn dropdown-toggle customButton"
                          type="button"
                          id={`dropdownMenuButton-${student.id}`}
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded={isOpen[student.id]}
                          onClick={() => toggleDropdown(student.id)}
                        >
                          Actions
                        </button>
                        <div
                          className={` customDropDown dropdown-menu${
                            isOpen[student.id] ? " show" : ""
                          }`}
                          style={{ right: "0" }}
                          aria-labelledby={`dropdownMenuButton-${student.id}`}
                        >
                          <a
                            className="dropdown-item"
                            onClick={() => {
                              Edit(student.users.id);
                            }}
                          >
                            Edit
                          </a>
                          <a
                            className="dropdown-item"
                            onClick={() => {
                              Delete(student.id);
                            }}
                          >
                            Delete
                          </a>
                          <a className="dropdown-item" onClick={() => {}}>
                            Deactivate Student
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">
                    No Student Information Available
                  </td>
                </tr>
              )}
              {popupInput && (
                <Popup
                  visible={idPopup}
                  animationDuration={400}
                  onClose={() => {
                    setIdPopup(false);
                    setTimeout(() => {
                      setPopupInput(null);
                    }, 400);
                  }}
                  style={{
                    backgroundColor: "#11101de9",
                    boxShadow: "rgba(0, 0, 0, 0.2) 5px 5px 5px 5px",
                    padding: "40px 20px",
                    width: "700px",
                    height: "600px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    ref={pngElementRef}
                    className="studentIdCardDiv"
                    style={{
                      backgroundColor: "white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      borderRadius: "1rem",
                      padding: "15px 20px",
                      boxShadow: "rgba(0, 0, 0, 0.5) 5px 5px 5px 5px",
                      whiteSpace: "nowrap",
                      width: "300px",
                      height: "460px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <h4 style={{ margin: "0", padding: "0" }}>
                        {popupInput.users.name}
                      </h4>
                      <ReactBarcode
                        style={{ backgroundColor: "transparent" }}
                        value={
                          ApiSearchData.campus.slice(0, 1) +
                          "-" +
                          JSON.stringify(popupInput.id)
                        }
                        options={{ format: "code128" }}
                        displayValue={false}
                        renderer="image"
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <h6 style={{ fontSize: "14px" }}>
                          <span style={{ color: "#5b8beb" }}>Class: </span>
                          {converter.toWords(ApiSearchData.ClassRank)}
                        </h6>
                        <h6 style={{ fontSize: "14px" }}>
                          <span style={{ color: "#5b8beb" }}>Campus: </span>
                          {ApiSearchData.campus}
                        </h6>
                        <h6 style={{ fontSize: "14px" }}>
                          <span style={{ color: "#5b8beb" }}>Student ID: </span>
                          {popupInput.id}
                        </h6>
                        <h6 style={{ fontSize: "14px" }}>
                          <span style={{ color: "#5b8beb" }}>Full Name: </span>
                          {popupInput.users.name}
                        </h6>
                        <h6 style={{ paddingBottom: "50px", fontSize: "14px" }}>
                          <span style={{ color: "#5b8beb" }}>
                            Emergency Contact:{" "}
                          </span>
                          {popupInput.parents.GuardiansPhoneNumber}
                        </h6>
                      </div>
                      <div style={{ display: "flex", width: "100%" }}>
                        <FaLocationDot
                          style={{ marginRight: "5px" }}
                          color="#5b8beb"
                        />
                        <h6 style={{ fontSize: "14px" }}>
                          <span style={{ color: "#5b8beb" }}>
                            Faisalabad, Kohinoor City
                          </span>
                        </h6>
                      </div>
                      <div style={{ display: "flex", width: "100%" }}>
                        <BsFillTelephoneFill
                          style={{ marginRight: "5px" }}
                          color="#5b8beb"
                        />
                        <h6 style={{ fontSize: "14px" }}>
                          <span style={{ color: "#5b8beb" }}>
                            +921234567890
                          </span>
                        </h6>
                      </div>
                      <div style={{ display: "flex", width: "100%" }}>
                        <IoMail
                          style={{ marginRight: "5px" }}
                          color="#5b8beb"
                        />
                        <h6 style={{ fontSize: "14px" }}>
                          <span style={{ color: "#5b8beb" }}>
                            HustlersUniversity@gmail.com
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      htmlToPng(popupInput.users.name);
                    }}
                    style={{ marginTop: "20px" }}
                    variant="contained"
                    color="primary"
                  >
                    Download
                  </Button>
                </Popup>
              )}
              <Popup
                visible={popup}
                onClose={() => {
                  setPopup(false);
                  setTimeout(() => {
                    setErrorMessage("");
                  }, 400);
                }}
                style={{
                  backgroundColor: "#11101de9",
                  boxShadow: "rgba(0, 0, 0, 0.2) 5px 5px 5px 5px",
                  padding: "40px 20px",
                }}
              >
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: "max-content", height: "100%", padding: "0" }}
                >
                  <h5 style={{ color: "white", margin: "0" }}>
                    {errorMessage}
                  </h5>
                </div>
              </Popup>
              <Popup
                visible={loading}
                onClose={() => {}}
                style={{
                  backgroundColor: "rgba(17, 16, 29, 0.95)",
                  boxShadow: "rgba(0, 0, 0, 0.2) 5px 5px 5px 5px",
                  padding: "40px 20px",
                }}
              >
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: "max-content", height: "100%", padding: "0" }}
                >
                  <h5
                    dangerouslySetInnerHTML={{ __html: errorMessage }}
                    style={{ color: "white", margin: "0" }}
                  ></h5>
                </div>
              </Popup>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
