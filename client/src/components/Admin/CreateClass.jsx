import React, { useEffect, useState } from "react";
import "../../assets/css/class.css";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Popup from "react-animated-popup";
import { useDispatch, useSelector } from "react-redux";
import { GetClassDataById, UpdateClass, createClass, setError, setPopup } from "../../redux/slices/CreateClass";

export default function CreateClass() {
  const { ID } = useParams();
  const { CSRFToken } = useSelector((state) => state.auth);
  const { loading, error, popup, classData } = useSelector((state) => state.createClass);
  const [teachers, setteachers] = useState(null);

  const [errorMessage, setErrorMessage] = useState(""); // useless now. . .
  const [loading1, setLoading] = useState(false); // useless now. . .

  const [formData, setFormData] = useState({
    ClassName: "",
    ClassRank: "",
    ClassFloor: "",
    ClassTeacherID: "",
    ClassID: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const GetTeachers = async () => {
    setErrorMessage("Loading teacher's data. . .");
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/GetTeacher", {
        headers: {
          "X-CSRF-TOKEN": CSRFToken,
          "Content-Type": "application/json",
          "API-TOKEN": "IT is to secret you cannot break it :)",
        },
      });
      if (response.data.success == true) {
        if (!response.data.data.length > 0) {
          setErrorMessage("Please add a teacher first");
          setPopup(true);
          return;
        }
        setteachers(response.data.data);
        setFormData((prev) => ({
          ...prev,
          ClassTeacherID: JSON.stringify(response.data.data[0].id),
        }));
      } else {
        setErrorMessage(response.data.message);
        setPopup(true);
      }
    } catch (error) {
      console.error(error);
      if (error.response.data.message.includes("[2002]")) {
        setErrorMessage("Database down at the moment. . . ");
        setPopup(true);
      } else {
        setErrorMessage("Failed to Load Teachers");
        setPopup(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(ID && classData.data){
      setFormData({
          ClassName: classData.data.ClassName,
          ClassRank: classData.data.ClassRank,
          ClassFloor: classData.data.ClassFloor,
          ClassTeacherID: classData.data.ClassTeacherID,
          ClassID: classData.data.id,
        })
    }
  }, [classData])

  useEffect(() => {
    if (ID) {
      dispatch(GetClassDataById(ID))
      .unwrap().catch((error)=>{
        console.log(error);
        navigate("/createclass")
      })
    }
  }, []);

  useEffect(() => {
    GetTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.ClassID == ""){
      createClass(formData).unwrap(() => {
        setFormData((prev) => {
          return {
            ...prev,
            ClassName: "",
            ClassRank: "",
            ClassFloor: "",
            ClassID: "",
          };
        });
      })
    } else {
      UpdateClass(formData).unwrap(()=>{
        setTimeout(() => {
            dispatch(setPopup(false))
          }, 1000);
          setTimeout(() => {
            navigate(-1);
          }, 1500);
          setFormData({
            ClassName: "",
            ClassRank: "",
            ClassFloor: "",
            ClassTeacherID: "",
            ClassID: "",
          });
      })
    }
  };

  return (
    <div className="createClass">
      <div className="mt-2 mb-4">
        <div className="headingNavbar d-flex justify-content-center">
          <div className="d-flex">
            <FaRegArrowAltCircleLeft
              className="arrow"
              onClick={() => {
                navigate("/");
              }}
            />
            <h4>Dashboard \ Create a New Class</h4>
          </div>
          <div className="ms-auto me-4"></div>
        </div>
      </div>
      <div className="FormBorder ms-auto me-auto">
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <label className="label">Name of the Class</label>
            <input
              className="Forminput"
              placeholder="Enter name of Class"
              name="ClassName"
              value={formData.ClassName}
              onChange={handleChange}
              defaultValue={classData ? classData.data?.ClassName : ""}
              required
            ></input>
          </div>
          <div className="d-flex flex-column mt-3">
            <label className="label">Rank of the Class</label>
            <input
              className="Forminput"
              type="number"
              placeholder="Enter Rank of Class"
              name="ClassRank"
              value={formData.ClassRank}
              onChange={handleChange}
              defaultValue={classData ? classData.data?.ClassRank : ""}
              required
            ></input>
          </div>
          <div className="d-flex flex-column mt-3">
            <label className="label">Name of the Floor</label>
            <input
              className="Forminput"
              placeholder="Enter name of Floor"
              name="ClassFloor"
              value={formData.ClassFloor}
              onChange={handleChange}
              defaultValue={classData ? classData.data?.ClassFloor : ""}
              required
            ></input>
          </div>
          <div className="d-flex flex-column mt-3">
            <label className="label">Name of the Teacher</label>
            <select
              id="cars"
              className="Forminput mb-3"
              name="ClassTeacherID"
              value={formData.ClassTeacherID}
              onChange={handleChange}
              required
            >
              {classData && classData.data?.id && classData.data.teachers ? (
                <option value={classData.data.teachers.id}>
                  {classData.data.teachers.users.name}
                </option>
              ) : (
                ""
              )}
              {teachers &&
                Object.values(teachers).length > 0 &&
                Object.values(teachers).map((teacher, index) => {
                  return (
                    <option value={teacher.id}>{teacher.users.name}</option>
                  );
                })}
            </select>
          </div>
          <Popup
            animationDuration={400}
            visible={popup}
            onClose={() => {
              dispatch(setPopup(false))
              setTimeout(() => {
                dispatch(setError(null))
              }, 400);
            }}
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
              <h5 style={{ color: "white", margin: "0" }}>{error}</h5>
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
                dangerouslySetInnerHTML={{ __html: error }}
                style={{ color: "white", margin: "0" }}
              ></h5>
            </div>
          </Popup>
          <div>
            <button className="btn btn-primary w-100" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}