import React, { useEffect, useState } from "react";
import Popup from "react-animated-popup";
import "../../assets/css/class.css";
import "../../assets/css/UploadLecture.css";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdUpload } from "react-icons/md";
import { setError } from "../../redux/slices/authSlice";
import { Tooltip } from "@mui/material";

export default function UploadLecture() {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [popup, setPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [clickable, setClickable] = useState("clickable");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      dispatch(setError("Please upload a valid video file."));
      setPopup(true);
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    if (previewUrl) {
      setClickable("");
    } else {
      setClickable("clickable");
    }
  }, [previewUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      dispatch(setError("Please Select a file"));
      setPopup(true);
    }
  };
  const handleClick = () => {
    document.getElementById("videoLectureInput").click();
  };

  return (
    <div className="uploadLectureMain">
      <div className="mt-2 mb-4">
        <div className="headingNavbar d-flex justify-content-center">
          <div className="d-flex">
            <FaRegArrowAltCircleLeft
              className="arrow"
              onClick={() => {
                navigate("/");
              }}
            />
            <h4>Dashboard \ Upload Lecture</h4>
          </div>
          <div className="ms-auto me-4"></div>
        </div>
      </div>
      <div className="uploadLecture ms-auto me-auto">
        <form onSubmit={handleSubmit}>
          <Tooltip title={clickable ? "Upload a video" : ""} arrow>
            <div
              className={"videoPreview " + clickable}
              onClick={clickable ? handleClick : null}
            >
              {previewUrl ? (
                <video width="100%" controls>
                  <source src={previewUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <MdUpload className="uploadIcon" />
              )}
            </div>
          </Tooltip>
          <input
            id="videoLectureInput"
            className="d-none"
            name="video"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
          />
          <label htmlFor="title">Title</label>
          <input
            className="videoDetails"
            name="title"
            placeholder="Give your Lecture a title"
            type="text"
          />
          <label htmlFor="title">Description</label>
          <input
            className="videoDetails"
            name="description"
            placeholder="Give your Lecture a description"
            type="text"
          />
          <Popup
            animationDuration={400}
            visible={popup}
            onClose={() => {
              setPopup(false);
              setTimeout(() => {
                setError(null);
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
            <button className="btn btn-primary w-100 mt-2" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
