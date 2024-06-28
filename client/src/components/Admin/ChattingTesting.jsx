import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import echo from './Echo';
import { useParams } from 'react-router-dom';

export default function ChattingTesting() {

    const { ID } = useParams();


    const { CSRFToken, user , userData } = useSelector((state) => state.auth)


    if (user.token) {
        axios.defaults.headers.common['Authorization'] =
        `Bearer ${user.token}`;
    }



    const [username, setusername] = useState('username');
    const [messages,setmessages] = useState([]);
    const [message,setmessage] = useState('');



    // useEffect(() => {
    //     const channel = echo.channel('Chat');

    //     channel.listen('.message', (message) => {
    //         setmessages((prevMessages) => [...prevMessages, message]);
    //     });

    //     return () => {
    //         channel.stopListening('.message');
    //         echo.leaveChannel('Chat');
    //     };
    // }, []);
    

    useEffect(() => {
        if (userData?.id) {
            console.log(`Subscribing to private-chat.${userData.id}`); 
            const channel = echo.private(`private-chat.${userData.id}`);

            channel.listen('PrivateMessageSent', (event) => {
                console.log('Message received:', event.message); // Debugging line
                setmessages((prevMessages) => [...prevMessages, event.message]);
            });

            channel.error((error) => {
                console.error('Channel error:', error); // Debugging line
            });

            return () => {
                channel.stopListening('PrivateMessageSent');
                echo.leaveChannel(`private-chat.${userData.id}`);
            };
        }
    }, [userData]);



    const Submit = async(e) =>{
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/PrivateMessage',
                {
                    message : message,
                    receiver_id : ID
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
        {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
        <div class="mb-3">
            <input type="text" name='message' value={message} onChange={e => setmessage(e.target.value)} class="form-control" id="exampleFormControlInput1" placeholder="Enter message" />
            <button onClick={Submit}>Send message</button>
        </div>
        </div>
    </div>
    </>
  )
}
