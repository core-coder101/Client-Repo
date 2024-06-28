import React, { useEffect, useState } from 'react';
import "../../assets/css/WatchVideo.css";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoByID, setError, setPopup } from '../../redux/slices/WatchVideos';
import CustomPopup from '../common/CustomPopup';
import Comment from './Comment';
import PlaylistItem from './PlaylistItem';

export default function WatchVideoes() {
  const { ID } = useParams();
  const { loading, error, popup, videoInfo, file } = useSelector(state => state.watchVideos);
  const dispatch = useDispatch();

  const descriptionText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    if (ID) {
      dispatch(getVideoByID(ID))
    }
  }, [ID]);


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
          <div className='Playlist d-md-block d-lg-none d-none'>
        <div className='playlistItems'>
            <div className='fixedTopDiv'>
                <div className='info'>
                <h6>g3ox_em - GigaChad Theme (Phonk House Version)</h6>
                <p>g3ox_em - 1 / 10</p>
                </div>
            </div>
            <div className='overflowDiv' style={{width: "100%", overflowY: "auto", zIndex: "0"}}>
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
            </div>
        </div>
    </div>
          <div className='video-Details'>
          <h4 className='Video-Title roboto-black-italic'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h4>

            <div className='description'>
              {showMore ? descriptionText : descriptionText.substring(0, 100)}
              {/* <br /> */}
              <button className='morebutton text-info' onClick={()=>{setShowMore(prev=>!prev)}}>{showMore ? " . . .show less" : " . . .show more"}</button>
            </div>
            <hr />
            <div>
              <h5 className='comments_num'>13 Comments</h5>
              <input name='Comment' className='commentinput mb-3' placeholder='Add a comment' />
              <Comment />
            </div>
          </div>
        </div>
        <div className='Playlist col-lg-4 d-lg-block d-none'>
        <div className='playlistItems'>
            <div className='fixedTopDiv'>
                <div className='info'>
                <h6>g3ox_em - GigaChad Theme (Phonk House Version)</h6>
                <p>g3ox_em - 1 / 10</p>
                </div>
            </div>
            <div className='overflowDiv' style={{width: "100%", overflowY: "auto", zIndex: "0"}}>
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
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
        Visible={loading}
        OnClose={() => {}}
        errorMessage={error}
      />
    </>
  );
}
