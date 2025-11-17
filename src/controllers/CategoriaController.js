const express = require('express')
const router = express.Router()

// Lista de categorias para simular o banco de dados
let categorias = [
  {
    id: 1,
    nome: "Romance",
    descricao: "Livros que focam em relacionamentos e sentimentos."
  },
  {
    id: 2,
    nome: "Ficção Científica",
    descricao: "Obras que exploram tecnologia, futuro e espaço."
  },
  {
    id: 3,
    nome: "Aventura",
    descricao: "Histórias com ação, viagens e jornadas."
  }
]

// 1. POST /categorias (CREATE)
router.post('/categorias', (req, res) => {
  const { nome, descricao } = req.body
  
  // 400 Bad Request
  if (!nome) {
    return res.status(400).json({ error: "O nome da categoria é obrigatório!" })
  }

  // Validação de Duplicidade (409 Conflict)
  const nomeExistente = categorias.find(c => c.nome.toLowerCase() === nome.toLowerCase())
  if (nomeExistente) {
    return res.status(409).json({ error: "Esta categoria já existe." })
  }

  const novaCategoria = {
    id: Date.now(),
    nome,
    descricao: descricao || "Sem descrição." // Usa a descrição fornecida ou padrão
  }
  
  categorias.push(novaCategoria)
  // 201 Created
  res.status(201).json({ message: "Categoria cadastrada com sucesso!", novaCategoria })
})

// 2. GET /categorias (READ ALL)
router.get('/categorias', (req, res) => {
  res.json(categorias) // 200 OK
})

// 3. GET /categorias/:id (READ ONE)
router.get('/categorias/:id', (req, res) => {
  const idRecebido = parseInt(req.params.id) // Converte o ID para número
  const categoria = categorias.find(c => c.id === idRecebido)

  // 404 Not Found
  if (!categoria) {
    return res.status(404).json({ error: "Categoria não encontrada!" })
  }
  res.json(categoria)
})

// 4. PUT /categorias/:id (UPDATE)
router.put('/categorias/:id', (req, res) => {
  const idRecebido = parseInt(req.params.id) 
  const { nome, descricao } = req.body
  
  // Validação: O nome ainda é obrigatório para atualizar (400 Bad Request)
  if (!nome) {
    return res.status(400).json({ error: "O nome da categoria é obrigatório para a atualização!" })
  }

  const index = categorias.findIndex(c => c.id === idRecebido)
  
  // 404 Not Found
  if (index === -1) {
    return res.status(404).json({ error: "Categoria não encontrada para atualização!" })
  }

  // 409 Conflict: Checa se o novo nome já existe em outra categoria
  const nomeExistente = categorias.find(c => 
     c.nome.toLowerCase() === nome.toLowerCase() && c.id !== idRecebido
  );
  if (nomeExistente) {
    return res.status(409).json({ error: "O novo nome já é usado por outra categoria." });
  }

  // Atualiza o objeto
  categorias[index] = {
    id: categorias[index].id, 
    nome,
    descricao: descricao || categorias[index].descricao // Mantém a antiga se não for fornecida
  }
  
  res.json({ message: "Categoria atualizada com sucesso!", categoria: categorias[index] })
})

// 5. DELETE /categorias/:id (DELETE)
router.delete('/categorias/:id', (req, res) => {
  const idRecebido = parseInt(req.params.id) // Converte o ID para número
  const initialLength = categorias.length
  
  // Filtra o array removendo o item
  categorias = categorias.filter(c => c.id !== idRecebido)

  // 404 Not Found
  if (categorias.length === initialLength) {
    return res.status(404).json({ error: "Categoria não encontrada para exclusão!" })
  }
  
  res.json({ message: "Categoria excluída com sucesso!" })
})

module.exports = { router, categorias }