const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    nome: { type: String, required: true },
    cnpj: { type: Number, required: true },
    endereco: {
        quadra: Number,
        lote: Number,
        bairro: String,
        cidade: String,
        estado: String,
        cep: Number,
    },
    telefone: { type: Number, required: true },
    email: { type: String, required: false },
    gerente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Funcionarios",
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
});

const FilialModel = mongoose.model("Filial", schema);

module.exports = FilialModel;
