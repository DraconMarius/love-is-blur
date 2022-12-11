
import io from 'socket.io-client';
import { useState } from "react";
// const socket = io.connect("http://localhost:3001");

function Chat() {
    return (
        <div>
            <h3>Join the chat</h3>

            <input type="text" placeholder="Luiz..."/>

            <input type="text" placeholder="Room ID..."  />

            <button>Join a Room</button>

        </div>
    )
}

export default Chat;