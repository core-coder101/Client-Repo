import React, { useEffect, useState } from "react";
import "../../assets/css/class.css";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Popup from "react-animated-popup";
import { useDispatch, useSelector } from "react-redux";
import { GetClassDataById, GetTeachers, UpdateClass, createClass, setError, setPopup } from "../../redux/slices/CreateClass";

export default function CreateClass() {
  const { ID } = useParams();
  const { loading, error, popup, classData, teachersData } = useSelector((state) => state.createClass);

  const [formData, setFormData] = useState({
    ClassName: "",
    ClassRank: "",
    ClassFloor: "",
    ClassTeacherID: "",
    ClassID: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch()
  //   setErrorMessage("Loading teacher's data. . .");
  //   setLoading(true);
  //   try {
  //     const response = await axios.get("http://127.0.0.1:8000/api/GetTeacher", {
  //       headers: {
  //         "X-CSRF-TOKEN": CSRFToken,
  //         "Content-Type": "application/json",
  //         "API-TOKEN": "IT is to secret you cannot break it :)",
  //       },
  //     });
  //     if (response.data.success == true) {
  //       if (!response.data.data.length > 0) {
  //         setErrorMessage("Please add a teacher first");
  //         setPopup(true);
  //         return;
  //       }
  //       setteachers(response.data.data);
  //       setFormData((prev) => ({
  //         ...prev,
  //         ClassTeacherID: JSON.stringify(response.data.data[0].id),
  //       }));
  //     } else {
  //       setErrorMessage(response.data.message);
  //       setPopup(true);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     if (error.response.data.message.includes("[2002]")) {
  //       setErrorMessage("Database down at the moment. . . ");
  //       setPopup(true);
  //     } else {
  //       setErrorMessage("Failed to Load Teachers");
  //       setPopup(true);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
  }, [ID]);

  useEffect(() => {
    dispatch(GetTeachers()).unwrap().then((result)=>{
      setFormData((prev) => ({
        ...prev,
        ClassTeacherID: JSON.stringify(result[0].id),
      }))
      return
    }).catch(()=>{
      return
    })
  }, [])

  // using the redux loading state directly does not work properly
  const [loadingOpen, setLoadingOpen] = useState(false)
  useEffect(()=>{
    console.log("createClass loading: ",loading);
    setLoadingOpen(loading)
  }, [loading])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.ClassID == ""){
      dispatch(createClass(formData)).unwrap().then( (result) => {
        setFormData((prev) => {
          return {
            ...prev,
            ClassName: "",
            ClassRank: "",
            ClassFloor: "",
            ClassID: "",
          };
        });
        return
      }).catch(()=>{
        return
      })
    } else {
      dispatch(UpdateClass(formData)).unwrap().then(()=>{
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
            ClassTeacherID: teachersData[0].id,
            ClassID: "",
          });
      }).catch(()=>{
        return
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
              {teachersData &&
                Object.values(teachersData).length > 0 &&
                Object.values(teachersData).map((teacher, index) => {
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
          animationDuration={400}
            visible={loadingOpen}
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