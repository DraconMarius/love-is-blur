
import io from 'socket.io-client';
import { useState } from "react";
const socket = io.connect("http://localhost:3002");

function Chat() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const joinRoom = () => {
        if (username !=="" & room !=="") {
          socket.emit("join_room", room);
        }
      }


    return (
        <div>
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

            <button>Join a Room</button>

        </div>
    )
}

export default Chat;