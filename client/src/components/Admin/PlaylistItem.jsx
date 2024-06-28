import React from 'react'
import "../../assets/css/playlistItem.css"

export default function PlaylistItem() {
  return (
    <div className='playlistItemDiv'>
        <p style={{marginLeft: "5px"}}>1</p>
        <div className='previewImgDiv'>
            <img src='https://i.ytimg.com/vi/OVh0bMNSFss/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAnDqUVEdKjaDwkMiaY_4_R89lyxw' />
            <p>1:26</p>
        </div>
        <div className='info'>
            <h6>g3ox_em - GigaChad Theme (Phonk House Version)</h6>
            <p>g3ox_em</p>
        </div>

    </div>
  )
}
