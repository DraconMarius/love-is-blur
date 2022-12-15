import React, { useEffect, useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_MESSAGE } from '../utils/mutations';
import {
    Divider,
    Grid,
    List,
    Avatar,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Fab,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Messages({ username, socket, room, messages, myIMG, otherIMG }) {
    const myself = useRef(username);
    console.log(myself.current);
    console.log(room);
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageLength, setLength] = useState(messages.Length);
    // const currentRef = useRef("")
    const messageRef = useRef([...messages]);

    // display the chat to the user
    const [messageList, setMessageList] = useState([...messages]);
    console.log(messages);
    console.log(messageList);

    const [createMessage, { error, data }] = useMutation(CREATE_MESSAGE);

    const handleChange = (event) => {
        const { value } = event.target;
        console.log(currentMessage);
        setCurrentMessage(value);
    };

    const sendMessage = async () => {
        if (messageList !== '') {
            const messageData = {
                chatId: room,
                messages: {
                    messageAuthor: username, // we can call this user name, i just thought that could be confusing
                    messageText: currentMessage,
                    // to generate the time the user get the message
                    createdAt:
                        new Date(Date.now()).getHours() +
                        ':' +
                        new Date(Date.now()).getMinutes(),
                },
            };
            const messagetoDB = {
                chatId: room,
                messageInput: {
                    messageText: currentMessage,
                    messageAuthor: username,
                },
            };

            await createMessage({
                variables: { ...messagetoDB },
            });
            // console.log(data);
            await socket.emit('send_message', messageData);
            console.log(messageRef.current);
            // setMessageList((list) => [...list, messagetoDB]);
            messageRef.current = [...messageRef.current, messageData.messages];
            // console.log(messageRef.current)
            setCurrentMessage(''); //set the current message to be empty
            console.log(
                'Author: ' +
                messageData.messageAuthor +
                ' message details: ' +
                messageData.messageText
            );
        }
    };

    useEffect(() => {
        socket.on('receive_message', (data) => {
            // receive the DATA from the back end index.js server
            // console.log(data);
            // setMessageList((list) => [...list,data])
            setMessageList((messageList) => [...messageList, data.messages]);
            messageRef.current = [...messageRef.current, data.messages];
            console.log(data);
            // console.log(messageRef.current)
        });
        return () => {
            socket.off('receive_message');
        };
    }, [socket, messageList]);

    useEffect(() => {
        console.log(messageRef.current);
        setMessageList([...messageRef.current]);
    }, [messageRef.current]);


    const leftRight = (author) => {
        // console.log(author)
        // console.log(myself.current)

        if (!author) {
            return;
        } else if (author === myself.current) {
            return 'right';
        }

        return 'left';
    };
    //blur logic
    const Style = {
        blur: {   //if messages are less than or == 10,  blur incremently, otherwise no blur
            filter: `blur(${messages.length <= 10 ? 20 - (messages.length * 2) : 0}px)`
        }
    }




    return (
        <>
            <Grid item={true} xs={12} style={{ padding: "10px", display: 'flex', justifyContent: 'center' }}>

                <Avatar
                    alt="otherUser"
                    src={otherIMG}
                    sx={{ width: 100, height: 100, margin: 'auto' }}
                    style={Style.blur}
                />

            </Grid>
            <List>
                {messageList.map((messageContent, index) => (
                    <ListItem key={index}>
                        <Grid container>
                            <Grid item={true} xs={12}>
                                <ListItemText
                                    align={leftRight(messageContent.messageAuthor)}
                                    primary={messageContent.messageText}
                                ></ListItemText>
                            </Grid>
                            <Grid item={true} xs={12}>
                                <ListItemText
                                    align={leftRight(messageContent.messageAuthor)}
                                    primary={messageContent.messageAuthor}
                                    secondary={messageContent.createdAt}
                                ></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Grid container style={{ padding: '20px' }}>
                <Grid item={true} xs={11}>
                    <TextField
                        id="outlined-basic-email"
                        label="Type Something"
                        fullWidth
                        onChange={(event) => {
                            handleChange(event);
                        }}
                        onKeyDown={(event) => {
                            // added Enter key to be listen
                            event.key === 'Enter' && sendMessage();
                        }}
                        value={currentMessage}
                    />
                </Grid>
                <Grid item={true} xs={1} align="right">
                    <Fab color="primary" aria-label="add">
                        <SendIcon onClick={sendMessage} />
                    </Fab>
                </Grid>
            </Grid>

            {/* <div className="chat-window">
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
                </div> */}
        </>
    );
}
