const mongoose = require("mongoose");
const dotenv = require ("dotenv");
dotenv.config(); 

const DB_URL = process.env.DB_URL

const connect = async () => {
    try {
        //Conectar a la BBDD
        const DB = await mongoose.connect(DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const {name, host} = DB.connection;

        console.log(`Connected to ${name} DB in host:${host}`);
    } catch (error) {
        console.log(`He tenido un error al contectar con mi BBDD ${error}`)
    }
}


module.exports = {connect}