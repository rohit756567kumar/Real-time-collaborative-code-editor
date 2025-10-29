const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./src/Action");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

const userSocketMap = {};
function getAllConnectedClients(roomId) {
  //map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
  userSocketMap[socket.id] = username;
  socket.join(roomId);

  const clients = getAllConnectedClients(roomId);

  // Notify all clients in the room (including the one who just joined)
  io.in(roomId).emit(ACTIONS.JOINED, {
    clients,
    username,
    socketId: socket.id,
  });
});

  socket.on(ACTIONS.CODE_CHANGE, ({roomId, code}) => {
     console.log("🖋️ CODE_CHANGE from", socket.id, "in room", roomId);
    io.in(roomId).emit(ACTIONS.CODE_CHANGE, {code});
  })

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
      io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
