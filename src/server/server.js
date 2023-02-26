const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Configuración de la aplicación Express
const app = express();
const server = http.createServer(app);

// Configuración de socket.io
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST']
  }
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
server.listen(8000, () => {
  console.log('Servidor iniciado en el puerto 8000');
});