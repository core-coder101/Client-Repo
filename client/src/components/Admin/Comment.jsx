import React, { useState } from 'react'
import "../../assets/css/comment.css"
import defaultImg from "../../assets/img/default.png"
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdKeyboardArrowUp } from "react-icons/md";
import { CiFlag1 } from "react-icons/ci";
import Reply from './Reply';
import { formatDateMessage } from './WatchVideos';
import { TbBorderRadius } from 'react-icons/tb';

export default function Comment({Comment}) {

    const [optionsOpen, setOptionsOpen] = useState(false)
    const [repliesOpen, setRepliesOpen] = useState(false)

  return (
    <>
    <div className='commentMainDiv'>

        <div className='comment'>
            <div className='imgDiv'>
                <img style={{borderRadius:'50%', objectFit: "cover", height:'50px', width:'50px'}} src={(Comment.users.images[0].data)
                              ? `data:image/png;base64,${Comment.users.images[0].data}`
                              : defaultImg
                          } />
            </div>
            <div className='contentDiv'>
                <div className='title'>
                    <h6>@{Comment.users.name}</h6>
                    <p>{formatDateMessage(Comment.created_at)}</p>
                </div>
                <div className='commentMessage'>
                {Comment.Comment}
                </div>
                {/* conditionally render "Replies" */}
               
            </div>
            <div className='optionsButtonDiv'>
                <BsThreeDotsVertical className='optionsButton' onClick={() => {setOptionsOpen(prev=>!prev)}} />
                <div className={'optionsMenu ' + (optionsOpen ? "" : "d-none")}>
                    <div className='option'>
                        <CiFlag1 />
                        <p>report</p>
                    </div>
                    <div className='option'>
                        <CiFlag1 />
                        <p>report</p>
                    </div><div className='option'>
                        <CiFlag1 />
                        <p>report</p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    
    </>
  )
}
