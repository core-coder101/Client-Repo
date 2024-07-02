import React, { useEffect, useState } from 'react';
import "../../assets/css/WatchVideo.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoRange, getVideoByID, getVideoInfoByID, setError, setPopup } from '../../redux/slices/WatchVideos';
import CustomPopup from '../common/CustomPopup';
import Comment from './Comment';
import PlaylistItem from './PlaylistItem';
import axios from 'axios';

export default function WatchVideoes() {

  const { CSRFToken } = useSelector((state) => state.auth)
  
  const { ID } = useParams();
  
  const { loading, error, popup, videoInfo, file  } = useSelector(state => state.watchVideos);
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [showMore, setShowMore] = useState(false)

  const [PlaylistData,SetPlaylistData] = useState([]);

  const [comment , setcomment] = useState('');


  const GetplaylistData = async () =>{
    try {
      const response = await axios.get(
          `http://127.0.0.1:8000/api/GetplaylistData?PlaylistID=${videoInfo.VideoPlaylistID}`,
          {
              headers: {
                  'X-CSRF-TOKEN': CSRFToken,
                  'Content-Type': 'application/json',
                  'API-TOKEN': 'IT is to secret you cannot break it :)',
              },
          }
      );
        SetPlaylistData(response.data.data);
  } catch (error) {

  } 
  }





  const SubmitComment = async () =>{
    try {
      const response = await axios.post(
          `http://127.0.0.1:8000/api/UploadComment`,{
            VideoID : ID,
            Comment : comment
          },
          {
              headers: {
                  'X-CSRF-TOKEN': CSRFToken,
                  'Content-Type': 'application/json',
                  'API-TOKEN': 'IT is to secret you cannot break it :)',
              },
          }
      );
        // SetPlaylistData(response.data.data);
  } catch (error) {

  } 
  }





  useEffect(() => {
    
    if (ID) {
      // dispatch(getVideoByID(ID))
      dispatch(fetchVideoRange({ ID, startByte: 0 , endByte: 100000000}))
      dispatch(getVideoInfoByID(ID))
    }
  }, [ID]);
  useEffect(()=>{
    if(videoInfo){
      if(videoInfo.VideoPlaylistID != null){
        GetplaylistData()
      }
    }
  },[videoInfo])

    // using the redux loading state directly does not work properly
    const [localLoading, setLocalLoading] = useState(false)
    useEffect(()=>{
      setLocalLoading(loading)
    }, [loading])



    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
          event.preventDefault(); // Prevent the default form submission behavior
          SubmitComment();
      }
  };

function formatDateMessage(uploadDate) {
  const createdAt = new Date(uploadDate);
  const now = new Date();

  // Resettting the time part because we are only getting date info from backend -_-
  createdAt.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = Math.abs(now - createdAt);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}
  
  let dateMsg = ""
  if(videoInfo?.Date){
    const createdAt = new Date(videoInfo.Date)
    dateMsg = formatDateMessage(createdAt)
  } else {
    dateMsg = "NAN"
  }

  return (
    <>
      <div className='row m-0 p-0'>
        <div className='col-lg-8 videoSideDiv'>
          <div className='videodiv'>
            <video src={file} className='video' controls>
              <source type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className='Playlist d-block d-md-block d-lg-none' style={{marginTop: "10px"}}>
        <div className='playlistItems'>
            <div className='fixedTopDiv'>
                <div className='info'>
                <h6>{PlaylistData.PlaylistTitle}</h6>
                <p>{PlaylistData.PlaylistCategory} - 1 / {(PlaylistData?.videos?.length)}</p>
                
                </div>
            </div>
            <div className='overflowDiv' style={{width: "100%", overflowY: "auto", zIndex: "0"}}>
                {PlaylistData && PlaylistData.videos && PlaylistData.videos.map((video,index)=>{
                  let highlight = ""
                  if(ID == video.id){
                    highlight = "highlight"
                  }

                  return (<PlaylistItem
                  index={index+1}
                  key = {video.id}
                  Title = {video.VideoTitle}
                  VideoLength = {video.VideoLength}
                  image = {video.images.data}
                  UName = "Ahmad"
                  onClickFunction = {() => {navigate("/watchvideo/" + video.id.toString())}}
                  highlight = {highlight}
                  />);
                })}
                
            </div>
        </div>
    </div>
          <div className='video-Details'>
          <h4 className='Video-Title roboto-black-italic'>{videoInfo ? videoInfo.VideoTitle :""}</h4>

            <div className='description'>
              <div>
                <p style={{fontWeight: "bold", margin: "0", marginBottom: "5px"}}>{dateMsg}</p>
              </div>
              {showMore ? (videoInfo ? videoInfo.VideoDescription: "") : (videoInfo ? videoInfo.VideoDescription.substring(0, 100): "")}
              {/* <br /> */}
              {videoInfo?.VideoDescription.length > 100 && <button className='morebutton' onClick={()=>{setShowMore(prev=>!prev)}}>{showMore ? " . . .show less" : " . . .show more"}</button>}
            </div>
            <hr />
            <div>
              <h5 className='comments_num'>13 Comments {comment}</h5>
              <input name='comment' onKeyDown={handleKeyDown} id='comment' onChange={(e)=>{setcomment(e.target.value)}} className='commentinput mb-3' placeholder='Add a comment' />
              <Comment />
            </div>
          </div>
        </div>
        <div className='Playlist col-lg-4 d-lg-block d-none'>
        <div className='playlistItems'>
            <div className='fixedTopDiv'>
                <div className='info'>
                <h6>{PlaylistData.PlaylistTitle}</h6>
                <p>{PlaylistData.PlaylistCategory} - 1 / {(PlaylistData?.videos?.length)}</p>
                </div>
            </div>
            <div className='overflowDiv' style={{width: "100%", overflowY: "auto", zIndex: "0"}}>
            {PlaylistData && PlaylistData.videos && PlaylistData.videos.map((video,index)=>{

              let highlight = ""
                  if(ID == video.id){
                    highlight = "highlight"
                  }

                  return (<PlaylistItem
                  index={index+1}
                  key = {video.id}
                  Title = {video.VideoTitle}
                  VideoLength = {video.VideoLength}
                  image = {video.images.data}
                  UName = "Ahmad"
                  onClickFunction = {() => {navigate("/watchvideo/" + video.id.toString())}}
                  highlight = {highlight}
                  />);
                })}
            </div>
        </div>
    </div>
        </div>

      <CustomPopup
        Visible={popup}
        OnClose={() => {
          dispatch(setPopup(false));
          setTimeout(() => {
            dispatch(setError(""));
          }, 400);
        }}
        errorMessage={error}
      />

      <CustomPopup 
        Visible={localLoading}
        OnClose={() => {}}
        errorMessage={error}
      />
    </>
  );
}
