const Message = require('../models/mensajes.models');

const messagesController = {
  getAll(req, res) {
    const messages = Message.getAll();
    res.json(messages);
  },

  create(req, res) {
    const messageText = req.body.message;
    const newMessage = Message.create(messageText);
    res.status(201).json(newMessage);
  },
};

module.exports = messagesController;