import React from 'react'
import "../../assets/css/playlistItem.css"



export const getVideoLengthMsg = (VideoLength) => {
  let lengthMsg = ""
  const lengthInSec = VideoLength
  const lengthInMin = Math.floor(lengthInSec / 60)
  const remainingSeconds = lengthInSec - (lengthInMin * 60)
  if(lengthInMin < 1){
    if(remainingSeconds < 10){
      lengthMsg = "0:0" + remainingSeconds.toString()
    } else {
      lengthMsg = "0:" + remainingSeconds.toString()
    }
  } else {
    if(remainingSeconds < 10){
      lengthMsg = lengthInMin.toString() + ":0" + remainingSeconds.toString()
    } else {
      lengthMsg = lengthInMin.toString() + ":" + remainingSeconds.toString()
    }
  }

  return lengthMsg

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
