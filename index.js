const express = require('express');
const { connect } = require("./src/utils/db");
const morgan = require('morgan');

const { Server } = require('socket.io');
const Socketserver = Server;

const mongoose = require('mongoose');

const usuariosRouter = require ("./src/api/routes/usuarios.routes");
const mensajesRouter = require("./src/api/routes/mensajes.routes");

const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Socketserver(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

connect();
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/usuarios", usuariosRouter);
app.use('/mensajes', mensajesRouter);

io.on('connection', (socket) => {
  socket.on('joinRoom', (roomId, username) => {
    socket.leaveAll();
    socket.join(roomId);
    io.to(roomId).emit('userJoined', username);
  });

  socket.on('chatMessage', (roomId, message) => {
    io.to(roomId).emit('message', message);
  });
});

server.listen(process.env.PORT || 8000, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.PORT || 8000}`);
});
