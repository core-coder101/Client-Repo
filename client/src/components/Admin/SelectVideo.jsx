import React, { useEffect, useState } from 'react'
import '../../assets/css/selectVideo.css'
import { RiPlayList2Fill } from "react-icons/ri";
import axios from 'axios';
import { useSelector } from 'react-redux';
import DefaultImg from "../../assets/img/default.png";
import { useNavigate } from 'react-router-dom';


export default function SelectVideo() {

  const navigate = useNavigate();


  const { CSRFToken} = useSelector((state) => state.auth)

  const [Subject,setSubject] = useState('General');
  const [Rank, SetRank] = useState(10);
  const [VideosData , SetVideosData] = useState();
  const [PlaylistData , SetPlaylistData] = useState();

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

  const GetVideoData = async () =>{
    try {
      const response = await axios.get(
          `http://127.0.0.1:8000/api/showvideoDataPic?Subject=${Subject}&ClassRank=${Rank}`,
          {
              headers: {
                  'X-CSRF-TOKEN': CSRFToken,
                  'Content-Type': 'application/json',
                  'API-TOKEN': 'IT is to secret you cannot break it :)',
              },
          }
      );
      if(response.data.message == 'video'){
        SetVideosData(response.data.data);
        SetPlaylistData([]);
      }
      else{
        SetVideosData([]);
        SetPlaylistData(response.data.data);
      }
  } catch (error) {

  } 
  }

  useEffect(()=>{
    SetVideosData([]);
    SetPlaylistData([]);
    GetVideoData();
  },[Subject])



  return (
    <>
        <div class="col">
      <div class="all">
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
        <div class="col ">
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
              <p class="card-text customviews">342 veiws ,{Data.Date}</p>
            </div>
          </div>
        </div>
        </button>
        : "" 
        )
      })}
      {VideosData && VideosData.length > 0 && VideosData.map((videoData)=>{
        return(
          <button onClick={()=>{navigate(`/watchvideo/${videoData.id}`)}} className='outerCardBtn'>
        <div class="col">
          <div class="card custom-card">
          <div className='Cardimage'>
            <img  class="card-img-top custom-img"  src={
                            videoData.images
                              ? `data:image/png;base64,${videoData.images.data}`
                              : ''
                              }
                              alt="..." />
            <div className='Videotime'>{videoData.VideoLength}</div></div>
            <img class="channelimg" src={
                            (videoData.users.images == [])
                              ? `data:image/png;base64,${videoData.users.images.data}`
                              : DefaultImg
                              }
                               width="30px" />
            <div class="card-body costom-body">
              <h5 class="card-title customtitle">{videoData.VideoTitle}</h5>
              <p class="card-text customchannelname">{videoData.users.name}</p>
              <p class="card-text customviews">34k veiws , {videoData.Date}</p>
            </div>
          </div>
        </div>
        </button>
        );
      })}
     
      </div>
      </div>
    </>
  )
}
