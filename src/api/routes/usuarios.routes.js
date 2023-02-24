const express = require("express");
const {postRegisterUsuarios, postLoginUsuarios, getUsuarios} = require("../controllers/usuarios.controllers");
const router = express.Router();

router.get("/get",getUsuarios)
router.post("/register",postRegisterUsuarios)
router.post("/login",postLoginUsuarios)

module.exports = router;