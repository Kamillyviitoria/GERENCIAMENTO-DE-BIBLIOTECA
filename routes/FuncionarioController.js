const express = require('express')
const router = express.Router()

// lista de funcionários para simular o banco de dados
let funcionarios = [
  {
    cpf: 12345678909,
    nome_completo: "Luis Batista de Souza",
    data_nasc: "05/10/1997",
    telefone: "61992240704",
    email: "batista_souza@gmail.com",
    cargo: "bibliotecario",
    data_admissao: "10/07/2023",
    status: "ativo",
  },
  {
    cpf: 11234567890,
    nome_completo: "Maria Fernanda de Oliveira",
    data_nasc: "21/05/2001",
    telefone: "61996688808",
    email: "fehOliveira@gmail.com",
    cargo: "diretor(a) de biblioteca",
    data_admissao: "10/07/2022",
    status: "ativo",
  }
]

// Criar
router.post('/funcionarios', (req, res) => {
  const { nome_completo, cpf, email, data_nasc, telefone, cargo, data_admissao, status } = req.body
  if (!nome_completo || !cpf || !email || !data_nasc || !telefone || !cargo || !data_admissao || !status) {
    return res.status(400).json({ error: "TODOS OS CAMPOS SÃO OBRIGATÓRIOS!!!" })
  }
  const funcionario = funcionarios.find(f => f.cpf == cpf)
  if (funcionario) {
    return res.status(409).json({ error: "CPF JÁ CADASTRADO!!!" })
  }

  const novoFuncionario = {
    cpf,
    nome_completo,
    data_nasc,
    telefone,
    email,
    cargo,
    data_admissao,
    status
  }
  funcionarios.push(novoFuncionario)
  res.status(201).json({ message: "Funcionário(a) cadastrado(a)!!!", novoFuncionario })
})

// Listar todos
router.get('/funcionarios', (req, res) => {
  res.json(funcionarios)
})

// Buscar por cpf
router.get('/funcionarios/:cpf', (req, res) => {
  const cpfFuncionario = req.params.cpf
  const funcionario = funcionarios.find(f => f.cpf == cpfFuncionario)
  if (!funcionario) {
    return res.status(404).json({ error: "FUNCIONÁRIO NÃO ENCONTRADO!!!" })
  }
  res.json(funcionario)
})

// Atualizar
router.put('/funcionarios/:cpf', (req, res) => {
  const cpfFuncionario = req.params.cpf
  const { cpf, nome_completo, data_nasc, telefone, email, cargo, data_admissao, status } = req.body
  if (!nome_completo || !cpf || !email || !data_nasc || !telefone || !cargo || !data_admissao || !status) {
    return res.status(400).json({ error: "EXISTEM INFORMAÇÕES FALTANDO!!!" })
  }
  const funcionario = funcionarios.find(f => f.cpf == cpfFuncionario)
  if (!funcionario) {
    return res.status(404).json({ error: "FUNCIONÁRIO NÃO ENCONTRADO!!!"})
  }

  funcionario.cpf = cpf
  funcionario.nome_completo = nome_completo
  funcionario.data_nasc = data_nasc
  funcionario.data_admissao = data_admissao
  funcionario.telefone = telefone
  funcionario.email = email
  funcionario.cargo = cargo
  funcionario.status = status

  res.json({ message: "FUNCIONÁRIO ATUALIZADO COM SUCESSO!!!" })
})

// Deletar
router.delete('/funcionarios/:cpf', (req, res) => {
  const cpfFuncionario = req.params.cpf
  const funcionario = funcionarios.find(f => f.cpf == cpfFuncionario)
  if(!funcionario) {
    return res.status(404).json({ error: "FUNCIONÁRIO NÃO ENCONTRADO!!!"})
  }
  funcionarios = funcionarios.filter(f => f.cpf != cpfFuncionario)
  res.json({ message: "FUNCIONÁRIO EXCLUÍDO COM SUCESSO!!!"})
})

module.exports = { router, funcionarios }
