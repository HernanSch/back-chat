const express = require("express");
const {postRegisterUsuarios, postLoginUsuarios, getUsuarios, logout} = require("../controllers/usuarios.controllers");
const router = express.Router();
const {isAuth} = require('../../middleware/auth');

router.get("/get",getUsuarios)
router.post("/register",postRegisterUsuarios)
router.post("/login",postLoginUsuarios)
router.post('/logout',[isAuth], logout)

module.exports = router;