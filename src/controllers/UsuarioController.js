const express = require("express");
const router = express.Router();

const UsuarioModel = require("../models/UsuarioModel");
const { validarUsuario } = require("../validators/UsuarioValidator");
const { validarId } = require('../validators/IDValidator');

router.get("/usuarios", async (req, res) => {
    const usuarios = await UsuarioModel.find();
    res.json(usuarios);
});

router.get("/usuarios/:id", validarId, async (req, res) => {
    const usuarioEncontrado = await UsuarioModel.findById(req.params.id);

    if (!usuarioEncontrado) {
        return res.status(404).json({ erro: "Não encontrado!!!" });
    }

    res.json(usuarioEncontrado);
});

router.post("/usuarios", validarUsuario, async (req, res) => {
    const usuarioCadastrado = await UsuarioModel.create(req.body);
    res.status(201).json(usuarioCadastrado);
});

router.put("/usuarios/:id", validarId, validarUsuario, async (req, res) => {
    const id = req.params.id;
    const dados = req.body;

    const usuarioAtualizado = await UsuarioModel.findByIdAndUpdate(
        id,
        dados,
        { new: true }
    );

    if (!usuarioAtualizado) {
        return res.status(404).json({ erro: "Não encontrado" });
    }

    res.json(usuarioAtualizado);
});

router.delete("/usuarios/:id", validarId, async (req, res) => {
    const usuarioDeletado = await UsuarioModel.findByIdAndDelete(req.params.id);

    if (!usuarioDeletado) {
        return res.status(404).json({ erro: "Não encontrado" });
    }

    res.status(204).send();
});

module.exports = router;
