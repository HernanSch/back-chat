const Usuario = require("../models/usuarios.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const getUsuarios = async (req, res) => {
  try {
    const usuario = await Usuario.find();
    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving users" });
  }
};

const postRegisterUsuarios = async (req, res) => {
  const { email, user, photo, password, connected } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const usuario = new Usuario({ email, user, photo, password: hash, connected });
    await usuario.save();
    res.status(200).send("Usuario registrado correctamente.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

const postLoginUsuarios = async (req, res) => {
  const { email, user, photo, password, connected } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).send("Usuario no encontrado.");
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(401).send("Contraseña incorrecta.");
    }

    const token = jwt.sign({ email }, "secretkey", { expiresIn: "1h" });
    res.status(200).send({token, user: usuario})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in user" });
  }
};

const postLogout = (req, res, next) => {
  try {
      return res.status(200).json({token: null})
  } catch (error) {
      return res.status(500).json(error) ;
  }
};

const usersConnected = async (req, res) => {
  try {
    const connectedUsers = await Usuario.find({ connected: true }); // Busca los usuarios conectados
    res.status(200).json({ connectedUsers }); // Devuelve un objeto JSON con la lista de usuarios conectados
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la lista de usuarios conectados' });
  }
};

const updateUserConnectedStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { connected } = req.body;
    await Usuario.findByIdAndUpdate(id, { connected });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar la información del usuario');
  }
};

module.exports = { getUsuarios, postRegisterUsuarios, postLoginUsuarios, postLogout, usersConnected, updateUserConnectedStatus };
