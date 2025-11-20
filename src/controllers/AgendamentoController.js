const express = require('express');
const router = express.Router();

const { livros } = require('./LivroController');
const { funcionarios } = require('./FuncionarioController');

let agendamentos = [
  {
    id: 1,
    cpfFuncionario: 12345678909,
    idLivro: 1,
    dataAgendamento: "2025-10-02",
    dataDevolucao: "2025-10-12",
    status: "ativo"
  }
];

function validarFuncionarioELivro(cpfFuncionario, idLivro) {
  const funcionario = funcionarios.find(f => f.cpf == cpfFuncionario);
  const livro = livros.find(l => l.id == idLivro);

  if (!funcionario) return { error: "Funcionário não encontrado!" };
  if (!livro) return { error: "Livro não encontrado!" };

  return { funcionario, livro };
}

router.post('/agendamentos', (req, res) => {
  const { cpfFuncionario, idLivro, dataAgendamento, dataDevolucao } = req.body;

  if (!cpfFuncionario || !idLivro || !dataAgendamento || !dataDevolucao) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  const validacao = validarFuncionarioELivro(cpfFuncionario, idLivro);
  if (validacao.error) return res.status(404).json({ error: validacao.error });

  const novoAgendamento = {
    id: Date.now(),
    cpfFuncionario,
    idLivro,
    dataAgendamento,
    dataDevolucao,
    status: "ativo"
  };

  agendamentos.push(novoAgendamento);
  res.status(201).json({ message: "Agendamento criado com sucesso!", agendamento: novoAgendamento });
});


router.get('/agendamentos', (_, res) => {
  res.json(agendamentos);
});


router.get('/agendamentos/:id', (req, res) => {
  const id = Number(req.params.id);
  const agendamento = agendamentos.find(a => a.id === id);

  if (!agendamento) {
    return res.status(404).json({ error: "Agendamento não encontrado!" });
  }

  res.json(agendamento);
});


router.put('/agendamentos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { cpfFuncionario, idLivro, dataAgendamento, dataDevolucao, status } = req.body;

  const agendamento = agendamentos.find(a => a.id === id);
  if (!agendamento) {
    return res.status(404).json({ error: "Agendamento não encontrado!" });
  }

  const validacao = validarFuncionarioELivro(cpfFuncionario, idLivro);
  if (validacao.error) return res.status(404).json({ error: validacao.error });

  agendamento.cpfFuncionario = cpfFuncionario;
  agendamento.idLivro = idLivro;
  agendamento.dataAgendamento = dataAgendamento;
  agendamento.dataDevolucao = dataDevolucao;
  agendamento.status = status ?? agendamento.status;

  res.json({ message: "Agendamento atualizado com sucesso!", agendamento });
});

router.delete('/agendamentos/:id', (req, res) => {
  const id = Number(req.params.id);
  const existe = agendamentos.some(a => a.id === id);

  if (!existe) {
    return res.status(404).json({ error: "Agendamento não encontrado!" });
  }

  agendamentos = agendamentos.filter(a => a.id !== id);

  res.json({ message: "Agendamento excluído com sucesso!" });
});

module.exports = router;
