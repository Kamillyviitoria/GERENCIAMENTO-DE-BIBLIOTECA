const mongoose = require('mongoose');
const Autor = require('../models/autor'); // ajuste o caminho/nome se necessário

// Criar um novo autor
async function criarAutor(req, res) {
    try {
        const { nome, bio, nacionalidade, dataNascimento } = req.body;

        if (!nome) {
            return res.status(400).json({ erro: 'Campo "nome" é obrigatório.' });
        }

        const novoAutor = new Autor({
            nome,
            bio,
            nacionalidade,
            dataNascimento
        });

        const salvo = await novoAutor.save();
        return res.status(201).json(salvo);
    } catch (err) {
        console.error('Erro criarAutor:', err);
        return res.status(500).json({ erro: 'Erro interno ao criar autor.' });
    }
}

// Listar autores (opcional: paginação / filtro por nome)
async function listarAutores(req, res) {
    try {
        const { q, page = 1, limit = 20 } = req.query;
        const filtro = {};

        if (q) {
            // busca case-insensitive por nome
            filtro.nome = { $regex: q, $options: 'i' };
        }

        const skip = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
        const autores = await Autor.find(filtro).skip(skip).limit(parseInt(limit, 10));
        const total = await Autor.countDocuments(filtro);

        return res.json({ total, page: parseInt(page, 10), limit: parseInt(limit, 10), autores });
    } catch (err) {
        console.error('Erro listarAutores:', err);
        return res.status(500).json({ erro: 'Erro interno ao listar autores.' });
    }
}

// Obter um autor por id
async function obterAutorPorId(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ erro: 'ID de autor inválido.' });
        }

        const autor = await Autor.findById(id);
        if (!autor) {
            return res.status(404).json({ erro: 'Autor não encontrado.' });
        }

        return res.json(autor);
    } catch (err) {
        console.error('Erro obterAutorPorId:', err);
        return res.status(500).json({ erro: 'Erro interno ao obter autor.' });
    }
}

// Atualizar autor
async function atualizarAutor(req, res) {
    try {
        const { id } = req.params;
        const dados = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ erro: 'ID de autor inválido.' });
        }

        const autorAtualizado = await Autor.findByIdAndUpdate(id, dados, { new: true, runValidators: true });
        if (!autorAtualizado) {
            return res.status(404).json({ erro: 'Autor não encontrado.' });
        }

        return res.json(autorAtualizado);
    } catch (err) {
        console.error('Erro atualizarAutor:', err);
        return res.status(500).json({ erro: 'Erro interno ao atualizar autor.' });
    }
}

// Excluir autor
async function excluirAutor(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ erro: 'ID de autor inválido.' });
        }

        const excluido = await Autor.findByIdAndDelete(id);
        if (!excluido) {
            return res.status(404).json({ erro: 'Autor não encontrado.' });
        }

        return res.json({ mensagem: 'Autor excluído com sucesso.', autor: excluido });
    } catch (err) {
        console.error('Erro excluirAutor:', err);
        return res.status(500).json({ erro: 'Erro interno ao excluir autor.' });
    }
}

module.exports = {
    criarAutor,
    listarAutores,
    obterAutorPorId,
    atualizarAutor,
    excluirAutor
};