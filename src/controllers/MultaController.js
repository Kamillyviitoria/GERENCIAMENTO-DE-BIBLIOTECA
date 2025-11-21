const express = require("express");

const router = express.Router();

const MultaModel = require("../models/MultaModel");
const { validarMulta } = require("../validators/MultaValidator");
const {validarId} = require('../validators/IDValidator')

router.get("/multas", async (req, res, next) => {
    const multas = await MultaModel.find().populate(['funcionario']);
    res.json(multas);
});

router.get("/multas/:id",validarId, async (req, res, next) => {
    const multaEncontrada = await MultaModel.findById(
        req.params.id
    ).populate(['funcionario']);

    if (!multaEncontrada) {
        return res.status(404).json({ erro: "Filial não encontrada" });
    }
    res.json(multaEncontrada);
});
router.post("/multas", validarMulta, async (req, res, next) => {
    const multaCadastrada = await MultaModel.create(req.body);
    res.status(201).json(multaCadastrada);
});
router.put("/multas/:id",validarId, async (req, res, next) => {
    const id = req.params.id;
    const dados = req.body;
    const multaAtualizada = await MultaModel.findByIdAndUpdate(
        id,
        dados,
        { new: true }
    );
    if (!multaAtualizada) {
        return res.status(404).json({ erro: "Não encontrado" });
    }
    res.json(multaAtualizada);
});
router.delete("/multas/:id",validarId, async (req, res, next) => {
    await MultaModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;
