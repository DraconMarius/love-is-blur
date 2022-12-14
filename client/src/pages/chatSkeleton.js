import React from "react";
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
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import Divider from "@material-ui/core/Divider";
// import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/List";
// import Avatar from "@material-ui/core/Avatar";
// import Fab from "@material-ui/core/Fab";
// import SendIcon from "@material-ui/icons/Send";
import "../styles/chat.css";
const ChatSkele = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {/* <Grid container>
        <Grid item={true} xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid> */}
      <Grid container component={Paper}>
        <Grid item={true} xs={3}>
          {/* <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="John Wick"></ListItemText>
            </ListItem>
          </List> */}
          {/* <Divider /> */}
          <Grid item={true} xs={12} style={{ padding: "10px" }}>
            {/* <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            /> */}
          </Grid>
          <Divider />
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>            </ListItem>
            {/* <ListItem button key="Alice">
              <ListItemIcon>
                <Avatar
                  alt="Alice"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Alice">Alice</ListItemText>
            </ListItem>
            <ListItem button key="CindyBaker">
              <ListItemIcon>
                <Avatar
                  alt="Cindy Baker"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
            </ListItem> */}
          </List>
        </Grid>
        <Grid item={true} xs={9}>
          <List>
            <ListItem key="1">
              <Grid container>
                <Grid item={true} xs={12}>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
                <Grid item={true} xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            {/* <ListItem key="2">
              <Grid container>
                <Grid item={true} xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item={true} xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem> */}
            {/* <ListItem key="3">
              <Grid container>
                <Grid item={true} xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item={true} xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem> */}
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item={true} xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid item={true} xs={1} align="right">
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChatSkele;
