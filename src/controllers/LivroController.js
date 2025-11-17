const express = require('express')
const router = express.Router()

// Lista de livros para simular o banco de dados
let livros = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    categoria: "Romance",
    anoPublicacao: 1899
  },
  {
    id: 2,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    categoria: "Infantil",
    anoPublicacao: 1943
  }
]

// Criar
router.post('/livros', (req, res) => {
  const { titulo, autor, categoria, anoPublicacao } = req.body
  if (!titulo || !autor || !categoria || !anoPublicacao) {
    return res.status(400).json({ error: "titulo, autor, categoria e anoPublicacao são obrigatórios!" })
  }
  const novoLivro = {
    id: Date.now(),
    titulo,
    autor,
    categoria,
    anoPublicacao
  }
  livros.push(novoLivro)
  res.status(201).json({ message: "Livro cadastrado!", novoLivro })
})

// Listar Todos
router.get('/livros', (req, res) => {
  res.json(livros)
})

// Buscar um
router.get('/livros/:id', (req, res) => {
  const idRecebido = req.params.id
  const livro = livros.find(l => l.id == idRecebido)
  if (!livro) {
    return res.status(404).json({ error: "Livro não encontrado!" })
  }
  res.json(livro)
})

// Atualizar
router.put('/livros/:id', (req, res) => {
  const idRecebido = req.params.id
  const { titulo, autor, categoria, anoPublicacao } = req.body
  if (!titulo || !autor || !categoria || !anoPublicacao) {
    return res.status(400).json({ error: "titulo, autor, categoria e anoPublicacao são obrigatórios!" })
  }
  const livro = livros.find(l => l.id == idRecebido)
  if (!livro) {
    return res.status(404).json({ error: "Livro não encontrado!" })
  }
  livro.titulo = titulo
  livro.autor = autor
  livro.categoria = categoria
  livro.anoPublicacao = anoPublicacao
  res.json({ message: "Livro atualizado com sucesso!" })
})

// Deletar
router.delete('/livros/:id', (req, res) => {
  const idRecebido = req.params.id
  const livro = livros.find(l => l.id == Number(idRecebido))
  if (!livro) {
    return res.status(404).json({ error: "Livro não encontrado!" })
  }
  livros = livros.filter(l => l.id != Number(idRecebido))
  res.json({ message: "Livro excluído com sucesso!" })
})

module.exports = { router, livros }
