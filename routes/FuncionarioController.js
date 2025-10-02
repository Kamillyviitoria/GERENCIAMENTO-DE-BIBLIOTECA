const express = require('express')

const router = express.Router()

//lista de funcionários para simular o banco de dados

let funcionarios = [

    {
        cpf:12345678909 ,
        nome_completo:"Luis Batista de Souza",
        data_nasc:"05/10/1997",
        telefone:"61992240704",
        email:"batista_souza@gmail.com",
        cargo:"bibliotecario",
        data_admissao:"10/07/2023",
        status:"ativo",

    },
    {
        cpf:11234567890,
        nome_completo:"Maria Fernanda de Oliveira",
        data_nasc:"21/05/2001",
        telefone:"61996688808",
        email:"fehOliveira@gmail.com",
        cargo:"diretor(a) de biblioteca",
        data_admissao:"10/07/2022",
        status:"ativo",

    }
]

//mapeamento de endpoints

//CRIAR
// POST /funcionarios

router.post('/funcionarios', (req, res, next) => {
  const { nome_completo, cpf, email, data_nasc, telefone, cargo, data_admissao, status } = req.body
  // validar se os dados vinheram

  const dadosNaoExistem = !nome_completo || !cpf || !email || !data_nasc || !telefone || !cargo || !data_admissao || !status

  if ( dadosNaoExistem) {
    return res.status(400).json({ error: "TODOS OS CAMPOS SÃO OBRIGATÓRIOS!!!" })
  }
  // validar se o CPF já existe
  const funcionario = funcionarios.find(funcionario => funcionario.cpf == cpf)
  if (funcionario) {
    return res.status(409).json({ error: "CPF JÁ CADASTRADO!!!" })
  }

  //invalidar cpf com menos de 11 dígitos
  //(pendente)

  //invalidar numero de telefone com menos de 11 digitos
  //(pendente)

  // cadastrar a nova pessoa na lista
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
  // inserir a nova pessoa montada na lista
  funcionarios.push(novoFuncionario)
  res.status(201).json({ message: "Funcionário(a) cadastrado(a)!!!", novoFuncionario })
})

//LISTAR TODOS OS FUNCIONÁRIOS
// GET /funcionarios

router.get('/funcionarios', (req, res, next) => {
  res.json(funcionarios)
})

// GET /funcionarios/:cpf

router.get('/funcionarios/:cpf', (req, res, next) => {
  const cpfFuncionario = req.params.cpf
  const funcionario = funcionarios.find(f => f.cpf == cpfFuncionario)
  if (!funcionario) {
    return res.status(404).json({ error: "FUNCIONÁRIO NÃO ENCONTRADO!!!" })
  }
  res.json(funcionario)
})

//ATUALIZAR FUNCIONÁRIO
// PUT /funcionarios/:cpf
router.put('/funcionarios/:cpf', (req, res, next) => {
  const cpfFuncionario = req.params.cpf
  const { cpf, nome_completo, data_nasc, telefone, email, cargo, data_admissao, status } = req.body
  // validar se os dados vinheram

    const dadosNaoExistem = !nome_completo || !cpf || !email || !data_nasc || !telefone || !cargo || !data_admissao || !status

  if (dadosNaoExistem) {
    return res.status(400).json({ error: "EXISTEM INFORMAÇÕES FALTANDO!!!" })
  }
  // validar se o funcionário com aquele CPF existe na lista
  const funcionario = funcionarios.find(funcionario => funcionario.cpf == cpfFuncionario)
  if (!funcionario) {
    return res.status(404).json({ error: "FUNCIONÁRIO NÃO ENCONTRADO!!!"})
  }
  // Sobrescrevo os dados do funcionário para atualizar


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


//DELETAR FUNCIONÁRIO
// DELETE /funcionarios/:cpf
router.delete('/funcionarios/:cpf', (req, res, next) => {
  const cpfFuncionario = req.params.cpf
  const funcionario = funcionarios.find(f => f.cpf == cpfFuncionario)
  if(!funcionario) {
    return res.status(404).json({ error: "FUNCIONÁRIO NÃO ENCONTRADO!!!"})
  }
  // sobrescreve a lista com uma nova sem o funcionário recebido pelo cpf
funcionarios = funcionarios.filter(f => f.cpf != cpfFuncionario)

  res.json({ message: "FUNCIONÁRIO EXCLUÍDO COM SUCESSO!!!"})
})



module.exports = router