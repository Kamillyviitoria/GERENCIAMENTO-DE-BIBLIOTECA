const express = require('express')
const router = express.Router()


const { usuarios } = require('./UsuarioController')
const { livros } = require('./LivroController')


let emprestimos = [
  {
    id: 1,
    idUsuario: 1001, 
    idLivro: 1,       
    dataEmprestimo: "2025-10-01",
    dataDevolucaoPrevista: "2025-10-15",
    dataDevolucaoReal: null,  
    status: "ativo"  
  }
]


router.post('/emprestimos', (req, res) => {
  const { idUsuario, idLivro, dataEmprestimo, dataDevolucaoPrevista } = req.body

 
  if (!idUsuario || !idLivro || !dataEmprestimo || !dataDevolucaoPrevista) {
    return res.status(400).json({ error: "idUsuario, idLivro, dataEmprestimo e dataDevolucaoPrevista são obrigatórios!" })
  }

  
  const usuario = usuarios.find(u => u.id == idUsuario)
  if (!usuario) {
    return res.status(404).json({ error: "Usuário não encontrado!" })
  }

  
  const livro = livros.find(l => l.id == idLivro)
  if (!livro) {
    return res.status(404).json({ error: "Livro não encontrado!" })
  }

  const emprestimoAtivo = emprestimos.find(e => e.idLivro == idLivro && e.status === "ativo")
  if (emprestimoAtivo) {
    return res.status(409).json({ error: "Este livro já está emprestado!" })
  }

  const novoEmprestimo = {
    id: Date.now(),
    idUsuario,
    idLivro,
    dataEmprestimo,
    dataDevolucaoPrevista,
    dataDevolucaoReal: null,
    status: "ativo"
  }

  emprestimos.push(novoEmprestimo)
  res.status(201).json({ message: "Empréstimo criado com sucesso!", novoEmprestimo })
})


router.get('/emprestimos', (req, res) => {
  res.json(emprestimos)
})


router.get('/emprestimos/:id', (req, res) => {
  const id = req.params.id
  const emprestimo = emprestimos.find(e => e.id == id)
  if (!emprestimo) {
    return res.status(404).json({ error: "Empréstimo não encontrado!" })
  }
  res.json(emprestimo)
})


router.put('/emprestimos/:id', (req, res) => {
  const id = req.params.id
  const { idUsuario, idLivro, dataEmprestimo, dataDevolucaoPrevista, dataDevolucaoReal, status } = req.body

  const emprestimo = emprestimos.find(e => e.id == id)
  if (!emprestimo) {
    return res.status(404).json({ error: "Empréstimo não encontrado!" })
  }

 
  if (idUsuario) {
    const usuario = usuarios.find(u => u.id == idUsuario)
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado!" })
    }
  }
  if (idLivro) {
    const livro = livros.find(l => l.id == idLivro)
    if (!livro) {
      return res.status(404).json({ error: "Livro não encontrado!" })
    }
  }


  emprestimo.idUsuario = idUsuario || emprestimo.idUsuario
  emprestimo.idLivro = idLivro || emprestimo.idLivro
  emprestimo.dataEmprestimo = dataEmprestimo || emprestimo.dataEmprestimo
  emprestimo.dataDevolucaoPrevista = dataDevolucaoPrevista || emprestimo.dataDevolucaoPrevista
  emprestimo.dataDevolucaoReal = dataDevolucaoReal || emprestimo.dataDevolucaoReal
  emprestimo.status = status || emprestimo.status

  res.json({ message: "Empréstimo atualizado com sucesso!", emprestimo })
})


router.delete('/emprestimos/:id', (req, res) => {
  const id = req.params.id
  const emprestimo = emprestimos.find(e => e.id == id)
  if (!emprestimo) {
    return res.status(404).json({ error: "Empréstimo não encontrado!" })
  }
  emprestimos = emprestimos.filter(e => e.id != id)
  res.json({ message: "Empréstimo excluído com sucesso!" })
})

module.exports = router