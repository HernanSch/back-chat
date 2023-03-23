const express = require("express");
const {postRegisterUsuarios, postLoginUsuarios, getUsuarios, postLogout, usersConnected, updateUserConnectedStatus} = require("../controllers/usuarios.controllers");
const router = express.Router();

// Agrega el middleware aquí
router.use(function(req, res, next) {
  console.log('Este middleware se ejecutará en todas las rutas de usuarios.routes.js');
  next();
});

router.get("/get",getUsuarios)
router.get("/conectados",usersConnected)
router.post("/register",postRegisterUsuarios)
router.post("/login",postLoginUsuarios)
router.post("/logout",postLogout)
router.put("/updateusers/:id",updateUserConnectedStatus)

module.exports = router;
