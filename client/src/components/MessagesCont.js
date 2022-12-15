import io from "socket.io-client"
import React from "react";
import "../styles/Card.css";
import { useQuery } from "@apollo/client";
import { GET_CHAT, GET_USER } from '../utils/queries';
import Messages from '../pages/Messages'

export default function MessagesCont({ username, chatId, myIMG, otherIMG }) {
    const socket = io();

    socket.emit("join_room", chatId);
    console.log(socket.id)

    const { loading: chatLoading, data: chatData } = useQuery(GET_CHAT, {
        variables: { chatId: chatId }
    });
    const messages = chatData?.getChat.messages || [];
    // console.log(username)
    // console.log(chatData);
    console.log(messages);
    // console.log(chatId);



    // const { loading1, error1, data1 } = useQuery(QUERY_ME);
    // // const me = data1.me
    // console.log(data1)


    //wrapping our swipable card:

    //if loading, display loading page //otherwise the query is retrieve, pass it down to
    //swip so it can use as initial state
    //TODO: maybe a modal would be good for the loading 


    return (
        <>
            {(chatLoading) ? (<div>Loading...</div>)
                : (<Messages
                    username={username}
                    socket={socket}
                    room={chatId}
                    messages={messages}
                    myIMG={myIMG}
                    otherIMG={otherIMG} />)}
        </>
    )



}