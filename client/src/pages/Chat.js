import io from 'socket.io-client';
import { useState } from "react";
import  Messages  from './Messages'

const socket = io.connect("http://localhost:3002");

function Chat() {
    const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false); // only show the chat if the show chat is equal to true

const joinRoom = () => {
  if (username !=="" & room !=="") {
    socket.emit("join_room", room);
    setShowChat(true);
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