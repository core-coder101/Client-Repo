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

export default function Comment() {

    const [optionsOpen, setOptionsOpen] = useState(false)
    const [repliesOpen, setRepliesOpen] = useState(false)

  return (
    <>
    <div className='commentMainDiv'>
        <div className='comment'>
            <div className='imgDiv'>
                <img src={defaultImg} />
            </div>
            <div className='contentDiv'>
                <div className='title'>
                    <h6>@username</h6>
                    <p>5 months ago</p>
                </div>
                <div className='commentMessage'>
                Listening to this masterpiece at midnight while looking out the open window and breathing the cold air just feels like a different universe
                </div>
                <div className='commentButtons'>
                    <FaThumbsUp />
                    <p>546</p>
                    <FaThumbsDown style={{webkitTransform:"scale(-1, 1)"}} />
                    <button>Reply</button>
                </div>
                {/* conditionally render "Replies" */}
                <div className='replies' onClick={() => {setRepliesOpen(prev=>!prev)}}>
                    {repliesOpen ? <MdKeyboardArrowUp style={{width: "23px", height: "23px"}} /> : <RiArrowDropDownLine style={{width: "25px", height: "25px"}} />}
                    <p>2 replies</p>
                </div>
                {repliesOpen ? <div className='repliesDiv' style={{display: "flex", flexDirection: "column"}}>
                    <Reply />
                    <Reply />
                    <Reply />
                    <Reply />
                </div> : null}
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
