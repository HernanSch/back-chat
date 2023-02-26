const express = require('express');
const dotenv = require ("dotenv");
const {connect} = require ("./src/utils/db");
const usuariosRouter = require ("./src/api/routes/usuarios.routes");
const mensajesRouter = require("./src/api/routes/mensajes.routes")

const cors = require('cors')


const PORT = process.env.PORT || 8000;
dotenv.config();

const app = express();
connect ();

app.use (cors ({
    origin: "*",
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/usuarios", usuariosRouter);
app.use('/mensajes', mensajesRouter);


app.listen(PORT, () => console.log(`listening on port: http://localhost:${PORT}`));