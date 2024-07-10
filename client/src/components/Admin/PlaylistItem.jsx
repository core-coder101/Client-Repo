import React from 'react'
import "../../assets/css/playlistItem.css"



export const getVideoLengthMsg = (VideoLength) => {
  let lengthMsg = "";
  const lengthInSec = VideoLength;
  const lengthInMin = Math.floor(lengthInSec / 60);
  const lengthInHour = Math.floor(lengthInMin / 60);
  const remainingSeconds = lengthInSec % 60;
  const remainingMinutes = lengthInMin % 60;

  if (lengthInHour > 0) {
    lengthMsg = `${lengthInHour}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  } else if (lengthInMin > 0) {
    lengthMsg = `${lengthInMin}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  } else {
    lengthMsg = `0:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  return lengthMsg;
}


export default function PlaylistItem({ index, image, VideoLength, Title, UName, onClickFunction, highlight }) {

  const maxTitleLengthToShow = 56 // same as youtube

  const lengthMsg = getVideoLengthMsg(VideoLength)

  return (
    <div className={'playlistItemDiv ' + highlight} onClick={onClickFunction}>
        <p style={{margin: "0px 5px"}}>{index}</p>
        <div className='previewImgDiv'>
            <img 
                src={
                image
                ? `data:image/png;base64,${image}`
                : ""
              }
            />
            <p>{lengthMsg}</p>
        </div>
        <div className='info'>
            <h6>{Title.substring(0, maxTitleLengthToShow)}{(Title.length > maxTitleLengthToShow) ? " . . ." : ""}</h6>
            <p>{UName}</p>
        </div>
    </div>
  )
}
