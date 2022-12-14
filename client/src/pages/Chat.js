import io from 'socket.io-client';
import React from "react";
import { useState } from "react";
import  Messages  from './Messages'
import auth from '../utils/auth';
// import { useQuery } from "@apollo/client";
// import { QUERY_MATCH } from '../utils/queries';


const socket = io.connect("http://localhost:3002");

function Chat( { users } ) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  console.log(users);

  const userProfile = auth.getProfile();
  const myUserID = userProfile.data._id; 
  console.log(myUserID);

  


  


  // const { loading, error, data } = useQuery();
  // console.log(data);

  // const userChats = myUserID.filter() 

const joinRoom = () => {
  if (username !=="" & room !=="") {
    socket.emit("join_room", room);
    setShowChat(true);
    console.log(socket.id)
  }
}

  return (
    <div className="App">
      {!showChat ? (
      <div className="joinChatcontainer">
        <h3>Join the chat</h3>
        <input type="text" placeholder="Luiz..." 
        onChange={(event) =>{
          setUsername(event.target.value)
          }} 
          />
        <input type="text" placeholder="Room ID..." 
        onChange={(event) =>{
          setRoom(event.target.value)
          }} 
          />
        <button onClick={joinRoom}>Join a Room</button>

      </div>
      )
      : (

     <Messages socket={socket} username={username} room={room}/>
  )}
    </div>
  );
}
export default Chat;