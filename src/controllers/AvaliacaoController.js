const express = require("express");
const router = express.Router();

const AvaliacaoModel = require("../models/AvaliacaoModel");
const { validarAvaliacao } = require("../validators/AvaliacaoValidator");
const { validarId } = require('../validators/IdValidator');

router.get("/avaliacoes", async (req, res) => {
    const avaliacoes = await AvaliacaoModel.find()
        .populate("usuario")
        .populate("livro");

    res.json(avaliacoes);
});

router.get("/avaliacoes/:id", validarId, async (req, res) => {
    const avaliacao = await AvaliacaoModel.findById(req.params.id)
        .populate("usuario")
        .populate("livro");

    if (!avaliacao) {
        return res.status(404).json({ erro: "Avaliação não encontrada!" });
    }

    res.json(avaliacao);
});

router.post("/avaliacoes", validarAvaliacao, async (req, res) => {
    const avaliacaoCriada = await AvaliacaoModel.create(req.body);
    res.status(201).json(avaliacaoCriada);
});

router.put("/avaliacoes/:id", validarId, validarAvaliacao, async (req, res) => {
    const avaliacaoAtualizada = await AvaliacaoModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!avaliacaoAtualizada) {
        return res.status(404).json({ erro: "Avaliação não encontrada!" });
    }

    res.json(avaliacaoAtualizada);
});

router.delete("/avaliacoes/:id", validarId, async (req, res) => {
    const avaliacaoDeletada = await AvaliacaoModel.findByIdAndDelete(req.params.id);

    if (!avaliacaoDeletada) {
        return res.status(404).json({ erro: "Avaliação não encontrada!" });
    }

    res.status(204).send();
});

module.exports = router;
