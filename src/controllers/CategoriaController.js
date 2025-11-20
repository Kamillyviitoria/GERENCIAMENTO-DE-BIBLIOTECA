const express = require('express');
const router = express.Router();


let categorias = [
  { id: 1, nome: "Romance", descricao: "Livros que focam em relacionamentos e sentimentos." },
  { id: 2, nome: "Ficção Científica", descricao: "Obras que exploram tecnologia, futuro e espaço." },
  { id: 3, nome: "Aventura", descricao: "Histórias com ação, viagens e jornadas." }
];

// Função auxiliar para buscar por ID
function getCategoriaById(id) {
  return categorias.find(c => c.id === id);
}

// Função auxiliar para checar duplicidade de nome
function nomeExiste(nome, idIgnorar = null) {
  return categorias.some(c =>
    c.nome.toLowerCase() === nome.toLowerCase() &&
    c.id !== idIgnorar
  );
}

router.post('/categorias', (req, res) => {
  const { nome, descricao } = req.body;

  if (!nome) {
    return res.status(400).json({ error: "O nome da categoria é obrigatório!" });
  }

  if (nomeExiste(nome)) {
    return res.status(409).json({ error: "Esta categoria já existe." });
  }

  const novaCategoria = {
    id: Date.now(),
    nome,
    descricao: descricao || "Sem descrição."
  };

  categorias.push(novaCategoria);

  res.status(201).json({
    message: "Categoria cadastrada com sucesso!",
    categoria: novaCategoria
  });
});

router.get('/categorias', (_, res) => {
  res.json(categorias);
});

router.get('/categorias/:id', (req, res) => {
  const id = Number(req.params.id);
  const categoria = getCategoriaById(id);

  if (!categoria) {
    return res.status(404).json({ error: "Categoria não encontrada!" });
  }

  res.json(categoria);
});

router.put('/categorias/:id', (req, res) => {
  const id = Number(req.params.id);
  const { nome, descricao } = req.body;

  const categoria = getCategoriaById(id);

  if (!categoria) {
    return res.status(404).json({ error: "Categoria não encontrada para atualização!" });
  }

  if (!nome) {
    return res.status(400).json({ error: "O nome da categoria é obrigatório!" });
  }

  if (nomeExiste(nome, id)) {
    return res.status(409).json({ error: "O novo nome já é usado por outra categoria." });
  }

  categoria.nome = nome;
  categoria.descricao = descricao || categoria.descricao;

  res.json({
    message: "Categoria atualizada com sucesso!",
    categoria
  });
});
router.delete('/categorias/:id', (req, res) => {
  const id = Number(req.params.id);
  const categoria = getCategoriaById(id);

  if (!categoria) {
    return res.status(404).json({ error: "Categoria não encontrada para exclusão!" });
  }

  categorias = categorias.filter(c => c.id !== id);

  res.json({ message: "Categoria excluída com sucesso!" });
});

module.exports = { router, categorias };
