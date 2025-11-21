const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    nota: { type: Number, required: true },
    comentario: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true },
    livro: { type: mongoose.Schema.Types.ObjectId, ref: "Livros", required: true },
    dataAvaliacao: { type: Date, default: Date.now }
});

const AvaliacaoModel = mongoose.model("Avaliacoes", schema);

module.exports = AvaliacaoModel;
