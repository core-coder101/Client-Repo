import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import echo from './Echo';
import { useParams } from 'react-router-dom';
import '../../assets/css/ChatBox.scss';

export default function ChattingTesting() {

    const { ID } = useParams();


    const { CSRFToken, user , userData } = useSelector((state) => state.auth)


    if (user.token) {
        axios.defaults.headers.common['Authorization'] =
        `Bearer ${user.token}`;
    }


useEffect(()=>{
  document.querySelector('.chat[data-chat=person2]').classList.add('active-chat')
  document.querySelector('.person[data-chat=person2]').classList.add('active')
  
  let friends = {
      list: document.querySelector('ul.people'),
      all: document.querySelectorAll('.left .person'),
      name: ''
    },
    chat = {
      container: document.querySelector('.container .right'),
      current: null,
      person: null,
      name: document.querySelector('.container .right .top .name')
    }
  
  friends.all.forEach(f => {
    f.addEventListener('mousedown', () => {
      f.classList.contains('active') || setAciveChat(f)
    })
  });
  
  function setAciveChat(f) {
    friends.list.querySelector('.active').classList.remove('active')
    f.classList.add('active')
    chat.current = chat.container.querySelector('.active-chat')
    chat.person = f.getAttribute('data-chat')
    chat.current.classList.remove('active-chat')
    chat.container.querySelector('[data-chat="' + chat.person + '"]').classList.add('active-chat')
    friends.name = f.querySelector('.name').innerText
    chat.name.innerHTML = friends.name
  }
  GetStoredMessages(ID);
},[])

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
                setmessages((prevMessages) => [...prevMessages, {
                  'Sending_id':  event.senderId,
                  'Message': event.message,
                  'Receiving_id': event.receiver_id
                }]);
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
            'Message':message
          }]);
          setmessage('');
      } catch (error) {
          console.error('Error sending message:', error); // Debugging line
      }
  }


  return (
    <>
    {/* <div className='row m-0 p-0'>
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
    </div>  */}
    <div className="wrapper">
        <div className="container">
          <div className="left">
            <div className="top">
              <input type="text" placeholder="Search" />
              <a href="javascript:;" className="search" />
            </div>
            <ul className="people">
              <li className="person" data-chat="person1">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg" alt="" />
                <span className="name">Thomas Bangalter</span>
                <span className="time">2:09 PM</span>
                <span className="preview">I was wondering...</span>
              </li>
              <li className="person" data-chat="person2">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/dog.png" alt="" />
                <span className="name">Dog Woofson</span>
                <span className="time">1:44 PM</span>
                <span className="preview">I've forgotten how it felt before</span>
              </li>
              <li className="person" data-chat="person3">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/louis-ck.jpeg" alt="" />
                <span className="name">Louis CK</span>
                <span className="time">2:09 PM</span>
                <span className="preview">But we’re probably gonna need a new carpet.</span>
              </li>
              <li className="person" data-chat="person4">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/bo-jackson.jpg" alt="" />
                <span className="name">Bo Jackson</span>
                <span className="time">2:09 PM</span>
                <span className="preview">It’s not that bad...</span>
              </li>
              <li className="person" data-chat="person5">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/michael-jordan.jpg" alt="" />
                <span className="name">Michael Jordan</span>
                <span className="time">2:09 PM</span>
                <span className="preview">Wasup for the third time like is 
                  you blind bitch</span>
              </li>
              <li className="person" data-chat="person6">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/drake.jpg" alt="" />
                <span className="name">Drake</span>
                <span className="time">2:09 PM</span>
                <span className="preview">howdoyoudoaspace</span>
              </li>
            </ul>
          </div>
          <div className="right ">
            <div className="top"><span>To: <span className="name">Dog Woofson</span></span></div>
            <div className='ChatSide'>
            <div className="chat" data-chat="person1">
              <div className="conversation-start">
                <span>Today, 6:48 AM</span>
              </div>
              {messages.map((msg, index) => (
                ((msg.Sending_id == ID) ?
                <div key={index} className="bubble you">
                    {msg.Message}
              </div>
                :
                <div key={index} className="bubble me">
                    {msg.Message}
              </div>
              )

                ))}
              
            </div>
            </div>
            <div className="chat" data-chat="person2">
              <div className="conversation-start">
                <span>Today, 5:38 PM</span>
              </div>
              <div className="bubble you">
                Hello, can you hear me?
              </div>
              <div className="bubble you">
                I'm in California dreaming
              </div>
              <div className="bubble me">
                ... about who we used to be.
              </div>
              <div className="bubble me">
                Are you serious?
              </div>
              <div className="bubble you">
                When we were younger and free...
              </div>
              <div className="bubble you">
                I've forgotten how it felt before
              </div>
            </div>
            <div className="chat chatbox" data-chat="person3">
              <div className="conversation-start">
                <span>Today, 3:38 AM</span>
              </div>
              <div className="bubble you">
                Hey human!
              </div>
              <div className="bubble you">
                Umm... Someone took a shit in the hallway.
              </div>
              <div className="bubble me">
                ... what.
              </div>
              <div className="bubble me">
                Are you serious?
              </div>
              <div className="bubble you">
                I mean...
              </div>
              <div className="bubble you">
                It’s not that bad...
              </div>
              <div className="bubble you">
                But we’re probably gonna need a new carpet.
              </div>
            </div>
            <div className="chat" data-chat="person4">
              <div className="conversation-start">
                <span>Yesterday, 4:20 PM</span>
              </div>
              <div className="bubble me">
                Hey human!
              </div>
              <div className="bubble me">
                Umm... Someone took a shit in the hallway.
              </div>
              <div className="bubble you">
                ... what.
              </div>
              <div className="bubble you">
                Are you serious?
              </div>
              <div className="bubble me">
                I mean...
              </div>
              <div className="bubble me">
                It’s not that bad...
              </div>
            </div>
            <div className="chat" data-chat="person5">
              <div className="conversation-start">
                <span>Today, 6:28 AM</span>
              </div>
              <div className="bubble you">
                Wasup
              </div>
              <div className="bubble you">
                Wasup
              </div>
              <div className="bubble you">
                Wasup for the third time like is <br />you blind bitch
              </div>
            </div>
            <div className="chat" data-chat="person6">
              <div className="conversation-start">
                <span>Monday, 1:27 PM</span>
              </div>
              <div className="bubble you">
                So, how's your new phone?
              </div>
              <div className="bubble you">
                You finally have a smartphone :D
              </div>
              <div className="bubble me">
                Drake?
              </div>
              <div className="bubble me">
                Why aren't you answering?
              </div>
              <div className="bubble you">
                howdoyoudoaspace
              </div>
            </div>
            <div className="write">
              <a href="javascript:;" className="write-link attach" />
              <input type="text" name='message' value={message} onChange={e => setmessage(e.target.value)} class="form-control" id="exampleFormControlInput1" placeholder="Enter message"  />
              <a href="javascript:;" className="write-link smiley" />
              <button type='button' onClick={Submit} className="write-link send" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
