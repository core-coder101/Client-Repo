import React, { useEffect, useState } from 'react'
import '../../assets/css/selectVideo.css'
import { RiPlayList2Fill } from "react-icons/ri";
import axios from 'axios';
import { useSelector } from 'react-redux';
import defaultImg from "../../assets/img/default.png";


export default function SelectVideo() {


  const { CSRFToken} = useSelector((state) => state.auth)

  const [Subject,setSubject] = useState('Not in Categories');
  const [Rank, SetRank] = useState(10);
  const [VideosData , SetVideosData] = useState();

  const names = [
    "Not in Categories",
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
      SetVideosData(response.data.data);
  } catch (error) {

  } 
  }

  useEffect(()=>{
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
      { VideosData && VideosData.length > 0 && VideosData.map((VideoData,index)=>{
        return(
        <button onClick={()=>{}} className='outerCardBtn'>
        <div class="col ">
          <div class="card custom-card playlist">
            <div className='Cardimage'><img src={
                            VideoData.videos[0].images
                              ? `data:image/png;base64,${VideoData.videos[0].images.data}`
                              : ''
                          } class="card-img-top custom-img" alt="..." />
            <div className='playlisticon'><RiPlayList2Fill/></div>
            </div>
            <img class="channelimg" src={
                            VideoData.users.images
                              ? `data:image/png;base64,${VideoData.users.images.data}`
                              : defaultImg
                          } width="30px" />
            <div class="card-body costom-body">
              <h5 class="card-title customtitle">{VideoData.PlaylistTitle}</h5>
              <p class="card-text customchannelname">{VideoData.users.name}</p>
              <p class="card-text customviews">342 veiws ,{VideoData.Date}</p>
            </div>
          </div>
        </div>
        </button>
        )
      })}
        <div class="col blocking2">
          <div class="card custom-card">
          <div className='Cardimage'>
            <img src={require("../../assets/img/amazinggames.PNG")} class="card-img-top custom-img" alt="..." />
            <div className='Videotime'>12:40</div></div>
            <img class="channelimg" src={require("../../assets/img/unnamed (1).jpg")} width="30px" />
            <div class="card-body costom-body">
              <h5 class="card-title customtitle">TOP 35 Free FPS Games to Play Right Now!</h5>
              <p class="card-text customchannelname">undercoverdudes</p>
              <p class="card-text customviews">34k veiws , 12 Hours ago</p>
            </div>
          </div>
        </div>
        <div class="col blocking3">
          <div class="card custom-card">
            <img src="images/f16istoogood.PNG" class="card-img-top custom-img" alt="..." />
            <img class="channelimg" src="images/channels4_profile (3).jpg" width="30px" />
            <div class="card-body costom-body">
              <h5 class="card-title customtitle">F-16C Experience.mp4</h5>
              <p class="card-text customchannelname">Malzi</p>
              <p class="card-text customviews">890 veiws ,12 days ago</p>
            </div>
          </div>
        </div>
        <div class="col blocking4">
          <div class="card custom-card">
            <img src="images/neverlieaway.PNG" class="card-img-top custom-img" alt="..." />
            <img class="channelimg" src="images/unnamed (2).jpg" width="30px" />
            <div class="card-body costom-body">
              <h5 class="card-title customtitle">Never lie away perfectly reverb and slowed</h5>
              <p class="card-text customchannelname">DopeLine</p>
              <p class="card-text customviews">1.2M veiws ,2 years ago</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card custom-card">
            <img src="images/plane.PNG" class="card-img-top custom-img" alt="..." />
            <img class="channelimg" src="images/channels4_profile (4).jpg" width="30px" />
            <div class="card-body costom-body">
              <h5 class="card-title customtitle">NUCLEAR BOMBERS in War Thunder!</h5>
              <p class="card-text customchannelname">Vadact</p>
              <p class="card-text customviews">2.6k veiws ,23 Hours ago</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card custom-card">
            <img src="images/plane.PNG" class="card-img-top custom-img" alt="..." />
            <img class="channelimg" src="images/channels4_profile (4).jpg" width="30px" />
            <div class="card-body costom-body">
              <h5 class="card-title customtitle">NUCLEAR BOMBERS in War Thunder!</h5>
              <p class="card-text customchannelname">Vadact</p>
              <p class="card-text customviews">2.6k veiws ,23 Hours ago</p>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card custom-card">
            <img src="images/plane.PNG" class="card-img-top custom-img" alt="..." />
            <img class="channelimg" src="images/channels4_profile (4).jpg" width="30px" />
            <div class="card-body costom-body">
              <h5 class="card-title customtitle">NUCLEAR BOMBERS in War Thunder!</h5>
              <p class="card-text customchannelname">Vadact</p>
              <p class="card-text customviews">2.6k veiws ,23 Hours ago</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card custom-card">
            <img src="images/plane.PNG" class="card-img-top custom-img" alt="..." />
            <img class="channelimg" src="images/channels4_profile (4).jpg" width="30px" />
            <div class="card-body costom-body">
              <h5 class="card-title customtitle">NUCLEAR BOMBERS in War Thunder!</h5>
              <p class="card-text customchannelname">Vadact</p>
              <p class="card-text customviews">2.6k veiws ,23 Hours ago</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card custom-card">
            <img src="images/music1.PNG" class="card-img-top custom-img" alt="..." />
            <img class="channelimg" src="images/channels4_profile (5).jpg" width="30px" />
            <div class="card-body costom-body">
              <h5 class="card-title customtitle">Night Lofi Songs | Mind relaxing songs | slowed</h5>
              <p class="card-text customchannelname">Glam Music</p>
              <p class="card-text customviews">2M veiws ,3 years ago</p>
            </div>
          </div>
        </div>

      </div>
      </div>
    </>
  )
}
