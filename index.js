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
const { isAuth } = require("./src/middleware/auth");

const io = new Socketserver(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

connect();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Method', 'POST, GET, DELETE, PUT, PATCH'); //Definimos los metodos que permitimos en nuestra API
  res.header("Access-Control-Allow-Credentials", "true") //Decimos que permitimos la conexion con credenciales
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
})

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
    isAuth(socket.request, {}, () => {
      socket.leaveAll();
      socket.join(roomId);
      io.to(roomId).emit('userJoined', username);
    });
  });

  socket.on('chatMessage', (roomId, message) => {
    isAuth(socket.request, {}, () => {
      io.to(roomId).emit('message', message);
    });
  });

  socket.on('createRoom', (roomName) => {
    isAuth(socket.request, {}, () => {
      const newRoom = mongoose.model('Room', { name: String });
      newRoom.create({ name: roomName }).then((room) => {
        io.emit('roomCreated', room); // Enviar evento al cliente para informar de la creación de la sala
      }).catch((err) => {
        console.error(err);
      });
    });
  });
});

server.listen(process.env.PORT || 8000, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.PORT || 8000}`);
});
