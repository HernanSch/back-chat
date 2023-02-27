const express = require('express');
const { connect } = require ("./src/utils/db");
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
const socketIo = require('socket.io');

const dotenv = require ("dotenv");
const PORT = process.env.PORT;

connect();
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/usuarios", usuariosRouter);
app.use('/mensajes', mensajesRouter);

// Configuración de socket.io
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.engine.on("upgrade", (req, socket, head) => {
  io.emit('upgrade', { req, socket, head });
  io.handleUpgrade(req, socket, head, socket => {
    io.emit('connection', socket);
    io.emit('connect');
    io.sockets[socket.id] = socket;
    socket.emit('connect');
    socket.emit('message', {message: 'Hola, mundo!'});
  });
});

// Configuración de eventos
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');

  // Escuchar eventos del cliente
  socket.on('message', (data) => {
    console.log(`Mensaje recibido: ${data}`);
    io.emit('message', data);
  });

  // Escuchar eventos de desconexión
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
