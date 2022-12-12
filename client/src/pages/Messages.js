import React, { useEffect, useState } from 'react';
import { useMutation } from "@apollo/client";
import { CREATE_MESSAGE } from "../utils/mutations";


export default function Messages({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    // display the chat to the user
    const [messageList, setMessageList] = useState([]);

    const [createMessage, { error, data }] = useMutation(CREATE_MESSAGE)

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,// we can call this user name, i just thought that could be confusing
                message: currentMessage,
                time: // to generate the time the user get the message
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            const messagetoDB = {
                chatId: room,
                messageInput: {
                    messageText: currentMessage,
                    messageAuthor: username
                }
            }

            await createMessage({
                variables: { ...messagetoDB }
            })

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage(""); //set the current message to be empty

            console.log("Author: " + messageData.author + " message details: " + messageData.message);

        }


    };

    useEffect(() => {
        socket.on("receive_message", (data) => {// receive the DATA from the back end index.js server
            // console.log(data);
            // setMessageList((list) => [...list,data])
            setMessageList((messageList) => [...messageList, data])
            console.log(data)
        })
        return () => {
            socket.off("receive_message");
        }
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                {messageList.map((messageContent, index) => {
                    return <div key={index} className="message" id={username === messageContent.author ? "you" : "other"}>
                        <div>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>

                            <div className="message-meta">
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </div>

                        </div>
                    </div>
                })}
            </div>
            <div className="chat-footer">
                <input type="text" placeholder='Hey...'
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyDown={(event) => {// added Enter key to be listen
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}
