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
  const { email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const usuario = new Usuario({ email, password: hash });
    await usuario.save();
    res.status(200).send("Usuario registrado correctamente.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

const postLoginUsuarios = async (req, res) => {
  const { email, password } = req.body;

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
    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in user" });
  }
};

module.exports = { getUsuarios, postRegisterUsuarios, postLoginUsuarios };
