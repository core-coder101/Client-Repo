import React, { useEffect, useState } from 'react'
import '../../assets/css/selectVideo.css'
import { RiPlayList2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import DefaultImg from "../../assets/img/default.png";
import { useNavigate } from 'react-router-dom';
import { formatDateMessage } from './WatchVideos';
import { getVideoLengthMsg } from './PlaylistItem';
import { GetVideoData, emptyArrays, setError, setPopup } from '../../redux/slices/Admin/SelectVideoSlice';
import { setError as setCreateStudentError, setPopup as setCreateStudentPopup } from '../../redux/slices/Admin/CreateStudent';
import LoadingOverlay from '../common/LoadingOverlay';
import CustomPopup from '../common/CustomPopup';
import { GetClasses } from '../../redux/slices/Admin/UploadLecture';
import { Tooltip } from "@mui/material";


export default function SelectVideo() {

  const navigate = useNavigate();
  const dispatch = useDispatch()


  const { loading, error, popup, VideosData, PlaylistData} = useSelector((state) => state.selectVideo)
  const { loading: createStudentLoading, error: createStudentError, popup: createStudentPopup} = useSelector((state) => state.createStudent)
  const { classesData} = useSelector((state) => state.uploadLecture)

  const [Subject, setSubject] = useState('General');
  const [Rank, SetRank] = useState(null);

  const names = [
    "General",
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

  useEffect(()=>{
    if(Subject && Rank){
      dispatch(emptyArrays())
      dispatch(GetVideoData({ Subject, Rank }))
    }
  },[Subject, Rank])

  useEffect(()=>{
    dispatch(GetClasses())
  }, [])
  // converting it into a Set to remove duplicate entries
  let [classesSetArray, setClassesSetArray] = useState([])
  useEffect(()=>{
    if(classesData && classesData.length > 0){
      const classesSet = new Set(classesData)
      const backToArray = [...classesSet]
      setClassesSetArray(backToArray)
      if(backToArray && backToArray.length > 0){
        console.log("setting rank to: ", backToArray[0].ClassRank);
        SetRank(parseInt(backToArray[0].ClassRank))
      }
    }
  }, [classesData])

  return (
    <>
  <LoadingOverlay loading={loading || createStudentLoading} />
        <div class="col">
      <div class="all">
      <Tooltip title="Select Class Rank" arrow placement='top'>
        <select 
          className='costom-button1 btn'
          onChange={(e)=>{SetRank(parseInt(e.target.value))}}
          value={Rank}
        >
        {classesSetArray.map((Class) => (
              <option key={Class.ClassRank} value={Class.ClassRank}>
                {Class.ClassRank}
              </option>
            ))}
        </select>
      </Tooltip>
      {/* <button onClick={() =>{setSubject()}} type="button" class="btn active costom-button1 "></button> */}
      {names.map((name , index)=>{
        return(<button onClick={() =>{setSubject(name)}} type="button" name={name} class={`btn ${Subject == name ? 'active' : ''}  costom-button1`}>{name}</button>)
      })}
      </div>
    </div>
    <div class="section">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-4 custom-card1">
      { PlaylistData && PlaylistData.length > 0 && PlaylistData.map((Data,index)=>{
         return (
          (Data.videos.length > 0) ?
        <button onClick={()=>{navigate(`/watchvideo/${Data.videos[0].id}`)}} className='outerCardBtn'>
        <div class="col cardDiv">
          <div class="card custom-card playlist">
            <div className='Cardimage'><img src={
                            Data.videos[0].images
                              ? `data:image/png;base64,${Data.videos[0].images.data}`
                              : ''
                          } class="card-img-top custom-img" alt="..." />
            <div className='playlisticon'><RiPlayList2Fill/></div>
            </div>
            <img class="channelimg" src={
                            (Data.users.images.data)
                              ? `data:image/png;base64,${Data.users.images.data}`
                              : DefaultImg
                          } width="30px" />
            <div class="card-body costom-body">
              <h5 class="card-title customtitle">{Data.PlaylistTitle}</h5>
              <p class="card-text customchannelname">{Data.users.name}</p>
              <p class="card-text customviews">342 veiws {formatDateMessage(Data.Date) || "NAN"}</p>
            </div>
          </div>
        </div>
        </button>
        : "" 
        )
      })}
      {VideosData && VideosData.length > 0 && VideosData.map((videoData)=>{
        return(
          <button onClick={()=>{navigate(`/watchvideo/${videoData.id}`)}} className='outerCardBtn' style={{marginLeft: "2px"}}>
        <div class="col cardDiv">
          <div class="card custom-card">
          <div className='Cardimage'>
            <img  class="card-img-top custom-img"  src={
                            videoData.images
                              ? `data:image/png;base64,${videoData.images.data}`
                              : ''
                              }
                              alt="..." />
            <div className='Videotime'>{getVideoLengthMsg(videoData.VideoLength) || "NAN"}</div></div>
            <img class="channelimg" src={
                            (videoData.users.images == [])
                              ? `data:image/png;base64,${videoData.users.images.data}`
                              : DefaultImg
                              }
                               width="30px" />
            <div class="card-body costom-body">
              <h5 class="card-title customtitle">{videoData.VideoTitle}</h5>
              <p class="card-text customchannelname">{videoData.users.name}</p>
              <p class="card-text customviews">34k veiws {formatDateMessage(videoData.Date) || "NAN"}</p>
            </div>
          </div>
        </div>
        </button>
        );
      })}
     
      </div>
      </div>
      <CustomPopup 
        Visible={popup}
        errorMessage={error}
        OnClose={()=>{dispatch(setPopup(false)); setTimeout(()=>setError(""), 400)}}
      />
      <CustomPopup 
        Visible={createStudentPopup}
        errorMessage={createStudentError}
        OnClose={()=>{dispatch(setCreateStudentPopup(false)); setTimeout(()=>setCreateStudentError(""), 400)}}
      />
    </>
  )
}
