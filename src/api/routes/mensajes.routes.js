const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/mensajes.controllers');

router.get('/', messagesController.getAll);
router.post('/', messagesController.create);

module.exports = router;