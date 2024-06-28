import React, { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function ChattingTesting() {


    const { CSRFToken, user } = useSelector((state) => state.auth)


    if (user.token) {
        axios.defaults.headers.common['Authorization'] =
        `Bearer ${user.token}`;
    }



    const [username, setusername] = useState('username');
    const [messages,setmessages] = useState([]);
    const [message,setmessage] = useState('');



    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('89d9a354e95472191a14', {
            cluster: 'ap2',
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message.sent', function(data) {
            setmessages([...messages, data.message]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages]);
    



    const Submit = async(e) =>{
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/SendMessage',
                {
                    username : username,
                    message : message
                },
                {
                    headers: {
                        'X-CSRF-TOKEN': CSRFToken,
                        'Content-Type': 'application/json',
                        'API-TOKEN': 'IT is to secret you cannot break it :)',
                    },
                }
            );
            setmessage('')
        } catch (error) {

        } 
    }


  return (
    <>
    <div className='row m-0 p-0'>
        <div className='col-3'>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Enter UserName</label>
            <input type="text" name='username' value={username} onChange={e => setusername(e.target.value)} class="form-control" id="exampleFormControlInput1" placeholder="UserName" />
        </div>
        </div>
        <div className='col-9'>
        {messages.map((message)=>{
            return (
                <p>{message.message}</p>
            )
        })}
        <div class="mb-3">
            <input type="text" name='message' value={message} onChange={e => setmessage(e.target.value)} class="form-control" id="exampleFormControlInput1" placeholder="Enter message" />
            <button onClick={Submit}>Send message</button>
        </div>
        </div>
    </div>
    </>
  )
}
