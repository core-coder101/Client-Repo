import React from 'react'
import vid2 from '../../assets/videosfortesting/vid2.mp4'
import "../../assets/css/WatchVideo.css";

export default function WatchVideoes() {
  return (
    <>
      <div className='row m-0 p-0'>
        <div className='col-8 videoSideDiv'>
          <div className='videodiv'>
          <video className='video' controls >
            <source src={vid2} autoPlay poster='https://ik.imagekit.io/ikmedia/example_video.mp4/ik-thumbnail.jpg?tr=w-1200,h-680' type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          </div>
          <div className='video-Details'>
            <h4 className='Video-Title roboto-black-italic'>Build a Realtime Chat App with React not support the video tag. hiihi </h4>
            
          </div>
        </div>
        <div className='col-4'>
            bye
        </div>
      </div>
    </>
  )
}
