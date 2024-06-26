import React, { useEffect, useState } from "react";
import Popup from "react-animated-popup";
import "../../assets/css/class.css";
import "../../assets/css/UploadLecture.css";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdUpload } from "react-icons/md";
import { createPlaylist, getPlaylist, setError, setPopup } from "../../redux/slices/UploadLecture";
import { Tooltip } from "@mui/material";
import { GetClasses } from "../../redux/slices/UploadLecture";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { IoClose } from "react-icons/io5";

export default function UploadLecture() {
  const navigate = useNavigate();
  const { popup, classesData, loading, error, playlistData } = useSelector((state) => state.uploadLecture);
  const dispatch = useDispatch();

  // moving it to the top cuz I need it in a state declaration. . .
  const names = [
    "Maths",
    "General Science",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Pakistan Studies",
    "Urdu",
    "English",
    "Islamiat",
  ];

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [PlaylistPopup, setPlaylistPopup] = useState(false);
  const [Playlist, setPlaylist] = useState(false);
  const [clickable, setClickable] = useState("clickable");
  const [filteredPlaylist, setFilteredPlaylist] = useState([])
  
  const [filterQuery, setFilterQuery] = useState({
    ClassRank: "",
    subject: names[0],
  })

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    playlistID: "",
  });

  const [playlistFormData, setPlaylistFormData] = useState({
    PlaylistTitle: "",
    PlaylistDescription: "",
    PlaylistRank: "",
    playlistCategory: "",
  });

  const handlePlaylistData = (e) => {
    const { name, value } = e.target;
    setPlaylistFormData((prev) => {
        return {
          ...prev,
          [name]: value,
        }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      dispatch(setError("Please upload a valid video file."));
      dispatch(setPopup(true));
      setSelectedFile(null);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    if(name == "ClassRank"){
      setFilterQuery((prev) => {
        return {
          ...prev,
          [name]: parseInt(value),
        }
      })
    } else {
      setFilterQuery((prev) => {
        return {
          ...prev,
          [name]: value,
        }
      })
    }
  }

  useEffect(() => {
    if (previewUrl) {
      setClickable("");
    } else {
      setClickable("clickable");
    }
  }, [previewUrl]);

  const handlePlaylistSubmit = (e) => {
    e.preventDefault()
    dispatch(createPlaylist(playlistFormData))
    .unwrap(() => {
      dispatch(getPlaylist())
    })
    .catch((error) => {
      console.error(error);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      dispatch(setError("Please Select a file"));
      dispatch(setPopup(true))
    } else{

    }
  };
  const handleClick = () => {
    document.getElementById("videoLectureInput").click();
  };

  useEffect(() => {
    dispatch(GetClasses())
    dispatch(getPlaylist())
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name == "PlaylistID"){
      setFormData((prev) => {
        return {
          ...prev,
          [name]: parseInt(value),
        };
      });
    } else{
      setFormData((prev) => {
        return {
          ...prev,
          [name]: value,
        }
      })
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

  

  useEffect(() => {
    // this should only ren when there is no ID param in the api
    if (classesData && classesData.length > 0) {
      setFormData((prev) => {
        return {
          ...prev,
          lectureClassRank: classesData[0].id,
        };
      });
      setPlaylistFormData((prev) => {
        return {
          ...prev,
          PlaylistRank: parseInt(classesData[0].ClassRank),
        };
      });
      setFilterQuery((prev) => {
        return {
          ...prev,
          ClassRank: parseInt(classesData[0].ClassRank)
        }
      })
    }
  }, [classesData]);

  useEffect(()=>{
    if(playlistData && playlistData.length > 0){
      const tempFiltered = playlistData.filter((playlist)=>{
        return (playlist.PlaylistCategory == filterQuery.subject && playlist.PlaylistRank == filterQuery.ClassRank)
      })
      if(tempFiltered.length > 0){
        setFormData((prev) => {
          return {
            ...prev,
            PlaylistID: parseInt(tempFiltered[0].id)
          }
        })
        setFilteredPlaylist(tempFiltered)
      } else {
        setFormData((prev) => {
          return {
            ...prev,
            PlaylistID: ""
          }
        })
        setFilteredPlaylist([])
      }
    }
  }, [filterQuery])

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
            onChange={(e) => {
              handleFileChange(e);
            }}
          />
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Title{" "}
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Title of your video"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Enter Description for your video"
              id="exampleFormControlTextarea1"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {Playlist ? (
            <>
              <hr></hr>
              <button
                id="mybutton"
                className="btn ms-0 "
                style={{ outline: "none" }}
                onClick={() => {
                  setPlaylist(false);
                }}
                type="button"
              >
                <p className="ml-1" style={{ color: "blueviolet" }}>
                  Hide Playlist Section .. ..
                </p>
              </button>
              <br></br>
              <div className="d-flex mb-3">
                <div className="flex-grow-1 me-1">
                  <label htmlFor="PlayList ">Class Rank</label>
                  <select
                    className="lectureClassRank PlayList"
                    name="ClassRank"
                    required
                    value={filterQuery.ClassRank}
                    onChange={handleFilterChange}
                  >
                    {classesData &&
                      Array.from(
                        new Set(classesData.map((Class) => Class.ClassRank))
                      ).map((rank) => (
                        <option key={rank} value={rank}>
                          {rank}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex-grow-1 ms-1">
                  <label htmlFor="PlayList ">Subject</label>
                  <select
                    className="lectureClassRank PlayList"
                    name="subject"
                    value={filterQuery.subject}
                    onChange={handleFilterChange}
                    required
                  >
                    {names.map((subject, index) => {
                      return (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <label htmlFor="PlayList ">PlayList</label>
              <div className="d-flex m-0 p-0 g-5 mb-4">
                <div className="flex-grow-1">
                  <select
                    className="lectureClassRank PlayList"
                    name="PlaylistID"
                    onChange={handleChange}
                    value={formData.playlistID}
                    required
                  >
                    {filteredPlaylist?.map((playlist, index) => (
                        <option key={index} value={playlist.id}>
                          {playlist.PlaylistTitle}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mt-1 ms-3 p-0">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      setPlaylistPopup(true);
                    }}
                  >
                    Add new Playlist
                  </button>
                </div>
              </div>{" "}
            </>
          ) : (
            <button
              id="mybutton"
              className="btn ms-0"
              style={{ outline: "none" }}
              onClick={() => {
                setPlaylist(true);
              }}
              type="button"
            >
              <p className="ml-1" style={{ color: "blueviolet" }}>
                Add Video to Playlist .. ..
              </p>
            </button>
          )}

          <Popup
            animationDuration={400}
            visible={PlaylistPopup}
            onClose={() => {
              setPlaylistPopup(false);
              setTimeout(() => {
                dispatch(setError(null));
              }, 400);
            }}
            style={{
              backgroundColor: "rgba(207, 204, 204)",
              boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
              padding: "30px 20px"
            }}
          >
            <div
              className=""
              style={{ Width: "100%", height: "100%", padding: "0" }}
            >
              <h3
                style={{
                  color: "Black",
                  margin: "0",
                  padding: "0px 40px 0px 40px",
                }}
              >
                Add a new playlist
              </h3>
              <div>
                <div className="mb-3 mt-4">
                  <label for="exampleFormControlInput1" className="form-label">
                    Title{" "}
                  </label>
                  <input
                    type="text"
                    name="PlaylistTitle"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter Title of your video"
                    value={playlistFormData.PlaylistTitle}
                    onChange={handlePlaylistData}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="PlaylistDescription"
                    className="form-control"
                    placeholder="Enter Description for your video"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={playlistFormData.PlaylistDescription}
                    onChange={handlePlaylistData}
                  ></textarea>
                </div>
                <label htmlFor="lectureClassRank">PlayList Class Rank</label>
                <div className="d-flex ">
                  <select
                    className="lectureClassRank flex-grow-1 Playlist mb-3"
                    name="PlaylistRank"
                    required
                    value={playlistFormData.PlaylistRank}
                    onChange={handlePlaylistData}
                  >
                    {classesData &&
                      Array.from(
                        new Set(classesData.map((Class) => Class.ClassRank))
                      ).map((rank) => (
                        <option key={rank} value={parseInt(rank)}>
                          {rank}
                        </option>
                      ))}
                  </select>
                </div>
                <InputLabel
                  className="mb-1 mt-2"
                  style={{ color: "Black" }}
                  id="demo-multiple-chip-label"
                >
                  Subjects
                </InputLabel>
                <Tooltip
                  title="Select the student's subjects"
                  arrow
                  placement="bottom"
                  size="lg"
                  variant="solid"
                >
                  <div className="d-flex">
                    <Select
                      style={{ color: "Black", backgroundColor: "white" }}
                      className="flex-grow-1 Playlist"
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      value={playlistFormData.playlistCategory}
                      onChange={handlePlaylistData}
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      // renderValue={(selected) => (
                      //   <Box
                      //     sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                      //   >
                      //     {/* {selected.map((value) => ( */}
                      //       <Chip key={value} label={value} />
                      //     {/* ))} */}
                      //   </Box>
                      // )}
                      MenuProps={MenuProps}
                      required
                      name="playlistCategory"
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </Tooltip>
              </div>
              <div>
                <button onClick={handlePlaylistSubmit} className="btn btn-info mt-3" style={{ width: "100%" }}>
                  Submit
                </button>
              </div>
            </div>
          </Popup>

          <Popup
            animationDuration={400}
            visible={popup}
            onClose={() => {
              dispatch(setPopup(false));
              setTimeout(() => {
                dispatch(setError(null));
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
              style={{ width: "fit-content", height: "100%", padding: "0" }}
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
