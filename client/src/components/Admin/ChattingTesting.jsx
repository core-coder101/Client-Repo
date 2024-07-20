import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import echo from './Echo';
import { useParams } from 'react-router-dom';
import '../../assets/css/ChatBox.scss';
import defaultImg from "../../assets/img/default.png";
import { MdNotificationsActive } from "react-icons/md";
import { formatDateMessage } from './WatchVideos';



export function formatTime(dateString) {
  const date = new Date(dateString);

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? `0${minutes}`: minutes;

  return `${hours}:${minutesStr} ${ampm}`;
}


export default function ChattingTesting() {

    const [ID , setID] = useState(0);

    const { CSRFToken, user , userData } = useSelector((state) => state.auth)


    if (user.token) {
        axios.defaults.headers.common['Authorization'] =
        `Bearer ${user.token}`;
    }
    const [UsersData,setUsersData] = useState([]);


useEffect(()=>{
  GetEachStoredMessages();
},[])



useEffect(() => {
    const chatElement = document.querySelector('.chat[data-chat=person0]');
    const personElement = document.querySelector('.person[data-chat=person0]');

    if (chatElement && personElement) {
      chatElement.classList.add('active-chat');
      personElement.classList.add('active');
    } else {
      console.error('Chat or person element not found');
    }

    let friends = {
      list: document.querySelector('ul.people'),
      all: document.querySelectorAll('.left .person'),
      name: ''
    };

    let chat = {
      container: document.querySelector('.container .right'),
      current: null,
      person: null,
      name: document.querySelector('.container .right .top .name')
    };

    friends.all.forEach(f => {
      f.addEventListener('mousedown', () => {
        if (!f.classList.contains('active')) {
          setActiveChat(f);
        }
      });
    });

    function setActiveChat(f) {
      const activeFriend = friends.list.querySelector('.active');
      const activeChat = chat.container.querySelector('.active-chat');
      const newChatPerson = chat.container.querySelector(`[data-chat="${f.getAttribute('data-chat')}"]`);

      if (activeFriend && activeChat && newChatPerson) {
        activeFriend.classList.remove('active');
        f.classList.add('active');
        activeChat.classList.remove('active-chat');
        newChatPerson.classList.add('active-chat');
        friends.name = f.querySelector('.name').innerText;
        chat.name.innerHTML = friends.name;
      } else {
        console.error('Active elements or new chat person element not found');
      }
    }
}, [userData]);


    const [username, setusername] = useState('username');
    const [messages,setmessages] = useState([]);
    const [message,setmessage] = useState('');
    const [UnreadMessage,setUnreadMessage] = useState([]);




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
                if(event.senderId == parseInt(ID)){
                setmessages((prevMessages) => [...prevMessages, {
                  'Sending_id':  event.senderId,
                  'Message': event.message,
                  'Receiving_id': event.receiver_id
                }]);
                }
                else{
                  setUnreadMessage((prevunread) => [...prevunread, {
                    Sending_id: event.senderId
                  }]);
                }
            });

            channel.error((error) => {
              console.error('Channel error:', error);
            });
            return () => {
                channel.stopListening('PrivateMessageSent');
                echo.leaveChannel(`private-chat.${userData.id}`);
          };
        }
        
    }, [userData,ID]);


    // useEffect(() => {
    //   if (userData?.id) {
    //     console.log(`Subscribing to private-chat.${userData.id}`); 
    //     const channel = echo.private(`private-chat.${userData.id}`);

    //     channel.listen('PrivateMessageSent', (event) => {
    //         console.log('Message received:', event.receiver_id);
    //         if(ID != event.receiver_id){
              
    //         }
    //         // setmessages((prevMessages) => [...prevMessages, {
    //         //   'Sending_id':  event.senderId,
    //         //   'Message': event.message,
    //         //   'Receiving_id': event.receiver_id
    //         // }]);
    //     });
    //     channel.error((error) => {
    //         console.error('Channel error:', error); // Debugging line
    //     });
    //     return () => {
    //         channel.stopListening('PrivateMessageSent');
    //         echo.leaveChannel(`private-chat.${userData.id}`);
    //     };
    // }
    // }, [userData,ID])



    useEffect(()=>{
      setmessages([]);
      GetStoredMessages(ID);
    },[ID])









    const GetStoredMessages = async (ID) =>{
      try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/MessageStoredData',
            {
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
        setmessages(response.data);
    } catch (error) {

    }
    }

    const GetEachStoredMessages = async () =>{
      try {
        const response = await axios.get(
            'http://127.0.0.1:8000/api/GetEachStoredMessages',
            {
                headers: {
                    'X-CSRF-TOKEN': CSRFToken,
                    'Content-Type': 'application/json',
                    'API-TOKEN': 'IT is to secret you cannot break it :)',
                },
            }
        );
        setUsersData(response.data.data);
        setID(response.data.data[0]?.sender.id);
    } catch (error) {

    } 
    }

    const Submit = async (e) => {
      try {
          const response = await axios.post(
              'http://127.0.0.1:8000/api/PrivateMessage',
              {
                  message: message,
                  receiver_id: ID
              },
              {
                  headers: {
                      'X-CSRF-TOKEN': CSRFToken,
                      'Content-Type': 'application/json',
                      'API-TOKEN': 'IT is to secret you cannot break it :)',
                  },
              }
          );
          console.log('Response:', response.data);
          setmessages((prevMessages) => [...prevMessages, {
            'Message':message,
            'created_at': new Date()
          }]);
          setmessage('');
      } catch (error) {
          console.error('Error sending message:', error);
      }
  }


  return (
    <>
    <div className="wrapper">
        <div className="container">
          <div className="left">
            <div className="top">
              <input type="text" placeholder="Search" />
              <a href="javascript:;" className="search" />
            </div>
            <ul className="people">
            {UsersData.map((user, index) => {
  return (
    <li 
      className="person notification" 
      onClick={() => { setID(user.id);  setUnreadMessage(prevMessages => 
          prevMessages.filter(message => message.Sending_id !== user.id)
        );}} 
      data-chat={`person${index}`} 
      key={user.id} // Add a unique key for each item
    >
      <img 
        src={
          user.images[0]
            ? `data:image/png;base64,${user.images[0].data}`
            : defaultImg
        } 
        alt="" 
      />
      <span className="name">{user.name}</span>
      <span>
      {UnreadMessage.some(message => message.Sending_id === user.id) && (
        <MdNotificationsActive className='notification' />
      )}
      </span>
      <span className="time">{formatTime(user.created_at)}</span>
    {/* <span className="preview">{user.sent_messages[0]?.Message}</span> */}
    </li>
  );
})}
        </ul>
          </div>
          <div className="right ">
            <div className="top"><span>To: <span className="name">Dog Woofson</span></span></div>
            <div className='ChatSide'>
            {UsersData.map((user,index) =>{
              return(
            <div className="chat" data-chat={`person${index}`}>
              {messages.map((msg, index) => (
                <>
              <div className="conversation-start">
                <span>{formatDateMessage(msg.created_at)}, {formatTime(msg.created_at)}</span>
              </div>
                {((msg.Sending_id == ID) ?
                <div key={index} className="bubble you">
                    {msg.Message}
                </div>
                :
                <div key={index} className="bubble me">
                    {msg.Message}
                </div>
              )}
              </>
              ))}
              </div>
          );
        })}
        </div>
          <div className="write">
              <a href="javascript:;" className="write-link attach" />
              <input type="text" name='message' value={message} onChange={e => setmessage(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="Enter message"  />
              <a href="javascript:;" className="write-link smiley" />
              <button type='button' onClick={Submit} className="write-link send" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
