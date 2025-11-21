const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    dataCadastro: { type: Date, default: Date.now }
});

const UsuarioModel = mongoose.model("Usuarios", schema);

module.exports = UsuarioModel;

