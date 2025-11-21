const express = require("express");

const router = express.Router();

const FilialModel = require("../models/FilialModel");
const { validarFilial } = require("../validators/FilialValidator");
const {validarId} = require('../validators/IDValidator')

router.get("/filiais", async (req, res, next) => {
    const filiais = await FilialModel.find().populate('gerente');
    res.json(filiais);
});

router.get("/filiais/:id",validarId, async (req, res, next) => {
    const filialEncontrada = await FilialModel.findById(
        req.params.id
    ).populate();

    if (!filialEncontrada) {
        return res.status(404).json({ erro: "Filial não encontrada" });
    }
    res.json(filialEncontrada);
});
router.post("/filiais", validarFilial, async (req, res, next) => {
    const filialCadastrada = await FilialModel.create(req.body);
    res.status(201).json(filialCadastrada);
});
router.put("/filiais/:id",validarId, async (req, res, next) => {
    const id = req.params.id;
    const dados = req.body;
    const filialAtualizada = await FilialModel.findByIdAndUpdate(
        id,
        dados,
        { new: true }
    );
    if (!filialAtualizada) {
        return res.status(404).json({ erro: "Não encontrado" });
    }
    res.json(filialAtualizada);
});
router.delete("/filiais/:id",validarId, async (req, res, next) => {
    await FilialModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;
