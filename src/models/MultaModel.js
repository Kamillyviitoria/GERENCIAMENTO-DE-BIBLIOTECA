const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    valor: { type: Number, required: true },
    motivo: { type: String, required: true },
    descricao: { type: String, required: true },
    dataOcorrencia: { type: Date, required: true },
    dataPagamento: { type: Date, required: true },
    status: { type: String, required: true },
    funcionario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Funcionarios",
        required: true,
    },
});

const MultaModel = mongoose.model("Multa", schema)

module.exports = MultaModel
