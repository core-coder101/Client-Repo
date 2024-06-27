import React, { useEffect, useState } from 'react';
import "../../assets/css/WatchVideo.css";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoByID, setError, setPopup } from '../../redux/slices/WatchVideos';
import CustomPopup from '../common/CustomPopup';
import Comment from './Comment';

export default function WatchVideoes() {
  const { ID } = useParams();
  const { loading, error, popup, videoInfo, file } = useSelector(state => state.watchVideos);
  const dispatch = useDispatch();
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    if (ID) {
      dispatch(getVideoByID(ID)).unwrap()
        .then(() => {
          decodeVideo(file);
        })
        .catch((err) => {
          console.error('Error fetching video:', err);
          dispatch(setError("Error fetching video."));
        });
    }
  }, [ID, dispatch,file]);

  const decodeVideo = (file) => {
    const byteCharacters = atob(file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'video/mp4' });
    const videoUrl = URL.createObjectURL(blob);
    setVideoSrc(videoUrl);
  };

  return (
    <>
      <div className='row m-0 p-0'>
        <div className='col-8 videoSideDiv'>
          <div className='videodiv'>
            <video src={videoSrc} className='video' controls>
              <source type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className='video-Details'>

            <div className='description'>
              👉 Check our website: https://scalablescripts.com
              Learn how to create a Realtime Chat App with React and Pusher.
                
              Source Code: https://github.com/scalablescripts/re...
              <br />
              <button className='morebutton'>...more</button>
            </div>
            <hr />
            <div>
              <h5 className='comments_num'>13 Comments</h5>
              <input name='Comment' className='commentinput mb-3' placeholder='Add a comment' />
              <Comment />
            </div>
          </div>
        </div>
        <div className='col-4'>
          <div className=''>
            bye
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
        Visible={loading}
        OnClose={() => {}}
        errorMessage={error}
      />
    </>
  );
}
