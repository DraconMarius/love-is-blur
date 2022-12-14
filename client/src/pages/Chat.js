import io from 'socket.io-client';
import React from "react";
import { useState, useRef, useEffect } from "react";
import MessagesCont from '../components/MessagesCont'
import Auth from '../utils/auth';
//material ui component
import {
  Divider,
  Grid,
  ListItemIcon,
  ListItemButton,
  List,
  Avatar,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  Fab,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "../styles/chat.css";
import { faCommentDollar } from '@fortawesome/free-solid-svg-icons';


const socket = io();


function Chat({ users, matches }) {
  // const [currentChat, setCurrentChat] = useState("");
  const currentChatRef = useRef("")
  // const [messageData, setMessageData] = useState({ messages: [] });
  const [showChat, setShowChat] = useState(false);

  console.log(users);

  const userProfile = Auth.getProfile();
  const myUserID = userProfile.data._id;
  const myName = userProfile.data.firstname;
  console.log(myUserID);
  console.log(myName);

  // getting my info from all Users
  // const me = users.filter(user => user._id == userProfile.data._id);
  // console.log(matches);

  const myMatchesName = matches.map(match => {
    // For each item in the first array, find the corresponding item in the second array
    // using the find() method
    const notMeAry = users.filter(user => user._id !== myUserID)
    console.log(notMeAry)
    const usersAry = notMeAry.find(user => (user._id === match.user1) || (user._id === match.user2))

    // Return an object that combines the data from both arrays
    return {
      _id: match._id,
      matchedName: usersAry.firstname,
      matchedImg: usersAry.image,
      chatId: match.chatId
    };
  });

  console.log(myMatchesName);


  // setUsername(userProfile.data.firstname)


  // const joinRoom = () => {
  //   if (username !== "" & room !== "") {
  //     socket.emit("join_room", room);
  //     setShowChat(true);
  //     console.log(socket.id)
  //   }
  // }


  const handlechat = async (chatId) => {
    console.log(chatId);
    currentChatRef.current = (chatId);
    // setCurrentChat(currentChatRef.current)
    setShowChat(true);
    console.log(currentChatRef.current);
    socket.emit("join_room", chatId);
  }

  return (
    <>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Grid container component={Paper}>
          <Grid item={true} xs={3}>
            <Grid item={true} xs={12} style={{ padding: "10px" }}>
            </Grid>
            <Divider />
            <List>
              {/* render by mapping through matches */}
              {myMatchesName.map((match) => (
                <ListItemButton
                  key={match._id}
                  onClick={() => handlechat(match.chatId)}
                >
                  <ListItemIcon>
                    <Avatar
                      alt={match.matchedName}
                      src={match.matchedImg}
                    />
                  </ListItemIcon>
                  <ListItemText primary={match.matchedName}>{match.matchedName}</ListItemText>
                </ListItemButton>
              ))}
              {/* hard coded with values that we have, for sample */}
              {/* <ListItem button key={myMatchesName[0].matchedName}>
                <ListItemIcon>
                  <Avatar
                    alt={myMatchesName[0].matchedName}
                    src={myMatchesName[0].matchedImg}
                  />
                </ListItemIcon>
                <ListItemText primary={myMatchesName[0].matchedName}>{myMatchesName[0].matchedName}</ListItemText>
              </ListItem> */}
            </List>
          </Grid>
          {(!showChat) ?
            (<div> Chat with your Matches</div>) :
            (<MessagesCont username={myName} socket={socket} chatId={currentChatRef.current} />)
          }
        </Grid>
      </div>




      {/* <Messages socket={socket} username={username} room={room} /> */}
      {/* <div className="App">
        {!showChat ? (
          <div className="joinChatcontainer">
            <h3>Join the chat</h3>
            <input type="text" placeholder="Luiz..."
              onChange={(event) => {
                setUsername(event.target.value)
              }}
            />
            <input type="text" placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value)
              }}
            />
            <button onClick={joinRoom}>Join a Room</button>

          </div>
        )
          : (

            <Messages socket={socket} username={username} room={room} />
          )}
      </div> */}
    </>
  );
}
export default Chat;