import io from 'socket.io-client';
import React from "react";
import { useState } from "react";
import Messages from './Messages'
import auth from '../utils/auth';
//material ui component
import {
  Divider,
  Grid,
  ListItemIcon,
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
// import { useQuery } from "@apollo/client";
import { QUERY_MATCH } from '../utils/queries';
import "../styles/chat.css";


const socket = io();


function Chat({ users, matches }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  console.log(users);

  const userProfile = auth.getProfile();
  const myUserID = userProfile.data._id;
  console.log(myUserID);

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

  // The mappedArray will now contain objects with data from both arrays
  console.log(myMatchesName);

  // const { loading, error, data } = useQuery(QUERY_MATCH, {
  //   variables: {matchId: me[0].matches}
  // });
  // const userChats = myUserID.filter() 

  // setUsername(userProfile.data.firstname)


  const joinRoom = () => {
    if (username !== "" & room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
      console.log(socket.id)
    }
  }

  return (
    <>
      {/* <div style={{ height: "100vh", width: "100vw" }}>
        <Grid container component={Paper}>
          <Grid item={true} xs={3}>
            <Grid item={true} xs={12} style={{ padding: "10px" }}>
            </Grid>
            <Divider />
            <List>
              render by mapping through matches
              {myMatchesName.map((match) => (
                <ListItem button key="1">
                  <ListItemIcon>
                    <Avatar
                      alt={match.matchedName}
                      src={match.matchedImg}
                    />
                  </ListItemIcon>
                  <ListItemText primary={match.matchedName}>{match.matchedName}</ListItemText>
                </ListItem>
              ))}
              hard coded with values that we have, for sample
              <ListItem button key={myMatchesName[0].matchedName}>
                <ListItemIcon>
                  <Avatar
                    alt={myMatchesName[0].matchedName}
                    src={myMatchesName[0].matchedImg}
                  />
                </ListItemIcon>
                <ListItemText primary={myMatchesName[0].matchedName}>{myMatchesName[0].matchedName}</ListItemText>
              </ListItem>
            </List>
          </Grid>

        </Grid>
      </div> */}

      <div className="App">
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
      </div>
    </>
  );
}
export default Chat;