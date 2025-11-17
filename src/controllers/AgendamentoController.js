const express = require('express')
const router = express.Router()

// Importando listas
const { livros } = require('./LivroController')
const { funcionarios } = require('./FuncionarioController')

// lista de agendamentos
let agendamentos = [
  {
    id: 1,
    cpfFuncionario: 12345678909,
    idLivro: 1,
    dataAgendamento: "2025-10-02",
    dataDevolucao: "2025-10-12",
    status: "ativo"
  }
]

// Criar
router.post('/agendamentos', (req, res) => {
  const { cpfFuncionario, idLivro, dataAgendamento, dataDevolucao } = req.body

  if (!cpfFuncionario || !idLivro || !dataAgendamento || !dataDevolucao) {
    return res.status(400).json({ error: "TODOS OS CAMPOS SÃO OBRIGATÓRIOS!!!" })
  }

  const funcionario = funcionarios.find(f => f.cpf == cpfFuncionario)
  if (!funcionario) {
    return res.status(404).json({ error: "Funcionário não encontrado!" })
  }

  const livro = livros.find(l => l.id == idLivro)
  if (!livro) {
    return res.status(404).json({ error: "Livro não encontrado!" })
  }

  const novoAgendamento = {
    id: Date.now(),
    cpfFuncionario,
    idLivro,
    dataAgendamento,
    dataDevolucao,
    status: "ativo" // automático
  }

  agendamentos.push(novoAgendamento)
  res.status(201).json({ message: "Agendamento criado com sucesso!", novoAgendamento })
})

// Listar todos
router.get('/agendamentos', (req, res) => {
  res.json(agendamentos)
})

// Buscar por id
router.get('/agendamentos/:id', (req, res) => {
  const id = req.params.id
  const agendamento = agendamentos.find(a => a.id == id)
  if (!agendamento) {
    return res.status(404).json({ error: "Agendamento não encontrado!" })
  }
  res.json(agendamento)
})

// Atualizar
router.put('/agendamentos/:id', (req, res) => {
  const id = req.params.id
  const { cpfFuncionario, idLivro, dataAgendamento, dataDevolucao, status } = req.body

  const agendamento = agendamentos.find(a => a.id == id)
  if (!agendamento) {
    return res.status(404).json({ error: "Agendamento não encontrado!" })
  }

  const funcionario = funcionarios.find(f => f.cpf == cpfFuncionario)
  if (!funcionario) {
    return res.status(404).json({ error: "Funcionário não encontrado!" })
  }

  const livro = livros.find(l => l.id == idLivro)
  if (!livro) {
    return res.status(404).json({ error: "Livro não encontrado!" })
  }

  agendamento.cpfFuncionario = cpfFuncionario
  agendamento.idLivro = idLivro
  agendamento.dataAgendamento = dataAgendamento
  agendamento.dataDevolucao = dataDevolucao
  agendamento.status = status || agendamento.status

  res.json({ message: "Agendamento atualizado com sucesso!", agendamento })
})

// Deletar
router.delete('/agendamentos/:id', (req, res) => {
  const id = parseInt(req.params.id); // Converte a string da URL para número
  const agendamento = agendamentos.find(a => a.id === id)
  if (!agendamento) {
    return res.status(404).json({ error: "Agendamento não encontrado!" })
  }
  agendamentos = agendamentos.filter(a => a.id != id)
  res.json({ message: "Agendamento excluído com sucesso!" })
})

module.exports = router
