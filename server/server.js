const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const http = require("http"); // required to build the server with socket.io
const cors = require("cors"); // socket.io deal with some of the socket.io issue
const { Server} = require("socket.io")// It will handle the messages to send and receive + the socket id 

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

/*################# Created by Luiz ######################*/
app.use(cors());

const serverSocket = http.createServer(app);

const io = new Server(serverSocket, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {//listen for an event
  console.log(`User connected: ${socket.id}`);
  //socket.on listen to the events
  socket.on("join_room", (data) => {// to join a room
      socket.join(data);
      console.log (`User with ID: ${socket.id} join room: ${data}`);
  })

  socket.on("send_message", (data) =>{// get the user message in the room
      //data.room will separete the messages per room
      socket.to(data.room).emit("receive_message",data)
      console.log(data);

  })

  socket.on ("disconnect", () => { // disconnect a user 
      console.log("User disconnected", socket.id)
  })
});

serverSocket.listen(3002, () => {
  console.log("Server running")
} );

/*############# Created by Luiz ###################*/

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
