import React from 'react'
import "../../assets/css/playlistItem.css"

export default function PlaylistItem(props) {
  return (
    <div className='playlistItemDiv'>
        <p style={{margin: "0px 5px"}}>{props.index}</p>
        <div className='previewImgDiv'>
            <img 
                src={
                props.image
                ? `data:image/png;base64,${props.image}`
                : ""
              }
            />
            <p>{props.VideoLength}</p>
        </div>
        <div className='info'>
            <h6>{props.Title}</h6>
            <p>{props.UName}</p>
        </div>
    </div>
  )
}
