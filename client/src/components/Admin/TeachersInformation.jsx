import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import "../../assets/css/Teacher.css";
import "../../assets/css/studentInformation.css";
import { CiSearch } from "react-icons/ci";
import "../../assets/css/studentInformation/all.min.css";
import { FaKey, FaLocationDot } from "react-icons/fa6";
import { TiDocumentText } from "react-icons/ti";
import { IoMail, IoPerson } from "react-icons/io5";
import axios from "axios";
import defaultImg from "../../assets/img/default.png";
import Popup from "react-animated-popup";
import { Button, Tooltip } from "@mui/material";
import { toPng } from "html-to-image";
import { ReactBarcode } from "react-jsbarcode";
import converter from 'number-to-words'
import { BsFillTelephoneFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import LoadingOverlay from "../common/LoadingOverlay";
import CustomPopup from "../common/CustomPopup";

export default function TeachersInformation() {
  const navigate = useNavigate();

  // please define all states at the top -_-

  const [isOpen, setIsOpen] = useState({});
  const [Classes, SetClasses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [TeacherInformation, SetTeacherInformation] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTeacherInfo, setFilteredTeacherInfo] = useState([]);
  const [idPopup, setIdPopup] = useState(false);
  const [passwordPopup, setPasswordPopup] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);
  const [popupInput, setPopupInput] = useState(null);
  const [ApiSearchData, SetApiSearchData] = useState({
    campus: "Main Campus",
    ClassRank: "",
    ClassName: "",
  });

  const pngElementRef = useRef(null)

  const toggleDropdown = (id) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

    const { CSRFToken, user } = useSelector((state)=> state.auth)

  if (user.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  }

  console.log(CSRFToken);

  const GetClasses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/GetClasses", {
        headers: {
          "X-CSRF-TOKEN": CSRFToken,
          "Content-Type": "application/json",
          "API-TOKEN": "IT is to secret you cannot break it :)",
        },
      });
      SetClasses(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Load Classes");
      setPopup(true);
    }
  };

  const GetTeacherInformation = async () => {
    setErrorMessage("Loading Teachers' data");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/GetTeacherInformation",
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
      SetTeacherInformation(response.data.data || []);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Get Teacher's Info");
      setPopup(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetClasses();
  }, []);

  useEffect(() => {
    if (ApiSearchData.ClassRank === "" && ApiSearchData.ClassName !== "") {
      SetApiSearchData((prev) => {
        return {
          ...prev,
          ClassName: "",
        };
      });
    }
    GetTeacherInformation();
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
    setErrorMessage("Deleting teacher. . .");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/DeleteTeacher",
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
        setErrorMessage("Teacher deleted successfully");
        setPopup(true);
        SetTeacherInformation((prev) => {
          return prev.filter((teacher) => {
            return !(teacher.id == id);
          });
        });
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Delete Student");
      setPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const Edit = (id) => {
    navigate(`/addteacher/${id}`);
  };

  useEffect(() => {
    const results = TeacherInformation.filter(
      (teacher) =>
        JSON.stringify(teacher.id)
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        teacher.users.name.toLowerCase().includes(search.toLowerCase()) ||
        teacher.TeacherPhoneNumber.toLowerCase().includes(
          search.toLowerCase()
        ) ||
        teacher.TeacherHomeAddress.toLowerCase().includes(
          search.toLowerCase()
        ) ||
        teacher.TeacherReligion.toLowerCase().includes(search.toLowerCase()) ||
        teacher.TeacherCNIC.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTeacherInfo(results);
  }, [search, TeacherInformation]);

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

  const [localLoading, setLocalLoading] = useState(false)
  useEffect(()=>{
    setLocalLoading(loading)
  }, [loading])




  const AllTeacherPayPaid = async() =>{
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}api/TeacherPayPaid`,
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
      } else {
        setErrorMessage(response.data.message);
        setPopup(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Mark Pay Paid");
      setPopup(true);
    }
  }



  const TeacherPayPaid = async(ID) =>{
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}api/TeacherPayPaid?ID=${ID}`,
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
      } else {
        setErrorMessage(response.data.message);
        setPopup(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to Mark Pay Paid");
      setPopup(true);
    }
  }



  const FeeManagement = async(ID) =>{
    navigate(`/FeeManagement/${ID}`);
  }



  return (
    <>
      <LoadingOverlay loading={localLoading} />
    <div style={{padding: "15px 20px"}}>
      <div className="headingNavbar d-flex justify-content-center">
        <div className="d-flex">
          <FaRegArrowAltCircleLeft
            onClick={() => {
              navigate("/");
            }}
            className="arrow"
          />
          <h4>Dashboard \ Teachers Information</h4>
        </div>
        <div className="ms-auto me-4"><button onClick={AllTeacherPayPaid} className="btn btn-primary">Pay Paid</button></div>
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
              <option value=""></option>
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
              <option value=""></option>
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
                placeholder="Search Teacher"
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
                <th>Phone Number</th>
                <th>Class</th>
                <th>Class Name</th>
                <th>Campus</th>
                <th>Teacher Salary</th>
                <th>ID Card</th>
                <th>Reset Password</th>
                <th>Profile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeacherInfo && filteredTeacherInfo.length > 0 ? (
                filteredTeacherInfo.map((teacher, index) => (
                  <tr key={teacher.id}>
                    <td>{teacher.id}</td>
                    <td>
                      <div
                        style={{ width: "40px", height: "40px" }}
                        className="profile-container ms-auto me-auto mb-3"
                      >
                        <img
                          src={
                            teacher.users.images[0]
                              ? `data:image/png;base64,${teacher.users.images[0].data}`
                              : defaultImg
                          }
                          alt="Profile Icon"
                          className="profile-icon"
                        />
                      </div>
                    </td>
                    <td>{teacher.users.name}</td>
                    <td>{teacher.TeacherPhoneNumber}</td>
                    <td>
                      {teacher.classes.length > 0
                        ? teacher.classes.map((Class) => {
                            return (
                              <>
                                {Class.ClassRank} <br />
                              </>
                            );
                          })
                        : ""}
                    </td>
                    <td>
                      {teacher.classes.length > 0
                        ? teacher.classes.map((Class) => {
                            return (
                              <>
                                {Class.ClassName} <br />
                              </>
                            );
                          })
                        : ""}
                    </td>
                    <td>{ApiSearchData.campus}</td>
                    <td>{teacher.TeacherSalary}</td>
                    <td>
                      <div
                        onClick={() => {
                          generatePopup(teacher, "id");
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
                          id={`dropdownMenuButton-${teacher.id}`} // Unique ID for each dropdown
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded={isOpen[teacher.id]}
                          onClick={() => toggleDropdown(teacher.id)} // Pass the student ID to toggleDropdown
                        >
                          Actions
                        </button>
                        <div
                          className={` customDropDown dropdown-menu${
                            isOpen[teacher.id] ? " show" : ""
                          }`}
                          style={{ right: "0" }}
                          aria-labelledby={`dropdownMenuButton-${teacher.id}`}
                        >
                          <a
                            className="dropdown-item"
                            onClick={() => {
                              Edit(teacher.users.id);
                            }}
                          >
                            Edit
                          </a>
                          <a
                            className="dropdown-item"
                            onClick={() => {
                              Delete(teacher.id);
                            }}
                          >
                            Delete
                          </a>
                          <a className="dropdown-item" onClick={() => {TeacherPayPaid(teacher.users.id)}}>
                            mark Paid
                          </a>
                          <a className="dropdown-item" onClick={() => {FeeManagement(teacher.users.id)}}>
                            Pay Details
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">
                    No Teacher Information Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
        </div>
      </div>
    </div>
    {popupInput && <Popup visible={idPopup} animationDuration={400} onClose={() => {setIdPopup(false); setTimeout(()=>{setPopupInput(null)}, 400)}} style={{backgroundColor: "#11101de9", boxShadow: "rgba(0, 0, 0, 0.2) 5px 5px 5px 5px", padding: "40px 20px", width: "700px", height: "600px", display: "flex", alignItems: "center", flexDirection: "column"}}>
      <div ref={pngElementRef} className='studentIdCardDiv' style={{backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "1rem", padding: "15px 20px", boxShadow: "rgba(0, 0, 0, 0.5) 5px 5px 5px 5px", whiteSpace: "nowrap", width: "300px", height: "460px"}}>
          <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
              <h4 style={{margin: "0", padding: "0"}}>{popupInput.users.name}</h4>
              <ReactBarcode style={{backgroundColor: "transparent"}} value={ApiSearchData.campus.slice(0, 1) + '-' + JSON.stringify(popupInput.users.id)} options={{format: "code128"}} displayValue={false} renderer='image' />
              <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                  <h6 style={{fontSize: "14px"}}><span style={{color: "#5b8beb"}}>Class: </span>{popupInput.classes.ClassRank ? converter.toWords(popupInput.classes.ClassRank) : "none"}</h6>
                  <h6 style={{fontSize: "14px"}}><span style={{color: "#5b8beb"}}>Class Name: </span>{popupInput.classes.ClassName ? popupInput.classes.ClassName : "none"}</h6>
                  <h6 style={{fontSize: "14px"}}><span style={{color: "#5b8beb"}}>Campus: </span>{ApiSearchData.campus}</h6>
                  <h6 style={{fontSize: "14px"}}><span style={{color: "#5b8beb"}}>Teacher ID: </span>{popupInput.id}</h6>
                  <h6 style={{fontSize: "14px"}}><span style={{color: "#5b8beb"}}>Full Name: </span>{popupInput.users.name}</h6>
                  <h6 style={{ paddingBottom: "50px", fontSize: "14px"}}><span style={{color: "#5b8beb",}}>Contact: </span>{popupInput.TeacherPhoneNumber}</h6>
              </div>
              <div style={{display: "flex", width: "100%"}}>
                  <FaLocationDot style={{marginRight: "5px"}} color="#5b8beb" /><h6 style={{fontSize: "14px"}}><span style={{color: "#5b8beb"}}>Faisalabad, Kohinoor City</span></h6>
              </div>
              <div style={{display: "flex", width: "100%"}}>
                  <BsFillTelephoneFill style={{marginRight: "5px"}} color="#5b8beb" /><h6 style={{fontSize: "14px"}}><span style={{color: "#5b8beb"}}>+921234567890</span></h6>
              </div>
              <div style={{display: "flex", width: "100%"}}>
                  <IoMail style={{marginRight: "5px"}} color="#5b8beb" /><h6 style={{fontSize: "14px"}}><span style={{color: "#5b8beb"}}>HustlersUniversity@gmail.com</span></h6>
              </div>
          </div>
      </div>
      <Button onClick={()=>{htmlToPng(popupInput.users.name)}} style={{marginTop: "20px"}} variant="contained" color="primary">Download</Button>
    </Popup>}
    </>
  );
}
