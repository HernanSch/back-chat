const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema ({
    email:{type:String,require:true},
    user:{type:String,require:true},
    photo:{type:String,require:true},
    password :{type:String,require:true},    
    connected :{type:Boolean,default: false},    
})

const Usuarios = mongoose.model("usuarios",usuariosSchema);
module.exports = Usuarios;