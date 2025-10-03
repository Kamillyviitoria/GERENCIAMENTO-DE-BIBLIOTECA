const express = require('express')
const router = express.Router()

// Lista de usuários para simular o banco de dados
let usuarios = [
  {
    id: 1001,
    nome: "Carlos Eduardo Santos",
    email: "carlos.santos@exemplo.com",
    telefone: "61987654321",
    dataCadastro: "2025-01-15"
  },
  {
    id: 1002,
    nome: "Bianca Almeida",
    email: "bianca.almeida@exemplo.com",
    telefone: "61998765432",
    dataCadastro: "2025-03-20"
  }
]

// 1. POST /usuarios (CREATE)
router.post('/usuarios', (req, res) => {
  const { nome, email, telefone } = req.body
  
  // Validação 1: Campos obrigatórios (400 Bad Request)
  if (!nome || !email || !telefone) {
    return res.status(400).json({ error: "Nome, Email e Telefone são obrigatórios!" })
  }

  // Validação 2: Email duplicado (409 Conflict)
  const usuarioExistente = usuarios.find(u => u.email === email)
  if (usuarioExistente) {
    return res.status(409).json({ error: "Email já cadastrado! O usuário já existe." })
  }

  const novoUsuario = {
    id: Date.now(),
    nome,
    email,
    telefone,
    dataCadastro: new Date().toISOString().split('T')[0] // Data automática no formato YYYY-MM-DD
  }
  
  usuarios.push(novoUsuario)
  // 201 Created
  res.status(201).json({ message: "Usuário cadastrado com sucesso!", novoUsuario })
})

// 2. GET /usuarios (READ ALL)
router.get('/usuarios', (req, res) => {
  // 200 OK
  res.json(usuarios)
})

// 3. GET /usuarios/:id (READ ONE)
router.get('/usuarios/:id', (req, res) => {
  const idRecebido = parseInt(req.params.id) // Converte o ID para número
  const usuario = usuarios.find(u => u.id === idRecebido)

  // 404 Not Found
  if (!usuario) {
    return res.status(404).json({ error: "Usuário não encontrado!" })
  }
  res.json(usuario)
})

// 4. PUT /usuarios/:id (UPDATE)
router.put('/usuarios/:id', (req, res) => {
  const idRecebido = parseInt(req.params.id) // Converte o ID para número
  const { nome, email, telefone } = req.body
  
  // Validação: Campos obrigatórios para atualização (400 Bad Request)
  if (!nome || !email || !telefone) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios para a atualização!" })
  }

  const index = usuarios.findIndex(u => u.id === idRecebido)
  
  // 404 Not Found
  if (index === -1) {
    return res.status(404).json({ error: "Usuário não encontrado para atualização!" })
  }

  // Atualiza o objeto. Mantém o ID original e a data de cadastro.
  usuarios[index] = {
    ...usuarios[index], // Mantém a data de cadastro e ID original
    nome,
    email,
    telefone
  }
  
  res.json({ message: "Usuário atualizado com sucesso!", usuario: usuarios[index] })
})

// 5. DELETE /usuarios/:id (DELETE)
router.delete('/usuarios/:id', (req, res) => {
  const idRecebido = parseInt(req.params.id) // Converte o ID para número
  const initialLength = usuarios.length
  
  // Filtra o array removendo o item
  usuarios = usuarios.filter(u => u.id !== idRecebido)

  // 404 Not Found
  if (usuarios.length === initialLength) {
    return res.status(404).json({ error: "Usuário não encontrado para exclusão!" })
  }
  
  res.json({ message: "Usuário excluído com sucesso!" })
})

module.exports = { router, usuarios }