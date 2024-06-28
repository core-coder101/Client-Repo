import React from 'react'
import '../../assets/css/selectVideo.css'
import { RiPlayList2Fill } from "react-icons/ri";

export default function SelectVideo() {
  return (
    <>
        <div class="col">
      <div class="all">
      <a href="#"> <button type="button" class="btn active costom-button1 ">Not in Categories</button></a>
      <a href="#"> <button type="button" class="btn costom-button1">Math</button></a>
      <a href="#"> <button type="button" class="btn costom-button1">English</button></a>
      <a href="#"> <button type="button" class="btn costom-button1">Chemistry</button></a>
      <a href="#"> <button type="button" class="btn costom-button1">Urdu</button></a>
      <a href="#"> <button type="button" class="btn costom-button1">Pak Studies</button></a>
      <a href="#"> <button type="button" class="btn costom-button1">Islamiat</button></a>
      <a href="#"> <button type="button" class="btn costom-button1">Computer science</button></a>
      <a href="#"> <button type="button" class="btn costom-button1">Biology</button></a>
      <a href="#"> <button type="button" class="btn costom-button1">Drawing</button></a>
    </div>
    </div>
    <div class="section">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-4 custom-card1">
      <button className='outerCardBtn'>
        <div class="col ">
          <div class="card custom-card playlist">
            
            <div className='Cardimage'><img src={require("../../assets/img/farytale.PNG")} class="card-img-top custom-img" alt="..." />
            <div className='playlisticon'><RiPlayList2Fill/></div>
            </div>
            <img class="channelimg" src={require('../../assets/img/unnamed (1).jpg')} width="30px" />
            <div class="card-body costom-body">
              <h5 class="card-title customtitle">Fairy Tale 2 EP 08 - PART 01 [CC]</h5>
              <p class="card-text customchannelname">Hum tv</p>
              <p class="card-text customviews">342 veiws ,6 Hours ago</p>
            </div>
          </div>
        </div>
        </button>
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
